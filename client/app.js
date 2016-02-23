var app = angular.module('codequest', ['ngRoute', 'ngResource', 'satellizer', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider, $httpProvider, $authProvider){
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
