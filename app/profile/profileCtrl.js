"use strict";

app.controller('profileCtrl', function ($scope, FirebaseFactory, AuthFactory, $routeParams) {
    $scope.myPath = $routeParams.userID;


    FirebaseFactory.getPinteretProfile($scope.myPath).then(function(response){
    	console.log("Response: ", response);
    	$scope.userData = response;
    });

    AuthFactory.getUserPhoto()
    .then( function(userPhoto){
    	console.log("PHOTO: ", userPhoto);
    	$scope.userPhoto = userPhoto;
    })
    
});