// get app
var app = angular.module('codequest');

app.controller('IndexController', function(){
  console.log('IndexController');
});

app.controller('LoginController', function($scope, $auth, $location) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $location.path("/")
      });
  }
});

app.controller('LogoutController', function($location, $auth, toastr) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        $location.path('/');
      });
  });
