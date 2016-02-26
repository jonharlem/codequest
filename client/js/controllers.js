var app = angular.module('codequest');

app.controller('NavbarController', function($scope, $auth, $location, $routeParams, $http, $uibModal, SearchService){

	$scope.showInterviewModal = false;
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

  //  For the interview question form
	$http.get('/interviewTypes').then(function(response) {
		$scope.types = response.data;
	});
	$http.get('/tags').then(function(response) {
		$scope.tags = response.data;
	});
	$http.get('/companies').then(function(response) {
		$scope.companies = response.data;
	});
	$scope.positions = ["Front End Developer", "Back End Developer", "Full Stack Developer", "UI/UX Developer"];

  $scope.interview = {};

  $scope.toggleModalInterview = function() {
  	$scope.showInterviewModal = !$scope.showInterviewModal;
  };

	$scope.submitInterview = function(interviewForm) {
		$http.post('/interview', $scope.interview).then(function() {
		    $scope.interview = {};
		    $scope.interview.tags = [];
		    $scope.showInterviewModal = !$scope.showInterviewModal;
		});
	};
});

app.controller('SettingsController', function($scope, $auth) {
	$scope.user = $auth.getPayload();
});

app.controller('D3dashboard', function($scope, $location, $http) {

	$scope.options = {width: 500, height: 375, 'bar': 'aaa'};
	           $scope.data = [1, 2, 3, 4];
	           $scope.hovered = function(d){
	               $scope.barValue = d;
	               $scope.$apply();
	           };
	           $scope.barValue = 'None';
});

app.controller('SearchController', function($scope, $http, $location, SearchService){
	$scope.filterTags = {};
	$scope.skills = [];
	$scope.companies = [];

	$http({
		method:'GET',
		url: '/companies'
	}).then(function(data){
		$scope.companies = data.data.map(function(company){
			return company.name;
		});
	}).then(function(){
		$http({
			method:'GET',
			url:'/tags'
		}).then(function(data){
			 $scope.skills = data.data.map(function(skill){
				 return skill.name;
			 });
		});
	});

	$scope.itemSelected = function(item){
		if($scope.filterTags.tags.indexOf(item)){
			$scope.filterTags.tags.push(item);
		}
	};

	$scope.filterTags = {};
	$scope.filterTags.tags = [];

	$scope.itemArray = [
		{id: 1, name: 'first'},
		{id: 2, name: 'second'},
		{id: 3, name: 'third'},
		{id: 4, name: 'fourth'},
		{id: 5, name: 'fifth'},
	];

	// $scope.selected = { value: $scope.itemArray[0] };

	$scope.search = function() {
		SearchService.tags = $scope.filterTags.tags;
		$location.path('/search');
	};

	$scope.select2Options = {
		'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']
	};
});

app.controller('QuestionsController', function($scope, $http, SearchService) {
	$scope.questions = [];
	SearchService.tags.forEach(function(tag) {
		$http.get('/questions/' + tag).then(function(response) {
			$scope.questions = $scope.questions.concat(response.data);
			console.log($scope.questions);
		});
	});
});

