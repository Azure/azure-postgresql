using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
//using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Npgsql;
using NpgsqlTypes;
using MultithreadedOrderInsert;

namespace MultithreadedInMemoryTableInsert
{
    public partial class MultithreadedOrderInsertMain : Form
    {
        public bool errorHasOccurred;
        public string errorDetails;
        public string dbVendorSelection;

        private Thread[] sqlTasks;
        private Int64 totalOrders;
        private Int64 totalMilliseconds;

        public MultithreadedOrderInsertMain()
        {
            InitializeComponent();
        }

        private void MultithreadedOrderInsertMain_Load(object sender, EventArgs e)
        {
            ConnectionStringTextBox.Text = MultithreadedOrderInsert.Properties.Settings.Default.WWI_ConnectionString;
            if (ConnectionStringTextBox.Text.Length == 0)
            {
                ConnectionStringTextBox.Text = "Server=.;Userid=user;Password=password;Port=5432;Database=wide_world_importers_pg;Pooling=true;MinPoolSize=0;MaxPoolSize=250;SslMode=Require;Trust Server Certificate=true";
            }
        }

        private void MultithreadedOrderInsertMain_FormClosing(object sender, FormClosingEventArgs e)
        {
            MultithreadedOrderInsert.Properties.Settings.Default.WWI_ConnectionString = ConnectionStringTextBox.Text;
            MultithreadedOrderInsert.Properties.Settings.Default.Save();
        }

        public void UpdateTotals(int MillisecondsForOrder)
        {
            lock (this)
            {
                this.totalOrders += 1;
                this.totalMilliseconds += MillisecondsForOrder;
            }
        }

        private void InsertButton_Click(object sender, EventArgs e)
        {
            if (InsertButton.Text == "&Insert")
            {
                InsertButton.Text = "&Stop Now";
                InsertButton.Refresh();
                this.Refresh();

                DisplayUpdateTimer.Enabled = true;

                this.errorHasOccurred = false;
                this.errorDetails = "";

                this.totalOrders = 0;
                this.totalMilliseconds = 0;

                if (ConnectionStringTextBox.Text.Length == 0)
                {
                    ConnectionStringTextBox.Text = "Server=.;Userid=user;Password=password;Port=5432;Database=wide_world_importers_pg;Pooling=true;MinPoolSize=0;MaxPoolSize=250;SslMode=Require;Trust Server Certificate=true";
                }

                if (!ConnectionStringTextBox.Text.ToUpper().Contains("MAXPOOLSIZE"))
                {
                    ConnectionStringTextBox.Text = (ConnectionStringTextBox.Text + ";MaxPoolSize=250;").Replace(";;", ";");
                }

                try
                {
                    int numberOfThreads = (int)NumberOfThreadsNumericUpDown.Value;

                    sqlTasks = new Thread[numberOfThreads];

                    for (int threadCounter = 0; threadCounter < numberOfThreads; threadCounter++)
                    {
                        PerformSqlTask(threadCounter, this);
                    }

                }
                catch (Exception ex)
                {
                    this.errorHasOccurred = true;
                    this.errorDetails = ex.ToString();
                }

                if (this.errorHasOccurred)
                {
                    var errorForm = new ErrorDetailsForm();
                    errorForm.ErrorMessage = this.errorDetails;
                    errorForm.ShowDialog();
                }
            }
            else
            {
                InsertButton.Text = "Stopping";
                InsertButton.Refresh();
                this.Refresh();

                DisplayUpdateTimer.Enabled = false;

                if (sqlTasks != null)
                {
                    foreach (Thread thread in sqlTasks)
                    {
                        thread.Abort();
                    }
                }

                InsertButton.Text = "&Insert";
            }
        }

        public void PerformSqlTask(int TaskNumber, MultithreadedOrderInsertMain ParentForm)
        {
            sqlTasks[TaskNumber] = new System.Threading.Thread(() => new PostgreSqlTask(TaskNumber, ParentForm, ConnectionStringTextBox.Text).PerformSqlTask());
            sqlTasks[TaskNumber].Start();
        }

        private void DisplayUpdateTimer_Tick(object sender, EventArgs e)
        {
            if (this.totalOrders > 0)
            {
                AverageOrderInsertionTimeTextBox.Text = (totalMilliseconds / totalOrders).ToString();
                AverageOrderInsertionTimeTextBox.Refresh();
                this.Refresh();
            }
        }
    }
}

