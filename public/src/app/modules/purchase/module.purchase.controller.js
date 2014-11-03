(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).controller(jcs.modules.purchase.controllers.purchase,
        ['$http', '$scope','$rootScope','eventbus', '$timeout', jcs.modules.purchase.factory.json, '$filter',
            function ($http, $scope,$rootScope, eventbus, $timeout, purchaseJsonFactory, $filter) {

                var startDateObj = new Date();
                var endDateObj = new Date(new Date().setMonth(startDateObj.getMonth() - 1));

                var pattern = 'mediumDate';

                var startDateValue = $filter('date')(startDateObj, pattern);
                var endDateValue = $filter('date')(endDateObj, pattern);
                var requestPattern = 'yyyy-MM-dd';

                $scope.startDate = startDateValue;
                $scope.endDate = endDateValue;

                $scope.dataObj = [];
                $scope.rowCollection = [];
                $scope.dataObj = {};
                $scope.sum = 0;
                $scope.count = 0;
                $scope.columns = ['created_at', 'point', 'discount', 'bonus', 'final_sum'];
                $scope.columnNames = ['Дата', 'Место', 'Сумма покупки', 'Сумма скидки', 'Итоговая сумма покупки'];




                $scope.$watch('endDate', function() {
                    endDateValue = $scope.endDate;
                });

                $scope.$watch('startDate', function() {
                    startDateValue = $scope.startDate;
                });

                $scope.submit = function () {

                    var startDateValueReq = $filter('date')(new Date(startDateValue), requestPattern);
                    var endDateValueReq = $filter('date')(new Date(endDateValue), requestPattern);
                    $rootScope.loading = true;
                    purchaseJsonFactory.getPurchaseStuff(startDateValueReq, endDateValueReq).then(function (response) {
                        var data = response.data;
                        if(!data.total){
                            return;
                        }
                        $scope.sum = data.total.sum;
                        $scope.count = data.total.count;

                        $scope.rowCollection = data.purchases;
                        $scope.displayedCollection = [].concat($scope.rowCollection);
                        $rootScope.loading = false;
                        return data.purchases;
                    }, function (error) {
                        console.error(error);
                    });

                }
            }
        ]
    )

    ;


}(angular, jcs));