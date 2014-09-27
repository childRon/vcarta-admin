(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.core.name).controller(jcs.modules.core.controllers.main, 
    	['$rootScope','$scope', function($rootScope, $scope){
		    $rootScope.$on("$routeChangeStart", function(){
		      $rootScope.loading = true;
		    });

		    $rootScope.$on("$routeChangeSuccess", function(){
		      $rootScope.loading = false;
		    });
  		  }
  		]
  	);


}(angular, jcs));