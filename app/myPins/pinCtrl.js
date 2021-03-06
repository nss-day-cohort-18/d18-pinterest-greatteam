"use strict";

app.controller('pinCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    let user = AuthFactory.getUser();
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

    $scope.deletePin = function(index){
        FirebaseFactory.deletePin(this.item.id).then(function(){
            $scope.pins.splice(index, 1);
        })
    }

    $scope.openEditModal = function(){
        $scope.editedPin = this.item;
        $('#editPin').modal('show');

    }

    $scope.editPin = function(){
        console.log($scope.editedPin);
        FirebaseFactory.editPin($scope.editedPin.id, $scope.editedPin).then(function(){

        })
    }


});