"use strict";

app.controller("SingleBoardCtrl", function($scope, AuthFactory, FirebaseFactory, $routeParams) {

	$scope.boardUrl = $routeParams.boardID;

	console.log("BoardURL: ", $scope.boardUrl);

    let user = AuthFactory.getUser()
    $scope.errorPresent = false;

    FirebaseFactory.getBoardPins($scope.boardUrl)
    .then( function(boardPins){
    	console.log("BoardPins: ", boardPins);

        console.log("BOARD_PINS.BOARD_NAME: ", boardPins.boardName);

        if(boardPins.boardName === undefined){
            console.log("77777777777777");
            $scope.name = "404 Error!"
            $scope.errorMsg = "The page you were looking for either does not exist, or is not available to you."
            $scope.errorPresent = true;
        }else{

        	$scope.name = boardPins.boardName;
        	var pins = Object.values(boardPins);

        	var newPins = pins.slice(0, pins.length - 1);
            console.log("AFTER SLICE: ", newPins);

        	$scope.pins = newPins;
        }


    })

});
