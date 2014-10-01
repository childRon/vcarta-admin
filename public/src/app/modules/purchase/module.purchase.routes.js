(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(jcs.modules.purchase.routes.purchase, {
                controller: jcs.modules.purchase.controllers.purchase,
                templateUrl: 'src/app/modules/purchase/purchase.tmpl.html',
                access: {
                    loginRequired: true
                }
            });
        }]);


}(angular, jcs));