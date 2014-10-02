(function (angular, jcs) {
    'use strict';

    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
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
      jcs.modules.core.name, 
      jcs.modules.auth.name,
      jcs.modules.admin.name, 
      jcs.modules.purchase.name
    ]);


app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: "src/app/modules/purchase/purchase.tmpl.html",
  });
  $routeProvider.when('/scroll',    {
    templateUrl: "scroll.html",
    access: {
            requiresLogin: true
    }
  }); 
  $routeProvider.when('/toggle',    {
    templateUrl: "toggle.html"
  }); 
  $routeProvider.when('/tabs',      {
    templateUrl: "tabs.html"
  }); 
  $routeProvider.when('/accordion', {
    templateUrl: "accordion.html",
    access: {
            requiresLogin: true,
            requiredPermissions: ['Admin', 'UserManager'],
            permissionType: 'AtLeastOne'
    }
  }); 
  $routeProvider.when('/overlay',   {
    templateUrl: "overlay.html"
  }); 
  $routeProvider.when('/forms',     {
    templateUrl: "forms.html"
  }); 
});




}(angular, jcs));



