appYatakhane.controller("YatakhaneCtrl", ["$scope", "$http", "YatakhaneService", function ($scope, $http, YatakhaneService) {

    YatakhaneService.getYatakhaneler().then(function (response) {

        $scope.YatakhaneListesi = response.data;
    });
    
    $scope.yeniKayit = true;

    $scope.Ekle = function (data) {

        $scope.Yatakhane = {
            YatakhaneNo: "",
            YatakhaneTanim: "",
            YatakhaneKisiSayisi: ""
        };

        $scope.Yatakhane = data;
        YatakhaneService.insertYatakhane($scope.Yatakhane).then(function (d) {
            YatakhaneService.getYatakhaneler().then(function (response) {

                $scope.YatakhaneListesi = response.data;
            });
            alert(d); 
        });
    }

    $scope.yeniYatakhaneKaydi = function () {
        $scope.yeniKayit = true;
        $scope.eskiKayit = false;

        $scope.Yatakhane = {
            YatakhaneNo: "",
            YatakhaneTanim: "",
            YatakhaneKisiSayisi: ""
        };

    }
    
    $scope.editKayit = function (data) {
        $scope.yeniKayit = false;
        $scope.eskiKayit = true;
        
        $scope.Yatakhane = {
            YatakhaneNo: data.YatakhaneNo,
            YatakhaneTanim: data.YatakhaneTanim,
            YatakhaneKisiSayisi: data.YatakhaneKisiSayisi,
            TabloId: data.TabloId
        };

    }
    $scope.Guncelle = function (data) {

        $scope.Yatakhane = {
            YatakhaneNo: "",
            YatakhaneTanim: "",
            YatakhaneKisiSayisi: "",
            TabloId:""
        };

        $scope.Yatakhane = data;
        YatakhaneService.updateYatakhane($scope.Yatakhane).then(function (d) {
            YatakhaneService.getYatakhaneler().then(function (response) {

                $scope.YatakhaneListesi = response.data;
            });
            alert(d);
        });
    }

    $scope.deleteYatakhaneById = function (data) {
        if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
            $scope.Yatakhane = {
                YatakhaneNo: "",
                YatakhaneTanim: "",
                YatakhaneKisiSayisi: "",
                TabloId: ""
            };

            $scope.Yatakhane = data;
            YatakhaneService.deleteYatakhaneById($scope.Yatakhane).then(function (d) {
                YatakhaneService.getYatakhaneler().then(function (response) {
                    $scope.YatakhaneListesi = response.data;
                });
                alert(d);
            });
        }
    }

}]);