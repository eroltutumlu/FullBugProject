using BusinessLogicLayer;
using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Admin.Controllers
{
    public class HomeAdminController : Controller
    {
        private SistemKullanicilarService sistemKullaniciService;
        public HomeAdminController()
        {
            sistemKullaniciService = new SistemKullanicilarService();
        }
        public ActionResult Index()
        {
            List<SistemKullanicilarModel> sistemKullanici = (from kullanici in sistemKullaniciService.SistemKullanicilariGetir() where kullanici.Name.Equals(User.Identity.Name) select kullanici).ToList();
            ViewBag.ProfilImage = Url.Content(sistemKullanici[0].MedyaUrl.ToString());
            return View();
        }
    }
}