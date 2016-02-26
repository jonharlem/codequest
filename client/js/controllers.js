var app = angular.module('codequest');

app.controller('NavbarController', function($scope, $auth, $location, $routeParams, $http){

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
});

app.controller('D3dashboard', function($scope, $location, $http) {
	$scope.options = {width: 500, height: 375, 'bar': 'aaa'};
	           $scope.hovered = function(d){
	               $scope.barValue = d;
	               $scope.$apply();
	           };
	           $scope.barValue = 'None';

	            $http({
	               method: "GET",
	               url: "/api/qtags"
	           }).then(function(qtags) {

	               var tags = qtags.data.map(function(dataPoint) {
	                 return dataPoint.name;
	               })
	                function _counter(arr) {
	                    var a = [], b = [], prev;

	                    arr.sort();
	                    for ( var i = 0; i < arr.length; i++ ) {
	                        if ( arr[i] !== prev ) {
	                            a.push(arr[i]);
	                            b.push(1);
	                        } else {
	                            b[b.length-1]++;
	                        }
	                        prev = arr[i];
	                    }

	                    return [a, b];
	                }
	                
	               $scope.data = _counter(tags)[1];
	               $scope.info = _counter(tags)[0];
	           })
});

app.controller('SearchController', function($scope){
	$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
	$scope.multipleDemo = {};
	// $scope.multipleDemo.colors = ['Blue','Red'];
	$scope.itemArray = [
		{id: 1, name: 'first'},
		{id: 2, name: 'second'},
		{id: 3, name: 'third'},
		{id: 4, name: 'fourth'},
		{id: 5, name: 'fifth'},
	];
	$scope.selected = { value: $scope.itemArray[0] };
})


