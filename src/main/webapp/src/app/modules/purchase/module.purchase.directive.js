(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).directive(
        jcs.modules.purchase.directive.dateInput,
        function(dateFilter) {
            return {
                require: 'ngModel',
                template: '<input type="date"></input>',
                replace: true,
                link: function(scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        return dateFilter(modelValue, 'yyyy-MM-dd');
                    });

                    ngModelCtrl.$parsers.unshift(function(viewValue) {
                        var dateChanged = new Date(viewValue);
                        return  dateChanged;
                    });
                }
            };
        })
    ;


}(angular, jcs));