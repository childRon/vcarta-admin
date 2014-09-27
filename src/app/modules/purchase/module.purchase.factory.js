(function (angular, jcs) {
    'use strict';

   angular.module(jcs.modules.purchase.name).factory(jcs.modules.purchase.factory.json, function ($q, $http) {
        return {
            getPurchaseStuff: function () {
                var deferred = $q.defer(),
                httpPromise = $http.get('json/purchase-filter.json');

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