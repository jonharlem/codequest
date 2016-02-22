// get app
var app = angular.module('codequest');

app.controller('IndexController', function(){
  console.log('IndexController');
});

app.controller('LoginController', function($scope, $auth, $location) {
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  }

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $location.path("/")
      });
  }
});
