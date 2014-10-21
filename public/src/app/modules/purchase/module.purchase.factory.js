(function (angular, jcs) {
    'use strict';

   angular.module(jcs.modules.purchase.name).factory(jcs.modules.purchase.factory.json, function ($q, $http, $cookies) {
        return {
            getPurchaseStuff: function (date_from,date_to,offset,limit) {
                var sid = $cookies.token;
                console.log(sid) ;
                var pagingParams = '';
                if(offset && limit){
                    pagingParams = ",offset:{3},limit:{4}".format(offset,limit);
                }
                var url = '/api2/purchases.json?sid:{0},date_from:{1},date_to:{2}{3}'.format(sid, date_from, date_to, pagingParams);


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