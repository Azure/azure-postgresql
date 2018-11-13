using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class Product
    {
        public Guid ID { get; set; }

        public int DaysToManufacture { get; set; }

        public decimal StandardCost { get; set; }

        public decimal ListPrice { get; set; }

        public decimal Weight { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public string Description { get; set; }


    }
}