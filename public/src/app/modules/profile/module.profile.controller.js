(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.profile.name).controller(jcs.modules.profile.controllers.profile,
        ['$http', '$scope','$rootScope', 'eventbus', '$filter', jcs.modules.profile.factory.json,
            function ($http, $scope,$rootScope, eventbus,  $filter, profileFactory) {

                $rootScope.loading = true;
                profileFactory.getProfile().then(function (response) {
                    $rootScope.loading = false;
                    return response;
                }, function (error) {
                    console.error(error);
                });

            }
        ]
    )

    ;


}(angular, jcs));