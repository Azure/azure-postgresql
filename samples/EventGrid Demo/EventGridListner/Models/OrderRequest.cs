using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class OrderRequest
    {
        public Order Order;
        public IEnumerable<Product> Products;
        public IEnumerable<Customer> Customers;
        public string Customer { get; set; }
        public string Product { get; set; }
        public string Quantity { get; set; }

    }
}