"use strict";

app.controller('pinCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    $scope.user = AuthFactory.getUser();
    $scope.newPin = {
    	uid: user
    };


    FirebaseFactory.getUserPins(user).then(function(pinCollection){
        $scope.pins = pinCollection;
    });

	FirebaseFactory.getUserBoards(user).then(function(boardCollection){
        $scope.boards = boardCollection;
    });

    $scope.makeNewPin = function(){
		FirebaseFactory.createNewPin($scope.newPin).then(function(){
			FirebaseFactory.getUserPins(user).then(function(pinCollection){
		    	$scope.pins = pinCollection;
		    	$scope.newPin = {
    				uid: user
    			};
			});
		});	
    };

});