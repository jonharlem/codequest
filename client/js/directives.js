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
                scope.hovered({args:d});
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

            $scope.goToTagsBar = function(d, i){  tagsData(); };
            $scope.goToCompaniesBar = function(d, i){ $scope.data = companiesData(); };
            $scope.goToPositionsBar = function(d, i){ $scope.data = randomData();
            };

            function randomData(){
              var rangable = ~~(Math.random()*50)+1; // int between 1 - 51
              var d3R = d3.range(rangable);
              var mapped =  d3R.map(function(dataPoint){
                  return ~~(Math.random()*1000);
                });
              // mapped is going to be a list of elements with length = rand between 1-50
              // and all of it's members will be random ints between 0-1000
               
               return mapped
            }            

            // function companiesData(){               
            //         $http({
            //           method: "GET",
            //           url: "/api/companies"
            //       }).then(function(companies) {
            //           //array of company objects
            //           console.log(companies.data);
            //       })
            // }            

            function tagsData(){               
                   $http({
                      method: "GET",
                      url: "/api/qtags"
                  }).then(function(qtags) {

                      var tmp = qtags.data.map(function(dataPoint) {
                        return dataPoint.name;
                      })
                      // $scope.data = qtags.data;
                      $scope.data = tmp;
                  })
            }
        },
          template: '<div class="form">' +
                    '<br /><div class="btn-group " role="group" aria-label="..."><button ng-click="goToTagsBar()" type="button" class="btn btn-default">Tags</button><button ng-click="goToCompaniesBar()" type="button" class="btn btn-default">Companies</button> <button ng-click="goToPositionsBar()" type="button" class="btn btn-default">Positions</button></div>' +
                    '<br />Number of Questions: {{barValue}}</div>'
        }
}]);
