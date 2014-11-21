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
                $scope.monthes = [{display: "январь"}, {display: "февраль"}, {display: "март"},{display: "апрель"}, {display: "май"}, {display: "июнь"},
                    {display: "июля"}, {display: "август"}, {display: "сентябрь"}, {display: "октябрь"}, {display: "ноябрь"}, {display: "декабрь"}]

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



                var startDate = new Date();
                startDate.setDate( $scope.selectedFromDate.display);
                startDate.setMonth( $scope.selectedFromMonth.display);
                startDate.setFullYear( $scope.selectedFromYear.display);

                var endDate = new Date();
                endDate.setDate( $scope.selectedToDate.display);
                endDate.setMonth( $scope.selectedToMonth.display);
                endDate.setFullYear( $scope.selectedToYear.display);

                $scope.debugInfo = function(){
                    console.log( $scope.selectedFromDate);
                    console.log( $scope.selectedFromMonth);
                    console.log( $scope.selectedFromYear);
                    console.log( $scope.selectedToDate);
                    console.log( $scope.selectedToMonth);
                    console.log( $scope.selectedToYear);
                    var startDateValueReq = $filter('date')(startDate, requestPattern);
                    var endDateValueReq = $filter('date')(endDate, requestPattern);
                    console.log( startDateValueReq);
                    console.log( endDateValueReq);

                }

                $scope.submit = function () {

                    var startDateValueReq = $filter('date')(startDate, requestPattern);
                    var endDateValueReq = $filter('date')(endDate, requestPattern);
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