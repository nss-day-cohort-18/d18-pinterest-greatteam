"use strict";

app.controller('profileCtrl', function ($scope, FirebaseFactory, AuthFactory) {
    
    $scope.user = AuthFactory.getUser();
    $scope.userData = FirebaseFactory.getUserData(user);

    
});