console.log("documentationDir is called");

require(["angular", "stockTable", "stockTableCtrl"], function(angular, stockTable, stockTableCtrl) {
	console.log("Running directive");
	angular.module("stockTable")
	
	.directive('documentationDir', function() {
	  return {
		restrict: 'E',
		templateUrl: 'js/stockTable/templates/documentation.html'
	  }
	});
});