var appminMain = angular.module('appminMain', []);

function mainController($scope, $http /*$cookieStore*/) {
	$scope.formData = {};

	$scope.hellos = ["one","two"];

    $.ajax({
        type: "POST",
        url: "/api2/session.json",
        data: {body:"type:card,login:2500650000019,password:3157"}
        // data:"type:card,login:2500650000019,password:3157",
        //dataType:"text"
    }).done(function(x){
        console.log(JSON.stringify(x));
        var y = x;
        $scope.$apply(function () {
            $scope.sid = x['sid'];
          //  $cookieStore.put('sid', x['sid']);
        });

        $http.get("/api2/purchases?sid:" + x['sid']).success(function(d){
            $scope.hi = d;
        });

    }).fail(function(xx){
        console.log(JSON.stringify(xx));
    });


    // к сожалению ни в какую

   /* $http({method: 'POST', url: '/api2/session.json', data: {data:"type:card,login:2500650000019,password:3157"}}).
        success(function(data, status, headers, config) {
            $scope.sid = data['sid'];
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function(data, status, headers, config) {
            console.log(JSON.stringify(data));
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    /*$http.post('/api2/session.json', {data:"type:card,login:2500650000019,password:3157"})
        .success(function(res){
            $scope.sid = res['sid'];
        });*/
}
