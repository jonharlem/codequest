var app = angular.module('codequest');

app.controller('NavbarController', function($scope, $auth, $location, $routeParams, $http, $uibModal){

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
	};

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
	};

	$scope.logout = function() {
		localStorage.removeItem('jwt');

    if (!$auth.isAuthenticated()) { return; }

    $auth.logout()
      .then(function() {
        $location.path('/');
      });
	};

	$scope.toggleModal = function(){
		$scope.showModal = !$scope.showModal;
	};

	$scope.toggleModalSignIn = function(){
		$scope.showSignInModal = !$scope.showSignInModal;
	};

	$scope.signedIn = function(){
		$scope.showModal = false;
		$scope.showSignInModal = false;
	};

  //  authentication function for GitHub and LinkedIn
  $scope.authenticate = function(provider) {
    $scope.showModal = false;
    $scope.showSignInModal = false;

    $auth.authenticate(provider)
      .then(function() {
        $location.path("/");
      });
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated() || localStorage.getItem("jwt");
  };
  	$scope.open = function() {
  		 var modalInstance = $uibModal.open({
      templateUrl: 'interviewForm.html',
      controller: 'InterviewController',
    });

  	}
});

app.controller('InterviewController', function($scope, $location, $http, $uibModalInstance) {
	$scope.submit = function() {
		$uibModalInstance.close();
	}
	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	}
	
	$scope.types = ["Phone Screen", "Technical Phone Screen", "Coding Challenge", "Onsite"];
	$scope.selectedType = $scope.types[0];

	$scope.positions = ["Front End Developer", "Back End Developer", "Full Stack Developer", "UI/UX Developer"];
	$scope.selectedPosition = $scope.positions[0];
});

app.controller('D3dashboard', function($scope, $location, $http) {
	// $scope.goToTagsBar = function() {
	// 	// fill out location of dashboard
	// 	$location.path("/");
	// };
	// $scope.goToCompaniesBar = function() {
	// 	// fill out location of dashboard
	// 	$location.path("/");
	// };
	// $scope.goToPositionsBar = function() {
	// 	// fill out location of dashboard
	// 	$location.path("/");
	// };
});
