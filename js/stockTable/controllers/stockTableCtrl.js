require(["angular"], function(angular) {
	console.log("Controller is called");
	angular.module('stockTable', [])
	.controller('stockTableCtrl', ['$scope', function($scope) {
 		$scope.stock = 'BGR!';
 	}
])});