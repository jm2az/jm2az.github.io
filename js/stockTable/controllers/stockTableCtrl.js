console.log("stockTableCtrl is called");

require(["angular", "stockTable"], function(angular, stockTable) {
	console.log("Running controller");
	//angular.module('stockTable', []);
	angular.module('stockTable')
	
	.controller('stockTableCtrl', ['$scope', '$http', function($scope, $http) {
		// Initialize variables
		$scope.tickerAdded = "";
		
		/**************** stockTable ****************/
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
    	};
    	
    	// Toggles if a stock's info will be shown
    	$scope.toggleRow = function(index) {
    		$scope.body[index].show_info = !$scope.body[index].show_info;
    	};
    	
    	// Determines whether to show the stock's extra info or not
    	$scope.showInfo = function(index) {
    		return $scope.body[index].show_info;
    	};
    	
    	// Formats dollar appropriately
    	$scope.formatDollar = function(dollar) {
    		return '$' + parseFloat(String(dollar).replace('-', '')).toFixed(2);
    	};
    	
    	// Formats percentage appropriately
    	$scope.formatPercentage = function(percent) {
    		return (parseFloat(String(percent).replace("-", ""))*100).toFixed(2) + '%';
    	};
    	
    	/**************** addStock ****************/
    	// Checks if ticker exists, if it does, reports back, else adds    	
    	$scope.addTicker = function() {
    		console.log("Ran addTicker");
    		ticker = $scope.tickerAdded.toUpperCase();
    		if ($scope.validateTicker(ticker)) { // Validation passed
    			// Load tickers
				$http.get('http://ec2-52-5-86-82.compute-1.amazonaws.com:5000/tickers').success(function(data) {
					var tickers_raw = data._items;
					console.log(tickers_raw);
					var tickers = [];
					for (i = 0; i < tickers_raw.length; i++) {
						tickers.push(tickers_raw[i].ticker);
					}
					console.log(tickers);
					
					if (tickers.indexOf(ticker) >= 0) { // Ticker is already being checked
						$scope.addStockText = "That stock is already being tested.\nIf the stock's info is not in the table,\nit is probably missing a piece of information on Yahoo Finance";
					} else { // Ticker is not in database yet
						var stock = ticker;
						$http.post('http://ec2-52-5-86-82.compute-1.amazonaws.com:5000/tickers', {ticker: stock})
						.success(function(data) {
							$scope.addStockText = ticker + " added to database. Please check again tomorrow.";
						})
						.error(function(data, status, headers, config) {
							$scope.addStockText = ticker + " not added to database. Server error.";
							console.log("Headers: " + headers);
						});
						
					}
				});
    		} else { // Validation failed
    			$scope.addStockText = "Please enter a valid ticker."
    		};
    	};
    	
    	// Checks to see if ticker is a reasonable length and has no numbers
    	$scope.validateTicker = function(ticker) {
    		var alpha_characters = /^[A-Za-z]+$/;
    		return 	($scope.tickerAdded.length > 0) && 
    				($scope.tickerAdded.length < 20) &&
    				(ticker.match(alpha_characters));
    	};
 	}]);
});