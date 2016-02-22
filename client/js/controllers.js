codequest.controller('IndexController', ['$scope', '$http', '$parse', '$location', '$routeParams',
	                                     function($scope,  $http,  $parse,  $location,   $routeParams) {

         	$scope.showModal = false;
         	
         	$scope.toggleModal = function(){
         	        $scope.showModal = !$scope.showModal;
         	};         	

         	$scope.toggleModalSignIn = function(){
         	        $scope.showSignInModal = !$scope.showSignInModal;
         	};
}]);