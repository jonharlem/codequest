var codequest = angular.module('codequest', ['ngRoute', 'ngAnimate', 'ngResource']);

codequest.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl:'/client/templates/landingPage.html',
    controller:'IndexController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
