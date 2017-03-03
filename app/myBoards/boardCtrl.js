"use strict";

app.controller('BoardCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    let user = AuthFactory.getUser()


    console.log("User1: ", user);

    $scope.newBoard = {
    	uid: user
    };

    console.log("User2: ", user);
    console.log("NewBoard: ", $scope.newBoard);

    FirebaseFactory.getUserBoards(user).then(function(boardCollection){
        console.log("BOARD COLLECTION: ", boardCollection);
        $scope.boards = boardCollection;
    });

    $scope.makeNewBoard = function(){
        console.log("CLICKED Add New Board");
		FirebaseFactory.createNewBoard($scope.newBoard).then(function(x){
            console.log("X: ", x);
			FirebaseFactory.getUserBoards(user).then(function(boardCollection){
                $scope.boards = boardCollection;
		    	$scope.newBoard = {
    				uid: user
    			};
			});
		});	
    };

    $scope.deleteBoard = function(index){
        FirebaseFactory.deleteBoard(this.item.id).then(function(){
            $scope.boards.splice(index, 1);
        })
    }

});