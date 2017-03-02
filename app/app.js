"use strict";

var app = angular.module("PinterestApp", ["ngRoute"]);


app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'app/login/login.html'
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

