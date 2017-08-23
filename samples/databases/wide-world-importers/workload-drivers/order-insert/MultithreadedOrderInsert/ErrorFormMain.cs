using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MultithreadedInMemoryTableInsert
{
    public partial class ErrorDetailsForm : Form
    {
        public string ErrorMessage;

        public ErrorDetailsForm()
        {
            InitializeComponent();
        }

        private void ErrorDetailsForm_Load(object sender, EventArgs e)
        {
            DetailedErrorMessageTextBox.Text = this.ErrorMessage;
        }

        private void OKButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
