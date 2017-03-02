"use strict";

app.controller('profileCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    
    let user = AuthFactory.getUser();
    FirebaseFactory.getPinteretProfile(user).then(function(response){
    	console.log("Response: ", response);
    	$scope.userData = response;
    })

    
});