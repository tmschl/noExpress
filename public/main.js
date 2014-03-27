console.log("hi main.js")
angular.module('newApp', [])

.controller('hello', function($scope) {
  $scope.hi = 'hi';
})
