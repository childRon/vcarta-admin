(function (angular, jcs) {
    'use strict';

   angular.module(jcs.modules.purchase.name).factory(jcs.modules.purchase.factory.json, function ($q, $http, $cookies) {
        return {
            getPurchaseStuff: function () {
                var sid = $cookies.token;
                console.log(sid) ;
                var url = '/api2/purchases.json?sid:{0}'.format(sid);

                var deferred = $q.defer(),
                httpPromise = $http.get(url);

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            }
        };
    });

}(angular, jcs));