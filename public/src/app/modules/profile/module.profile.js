(function (angular, jcs) {
    'use strict';

    jcs.modules.profile = {
        name: 'profile',
        controllers: {
            profile: 'ProfileController'
        },
        routes: {
            profile: '/profile'
        },
        factory: {
            json: 'profileJsonFactory'
        }
    };

    angular.module(jcs.modules.profile.name, [
      'ngRoute',
      "mobile-angular-ui",
      "smart-table",
      "lrDragNDrop",
      jcs.modules.core.name
    ]);

}(angular, jcs));