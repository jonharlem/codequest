var app = angular.module('codequest', ['ngRoute', 'ngResource', 'satellizer', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider, $httpProvider, $authProvider){
  $routeProvider
  .otherwise({
    redirectTo: '/'
  });

  $authProvider.github({
    clientId: 'ac8daf97790baadd5e1f'
  });

  $authProvider.linkedin({
    clientId: '75hckaydg5jr06'
  });

  // Registed the interceptor for our application
  $httpProvider.interceptors.push("Interceptor");
});