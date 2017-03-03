"use strict";

app.controller("SingleBoardCtrl", function($scope, AuthFactory, FirebaseFactory, $routeParams) {

	$scope.boardUrl = $routeParams.boardID;

	console.log("BoardURL: ", $scope.boardUrl);

    let user = AuthFactory.getUser()

    FirebaseFactory.getBoardPins($scope.boardUrl)
    .then( function(boardPins){
    	console.log("BoardPins: ", boardPins);

    	$scope.name = boardPins.boardName;
    	var pins = Object.values(boardPins);

        console.log("PINS: ", pins);
    	pins.splice(pins.length, 1);
        console.log("AFTER PINS: ", pins);

    	$scope.pins = pins;




    })

});
