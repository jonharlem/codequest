var app = angular.module('codequest');

app.controller('IndexController', function($scope, $auth, $location, $routeParams, $parse, $http){
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
		$scope.showModal = false;
		$scope.showSignInModal = false;
	}
});

app.controller('NavbarController', function($scope, $auth){
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});


app.controller('LoginController', function($scope, $auth, $location) {
  //  authentication function for GitHub and LinkedIn
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $location.path("/")
      });
  }
});

app.controller('LogoutController', function($location, $auth) {
  if (!$auth.isAuthenticated()) { return; }

  $auth.logout()
    .then(function() {
      $location.path('/');
    });
});

app.controller('D3dashboard', function($scope, $location, $http) {
	$scope.goToTagsBar = function() {
		// fill out location of dashboard
		$location.path("/");
	};
	$scope.goToCompaniesBar = function() {
		// fill out location of dashboard
		$location.path("/");
	};
	$scope.goToPositionsBar = function() {
		// fill out location of dashboard
		$location.path("/");
	};
})
