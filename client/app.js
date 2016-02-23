var app = angular.module('codequest', ['ngRoute', 'ngResource', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider){
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
<<<<<<< HEAD
});
=======

  $authProvider.github({
    clientId: 'ac8daf97790baadd5e1f'
  });

  $authProvider.linkedin({
    clientId: '75hckaydg5jr06'
  });
});
>>>>>>> 4de16216a4b2d07141b3973c6e4143e72cf5427c
