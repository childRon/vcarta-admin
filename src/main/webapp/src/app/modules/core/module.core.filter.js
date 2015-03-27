(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.core.name).filter(jcs.modules.core.filter.removeZeros,
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