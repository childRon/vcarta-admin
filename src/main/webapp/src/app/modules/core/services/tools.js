(function (angular, jcs) {
    'use strict';

    /**
     * @ngdoc service
     * @name core.utils
     * @requires $rootScope
     *
     * @description
     * Provides utils method to use in application.
     */
    angular.module(jcs.modules.core.name).factory(jcs.modules.core.services.tools, [
        '$rootScope',
        function ($rootScope) {
            var transformArrayIntoString = function (array, delimeter) {
                var accountBrands = "";
                var j= 0;
                var allBrandsLength = array.length;
                array.forEach(function(entry) {
                    accountBrands = accountBrands + entry ;
                    j++;
                    if(j != allBrandsLength ){
                        accountBrands = accountBrands + delimeter;
                    }
                });
                return  accountBrands;
            };

            return {
                transformArrayIntoString: transformArrayIntoString
            };
        }
    ]);
}(angular, jcs));
