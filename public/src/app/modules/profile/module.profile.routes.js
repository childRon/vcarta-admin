(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.profile.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(jcs.modules.profile.routes.profile, {
                controller: jcs.modules.profile.controllers.profile,
                templateUrl: 'src/app/modules/profile/profile.tmpl.html',
                access: {
                    loginRequired: true
                }
            });
        }]);


}(angular, jcs));