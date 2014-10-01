(function (angular, jcs) {
    'use strict';

    jcs.modules.purchase = {
        name: 'purchase',
        controllers: {
            purchase: 'PurchaseController'
        },
        routes: {
            purchase: '/purchase'
        },
        factory: {
            json: 'purchaseJsonFactory'
        }
    };

    angular.module(jcs.modules.purchase.name, [
        'ngRoute',
        "mobile-angular-ui",
      "smart-table",
      "lrDragNDrop"
    ]);

}(angular, jcs));