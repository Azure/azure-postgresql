using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll();
        //Product Get(int id);
       Order Add(Order item);
        //void Remove(int id);
        //bool Update(Product item);
    }

}