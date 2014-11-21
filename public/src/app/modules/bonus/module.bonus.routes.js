(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.bonus.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(jcs.modules.bonus.routes.bonus, {
                controller: jcs.modules.bonus.controllers.bonus,
                templateUrl: 'src/app/modules/bonus/bonus.tmpl.html',
                access: {
                    loginRequired: false
                }
            }).when(jcs.modules.bonus.routes.bonus_one, {
                    controller: jcs.modules.bonus.controllers.bonus,
                    templateUrl: 'src/app/modules/bonus/bonus-share.tmpl.html',
                    access: {
                        loginRequired: false
                    }
                })
            ;
        }]);


}(angular, jcs));