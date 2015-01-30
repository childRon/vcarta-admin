(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.profile.name).controller(jcs.modules.profile.controllers.profile,
        ['$http', '$scope','$rootScope', 'eventbus', '$filter', jcs.modules.profile.factory.json,
            function ($http, $scope,$rootScope, eventbus,  $filter, profileFactory) {

                $rootScope.loading = true;
                $scope.message = "";
                $scope.error = false;
                $scope.success = false;


                profileFactory.getProfile().then(function (response) {
                    var data = response.data;
                    $scope.profile = data;
                    $rootScope.loading = false;
                    return data;
                }, function (error) {
                    console.error(error);
                });

                $scope.saveProfile = function(){
                    $rootScope.loading = true;
                    profileFactory.save($scope.profile).then(function (response) {
                        var data = response.data;
                        if(data.errors){
                            $scope.message = data.errors[0].message;
                            $scope.success = false;
                            $scope.error = true;
                        }else{
                            $scope.error = false;
                            $scope.success = true;
                        }
                        $rootScope.loading = false;
                        return data;
                    }, function (error) {
                        console.error(error);
                    });
                };

            }
        ]
    )

    ;


}(angular, jcs));