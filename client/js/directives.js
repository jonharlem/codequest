app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + '<h6 class="modal-title">Please provide your information below</h6>'+
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

app.directive('barChart', function(){
    var chart = d3.custom.barChart();
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            height: '=height',
            data: '=data',
            hovered: '&hovered'
        },
        link: function(scope, element, attrs) {

            var chartEl = d3.select(element[0]);
            chart.on('customHover', function(d, i){
                scope.hovered({args:d.numOfQuestions});
            });

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart);
            });            

            scope.$watch('height', function(d, i){
                chartEl.call(chart.height(scope.height));
            })
            
        }
    }
});

app.directive('chartForm',['$http',  function($http){
    return {
        restrict: 'E',
        replace: true,
        controller: function AppCtrl ($scope) {

            $scope.tagsData = function(){ 
                   $http({
                      method: "GET",
                      url: "/api/qtags"
                  }).then(function(qtags) {

                      var tags = qtags.data.map(function(dataPoint) {
                        return dataPoint.name;
                      })

                   function _counter(arr) {
                       var a = [], b = [], prev;

                       arr.sort();
                       for ( var i = 0; i < arr.length; i++ ) {
                           if ( arr[i] !== prev ) {
                               a.push(arr[i]);
                               b.push(1);
                           } else {
                               b[b.length-1]++;
                           }
                           prev = arr[i];
                       }

                       return [a, b];
                   }

                  $scope.data = [];

                  var numOfQuestions = _counter(tags)[1];
                  var tagNames = _counter(tags)[0];

                      for(var i = 0; i<tagNames.length; i++){

                             $scope.data.push({
                               tickLabel: tagNames[i],
                               numOfQuestions: numOfQuestions[i]
                             });
                      }

            }) 

            };

            $scope.companiesData = function(){           

              $scope.data = [{
                           tickLabel: "Facebook",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                         {
                           tickLabel: "Yahoo?",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                         {
                           tickLabel: "Dell" ,
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                         {
                           tickLabel: "Apple",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "Tesla",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "IBM",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "Microsoft",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "Pivitol Tracker",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "AirBnB",
                           numOfQuestions: ~~(Math.random()*200)+1
                         },
                        {
                           tickLabel: "Uber",
                           numOfQuestions: ~~(Math.random()*200)+1
                         }];
            }

            $scope.positionsData = function(){

                      $scope.data = [{
                                   tickLabel: "Front End Developer ",
                                   numOfQuestions: ~~(Math.random()*50)+1
                                 },
                                 {
                                   tickLabel: "Back End Developer",
                                   numOfQuestions: ~~(Math.random()*50)+1
                                 },
                                 {
                                   tickLabel: "Full Stack Developer" ,
                                   numOfQuestions: ~~(Math.random()*50)+1
                                 },
                                 {
                                   tickLabel: "UI/UX Developer",
                                   numOfQuestions: ~~(Math.random()*50)+1
                                 }];
            };                
        },
          template: '<div class="form">' +
                    '<br /><div class="btn-group " role="group" aria-label="..."><button ng-click="tagsData()" type="button" class="btn btn-default">Tags</button><button ng-click="companiesData()" type="button" class="btn btn-default">Companies</button> <button ng-click="positionsData()" type="button" class="btn btn-default">Positions</button></div>' +
                    '<br />Number of Questions: {{barValue}}</div>'
        }
}]);
