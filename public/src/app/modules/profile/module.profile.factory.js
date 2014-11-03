(function (angular, jcs) {
    'use strict';

   angular.module(jcs.modules.profile.name).factory(jcs.modules.profile.factory.json, function ($q, $http, $cookies, httpTransformer) {
        return {
            getProfile: function () {
                var sid = $cookies.token;
                console.log(sid) ;
                var url = '/api2/session/user.json?sid:{0}'.format(sid);

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