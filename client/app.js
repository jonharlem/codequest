var app = angular.module('codequest', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'/client/templates/landingPage.html',
    controller:'IndexController'
  })
  .otherwise({
    redirectTo: '/'
  });
});