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
        	{irr: "Internal Rate of Return"}
        	/*,
        	{cur_price: "Current Price"},
        	{target: "1 Year Expected Price"},
        	{div_cash: "Annual Dividends"},
        	{beta: "Beta"},
        	{coe: "Cost of Equity"},
        	{npv: "Net Present Value"}
        	*/
    	];
	
		// Load data
		$http.get('http://ec2-52-5-86-82.compute-1.amazonaws.com:5000/stocks').success(function(data) {
			$scope.body = data._items;
			console.log("Loaded stocks");
			console.log($scope.body);
		});
		
		// Sorting column
		$scope.sort = {
        	column: 'roi',
        	descending: true
    	};
    	
    	// Close all extra info
    	$scope.closeInfo = function() {
    	    $scope.body.forEach(function(element) {
        		element.show_info = false;
        	});
    	};
 
 		// Add class for sorted column
 		$scope.selectedCls = function(column) {
 			console.log(column == $scope.sort.column && 'sort-' + $scope.sort.descending);
        	return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    	};
    
    	// Change order for stock table
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
        	$scope.closeInfo();
    	};
    	
    	// Green for positive numbers, red for negative ones
    	$scope.textColor = function(number) {
    		if (parseFloat(number) < 0) {return "negative";}
    		if (parseFloat(number) > 0) {return "positive";}
    	}
    	
    	// Toggles if a stock's info will be shown
    	$scope.toggleRow = function(index) {
    		$scope.body[index].show_info = !$scope.body[index].show_info;
    	}
    	
    	// Determines whether to show the stock's extra info or not
    	$scope.showInfo = function(index) {
    		return $scope.body[index].show_info;
    	}
    	
    	// Formats dollar appropriately
    	$scope.formatDollar = function(dollar) {
    		return '$' + parseFloat(String(dollar).replace('-', '')).toFixed(2);
    	}
    	
    	// Formats percentage appropriately
    	$scope.formatPercentage = function(percent) {
    		return (parseFloat(String(percent).replace("-", ""))*100).toFixed(2) + '%';
    	}
 	}]);
});