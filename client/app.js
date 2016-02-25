var app = angular.module('codequest', ['ngRoute', 'ngResource', 'satellizer', 'ngAnimate', 'ui.bootstrap', 'ui.select', 'ngSanitize']);

app.config(function($routeProvider, $locationProvider, $httpProvider, $authProvider, uiSelectConfig){
  uiSelectConfig.theme = 'select2';

  $routeProvider
  .when('/about', {
    templateUrl: '/client/templates/about.html'
  }).when('/settings', {
    templateUrl: '/client/templates/userProfile.html'
  }).otherwise({
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