(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).controller(jcs.modules.purchase.controllers.purchase,
        ['$http', '$scope','eventbus', '$timeout', jcs.modules.purchase.factory.json,'scopeService',
            function ($http, $scope, eventbus, $timeout, purchaseJsonFactory, scopeService) {
                var startDateObj = new Date();
                $scope.startDate = startDateObj;
                $scope.pattern = 'yyyy-MM-dd';
                $scope.selectedDateAsNumber;
                $scope.endDate = new Date(new Date().setMonth(startDateObj.getMonth() - 1));
                $scope.dataObj = [];
                $scope.isLoading = false;
                $scope.rowCollection = [];
                $scope.dataObj = {};
                $scope.sum = 0;
                $scope.count = 0;
                $scope.columns = ['created_at', 'point', 'discount', 'bonus', 'final_sum'];
                var testRows = [];
                $scope.$watch('selectedDateAsNumber', function() {
                    console.log($scope.selectedDateAsNumber);
                });

                $scope.$watch('startDate', function() {
                    console.log($scope.startDate);
                });
                purchaseJsonFactory.getPurchaseStuff().then(function (response) {
                    var data = response.data;
                    if(!data.total){
                        return;
                    }
                    $scope.sum = data.total.sum;
                    $scope.count = data.total.count;

                    $scope.isLoading = true;
                    $scope.rowCollection = data.purchases;
                    $scope.displayedCollection = [].concat($scope.rowCollection);
                    return data.purchases;
                }, function (error) {
                    console.error(error);
                });

                $scope.submit = function () {
                    alert(angular.toJson($scope.startDate));
                }
            }
        ]
    )
        .service('scopeService', function() {
            return {
                safeApply: function ($scope, fn) {
                    var phase = $scope.$root.$$phase;
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && typeof fn === 'function') {
                            fn();
                        }
                    } else {
                        $scope.$apply(fn);
                    }
                }
            };
        })
    ;


}(angular, jcs));