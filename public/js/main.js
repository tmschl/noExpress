console.log('hi');


angular.module('newApp', [])

.controller('hello', function($scope, $http) {
  $scope.hi = 'hi';
  $scope.hello = function() {
    console.log($http);
    $http({method: 'GET', url:'/new'}).
    success(function(data, success, headers, config) {
      console.log('success')
    }).
    error(function(data, status, headers, config){
      console.log('failure')
    });
  }
})
