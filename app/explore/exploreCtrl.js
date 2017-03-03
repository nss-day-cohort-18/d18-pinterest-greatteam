"use strict";

app.controller('exploreCtrl', function ($scope, FirebaseFactory, SearchTermData, AuthFactory) {

	$scope.searchText = SearchTermData;

    $scope.user = AuthFactory.getUser();

    $scope.userFilter = function(item){
        return item.uid == $scope.user;
    }
    
    FirebaseFactory.getAllPins().then(function(pinCollection){
        $scope.pins = pinCollection;
    });

    FirebaseFactory.getUserBoards($scope.user).then(function(boardCollection){
        $scope.boards = boardCollection;
    });

    $scope.openExploreModal = function(){
    	$scope.explorePin = this.item;
    	$scope.explorePin.uid = $scope.user;
        $('#explorePin').modal('show');
    };

    $scope.addExplorePin = function(){
    	FirebaseFactory.createNewPin($scope.explorePin).then(function(){

    	})
    }
});