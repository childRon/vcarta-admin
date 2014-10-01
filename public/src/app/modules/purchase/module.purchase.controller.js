(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.purchase.name).controller(jcs.modules.purchase.controllers.purchase, 
    	['$http','$scope', '$timeout', jcs.modules.purchase.factory.json, 
    		function($http, $scope, $timeout, purchaseJsonFactory){
			  
			  $scope.dataObj = [];
			  $scope.isLoading = false;
			  $scope.rowCollection = [];
			  $scope.dataObj = {};
			  $scope.columns=['created_at', 'point','discount','bonus','final_sum'];
			  var testRows = [];	
			  
			  purchaseJsonFactory.getPurchaseStuff().then(function (response) {
		        var data = response.data;
		        $scope.dataObj = data;

		        $scope.isLoading = true;
		        $scope.rowCollection = data.purchases;	
		        $scope.displayedCollection = [].concat($scope.rowCollection);
		        return data.purchases;
		      }, function (error) {
	                console.error(error);
			  });


  		  }
  		]
  	);


}(angular, jcs));