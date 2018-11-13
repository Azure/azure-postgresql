using EventGridListner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace EventGridListner.Controllers
{
    public class OrderRequestController : Controller
    {
        static readonly IOrderRepository orderRepository = new OrderRepository();
        static readonly IProductRepository productRepository = new ProductRepository();
        static readonly ICustomerRepository customerRepository = new CustomerRepository();
    
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult OrderRequest()
        {
            OrderRequest model= new OrderRequest();
            
            model.Products = productRepository.GetAll();
            model.Customers = customerRepository.GetAll();
            ViewBag.Customers = model.Customers;
            ViewBag.Products = model.Products;
            return View(model);
        }

        [HttpPost]
        public ActionResult OrderRequest(OrderRequest orderRequest)
        {
            OrderRequest model = orderRequest;
            Customer cs = customerRepository.Get(Guid.Parse(orderRequest.Customer));
            Order order = new Order();
            order.ID = Guid.NewGuid();
            order.CustomerId = cs.Id;
            order.CustomerName = cs.FirstName + cs.LastName;
            order.Address = cs.Address;
            order.DateFilled = DateTime.Now;
            order.DatePlaced = DateTime.Now;
            order.Status = 1;
            order.Term = 2;
            Random rnd = new Random();
            order.InvoiceNumber = rnd.Next(4000, 6000);
            order.PaymentStatus = 1;
            order.Quantity = Convert.ToInt32(orderRequest.Quantity);
            orderRepository.Add(order);
            model.Products = productRepository.GetAll();
            model.Customers = customerRepository.GetAll();
            ViewBag.Customers = model.Customers;
            ViewBag.Products = model.Products;
            return  View(model);
        }
    }
}