"use strict";

app.controller('pinCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    $scope.user = AuthFactory.getUser();
    $scope.newBoard = {
    	uid: user
    };


    FirebaseFactory.getUserBoards(user).then(function(boardCollection){
        $scope.boards = boardCollection;
    });

    $scope.makeNewBoard = function(){
		FirebaseFactory.createNewBoard($scope.newBoard).then(function(){
			FirebaseFactory.getUserBoards(user).then(function(boardCollection){
                $scope.boards = boardCollection;
		    	$scope.newBoard = {
    				uid: user
    			};
			});
		});	
    };

});