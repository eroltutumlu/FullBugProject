using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Security.Controllers
{
    [AllowAnonymous]
    public class StudentLoginController : Controller
    {
        // GET: Security/StudentLogin
        public ActionResult Index()
        {
            return View();
        }
    }
}