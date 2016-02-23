// get app
var app = angular.module('codequest');

app.controller('IndexController', function($scope, $auth){
  console.log("IndexController");
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
