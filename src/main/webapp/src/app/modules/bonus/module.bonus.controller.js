(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.bonus.name).controller(jcs.modules.bonus.controllers.bonus,
        ['$http', '$location', '$scope','$rootScope', 'eventbus', '$filter', jcs.modules.bonus.factory.json,
            function ($http, $location, $scope, $rootScope, eventbus, $filter, bonusFactory) {

                var pattern = 'mediumDate';

                $scope.rowCollection = [];
                $scope.dataObj = {};
                $scope.columns = ['brands', 'bonus', 'total_sum', 'purchases'];
                $scope.columnNames = ['Фирма', 'Бонусный счет', 'Сумма всех покупок', 'Кол-во всех покупок'];
                $scope.sum = 0;
                $scope.count = 0;
                $rootScope.loading = true;
                $rootScope.bonusShared = false;
                bonusFactory.getBonusStuff().then(function (response) {
                    var data = response.data;
                    if(!data.total){
                        return;
                    }
                    $scope.sum = data.total.sum;
                    $scope.count = data.total.count;



                    // transform array to string
                    for( var i =0; i < data.accounts.length; i++){
                        var accountBrands = "";
                        var j= 0;
                        var allBrandsLength = data.accounts[i].brands.length;
                        data.accounts[i].brands.forEach(function(entry) {
                            accountBrands = accountBrands + entry ;
                            j++;
                            if(j != allBrandsLength ){
                                accountBrands = accountBrands + ", ";
                            }
                        });
                        data.accounts[i].brands = accountBrands;
                    }
                    $scope.rowCollection = data.accounts;
                    $scope.displayedCollection = [].concat($scope.rowCollection);
                    $rootScope.loading = false;
                    return data.accounts;
                }, function (error) {
                    console.error(error);
                });

                $scope.locateToSharePage = function(id){
                    if(id == undefined){
                        return;
                    }
                    $location.path('/bonus/{0}'.format(id));
               };

            }
        ]
    ).controller(jcs.modules.bonus.controllers.bonus_share,
            ['$http', '$location', '$scope','$rootScope', 'eventbus', '$filter', jcs.modules.bonus.factory.json, '$routeParams',
                function ($http, $location, $scope, $rootScope, eventbus, $filter, bonusFactory, $routeParams) {
                    var currentId = $routeParams.id;
                    $rootScope.loading = true;
                    $scope.targetCard = "";
                    $scope.sum = "";
                    $rootScope.bonusShared = false;
                    $scope.error = false;

                    bonusFactory.getBonusInfo(currentId).then(function (response) {
                        var data = response.data;
                        $scope.bonusInfo = data;

                        var accountBrands = "";
                        var j= 0;
                        var allBrandsLength = $scope.bonusInfo.brands.length;
                        $scope.bonusInfo.brands.forEach(function(entry) {
                            accountBrands = accountBrands + entry ;
                            j++;
                            if(j != allBrandsLength ){
                                accountBrands = accountBrands + ", ";
                            }
                        });
                        $scope.bonusInfo.brands = accountBrands;


                        $rootScope.loading = false;
                        return data.accounts;
                    }, function (error) {
                        console.error(error);
                    });

                    $scope.turnBack = function(accountId){
                        $rootScope.bonusShared = false;
                        $scope.targetCard = "";
                        $scope.sum = "";
                    };
                    $scope.exchangeBonuses = function(accountId){
                        $rootScope.loading = true;
                        bonusFactory.exchangeBonus(accountId, $scope.sum, $scope.targetCard).then(function (response) {
                            var data = response.data;
                            if(data.errors){
                                $scope.message = data.errors[0].message;
                                $scope.error = true;
                            }else{
                                $rootScope.bonusShared = true;

                                $scope.shareBrands = "";
                                var i= 0;
                                var allBrandsLength = data.brands.length;
                                data.brands.forEach(function(entry) {
                                    $scope.shareBrands = $scope.shareBrands + entry ;
                                    i++;
                                    if(i != allBrandsLength ){
                                        $scope.shareBrands = $scope.shareBrands + ", ";
                                    }
                                });
                                $scope.shareCardFor = data.target_account.card_number;
                                $scope.bonusForBefore = data.target_account.sum_before;
                                $scope.bonusForAfter = data.target_account.sum_after;
                                $scope.bonusMineBefore = data.source_account.sum_before;
                                $scope.bonusMineAfter = data.source_account.sum_after;

                                $scope.error = false;
                            }
                            $rootScope.loading = false;
                        }, function (error) {
                            console.error(error);
                        });
                    };
                }
            ]
        )


    ;


}(angular, jcs));