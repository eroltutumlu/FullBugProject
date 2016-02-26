var BolumModul = angular.module("BolumModul", []).


factory("BolumServices", ["$http", "$q", function ($http,$q) {

    return {
        GetBolumler: function () {
            return $http.get("/Admin/Bolum/BolumlerListesiGetir/");
        },

        InsertBolum: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Bolum/BolumEkle/",
                method: "POST",
                data: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert("Error!");
                defer.reject(e);
            });

            return defer.promise;
        },

        UpdateBolum: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Bolum/BolumGuncelle",
                method: "POST",
                data: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert("Error!");
                defer.reject(e);
            });

            return defer.promise;
        },

        DeleteBolumById: function(data){
            var defer = $q.defer();
            $http({
                url: "/Admin/Bolum/BolumSil",
                method: "POST",
                data: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert("Error!");
                defer.reject(e);
            });

            return defer.promise;
        }
    };

}]).


controller("BolumCtrl", ["$scope", "$http", "BolumServices", function ($scope, $http, BolumServices) {
    
    BolumServices.GetBolumler().then(function (response) {
        $scope.BolumListesi = response.data;
    });

    $scope.yeniKayit = true;

    $scope.Ekle = function (data) {
        $scope.Bolum = {
            BolumAdi: data.BolumAdi,
            BolumAciklama: data.BolumAciklama
        }

        BolumServices.InsertBolum($scope.Bolum).then(function (d) {
            BolumServices.GetBolumler().then(function (response) {
                $scope.BolumListesi = response.data;
            });
            alert(d);
        });

    }

    $scope.yeniBolumKaydi = function () {
        $scope.yeniKayit = true;
        $scope.eskiKayit = false;

        $scope.Bolum = {
            BolumAdi: "",
            BolumAciklama: ""
        }
    };

    $scope.editKayit = function (data) {
        $scope.yeniKayit = false;
        $scope.eskiKayit = true;

        $scope.Bolum = {
            BolumAdi: data.BolumAdi,
            BolumAciklama: data.BolumAciklama,
            TabloId: data.TabloId
        };

    };

    $scope.Guncelle = function (data) {
        $scope.Bolum = {
            BolumAdi: data.BolumAdi,
            BolumAciklama: data.BolumAciklama,
            TabloId: data.TabloId
        }

        BolumServices.UpdateBolum($scope.Bolum).then(function (d) {
            BolumServices.GetBolumler().then(function (response) {
                $scope.BolumListesi = response.data;
            });
            alert(d);
        });
    };

    $scope.deleteBolumById = function (data) {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
            $scope.Bolum = {
                BolumAdi: data.BolumAdi,
                BolumAciklama: data.BolumAciklama,
                TabloId:data.TabloId
            }
            console.log($scope.Bolum);
            BolumServices.DeleteBolumById($scope.Bolum).then(function (d) {
                BolumServices.GetBolumler().then(function (response) {
                    $scope.BolumListesi = response.data;
                });
                alert(d);
            });
        }
    };

}]);