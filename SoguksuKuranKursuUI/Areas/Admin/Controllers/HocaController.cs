using BusinessLogicLayer;
using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SoguksuKuranKursuUI.Areas.Admin.Controllers
{
    public class HocaController : Controller
    {
        private SistemKullanicilarService sistemKullaniciService;
        private SistemKullanicilarDerslerService sistemKullaniciDersService;
        private MedyaKutuphanesiService medyaService;

        public HocaController()
        {
            sistemKullaniciService = new SistemKullanicilarService();
            medyaService = new MedyaKutuphanesiService();
            sistemKullaniciDersService = new SistemKullanicilarDerslerService();
        }
        // GET: Admin/Hoca
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult HocaKaydet(SistemKullanicilarModel sistemKullaniciModel, HttpPostedFileBase imageProfil, IEnumerable<int> Dersler)
        {
            int ImageId = 0;
            string fileName, path=null;
            
            if (imageProfil.ContentLength > 0 && imageProfil != null)
            {
                fileName = Path.GetFileName(imageProfil.FileName);
                path = Path.Combine(Server.MapPath("~/MedyaKutuphanesi/Images"), fileName);
                imageProfil.SaveAs(path);
            }

            var medyaUrl = "/MedyaKutuphanesi/Images/"+imageProfil.FileName;

            ImageId = medyaService.MedyaKaydet(new MedyaKutuphanesi {Aktifmi=true,MedyaAciklama="Hoca Resmi",MedyaUrl = medyaUrl, MedyaTipi="Resim", MedyaAdi= "Resim" });

            sistemKullaniciModel.Aktifmi = true;
            sistemKullaniciModel.ImageId = ImageId;
            sistemKullaniciModel.Role = "T";
            sistemKullaniciService.SistemKullaniciKaydet(sistemKullaniciModel);

            return RedirectToAction("Index","Hoca");

        }

        [HttpPost]
        public ActionResult HocaGuncelle(SistemKullanicilarModel sistemKullaniciModel, HttpPostedFileBase imageProfil)
        {
            bool isUpdated = false;
            if (ModelState.IsValid)
            {
                if (imageProfil == null)
                {
                    sistemKullaniciService.SistemKullaniciGuncelle(sistemKullaniciModel);
                }
                else
                {
                    //ImageId bildiğin için o image ismini güncelle daha sonra diğer alanları güncelle.
                }

                isUpdated = true;

            }

            if (isUpdated)
            {
                TempData["UpdatedMessage"] = sistemKullaniciModel.AdSoyad + " başarıyla güncellenmiştir.";
            }
            else
            {
                TempData["UpdatedMessage"] = "Bir hata ile karşılaştım. Güncelleme başarısız";
            }


            return    RedirectToAction("Index", "Hoca");



        }


        [HttpGet]
        public JsonResult HocaListesiGetir()
        {
            var hocaSistemKullanici = from hoca in sistemKullaniciService.SistemKullanicilariGetir() where hoca.Role == "T" select hoca;
            return new JsonResult { Data = hocaSistemKullanici, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult HocaDersKaydet(int[] DersIds, int HocaId)
        {
            SistemKullanicilarDersler model;
            for (int i = 0; i < DersIds.Length; i++)
            {
                model = new SistemKullanicilarDersler();
                model.DersId = DersIds[i];
                model.SistemKullaniciId = HocaId;
                sistemKullaniciDersService.SistemKullaniciDersEkle(model);

            }
            
            return new JsonResult { Data = "Eklendi", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpGet]
        public JsonResult HocaDersListele()
        {
            var data = sistemKullaniciDersService.SistemKullanicilarDerslerListele();

            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult HocaDersSelectedListele(int SistemKullaniciId)
        {
            var data = sistemKullaniciDersService.SistemKullanicilarDerslerListele().Where(x=>x.SistemKullaniciId == SistemKullaniciId).Select(x=>x.DersId);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult HocaDersSil(SistemKullanicilarDersler model)
        {
            string statusMessage;
            if (model != null)
            {
                sistemKullaniciDersService.SistemKullaniciDersSil(model.TabloId);
                statusMessage = "Başarılı bir şekilde silindi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult HocaDersGuncelle(int[] DersIds, int HocaId)
        {
            string statusMessage;

            if (ModelState.IsValid)
            {
                SistemKullanicilarDersler model;
                sistemKullaniciDersService.DeleteHocaDersBySistemKullaniciId(HocaId);

                for (int i = 0; i < DersIds.Length; i++)
                {
                    model = new SistemKullanicilarDersler();
                    model.DersId = DersIds[i];
                    model.SistemKullaniciId = HocaId;
                    sistemKullaniciDersService.SistemKullaniciDersEkle(model);

                }

                //sistemKullaniciDersService.SistemKullaniciDersGuncelle(model.SistemKullaniciId, model.DersId);
                statusMessage = "Başarılı bir şekilde güncellendi";
            }
            else
            {
                statusMessage = "Bir hata oluştu";
            }

            return new JsonResult { Data = statusMessage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

    }

}