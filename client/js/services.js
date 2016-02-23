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