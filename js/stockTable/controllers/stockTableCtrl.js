console.log("stockTableCtrl is called");

require(["angular", "stockTable"], function(angular, stockTable) {
	console.log("Running controller");
	//angular.module('stockTable', []);
	angular.module('stockTable')
	
	.controller('stockTableCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('js/stockTable/stocks.json').success(function(data) {
			$scope.stocks = data;
		});
 
 	}]);
});