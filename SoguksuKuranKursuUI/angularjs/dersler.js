var DersModul = angular.module("DersModul", []).


factory("DersServices", ["$http", "$q", function ($http, $q) {

    return {
        BolumGetir: function () {
            return $http.get("/Admin/Bolum/BolumlerListesiGetir/");
        },
        DersleriGetir: function () {
            return $http.get("/Admin/Ders/DerslerListesi/");
        },
        UpdateDers: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Ders/DersGuncelle/",
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
        InsertDers: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Ders/DersEkle/",
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
        DeleteDersById: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Ders/DersSil",
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


controller("DersCtrl", ["$scope", "$http", "DersServices", function ($scope, $http, DersServices) {
    
    DersServices.BolumGetir().then(function (response) {
        $scope.BolumSelectList = response.data;
    });
    
    DersServices.DersleriGetir().then(function (response) {
        $scope.DersList = response.data;
    });

    $scope.yeniKayit = true;

    $scope.yeniDersKaydi = function () {
        $scope.yeniKayit = true;
        $scope.eskiKayit = false;

        $scope.Ders = {
            BolumId: "",
            DersAdi: "",
            DersAciklamasi: ""
        };

    };

    $scope.editKayit = function (data) {
        $scope.yeniKayit = false;
        $scope.eskiKayit = true;

        $scope.Ders = {
            BolumId: data.BolumId,
            DersAdi: data.DersAdi,
            DersAciklamasi: data.DersAciklamasi,
            TabloId: data.TabloId
        };

    };

    $scope.Guncelle = function (data) {
        $scope.Ders = {
            BolumId: data.BolumId,
            DersAdi: data.DersAdi,
            DersAciklamasi: data.DersAciklamasi,
            TabloId: data.TabloId
        };

        DersServices.UpdateDers($scope.Ders).then(function (d) {
            DersServices.DersleriGetir().then(function (response) {
                $scope.DersList = response.data;
            });
            alert(d);
        });
    };

    $scope.DersEkle = function (data) {
        $scope.Ders = {
            BolumId: data.BolumId,
            DersAdi: data.DersAdi,
            DersAciklamasi: data.DersAciklamasi
        };

        DersServices.InsertDers($scope.Ders).then(function (d) {
            DersServices.DersleriGetir().then(function (response) {
                $scope.DersList = response.data;
            });
            alert(d);
        });

    }

    $scope.deleteDersById = function (data) {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
            $scope.Ders = {
                BolumId: data.BolumId,
                DersAdi: data.DersAdi,
                DersAciklamasi: data.DersAciklamasi,
                TabloId: data.TabloId
            };
            DersServices.DeleteDersById($scope.Ders).then(function (d) {
                DersServices.DersleriGetir().then(function (response) {
                    $scope.DersList = response.data;
                });
                alert(d);
            });
        }
    };

}]);