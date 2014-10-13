(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).controller(jcs.modules.purchase.controllers.purchase,
        ['$http', '$scope', '$timeout', jcs.modules.purchase.factory.json,
            function ($http, $scope, $timeout, purchaseJsonFactory) {
                var startDateObj = new Date();
                $scope.startDate = startDateObj;
                $scope.endDate = new Date(new Date().setMonth(startDateObj.getMonth() - 1));
                $scope.dataObj = [];
                $scope.isLoading = false;
                $scope.rowCollection = [];
                $scope.dataObj = {};
                $scope.sum = 0;
                $scope.count = 0;
                $scope.columns = ['created_at', 'point', 'discount', 'bonus', 'final_sum'];
                var testRows = [];

                purchaseJsonFactory.getPurchaseStuff().then(function (response) {
                    var data = response.data;
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
                    alert(angular.toJson($scope.PurchaseForm));
                }

            }
        ]
    )
    ;


}(angular, jcs));