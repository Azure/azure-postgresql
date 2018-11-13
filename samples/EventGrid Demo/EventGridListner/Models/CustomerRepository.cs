using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public class CustomerRepository : ICustomerRepository
    {
        private List<Customer> customers = new List<Customer>();

        public CustomerRepository()
        {
            NpgsqlDataReader reader = Helper.ExecuteReader("select * from public.\"Customers\"");
            while (reader.Read())
            {
                Customer customer = new Customer();
                customer.Id = Guid.Parse(reader["Id"].ToString());
                customer.FirstName = reader["FirstName"].ToString();
                customer.LastName = reader["LastName"].ToString();
                customer.Address = reader["Address"].ToString();
                customers.Add(customer);
            }

        }

        public Customer Get(Guid id)
        {
            return customers.Find(x => x.Id == id);
        }

        public IEnumerable<Customer> GetAll()
        {
            return customers;
        }
    }
}