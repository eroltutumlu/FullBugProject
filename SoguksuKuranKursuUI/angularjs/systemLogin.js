angular.module("GirisApp", ['angular-ladda']).
    factory("GirisService", ["$http", "$q", function ($http, $q) {
        return {
            GirisKontrol: function (data) {
                var defer = $q.defer();
                $http({
                    method: "POST",
                    url: "/Security/SystemLogin/GirisYap/",
                    data: JSON.stringify(data)
                }).
                success(function (d) {
                    defer.resolve(d);
                }).
                error(function (e) {
                    defer.reject(e);
                });

                return defer.promise;
            }
        }
    }]).
    controller("GirisCtrl", ["$scope","$timeout","GirisService", function ($scope,$timeout, GirisService) {

        $scope.GirisBasarisiz = true;

        $scope.GirisYap = function (data) {
            $scope.loading = true;

            $timeout(function (d) {
                $scope.Giris = {
                    Name: data.Name,
                    KullaniciSifre: data.KullaniciSifre
                };

                GirisService.GirisKontrol($scope.Giris).then(function (response) {
                    if (response === "Basarisiz") {
                        $scope.GirisBasarisiz = false;
                        $scope.loading = false;
                    } else if (response === "Basarili") {
                        window.location.replace("/Admin/HomeAdmin/");
                    }
                });
            }, 2000)

        }
    
    }]);