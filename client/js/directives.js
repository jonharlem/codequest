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

app.directive('chartForm', function(){
    return {
        restrict: 'E',
        replace: true,
        controller: function AppCtrl ($scope) {
            $scope.goToTagsBar = function(d, i){ $scope.data = randomData(); };
            $scope.goToCompaniesBar = function(d, i){ $scope.data = randomData(); };
            $scope.goToPositionsBar = function(d, i){ $scope.data = randomData(); };
            function randomData(){
                return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
            }
        },
          template: '<div class="form">' +
                    'Height: {{options.height}}<br />' +
                    '<input type="range" ng-model="options.height" min="100" max="800"/>' +
                    '<br /><div class="btn-group " role="group" aria-label="..."><button ng-click="goToTagsBar()" type="button" class="btn btn-default">Tags</button><button ng-click="goToCompaniesBar()" type="button" class="btn btn-default">Companies</button> <button ng-click="goToPositionsBar()" type="button" class="btn btn-default">Positions</button></div>' +
                    '<br />Hovered bar data: {{barValue}}</div>'
        }
});

// app.directive('d3Tags', function(d3tagsService) {
//   return {

//   };
// });