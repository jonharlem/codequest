var codequest = angular.module('codequest', ['ngRoute', 'ngAnimate', 'ngResource']);

codequest.config(function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl:'/client/templates/landingPage.html',
    controller:'IndexController'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
  
  // Registed the interceptor for our application
  $httpProvider.interceptors.push("Interceptor");
});
