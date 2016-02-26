appYatakhane.factory("YatakhaneService", ["$http","$q", function ($http,$q) {
    var fac = {};

    fac.getYatakhaneler = function () {
        return $http.get("/Admin/Yatakhane/YatakhanelerLists/");
    }
    
    fac.insertYatakhane = function (data) {
        var defer = $q.defer();
        $http({
            url: "/Admin/Yatakhane/YatakhaneEkle/",
            method: "POST",
            data: JSON.stringify(data),
            headers:{"content-type":"application/json"}
        }).success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert("Error!");
            defer.reject(e);
        });

        return defer.promise;
    }

    fac.updateYatakhane = function (data) {
        var defer = $q.defer();
        $http({
            url: "/Admin/Yatakhane/YatakhaneGuncelle/",
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

    fac.deleteYatakhaneById = function (data) {
        var defer = $q.defer();
        $http({
            url: "/Admin/Yatakhane/YatakhaneSil/",
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

    return fac;

}]);