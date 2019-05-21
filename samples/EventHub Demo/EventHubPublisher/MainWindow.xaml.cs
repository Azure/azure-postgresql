using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
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
using Microsoft.Azure.EventHubs;
using Npgsql;

namespace EventHubPublisher
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void startButton_Click(object sender, RoutedEventArgs e)
        {
            string connectionstring = string.Empty;

            try
            {
                this.labelNotifications.Text = string.Empty;
                connectionstring = this.GetConnectionString(true);
                this.notificationConnection = new NpgsqlConnection(connectionstring);
                this.notificationConnection.Open();

                if (this.notificationConnection.State == ConnectionState.Open)
                {
                    this.labelStatus.Foreground = Brushes.Green;
                    this.labelStatus.Content = @"Connected";

                    using (var command = new NpgsqlCommand("listen " + TriggerChannelName, this.notificationConnection))
                    {
                        command.ExecuteNonQuery();
                    }

                    this.notificationConnection.Notification += this.PostgresNotification;
                    this.startButton.IsEnabled = false;
                    this.stopButton.IsEnabled = true;
                }
                else
                {
                    this.labelStatus.Foreground = Brushes.Red;
                    this.labelStatus.Content = @"Connection failed !";
                }
            }
            catch
            {
                MessageBox.Show("Connection error: " + connectionstring);
            }

        }

        private void stopButton_Click(object sender, RoutedEventArgs e)
        {
            this.StopListening(TriggerChannelName);
        }

        #region PGSQL Access

        private const string Server = "";
        private const string User = "";
        private const string Password = "";
        private const string DbName = "";
        private const string TableName = "Products";
        private NpgsqlConnection notificationConnection;
        private const string TriggerChannelName = "productsnotification";

        /// <summary>
        /// Get Npgsql connection string.
        /// </summary>
        /// <param name="syncNotification">True to sync notifications.</param>
        /// <returns>The connection string.</returns>
        private string GetConnectionString(bool syncNotification)
        {
            var csb = new NpgsqlConnectionStringBuilder
            {
                Host = Server,
                Database = DbName,
                Username = User,
                Password = Password,
                KeepAlive = 1
            };

            Debug.Print(csb.ConnectionString);
            return csb.ConnectionString;
        }

        /// <summary>
        /// Postgres notification event.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The event arguments.</param>
        private void PostgresNotification(object sender, NpgsqlNotificationEventArgs e)
        {
            string info = e.AdditionalInformation;
            Console.WriteLine(@"Notification -->");
            Console.WriteLine(@"  DATA {0}", info);
            Console.WriteLine(@"  CHANNEL {0}", e.Condition);
            Console.WriteLine(@"  PID {0}", e.PID);

            this.labelNotifications.Dispatcher.Invoke(new Action(() =>
            {
                labelNotifications.Text += "[" + DateTime.Now.ToString() + "] DATABASE Received: " + info + Environment.NewLine;
            }));

            if (PublishEvent(info))
            {
                this.labelNotifications.Dispatcher.Invoke(new Action(() =>
                {
                    labelNotifications.Text += "[" + DateTime.Now.ToString() + "] Event Published! " + Environment.NewLine;
                }));
            }
        }

        private void StopListening(string channelName)
        {
            this.labelStatus.Foreground = Brushes.Black;
            this.labelStatus.Content = @"Disconnected";

            if (this.notificationConnection != null && this.notificationConnection.State != ConnectionState.Closed)
            {
                this.notificationConnection.Notification -= this.PostgresNotification;

                using (var command = new NpgsqlCommand("unlisten " + channelName, this.notificationConnection))
                {
                    command.ExecuteNonQuery();
                }

                this.notificationConnection.Close();
            }

            this.startButton.IsEnabled = true;
        }

        #endregion PGSQL access

        #region Event Hub Access
        private static EventHubClient eventHubClient;
        private const string EventHubConnectionString = "{Event Hubs connection string}";
        private const string EventHubName = "{Event Hub path/name}";

        private bool PublishEvent(string oneEvent)
        {
            try
            {
                PublishEventAsync(oneEvent).GetAwaiter().GetResult();
                return true;
            }
            catch(Exception exception)
            {
                Debug.Print(exception.ToString());
                return false;
            }
        }

        private async Task PublishEventAsync(string message)
        {
            // Creates an EventHubsConnectionStringBuilder object from the connection string, and sets the EntityPath.
            // Typically, the connection string should have the entity path in it, but this simple scenario
            // uses the connection string from the namespace.
            var connectionStringBuilder = new EventHubsConnectionStringBuilder(EventHubConnectionString)
            {
                EntityPath = EventHubName
            };

            eventHubClient = EventHubClient.CreateFromConnectionString(connectionStringBuilder.ToString());

            await eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(message)));

            await eventHubClient.CloseAsync();
        }

        #endregion Event Hub Access
    }
}
