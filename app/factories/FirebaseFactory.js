"use strict";

app.factory("FirebaseFactory", function($q, $http, AuthFactory, FBCreds){

	var USERS_LOCATION = 'https://pinteret-project.firebaseio.com/users';

	/****************************/
	/****** BOARD FUNCTIONS *****/
	/****************************/
	let getUserBoards = () => {
		let boards = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			// $http.get(`${FBCreds.databaseURL}/boards.json`)
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
			.then((boardObject) => {
				let boardCollection = boardObject.data;
				Object.keys(boardCollection).forEach((key) => {
					boardCollection[key].id = key;
					boards.push(boardCollection[key]);
				});
				console.log("Boards: ", boards);
				resolve(boards);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let createNewBoard = function(newBoard){
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/boards.json`, JSON.stringify(newBoard))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			}).catch((error) => {
				reject(error);
			});
		});

	};

	let deleteBoard = function(boardId){
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/boards/${boardId}.json`)
			.then((objectFromFirebase) => {
				resolve(objectFromFirebase);
			});
		});

	};







	/****************************/
	/****** PIN FUNCTIONS *******/
	/****************************/

	let getUserPins = () => {
		let pins = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			// $http.get(`${FBCreds.databaseURL}/pins.json`)
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${user}"`)
			.then((pinObject) => {
				let pinCollection = pinObject.data;
				Object.keys(pinCollection).forEach((key) => {
					pinCollection[key].id = key;
					pins.push(pinCollection[key]);
				});
				console.log("Pins: ", pins);
				resolve(pins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getAllPins = () => {
		let allPins = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json`)
			//$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${user}"`)
			.then((pinObject) => {
				let pinCollection = pinObject.data;
				Object.keys(pinCollection).forEach((key) => {
					pinCollection[key].id = key;
					allPins.push(pinCollection[key]);
				});
				console.log("AllPins: ", allPins);
				resolve(allPins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let createNewPin = (newPin) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/pins.json`, JSON.stringify(newPin))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let deletePin = function(pinId){
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/pins/${pinId}.json`)
			.then((objectFromFirebase) => {
				resolve(objectFromFirebase);
			});
		});
	}

	/*****************************/
	/****** USER FUNCTIONS *******/
	/*****************************/

	let checkUserExists = function(uid){
		return $q((resolve, reject) => {
			// $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`);
			console.log("URL: ", FBCreds.databaseURL + "/users.json");
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`)
			.then( (userObject) => {

				console.log("UserObject: ", userObject);

				var userObjLength = Object.keys(userObject.data).length;

				if(userObjLength === 1){
					resolve(true);
				}
				resolve(false);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}



	return {getUserBoards, getAllPins, getUserPins, createNewPin, createNewBoard, deletePin, deleteBoard, checkUserExists};

});

