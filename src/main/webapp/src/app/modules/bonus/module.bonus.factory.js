(function (angular, jcs) {
    'use strict';


    angular.module(jcs.modules.bonus.name).factory(jcs.modules.bonus.factory.json, function ($q, $http, $cookieStore, httpTransformer) {
        return {
            getBonusStuff: function (offset, limit) {
                var sid = $cookieStore.get("token");
                var pagingParams = '';
                var url = '';
                if (offset && limit) {
                    pagingParams = ",offset:{3},limit:{4}".format(offset, limit);
                    url = 'api2/accounts.json?sid:{0}{3}'.format(sid, pagingParams);
                } else {
                    url = 'api2/accounts.json?sid:{0}'.format(sid);
                }

                var deferred = $q.defer(),
                    httpPromise = $http.get(url);

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            },
            getBonusInfo: function (id) {
                var sid = $cookieStore.get("token");

                var url = 'api2/accounts/{0}.json?sid:{1}'.format(id, sid);
                var deferred = $q.defer(),
                    httpPromise = $http.get(url);

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            },
            exchangeBonus: function (accountId, sum, targetCard) {
                var sid = $cookieStore.get("token");
                //fix for zeros issue
                var dataRequest = "sid:{0},sum:{1},target_card:{2}".format(sid, sum*100, targetCard);

                var request = $http({
                    method: "put",
                    url: "api2/accounts/{0}.json".format(accountId),
                    transformRequest: httpTransformer,
                    data:  dataRequest
                });

                var deferred = $q.defer();

                request.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                    console.error(error);
                });

                return deferred.promise;
            }
        };
    });

}(angular, jcs));