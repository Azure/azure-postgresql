using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class Order
    {
        public Guid ID { get; set; }

        public Guid CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string Address { get; set; }

        public DateTime DateFilled { get; set; }

        public DateTime DatePlaced { get; set; }

        public int InvoiceNumber { get; set; }

        public int PaymentStatus { get; set; }
        public int Status { get; set; }
        public int Term { get; set; }
        public int Quantity { get; set; }

    }
}