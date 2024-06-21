using Azure;
using Azure.Messaging.EventGrid;
using Npgsql;
using Npgsql.Replication;
using Npgsql.Replication.Internal;
using Npgsql.Replication.PgOutput;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace LogicalDecodingPublisher
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        #region PGSQL Access

        private const string server = "";
        private const string user = "";
        private const string password = "";
        private const string database = "";
        private const bool requireSsl = true;

        private LogicalReplicationConnection pgLogicalConnection;

        /// <summary>
        /// Get Npgsql connection string.
        /// </summary>
        /// <param name="syncNotification">True to sync notifications.</param>
        /// <returns>The connection string.</returns>
        private string GetConnectionString(bool syncNotification)
        {
            var csb = new NpgsqlConnectionStringBuilder
            {
                Host = serverTxt.Text,
                Database = databaseTxt.Text,
                Username = userTxt.Text,
                Password = passwordTxt.Password,
                KeepAlive = 1,
                SslMode = requireSslCheckbox.IsChecked.HasValue && (bool)requireSslCheckbox.IsChecked ? SslMode.Require : SslMode.Prefer,
                TrustServerCertificate = true,
            };

            Debug.Print(csb.ConnectionString);
            return csb.ConnectionString;
        }

        #endregion

        #region Event Grid Access

        private const string topicEndpoint = "";
        private const string topicKey = "";

        private EventGridPublisherClient eventGridClient;

        #endregion

        #region Logical Decoding Configuration

        private const string slotName = "";
        private const string publicationName = "";

        private CancellationTokenSource cancellationTokenSource;

        #endregion

        #region Main functions

        /// <summary>
        /// Connect to Event Grid and PG database, create a replication slot, and start listening to messages coming from replication slot.
        /// </summary>
        private async void Start()
        {
            try
            {
                this.eventGridClient = new EventGridPublisherClient(new Uri(topicEndpointTxt.Text), new AzureKeyCredential(topicKeyTxt.Password));

                string connectionString = this.GetConnectionString(true);
                this.pgLogicalConnection = new LogicalReplicationConnection(connectionString);
                await this.pgLogicalConnection.Open();

                await this.pgLogicalConnection.CreateLogicalReplicationSlot(slotTxt.Text, pluginTxt.Text);

                this.startBtn.IsEnabled = false;
                this.stopBtn.IsEnabled = true;
                this.outputTxt.Text = String.Empty;

                try
                {
                    var options = new List<KeyValuePair<string, string?>>();
                    if (pluginTxt.Text == "pgoutput")
                    {
                        options.Add(new KeyValuePair<string, string?>("proto_version", "1"));
                        options.Add(new KeyValuePair<string, string?>("publication_names", publicationTxt.Text));
                    }

                    this.cancellationTokenSource = new CancellationTokenSource();

                    await foreach (var message in this.pgLogicalConnection.StartLogicalReplication(new PgOutputReplicationSlot(slotTxt.Text), this.cancellationTokenSource.Token, null, options))
                    {
                        using StreamReader reader = new StreamReader(message.Data);
                        string rawData = reader.ReadToEnd();
                        DateTime time = DateTime.Now;
                        string type = message.GetType().Name;

                        string logData = String.Format("[{0:MM/dd/yy HH:mm:ss}] [{1}]\n{2}\n\n", time, type, rawData);
                        outputTxt.AppendText(logData);
                        outputTxt.ScrollToEnd();
                        Debug.Print(logData);

                        this.PublishEvent(time, type, rawData);

                        pgLogicalConnection.SetReplicationStatus(message.WalEnd);
                    }
                }
                catch (OperationCanceledException)
                {
                    //
                }
                catch (Exception ex)
                {
                    this.startBtn.IsEnabled = true;
                    this.stopBtn.IsEnabled = false;
                    MessageBox.Show(ex.Message, "Starting failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                finally
                {
                    await this.pgLogicalConnection.DropReplicationSlot(slotTxt.Text);
                    await this.pgLogicalConnection.DisposeAsync();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Connection failed", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Stop listening to messages coming from replication slot.
        /// </summary>
        private void Stop()
        {
            try
            {
                this.cancellationTokenSource.Cancel();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Stopping failed", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            this.startBtn.IsEnabled = true;
            this.stopBtn.IsEnabled = false;
        }

        /// <summary>
        /// Publish an event to Event Grid.
        /// </summary>
        private async void PublishEvent(DateTime time, string type, string rawData)
        {
            object? data;
            try
            {
                data = JsonObject.Parse(rawData);
            }
            catch
            {
                data = rawData;
            }

            EventGridEvent eventGridEvent = new EventGridEvent("Logical Replication Event", type, "1.0", data)
            {
                Id = Guid.NewGuid().ToString(),
                EventTime = time,
            };

            try
            {
                await this.eventGridClient.SendEventAsync(eventGridEvent);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Event Grid error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        #endregion

        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += MainWindow_Loaded;
            this.Closed += MainWindow_Closed;
            this.pluginTxt.SelectionChanged += PluginTxt_SelectionChanged;
        }

        private void PluginTxt_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (this.pluginTxt.SelectedValue.ToString() == "pgoutput")
            {
                publicationLabel.Visibility = Visibility.Visible;
                publicationTxt.Visibility = Visibility.Visible;
            }
            else
            {
                publicationLabel.Visibility = Visibility.Hidden;
                publicationTxt.Visibility = Visibility.Hidden;
            }
        }

        private void MainWindow_Closed(object? sender, EventArgs e)
        {
            if (!stopBtn.IsEnabled)
            {
                return;
            }

            this.Stop();
        }

        private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            serverTxt.Text = server;
            userTxt.Text = user;
            passwordTxt.Password = password;
            databaseTxt.Text = database;
            requireSslCheckbox.IsChecked = requireSsl;
            topicEndpointTxt.Text = topicEndpoint;
            topicKeyTxt.Password = topicKey;
            slotTxt.Text = slotName;
            pluginTxt.SelectedIndex = 0;
            publicationTxt.Text = publicationName;
        }

        private void startBtn_Click(object sender, RoutedEventArgs e)
        {
            if (!startBtn.IsEnabled)
            {
                return;
            }

            this.Start();
        }

        private void stopBtn_Click(object sender, RoutedEventArgs e)
        {
            if (!stopBtn.IsEnabled)
            {
                return;
            }

            this.Stop();
        }
    }
}
