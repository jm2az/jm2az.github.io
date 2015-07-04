console.log("stockTableCtrl is called");

require(["angular", "stockTable"], function(angular, stockTable) {
	console.log("Running controller");
	//angular.module('stockTable', []);
	angular.module('stockTable')
	
	.controller('stockTableCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('http://ec2-52-5-86-82.compute-1.amazonaws.com:5000/stocks').success(function(data) {
			$scope.stocks = data._items;
			$scope.sortType = 'roi'; // Default sort column
  			$scope.sortReverse = true; // Reverse order
			console.log("Loaded stocks");
		});
 
 	}]);
});