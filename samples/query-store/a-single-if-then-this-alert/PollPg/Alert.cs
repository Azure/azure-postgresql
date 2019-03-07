using System;
using Microsoft.Azure.WebJobs;
using System.Net.Http;
using Npgsql;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using System.Data.Common;

namespace PollPg
{
    public static class Alert
    {
        private readonly static HttpClient client = new HttpClient();
        private static string connectionString;
        private static string smtpServer;
        private static string senderAccount;
        private static string senderSecret;
        private static string keyVaultUri;
        private static string senderAccountSecretName;
        private static string connectionStringSecretName;
        private static string mailTo;
        private static string alertCondition;
        private static Dictionary<string, string> supportingDataQueries; 

        [FunctionName("PingMyDatabase")]
        public static async Task Run([TimerTrigger("%CronTimerInterval%")]TimerInfo myTimer, ILogger log)
        {
            InitializeFunctionParameters();

            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            System.IO.StreamWriter writer = new System.IO.StreamWriter(ms);

            log.LogInformation("Retrieving secrets from keyvault");

            await RetrieveSecretsAsync();

            log.LogInformation("Checking if alert condition is met");
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                log.LogInformation("Opening connection");
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand(alertCondition, conn))
                {
                    var result = await cmd.ExecuteReaderAsync();
                    if (!result.HasRows)
                    {
                        log.LogInformation("Alert condition is not met");
                        return;
                    }
                    log.LogInformation("Alert condition is met");

                    writer.WriteLine($"Alert condition is met for : {alertCondition}\n");

                    writer.WriteLine(BuildStringFromStream(result));
                }
            }                    

            foreach (var qry in supportingDataQueries)
            {
                //need to dispose the connection for each query. Otherwise, we get "an operation is already in progress error"
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    log.LogInformation("Opening connection");
                    conn.Open();
                    
                    using (NpgsqlCommand cmd = new NpgsqlCommand(qry.Value, conn))
                    {
                        // Execute the command and log the # rows affected.
                        var rows = await cmd.ExecuteReaderAsync();
                        if (rows.HasRows)
                        {
                            log.LogInformation($"Reading {qry.Key}");
                            writer.WriteLine("============================================================================================\n");
                            writer.WriteLine($"Begin: {qry.Key}\n");
                            writer.WriteLine(BuildStringFromStream(rows));
                            writer.WriteLine($"End: {qry.Key}\n");
                            writer.WriteLine("============================================================================================\n");

                            log.LogInformation($"Processed: {qry.Key}");
                        }
                    }
                }
            }

            writer.Flush();
            ms.Position = 0;

            log.LogInformation("Sending mail");
            SendMail(mailTo, ms);

            writer.Dispose();
            ms.Close();
        }

        private static void InitializeFunctionParameters()
        {
            string _SENDMAILIF_QUERYRETURNSRESULTS_SETTING_NAME = "SENDMAILIF_QUERYRETURNSRESULTS";
            string _LIST_OF_QUERIESWITHSUPPORTINGDATA_SETTING_NAME = "LIST_OF_QUERIESWITHSUPPORTINGDATA";
            string _MAIL_TO_SETTING_NAME = "MAIL_TO";
            string _SMTP_SERVER_SETTING_NAME = "SMTP_SERVER";
            string _SENDER_ACCOUNT_SETTING_NAME = "SENDER_ACCOUNT";
            string _SENDER_ACCOUNT_SECRET_NAME_SETTING_NAME = "SENDER_ACCOUNT_SECRET_NAME";
            string _CONNECTION_STRING_SECRET_NAME_SETTING_NAME = "CONNECTION_STRING_SECRET_NAME";
            string _KEYVAULT_URI_SETTING_NAME = "KeyVaultUri";

            mailTo = Environment.GetEnvironmentVariable(_MAIL_TO_SETTING_NAME);
            smtpServer = Environment.GetEnvironmentVariable(_SMTP_SERVER_SETTING_NAME);
            keyVaultUri = Environment.GetEnvironmentVariable(_KEYVAULT_URI_SETTING_NAME);
            senderAccount = Environment.GetEnvironmentVariable(_SENDER_ACCOUNT_SETTING_NAME);
            senderAccountSecretName = Environment.GetEnvironmentVariable(_SENDER_ACCOUNT_SECRET_NAME_SETTING_NAME);
            connectionStringSecretName = Environment.GetEnvironmentVariable(_CONNECTION_STRING_SECRET_NAME_SETTING_NAME);

            alertCondition = Environment.GetEnvironmentVariable(_SENDMAILIF_QUERYRETURNSRESULTS_SETTING_NAME);
            supportingDataQueries =
                JsonConvert.DeserializeObject<Dictionary<string, string>>(Environment.GetEnvironmentVariable(_LIST_OF_QUERIESWITHSUPPORTINGDATA_SETTING_NAME));
        }

        private static async Task RetrieveSecretsAsync()
        {
            var azureServiceTokenProvider = new AzureServiceTokenProvider();
            var kvClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback), client);
            connectionString = (await kvClient.GetSecretAsync(keyVaultUri, connectionStringSecretName)).Value;
            senderSecret = (await kvClient.GetSecretAsync(keyVaultUri, senderAccountSecretName)).Value;
        }

        private static void SendMail(string _mailTo, System.IO.MemoryStream ms)
        {
            System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage();

            message.To.Add(_mailTo);
            message.Subject = "Monitoring Alert";
            message.From = new System.Net.Mail.MailAddress(senderAccount);
            message.Body = "Production monitoring produced candidates to review. Please see attached.";

            System.Net.Mime.ContentType ct = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Text.Plain);
            System.Net.Mail.Attachment attach = new System.Net.Mail.Attachment(ms, ct);
            attach.ContentDisposition.FileName = $"MonitoringResults.txt";

            message.Attachments.Add(attach);


            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpServer)
            {
                Port = 587,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential(senderAccount, senderSecret),
                EnableSsl = true
            };
            smtp.Send(message);
        }

        private static StringBuilder BuildStringFromStream(DbDataReader rows)
        {
            StringBuilder result = new StringBuilder();

            for (int i = 0; i < rows.FieldCount; i++)
            {
                result.Append(rows.GetName(i));
                if (i != rows.FieldCount - 1)
                {
                    result.Append("\t");
                }
            }

            while (rows.Read())
            {
                for (int i = 0; i < rows.FieldCount; i++)
                {
                    result.Append(Regex.Replace(rows[i].ToString(), @"[\n\t]", string.Empty));
                    if (i != rows.FieldCount - 1)
                    {
                        result.Append("\t");
                    }
                }

                result.Append("\n");
            }

            return result;
        }
    }
}