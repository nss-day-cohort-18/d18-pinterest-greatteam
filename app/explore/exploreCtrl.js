"use strict";

app.controller('exploreCtrl', function ($scope, FirebaseFactory, SearchTermData) {

	$scope.searchText = SearchTermData;
    
    FirebaseFactory.getAllPins().then(function(pinCollection){
        $scope.pins = pinCollection;
    });

    $scope.addToMyPins = function(){
    	console.log("this works, you clicked :", this.item)
    };
});