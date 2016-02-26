using BusinessLogicLayer;
using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Admin.Controllers
{
    public class YatakhaneController : Controller
    {
        private YatakhanelerService service;
        public YatakhaneController()
        {
            service = new YatakhanelerService();
        }

        
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult YatakhanelerLists()
        {
            var list = service.YatakhaneListesiniGetir().ToList().Where(x=>x.Aktifmi==true);
            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult YatakhaneEkle(YatakhanelerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {
                var yatakhane = service.YatakhaneListesiniGetir().ToList().Where(x => x.Aktifmi == true && x.YatakhaneNo == model.YatakhaneNo).FirstOrDefault();
                if (yatakhane == null)
                {
                    model.Aktifmi = true;
                    service.YatakhaneEkle(model);
                    statusMessage = "Başarılı bir şekilde eklendi";
                }else
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
        public JsonResult YatakhaneGuncelle(YatakhanelerModel model)
        {
            string statusMessage;
            if (ModelState.IsValid)
            {
               
                    model.Aktifmi = true;
                    service.YatakhaneGuncelle(model);
                    statusMessage = "Başarılı bir şekilde guncellendi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

        [HttpPost]
        public JsonResult YatakhaneSil(YatakhanelerModel model)
        {
            string statusMessage;
            if (model!= null)
            {
                service.YatakhaneSil(model.TabloId);
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