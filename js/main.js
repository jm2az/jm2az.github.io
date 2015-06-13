requirejs.config({
    baseUrl: 'js',
    paths: {
        "angular" : "angular/angular.min",
        "jquery" : "jquery/jquery",
        "bootstrap" : "bootstrap/bootstrap.min",
        "stockTable" : "stockTable/stockTable",
        "stockTableCtrl" : "stockTable/controllers/stockTableCtrl",
        "stockTableDir" : "stockTable/directives/stockTableDir"
    },
    shim: {
    	angular: {
    		exports: "angular"
    	}
    }
});


require(["stockTable"], function(stockTable) {
	require(["stockTableCtrl", "stockTableDir"]);
});
console.log("Finished");