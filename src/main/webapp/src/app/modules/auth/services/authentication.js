(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        '$q',
        '$timeout',
        'eventbus',
        '$window',
        '$cookies',
        '$http',
        '$rootScope',
        '$cookieStore',
        '$templateCache',
        jcs.modules.core.factory.httpTransformer,
        function ($q, $timeout, eventbus, $window, $cookies, $http, $rootScope, $cookieStore, $templateCache, transfromer) {
            var currentUser,
                createUser = function (name, permissions) {
                    return {
                        name: name,
                        permissions: permissions
                    };
                },
                login = function (cardId, password, keepIn) {
//                    var deferred = $q.defer();
                    // By default, the $http service will transform the outgoing request by
                    // serializing the data as JSON and then posting it with the content-
                    // type, "application/json". When we want to post the value as a FORM
                    // post, we need to change the serialization algorithm and post the data
                    // with the content-type, "application/x-www-form-urlencoded".
//                    var loginDataString = "type:card,login:2500650000019,password:3157";
                    var loginDataString = 'type:card,login:{0},password:{1}'.format(cardId, password);
                    var request = $http({
                        method: "post",
                        url: "api2/session.json",
                        transformRequest: transfromer,
                        data: loginDataString
                    });
                    request.then(function (response) {
                        var data = response.data;
                        var sid = data.sid;
                        if (sid) {
//                                if(keepIn){
//                            $cookies.token = sid;
//                            $cookies.user = angular.toJson(data);
                            $cookieStore.put("token", sid);
                            $cookieStore.put("user", angular.toJson(data));
                            currentUser = data;
                            $rootScope.user = currentUser;
                        }
                        eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, response);
//                        deferred.resolve(response);

                    }, function (error) {
//                        deferred.reject(error);
                        console.error(error);
                    });
//                    return deferred.promise;
                },

                logout = function () {
                    // we should only remove the current user.
                    // routing back to login login page is something we shouldn't
                    // do here as we are mixing responsibilities if we do.
//                    $cookies.token = "false";
//                    $cookies.user = "false";
                    $cookieStore.remove('token');
                    $cookieStore.remove('user');

//                    delete $cookies.token;
//                    delete $cookies.user;
                    currentUser = undefined;
                    $rootScope.user = currentUser;
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedOut);
                },
                getCurrentLoginUser = function () {
                    var user = $rootScope.user;
                    if(user === undefined){
                        user = angular.fromJson($cookies.user);
                        if(user){
                            $rootScope.user = user;
                        }
                    }
                    return user;
                };

            return {
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, jcs));