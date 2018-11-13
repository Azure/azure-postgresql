using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAll();
        Customer Get(Guid id);
        //Product Add(Product item);
        //void Remove(int id);
        //bool Update(Product item);
    }

}