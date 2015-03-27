(function (angular, jcs) {
    'use strict';

    jcs.modules.bonus = {
        name: 'bonus',
        controllers: {
            bonus: 'BonusController',
            bonus_share: 'BonusShareController'
        },
        routes: {
            bonus: '/bonus',
            bonus_one:'/bonus/:id'
        },
        factory: {
            json: 'bonusJsonFactory'
        },
        directive: {
            dateInput: "dateInput"
        }
    };

    angular.module(jcs.modules.bonus.name, [
      'ngRoute',
      "mobile-angular-ui",
      "smart-table",
      "lrDragNDrop",
      jcs.modules.core.name
    ]);

}(angular, jcs));