(function (angular, jcs) {
    'use strict';

    jcs.modules.bonus = {
        name: 'bonus',
        controllers: {
            bonus: 'BonusController'
        },
        routes: {
            bonus: '/bonus'
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