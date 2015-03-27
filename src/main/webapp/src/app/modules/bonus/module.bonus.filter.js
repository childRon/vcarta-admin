(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.bonus.name).filter(jcs.modules.bonus.filter.removeZeros,
        ['$locale', '$filter',
            function ($locale, $filter) {
                var numberFilter = $filter('number');
                return function(amount) {
                    return numberFilter (amount / 100);
                };
            }
        ]
    );


}(angular, jcs));