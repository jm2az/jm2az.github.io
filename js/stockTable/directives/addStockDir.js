console.log("stockTableDir.jsDir is called");

require(["angular", "stockTable", "stockTableCtrl"], function(angular, stockTable, stockTableCtrl) {
	console.log("Running directive");
	angular.module("stockTable")
	
	.directive('addStockDir', function() {
	  return {
		restrict: 'E',
		templateUrl: 'js/stockTable/templates/addStock.html'
	  }
	});
});