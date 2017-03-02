"use strict";

app.controller('profileCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    
    $scope.user = AuthFactory.getUser();
    FirebaseFactory.getPinteretProfile(user).then(function(response){
    	$scope.userData = response;
    })

    
});