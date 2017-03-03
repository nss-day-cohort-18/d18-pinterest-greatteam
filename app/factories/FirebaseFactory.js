"use strict";

app.factory("FirebaseFactory", function($q, $http, AuthFactory, FBCreds){

	var USERS_LOCATION = 'https://pinteret-project.firebaseio.com/users';

	/****************************/
	/****** BOARD FUNCTIONS *****/
	/****************************/

	// Retrieves all boards (for the logged in user)
	let getUserBoards = () => {
		let boards = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
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

	// Creates a new board in Firebase/boards
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
	// Deletes a board from Firebase/boards
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

	// Get all pins for the logged in user
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

	// Get ALL pins (regardless of user that is logged in)
	let getAllPins = () => {
		let allPins = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json`)
			.then((pinObject) => {
				let pinCollection = pinObject.data;
				Object.keys(pinCollection).forEach((key) => {
					pinCollection[key].id = key;
					allPins.push(pinCollection[key]);
				});
				resolve(allPins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	// Creates new pin in Firebase/pins
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

  //  Edits Pin in Firebase
	let editPin = (pinId, editedPin) =>{
		return $q((resolve)=>{
			$http.patch(`${FBCreds.databaseURL}/pins/${pinId}.json`,
				angular.toJson(editedPin))
			.then((response)=>{
				resolve(response);
			});
		});
	};


	// Deletes one pin from Firebase/pins

	let deletePin = function(pinId){
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/pins/${pinId}.json`)
			.then((objectFromFirebase) => {
				resolve(objectFromFirebase);
			});
		});
	}

	// Gets a single board's pins
	let getBoardPins = (boardID) => {
		let pinCollection;

		AuthFactory.isAuthenticated()
		.then( function(userAuthenticated){
			console.log("User Authenticated: ", userAuthenticated);
		})
		.catch( function(userNotAuthenticated){
			console.log("NOT: ", userNotAuthenticated);
		});

		return $q((resolve, reject) => {
			console.log("URL: ", `${FBCreds.databaseURL}/pins/${boardID}`);
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardID}"`)
			.then((pinObject) => {
				let boards = [];
				let user = AuthFactory.getUser();
				getUserBoards(user)
				.then( function(userBoards){
					boards = userBoards;


					pinCollection = pinObject.data;
					console.log("Collection: ", pinCollection);

					// Get array of values (to iterate through and get values from)
					let pinVals = Object.values(pinCollection);
					let boardVals = Object.values(boards);

					// Get boardID from first object in pin array
					var boardToGetNameFrom = pinVals[0].boardId;

					// If a board's ID matches a pin's boardId, add it as a key/val pair to the object that is resolved
					for(var k = 0; k < boardVals.length; k++){
						if(boardVals[k].id === boardToGetNameFrom){
							pinCollection.boardName = boardVals[k].title;
						}
					}
					resolve(pinCollection);
				});
			})
			.catch((error) => {
				reject(error);
			});
		});


	};

	/*****************************/
	/****** USER FUNCTIONS *******/
	/*****************************/

	// Resolves true/false based on if the user PROFILE exists in our database
	let checkUserExists = function(uid){
		return $q((resolve, reject) => {
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
	// Adds record to database/users.json 
	let createPinteretProfile = function(profile){
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/users.json`, JSON.stringify(profile))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	// Retrieves record from database/users.json 
	let getPinteretProfile = function(userId){
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.then((userObject) => {
				resolve(userObject.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}





	return {editPin, getBoardPins, getPinteretProfile, createPinteretProfile, getUserBoards, getAllPins, getUserPins, createNewPin, createNewBoard, deletePin, deleteBoard, checkUserExists};

});


