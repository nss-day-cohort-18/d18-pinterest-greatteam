"use strict";

app.factory("AuthFactory", function(){

	let currentUser = null;
	let userName = "";

	let createUser = function(userObj){
		return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
			.catch( function(error){
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log("error:", errorCode, errorMessage);
		});
	};

	let loginUser = function(userObj){
		console.log("User: ", userObj);
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
			.catch( function(error){
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log("error:", errorCode, errorMessage);
		});
	};

	let logoutUser = function(){
		console.log("logoutUser");
		return firebase.auth().signOut();
	};


	let isAuthenticated = function (){
		console.log("AuthFactory: isAuthenticated");
		return new Promise ( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if (user){
					console.log("MY USER: ", user);
					console.log("USER PHOTO: ", user.photoURL);
					currentUser = user.uid;
					resolve(true);
				}else {
					resolve(false);
				}
			});
		});
	};

	let getUserPhoto = function(){
		return new Promise ( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if (user){
					console.log("MY USER: ", user);
					console.log("USER PHOTO: ", user.photoURL);
					currentUser = user.uid;
					resolve(user.photoURL);
				}else {
					resolve(false);
				}
			});
		});
	}

	let getUser = function(){
		return currentUser;
	};


	let provider = new firebase.auth.GoogleAuthProvider();

	let authWithProvider= function(){
    	return firebase.auth().signInWithPopup(provider);
  	};

  	let getUserData = function(){

  	};




	return {getUserPhoto, createUser, loginUser, logoutUser, isAuthenticated, getUser, authWithProvider};
});