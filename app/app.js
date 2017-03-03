"use strict";

var app = angular.module("PinterestApp", ["ngRoute"]);


let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'app/login/login.html'
    }).
    when('/:userID/boards', {
        templateUrl: 'app/myBoards/boards.html',
        controller: "BoardCtrl",
        resolve: {isAuth}
    }).
    when('/:userID/pins', {
        templateUrl: 'app/myPins/pins.html',
        controller: "pinCtrl",
        resolve: {isAuth}
    }).
    when('/explore', {
        templateUrl: 'app/explore/explore.html',
        controller: "exploreCtrl"
    }).
    when('/:userID', {
        templateUrl: 'app/profile/profile.html',
        controller: "profileCtrl",
        resolve: {isAuth}
    }).
    when('/boards/:boardID', {
        templateUrl: "app/singleBoardView/singleBoard.html",
        controller: "SingleBoardCtrl",
        resolve: {isAuth}
    }).
    otherwise('/');
});



app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);

});

