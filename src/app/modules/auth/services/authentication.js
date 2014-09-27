(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        '$q',
        '$timeout',
        'eventbus',
        '$window',
        '$cookies',
        '$http',
        function ($q, $timeout, eventbus, $window, $cookies, $http) {
            var currentUser,
                createUser = function (name, permissions) {
                    return {
                        name: name,
                        permissions: permissions
                    };
                },
                login = function (cardId, password) {
                    var deferred = $q.defer();
                    $http.get('json/session.json').
                        success(function (data, status, headers, config) {
                            var sid = data.sid;
                            if (sid) {
                                $cookies.token = sid;
                                $cookies.user = angular.toJson(data);
                                currentUser = data;
                                eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, currentUser);
                                deferred.resolve(data);
                            } else {
                                deferred.reject('Unknown Username / Password combination');
                                return;
                            }
                        }).
                        error(function (data, status, headers, config) {
                            deferred.reject(status);
                        });
                    return deferred.promise;
                },

                logout = function () {
                    // we should only remove the current user.
                    // routing back to login login page is something we shouldn't
                    // do here as we are mixing responsibilities if we do.
                    delete $cookies.token;
                    delete $cookies.user;
                    currentUser = undefined;
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedOut);
                },
                getCurrentLoginUser = function () {
                    return angular.fromJson($cookies.user);
                };

            return {
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, jcs));