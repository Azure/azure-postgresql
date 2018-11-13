using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class OrderRepository : IOrderRepository
    {
        private List<Order> orders = new List<Order>();
        

        public OrderRepository()
        {
            NpgsqlDataReader reader = Helper.ExecuteReader("select * from public.\"Orders\"");
            while (reader.Read())
            {
                Order order = new Order();
                order.ID = Guid.Parse(reader["Id"].ToString());
                order.CustomerName = reader["CustomerName"].ToString();
                orders.Add(order);
            }

        }

        public Order Add(Order item)
        {
            
            string query = string.Format("INSERT INTO public.\"Orders\"(\"Id\", \"Address\", \"CustomerId\", \"CustomerName\", \"DateFilled\", \"DatePlaced\", \"InvoiceNumber\", \"PaymentStatus\", \"Status\", \"Term\") VALUES ('{0}', '{1}','{2}', '{3}', '{4}', '{5}', {6}, {7}, {8}, {9});",
                item.ID,item.Address,item.CustomerId,item.CustomerName,item.DateFilled,item.DatePlaced,item.InvoiceNumber,item.PaymentStatus,item.Status,item.Term);
           Helper.ExecuteNonQuery(query);

            query = string.Format("INSERT INTO public.\"LineItems\"(	\"Id\", \"OrderId\", \"ProductId\", \"Quantity\")	VALUES({0}, {1}, {2}, {3});", item.ID, item.ID, item.CustomerId,item.Quantity);
            return item;
        }

        public IEnumerable<Order> GetAll()
        {
            return orders;
        }
    }
}