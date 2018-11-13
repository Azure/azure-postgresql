using EventGridListner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace EventGridListner.Controllers
{
    public class ProductsController : Controller
    {
        static readonly IProductRepository productRepository = new ProductRepository();

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Products()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Products(Product product)
        {
            productRepository.Add(product);
            return View();
        }
    }
}