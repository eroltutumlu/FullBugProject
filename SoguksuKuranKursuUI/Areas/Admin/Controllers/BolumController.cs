using BusinessLogicLayer;
using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Admin.Controllers
{
    public class BolumController : Controller
    {
        private BolumlerService bolumService;
        public BolumController()
        {
            bolumService = new BolumlerService();
        }
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult BolumlerListesiGetir()
        {
            var list = bolumService.BolumlerListesiniGetir().ToList().Where(x => x.Aktifmi == true);
            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult BolumEkle(BolumlerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {
                var yatakhane = bolumService.BolumlerListesiniGetir().ToList().Where(x => x.Aktifmi == true && x.BolumAdi == model.BolumAdi).FirstOrDefault();
                if (yatakhane == null)
                {
                    model.Aktifmi = true;
                    bolumService.BolumEkle(model);
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
        public JsonResult BolumGuncelle(BolumlerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {

                model.Aktifmi = true;
                bolumService.BolumGuncelle(model);
                statusMessage = "Başarılı bir şekilde guncellendi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

        [HttpPost]
        public JsonResult BolumSil(BolumlerModel model)
        {
            string statusMessage;
            if (model != null)
            {
                bolumService.BolumSil(model.TabloId);
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