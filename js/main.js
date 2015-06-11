requirejs.config({
    baseUrl: 'js',
    paths: {
        "angular" : "angular/angular.min",
        "jquery" : "jquery/jquery",
        "bootstrap" : "bootstrap/bootstrap.min",
        "stockTable" : "stockTable/stockTable",
        "stockTableCtrl" : "stockTable/controllers/stockTableCtrl"
    },
    shim: {
    	angular: {
    		exports: "angular"
    	}
    }
});

define(["stockTableCtrl"]);