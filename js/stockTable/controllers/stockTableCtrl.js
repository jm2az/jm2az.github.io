console.log("stockTableCtrl is called");

require(["angular", "stockTable"], function(angular, stockTable) {
	console.log("Running controller");
	//angular.module('stockTable', []);
	angular.module('stockTable')
	
	.controller('stockTableCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.head = [
        	{ticker: "Ticker"},
        	{name: "Company Name"},
        	{roi: "Return on Investment"},
        	{irr: "Internal Rate of Return"},
        	{cur_price: "Current Price"},
        	{target: "1 Year Expected Price"},
        	{div_cash: "Annual Dividends"},
        	{beta: "Beta"},
        	{coe: "Cost of Equity"},
        	{npv: "Net Present Value"}
    	];
	
		$http.get('http://ec2-52-5-86-82.compute-1.amazonaws.com:5000/stocks').success(function(data) {
			$scope.body = data._items;
			console.log("Loaded stocks");
		});
		
		$scope.sort = {
        	column: 'roi',
        	descending: true
    	};
 
 		$scope.selectedCls = function(column) {
        	return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    	};
    
    	$scope.changeSorting = function(column) {
        	var sort = $scope.sort;
        	if (sort.column == column) {
            	sort.descending = !sort.descending;
        	} else {
            	sort.column = column;
            	if (["roi", "irr", "npv"].indexOf(column) > -1) {
            		sort.descending = true;
            	} else {
            		sort.descending = false;
            	}
        	}
    	};
 	}]);
});