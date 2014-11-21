(function (angular, jcs) {
    'use strict';

    function transformToUTF (str) {
        return str.replace(
            /./ig, // what characters to change (`.` matches most chars)
            function ($0) {
                var x = $0.charCodeAt(0).toString(16); // code to hex string
                return '\\u' + '0000'.slice(x.length) + x; // prefix, pad, concat
            }
        );
    }

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
            },
            save: function(profile){
                var sid = $cookies.token;
                var dataRequest = "sid:{0},firstname:{1},lastname:{2},patronymic:{3},mobile:{4},email:{5}".format(sid, profile.firstname,
                    profile.lastname, profile.patronymic, profile.mobile, profile.email);

                console.log(dataRequest);

                var request = $http({
                    method: "put",
                    url: "/api2/session/user.json",
                    transformRequest: httpTransformer,
                    data: {
                        body: dataRequest
                    }
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