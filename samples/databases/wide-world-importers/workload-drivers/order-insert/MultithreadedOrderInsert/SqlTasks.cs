using MultithreadedInMemoryTableInsert;
using System;

namespace MultithreadedOrderInsert
{
    abstract class SqlTasks
    {
        public SqlTasks(int TaskNumber, MultithreadedOrderInsertMain ParentForm, string ConnectionString)
        {
            _tasknumber = TaskNumber;
            _parentform = ParentForm;
            _connectionstring = ConnectionString;
            _erroroccurred = false;
        }

        public static int _tasknumber { get; set; }

        public static bool _erroroccurred { get; set; }

        public static MultithreadedOrderInsertMain _parentform { get; set; }

        public static string _connectionstring { get; set; }

        public abstract void PerformSqlTask();

        public static void HandleException(Exception ex)
        {
            // ignore thread abort errors. these occur when the click stop/insert button is clicked.
            if (ex.HResult == -2146233040)
            {
                return;
            }

            _erroroccurred = true;
            _parentform.errorHasOccurred = true;
            _parentform.errorDetails = ex.ToString();
            HandleError();
        }

        public static void HandleError()
        {
            var errorForm = new ErrorDetailsForm();
            errorForm.ErrorMessage = _parentform.errorDetails;
            errorForm.ShowDialog();
        }
    }
}
