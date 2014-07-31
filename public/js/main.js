console.log('hi');

angular.module('newApp', [])

.controller('hello', function($scope, $http) {
  $scope.todo = {};
  $scope.addItem = function() {
    console.log($scope.todo.item)
    // $http({method: 'GET', url:'/new', params: { todoItem: $scope.todo.item } }).
    // success(function(data, success, headers, config) {
    //   console.log(data);
    //   console.log('success')
    // }).
    // error(function(data, status, headers, config){
    //   console.log('failure')
    // })
    $http({
      method: 'POST',
      url: '/new',
      data: $scope.todo.item,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(data, success, headers, config) {
      console.log(data);
      console.log('success');
    }).
    error(function(data, status, headers, config) {
      console.log('failure');
    });
  }
})
