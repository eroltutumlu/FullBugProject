

var loadFile = function (event) {
    var output = document.getElementById('imageProfil');
    output.src = this.URL.createObjectURL(event.target.files[0]);
}.bind(window)

var loadUpdatedFile = function (event) {
    var output = document.getElementById('imageUpdatedProfil');
    output.src = this.URL.createObjectURL(event.target.files[0]);
}.bind(window)


var hocaModul = angular.module("hocaModul",
    ['angularjs-dropdown-multiselect',
     'ui.bootstrap']);

hocaModul.factory("HocaServices", ["$http", "$q", function ($http, $q) {
    return {
        HocaListesi: function () {
            return $http.get("/Admin/Hoca/HocaListesiGetir/");
        },
        DersleriGetir: function () {
            return $http.get("/Admin/Ders/DerslerListesi/");
        },
        HocaDersListele: function () {
            return $http.get("/Admin/Hoca/HocaDersListele/");
        },
        //HocaDersSelectedListele: function (data) {
        //    return $http({
        //        url: "/Admin/Hoca/HocaDersSelectedListele/",
        //        method: "POST",
        //        data: JSON.stringify(data),
        //        headers: { "content-type": "application/json" }
        //    })
        //},
        HocaDersKaydet: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Hoca/HocaDersKaydet/",
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
        HocaDersSil: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Hoca/HocaDersSil/",
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
        HocaDersGuncelle: function (data) {
            var defer = $q.defer();
            $http({
                url: "/Admin/Hoca/HocaDersGuncelle/",
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
    }
    
}]);

hocaModul.filter("formattedFilter", function () {

    return function (dateInput) {
        return dateInput.substring(6, 19);
    }

});

//hocaModul.filter("startFrom", function () {
//    return function (data, start) {
//        if (!data || !data.length) { return; }
//        return data.slice(start);
//    }
//});

hocaModul.controller("HocaKayitCtrl", ["$scope", "$http", "HocaServices", function ($scope, $http, HocaServices) {


}]);

hocaModul.controller("HocaDersCtrl", ["$scope", "$http", "HocaServices", function ($scope, $http, HocaServices) {

    $scope.hocaListesi = [];
    $scope.yeniKayit = true;

    HocaServices.HocaListesi().then(function (response) {
        angular.forEach(response.data, function (value, index) {
            $scope.hocaListesi.push({ id: value.TabloId, label: value.AdSoyad });
        });
    });


    $scope.DerslerSelected = [];
    $scope.ListDerslerSelected = [];
    $scope.Dersler = [];

    $scope.dropdownSetting = {
        scrollable: true,
        scrollableHeight: '200px',
        enableSearch: true
    }

    HocaServices.DersleriGetir().then(function (response) {
        angular.forEach(response.data, function (value, index) {
                $scope.Dersler.push({ id: value.TabloId, label: value.DersAdi });
          
            
        });
    });

    $scope.Dogrula = function () {
        $scope.ListDerslerSelected = [];
        angular.forEach($scope.Dersler, function (value, index) {
            angular.forEach($scope.DerslerSelected, function (value2, index2) {
                if (value.id == value2.id) {
                    $scope.ListDerslerSelected.push({ id: value.id, DersAdi: value.label });
                }

            });
           
        });

    }

    $scope.HocaDersKaydet = function (data) {
        $scope.yeniKayit = true;
        var categoryIds = [];
        angular.forEach($scope.DerslerSelected, function (value, index) {
            categoryIds.push(value.id);
        });

        var data = {
            HocaId: data.HocaId,
            DersIds: categoryIds
        };

        HocaServices.HocaDersKaydet(data).then(function (d) {
            HocaServices.HocaDersListele().then(function (response) {
                $scope.HocaDersList = response.data;
            });
            alert(d);
        });
    }

    $scope.yeniHocaDersKaydi = function () {
        $scope.yeniKayit = true;
        $scope.DerslerSelected = [];
        $scope.ListDerslerSelected = [];

        $scope.HocaDers = {
            HocaId: "",
            TabloId: ""
        };
    }

    HocaServices.HocaDersListele().then(function (response) {
        $scope.HocaDersList = response.data;
    });

    $scope.DerslerSelected = [];
    $scope.editHocaDersKayit = function (HocaDers) {
        $scope.yeniKayit = false;
        $scope.DerslerSelected = [];

        $scope.HocaDers = {
            HocaId: HocaDers.SistemKullaniciId,
            TabloId : HocaDers.TabloId
        }

        angular.forEach($scope.HocaDersList, function (value, index2) {
            
            if (value.SistemKullaniciId == HocaDers.SistemKullaniciId) {
                $scope.DerslerSelected.push({ id: value.DersId});
            }

        });

    }

    $scope.HocaDersGuncelle = function (data) {
            var categoryIds = [];
            angular.forEach($scope.DerslerSelected, function (value, index) {
                categoryIds.push(value.id);
            });

            var data = {
                HocaId: data.HocaId,
                DersIds: categoryIds
            };

            HocaServices.HocaDersGuncelle(data).then(function (d) {
                HocaServices.HocaDersListele().then(function (response) {
                    $scope.HocaDersList = response.data;
                });
                alert(d);
            });
        
    }

    $scope.deleteHocaDersById = function (HocaDers) {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
            $scope.HocaDersDelete = {
                TabloId: HocaDers.TabloId
            };
            HocaServices.HocaDersSil($scope.HocaDersDelete).then(function (d) {
                HocaServices.HocaDersListele().then(function (response) {
                    $scope.HocaDersList = response.data;
                });
                alert(d);
            });
        }
    }

}]);

hocaModul.controller("HocaListeCtrl", ["$scope", "$http", "HocaServices", "$filter", function ($scope, $http, HocaServices, $filter) {

    HocaServices.HocaListesi().then(function (response) {
        $scope.HocaListesiDetails = response.data;
        $scope.totalItems = response.data.length;
    });


    $scope.orderUserSelected = "AdSoyad";
    $scope.Search = {};

    $scope.currentPage = 4;
    $scope.itemsPerPage = 3;
    $scope.maxSize = 3;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };


    $scope.selectedDetails = null;
    $scope.hocaSec = function (index) {
        //$scope.selectedHoca = index;
        var selfIndex = index;

        angular.forEach($scope.HocaListesiDetails, function (value, index) {
            //console.log(value);
            //console.log(index);
            if (value.TabloId == selfIndex) {
                var x = $filter('formattedFilter')(value.DogumTarihi);
                var y = $filter("date")(x,'MM/dd/yyyy');
                $scope.FilteredDogumTarihi = y;
                $scope.selectedDetails = value;
            }

        });

        //var output = document.getElementById('imageUpdatedProfil');
        //if (output.src != null) {
        //    output.src = null;
        //}

    }

}]);

