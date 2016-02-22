var app = angular.module('codequest', ['ngRoute', 'ngAnimate', 'ngResource']);

app.config(function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl:'/client/templates/landingPage.html',
    controller:'IndexController'
  })
  .otherwise({
    redirectTo: '/'
  });
  
  // Registed the interceptor for our application
  $httpProvider.interceptors.push("Interceptor");
});
