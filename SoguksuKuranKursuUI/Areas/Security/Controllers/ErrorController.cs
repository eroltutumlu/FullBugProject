using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Security.Controllers
{
    [AllowAnonymous]
    public class ErrorController : Controller
    {
        // GET: Security/Error
        public ActionResult Index()
        {
            return View();
        }
    }
}