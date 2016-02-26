using BusinessLogicLayer;
using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Admin.Controllers
{
    public class DersController : Controller
    {
        private DerslerService derslerService;

        public DersController()
        {
            derslerService = new DerslerService();
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult DerslerListesi()
        {
            var list = derslerService.DersleriListele().ToList().Where(x => x.Aktifmi == true);
            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult DersEkle(DerslerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {
                var dersler = derslerService.DersleriListele().ToList().Where(x => x.Aktifmi == true && x.DersAdi == model.DersAdi).FirstOrDefault();
                if (dersler == null)
                {
                    model.Aktifmi = true;
                    derslerService.DersEkle(model);
                    statusMessage = "Başarılı bir şekilde eklendi";
                }
                else
                {
                    statusMessage = "Böyle bir kayıt daha önce alınmış";
                }
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult DersGuncelle(DerslerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {
               model.Aktifmi = true;
               derslerService.DersGuncelle(model);
               statusMessage = "Başarılı bir şekilde güncellendi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult DersSil(DerslerModel model)
        {

            string statusMessage;
            if (model != null)
            {
                derslerService.DersSil(model.TabloId);
                statusMessage = "Başarılı bir şekilde silindi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

    }
}