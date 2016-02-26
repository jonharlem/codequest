// This interceptor pre-processes every HTTP call made using
// the $http service. Specifically, it adds a single header
// of the form:
// Authorization: 'Bearer jwtString'
app.service("Interceptor", function($window,$location,$q){
  return {
    request: function(config){
      var token = localStorage.getItem('jwt');
      
      // If the JWT exists in local storage, add an authorization header
      if(token) config.headers.Authorization = 'Bearer ' + token;

      return config;
    }
  };
});

app.service("SearchService", function() {
	return {
		tags: []
	}
});

//allows for responsive D3 barChart
// app.service('viewportUtils', function ($window) {
//     var utils = {
//         watchWindowSize: watchWindowSize
//     }
//     function onWindowResize(listener) {
//         var winEl = angular.element($window);
//         winEl.bind('resize', listener);
//         return function () {
//             winEl.unbind('resize', listener);
//         };
//     }
//     function watchWindowSize(scope, listener) {
//         var unRegisterFxn = onWindowResize(listener);
//         scope.$on('$destroy', unRegisterFxn);
//     }
//     return utils;
// });
 
