(function (angular, jcs) {
    'use strict';

    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }

    var app = angular.module(jcs.modules.app.name, [
        "ngRoute",
        "ngTouch",
        "mobile-angular-ui",
        "smart-table",
        "lrDragNDrop",
        "ngCookies",
        "ui.format",
        "720kb.datepicker",
        jcs.modules.core.name,
        jcs.modules.auth.name,
        jcs.modules.admin.name,
        jcs.modules.purchase.name,
        jcs.modules.bonus.name,
        jcs.modules.profile.name
    ]);


    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: "src/app/modules/purchase/purchase.tmpl.html",
            controller: jcs.modules.auth.controllers.login,
            access: {
                loginRequired: true
            }
        });

    });


}(angular, jcs));



