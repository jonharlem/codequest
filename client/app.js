
var app = angular.module('codequest', ['ngRoute', 'ngResource', 'satellizer', 'ngAnimate']);

app.config(function($routeProvider, $authProvider, $locationProvider, ngAnimate){
  $routeProvider
  .when('/', {
    templateUrl:'/client/templates/landingPage.html',
    controller:'IndexController'
  })
  .when('/login', {
    templateUrl: '/client/templates/login.html',
    controller: 'LoginController'
  })
  .when('/logout', {
    template: null,
    controller: 'LogoutController'
  })
  .otherwise({
    redirectTo: '/'
  });

  $authProvider.github({
    clientId: 'ac8daf97790baadd5e1f'
  });

  $authProvider.linkedin({
    clientId: '75hckaydg5jr06'
  });
});
