requirejs.config({
    baseUrl: 'js',
    paths: {
        "angular" : "angular/angular.min",
        "jquery" : "jquery/jquery",
        "bootstrap" : "bootstrap/bootstrap.min",
        "stockTable" : "stockTable/stockTable",
        "stockTableCtrl" : "stockTable/controllers/stockTableCtrl",
        "stockTableDir" : "stockTable/directives/stockTableDir",
        "addStockDir" : "stockTable/directives/addStockDir",
        "percentFilter" : "stockTable/filters/percentage"
    },
    shim: {
    	angular: {
    		exports: "angular"
    	}
    }
});


require(["stockTable"], function(stockTable) {
	require(["stockTableCtrl", "stockTableDir", "addStockDir"]);
});
console.log("Finished");