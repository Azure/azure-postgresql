using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventGridListner.Models
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
        Product Get(Guid id);
        Product Add(Product item);
        //void Remove(int id);
        //bool Update(Product item);
    }

}