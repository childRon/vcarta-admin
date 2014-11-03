(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.bonus.name).controller(jcs.modules.bonus.controllers.bonus,
        ['$http', '$scope','$rootScope', 'eventbus', '$filter', jcs.modules.bonus.factory.json,
            function ($http, $scope,$rootScope, eventbus,  $filter, bonusFactory) {

                var pattern = 'mediumDate';

                $scope.rowCollection = [];
                $scope.dataObj = {};
                $scope.columns = ['brands', 'bonus', 'total_sum', 'purchases'];
                $scope.columnNames = ['Фирма', 'Бонусный счет', 'Сумма всех покупок', 'Кол-во всех покупок'];
                $scope.sum = 0;
                $scope.count = 0;
                $rootScope.loading = true;
                bonusFactory.getBonusStuff().then(function (response) {
                    var data = response.data;
                    if(!data.total){
                        return;
                    }
                    $scope.sum = data.total.sum;
                    $scope.count = data.total.count;

                    $scope.rowCollection = data.accounts;
                    $scope.displayedCollection = [].concat($scope.rowCollection);
                    $rootScope.loading = false;
                    return data.accounts;
                }, function (error) {
                    console.error(error);
                });

            }
        ]
    )

    ;


}(angular, jcs));