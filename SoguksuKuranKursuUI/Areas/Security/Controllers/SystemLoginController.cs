using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SoguksuKuranKursuUI.Areas.Security.Controllers
{
    [AllowAnonymous]
    public class SystemLoginController : Controller
    {
        // GET: Security/SystemLogin
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "HomeAdmin", new { area = "Admin" });
            }
            return View();
        }

        [HttpPost]
        public JsonResult GirisYap(SistemKullanicilarModel kullanici)
        {

            string statusMessage;
            if (Membership.ValidateUser(kullanici.Name,kullanici.KullaniciSifre))
            {
                FormsAuthentication.SetAuthCookie(kullanici.Name, false);
                statusMessage = "Basarili";
                //return RedirectToAction("Index", "HomeAdmin", new {area="Admin" });
            }
            else
            {
                statusMessage = "Basarisiz";

            }
            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        
        public ActionResult CikisYap()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home", new { area = "Home" });
        }

    }
}