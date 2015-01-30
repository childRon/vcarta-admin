(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).controller(jcs.modules.auth.controllers.login, [
        '$scope',
        '$location',
        '$rootScope',
        'eventbus',
        jcs.modules.auth.services.authentication,
        function ($scope, $location, $rootScope,eventbus, authentication) {
            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;


            $scope.login = function () {
                $rootScope.loading = true;
                $scope.invalidLogin = false;
                $scope.isBusy = true;
                var callbackF = function(event, data){
                    var data = data.data;
                    if(data.errors){
                        $scope.message = data.errors[0].message;
                        $scope.success = false;
                        $scope.error = true;

                    }else{
                        $scope.error = false;
                        $scope.success = true;
                        $location.path(jcs.modules.core.routes.home);
                    }
                    $rootScope.loading = false;
//

                }

                eventbus.subscribe(jcs.modules.auth.events.userLoggedIn, callbackF)
                authentication.login($scope.loginModel.email, $scope.loginModel.password, $scope.loginModel.keepIn);
            };

            $scope.logout = function () {
                var callbackLogout = function(event, data){

                    $location.path(jcs.modules.core.routes.home);
                }
                authentication.logout();
            };

        }
    ]);
}(angular, jcs));