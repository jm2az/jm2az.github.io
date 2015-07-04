console.log("stockTableDir is called");

require(["angular", "stockTable", "stockTableCtrl"], function(angular, stockTable, stockTableCtrl) {
	console.log("Running directive");
	angular.module("stockTable")
	
	.directive('stockTableDir', function() {
	  return {
		restrict: 'E',
		templateUrl: 'js/stockTable/templates/stockTable.html'
	  }
	});
});