using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EventGridListner.Controllers
{
    public class ChatController : Controller
    {
        public IActionResult Chatbot()
        {
            return View();
        }
    }
}