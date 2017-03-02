"use strict";

var app = angular.module("PinterestApp", ["ngRoute"]);


app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'app/login/login.html'
    }).
    when('/:userID/boards', {
        templateUrl: 'app/myBoards/boards.html'
    }).
    when('/:userID/pins', {
        templateUrl: 'app/myPins/pins.html'
    }).
    when('/explore', {
    templateUrl: 'app/explore/explore.html'
    }).
    when('/:userID', {
    templateUrl: 'app/profile/profile.html'
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