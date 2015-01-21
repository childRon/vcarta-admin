(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).controller(jcs.modules.auth.controllers.login, [
        '$scope',
        '$location',
        jcs.modules.auth.services.authentication,
        function ($scope, $location, authentication) {
            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;


            $scope.login = function () {
                $scope.invalidLogin = false;
                $scope.isBusy = true;
                authentication.login($scope.loginModel.email, $scope.loginModel.password, $scope.loginModel.keepIn).then(function () {
                    $location.path(jcs.modules.core.routes.home);
                }, function () {
                    $scope.invalidLogin = true;
                })['finally'](function () {
                    $scope.isBusy = false;
                });
            };

            $scope.logout = function () {

                authentication.logout().then(function () {
                    $location.path(jcs.modules.core.routes.home);
                }, function () {

                })['finally'](function () {
                    $scope.isBusy = false;
                });
            };

        }
    ]);
}(angular, jcs));