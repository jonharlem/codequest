var app = angular.module('codequest');

app.controller('IndexController', ['$scope', '$http', '$parse', '$location', '$routeParams',
	                                     function($scope,  $http,  $parse,  $location,   $routeParams) {

         	$scope.showModal = false;
         	$scope.user = {};
         	$scope.posts = [];

         	$scope.signup = function() {
         	    $http({
         	        method: "POST",
         	        url: "/api/users",
         	        data: $scope.user
         	    }).then(function(data) {
         	        // Save the JWT to localStorage so we can use it later
         	        localStorage.setItem('jwt', data.data.jwt);
         	    }).catch(function(err){
         	        console.log(err);
         	        console.log("BAD THING ^^^");
         	    });
         	}         	

         	$scope.login = function() {
         	    $http({
         	        method: "POST",
         	        url: "/api/login",
         	        data: $scope.user
         	    }).then(function(data) {
         	        // Save the JWT to localStorage so we can use it later
         	        localStorage.setItem('jwt', data.data.jwt);
         	    }).catch(function(err){
         	        console.log(err);
         	        console.log("BAD THING ^^^");
         	    });
         	}    	         	

         	$scope.logout = function() {
         	        localStorage.removeItem('jwt');
         	}    	

         	$scope.toggleModal = function(){
         	        $scope.showModal = !$scope.showModal;
         	};         	

         	$scope.toggleModalSignIn = function(){
         	        $scope.showSignInModal = !$scope.showSignInModal;
         	};

         	$scope.signedIn = function(){
         		$scope.showModal = !$scope.showModal;
         		$scope.showSignInModal = !$scope.showSignInModal;
         	}
         	
}]);