(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).controller(jcs.modules.purchase.controllers.purchase,
        ['$http', '$scope','$rootScope','eventbus', '$timeout', jcs.modules.purchase.factory.json, '$filter',
            function ($http, $scope,$rootScope, eventbus, $timeout, purchaseJsonFactory, $filter) {


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


                var startDateObj = new Date();
                var endDateObj = new Date(new Date().setMonth(startDateObj.getMonth() - 1));


                $scope.dates= [];
                for(var i = 1; i <= 31; i++){
                    $scope.dates[i-1] = {display: i};
                }
                $scope.monthes = [{display: "январь", order: 1}, {display: "февраль", order: 2}, {display: "март", order: 3},{display: "апрель", order: 4}, {display: "май", order: 5}, {display: "июнь",order: 6},
                    {display: "июля", order: 7}, {display: "август",order: 8}, {display: "сентябрь", order: 9}, {display: "октябрь", order: 10}, {display: "ноябрь", order: 11}, {display: "декабрь", order: 12}]

                $scope.years = [];
                var currentYear = startDateObj.getFullYear();
                for(var i = currentYear - 5, j = 0; j <= 5, i != currentYear + 1; i++, j++){
                    $scope.years[j] = {display: i};
                }

                $scope.selectedFromDate = $scope.dates[startDateObj.getDate() - 1];
                $scope.selectedFromMonth = $scope.monthes[startDateObj.getMonth() - 1];
                $scope.selectedFromYear = $scope.years[5];

                $scope.selectedToDate = $scope.dates[startDateObj.getDate() - 1];
                $scope.selectedToMonth = $scope.monthes[startDateObj.getMonth()];
                $scope.selectedToYear = $scope.years[5];





                $scope.debugInfo = function(){
                    console.log( $scope.selectedFromDate.display);
                    console.log( $scope.selectedFromMonth.display);
                    console.log( $scope.selectedFromYear.display);
                    console.log( $scope.selectedToDate.display);
                    console.log( $scope.selectedToMonth.display);
                    console.log( $scope.selectedToYear.display);
                    var startDate = new Date($scope.selectedFromYear.display ,$scope.selectedFromMonth.order, $scope.selectedFromDate.display);

                    var endDate = new Date($scope.selectedToYear.display ,$scope.selectedToMonth.order, $scope.selectedToDate.display);
                    var startDateValueReq = $filter('date')(startDate, requestPattern);
                    var endDateValueReq = $filter('date')(endDate, requestPattern);
                    console.log(startDateValueReq)
                    console.log(endDateValueReq)


                }

                $scope.submit = function () {
                    var startDate = new Date($scope.selectedFromYear.display ,$scope.selectedFromMonth.order, $scope.selectedFromDate.display);

                    var endDate = new Date($scope.selectedToYear.display ,$scope.selectedToMonth.order, $scope.selectedToDate.display);

                    var startDateValueReq = $filter('date')(startDate, requestPattern);
                    var endDateValueReq = $filter('date')(endDate, requestPattern);
                    console.log( startDateValueReq);
                    console.log( endDateValueReq);
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
                        console.log( $scope.displayedCollection);
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