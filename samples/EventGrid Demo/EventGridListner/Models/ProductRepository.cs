using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class ProductRepository : IProductRepository
    {
        private List<Product> products = new List<Product>();

        public ProductRepository()
        {
            NpgsqlDataReader reader = Helper.ExecuteReader("select * from public.\"Products\"");
            while (reader.Read())
            {
                Product product = new Product();
                product.ID = Guid.Parse(reader["Id"].ToString());
                product.Name = reader["Name"].ToString();
                product.Description = reader["Description"].ToString();
                product.ListPrice = Convert.ToDecimal(reader["ListPrice"].ToString());
                product.StandardCost = Convert.ToDecimal(reader["StandardCost"].ToString());
                product.DaysToManufacture = Convert.ToInt32(reader["DaysToManufacture"].ToString());
                product.Weight= Convert.ToDecimal(reader["Weight"].ToString());
                products.Add(product);
            }

        }
        public Product Add(Product item)
        {
            item.ID = Guid.NewGuid();

            string query = string.Format("INSERT INTO public.\"Products\"(\"Id\", \"DaysToManufacture\", \"StandardCost\", \"ListPrice\", \"Weight\", \"Name\", \"Color\", \"Description\")	VALUES ('{0}', {1}, {2}, {3}, {4}, '{5}', '{6}', '{7}');",
                item.ID, item.DaysToManufacture, item.StandardCost,  item.ListPrice, item.Weight, item.Name, item.Color, item.Description);
            Helper.ExecuteNonQuery(query);
            

            return item;
        }

        public Product Get(Guid id)
        {
            return products.Find(x => x.ID == id);
        }
        public IEnumerable<Product> GetAll()
        {
            return products;
        }
    }
}