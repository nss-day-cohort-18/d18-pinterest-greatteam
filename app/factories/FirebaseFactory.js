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

	let getBoardPins = (boardID) => {
		
		let pins = [];

let pinCollection;


		// $Q request for all boards
			// BoardsToEventuallyExtractNamesFrom = response.data;


		return $q((resolve, reject) => {
			console.log("URL: ", `${FBCreds.databaseURL}/pins/${boardID}`);
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardID}"`)
			.then((pinObject) => {
				let boards = [];
				let user = AuthFactory.getUser();
				console.log(")))))))) USER: ", user);
				getUserBoards(user)
				.then( function(userBoards){
					console.log("USER_BOARDS: ", userBoards);
					boards = userBoards;


					pinCollection = pinObject.data;
					console.log("Collection: ", pinCollection);

					console.log("BOARDS: ", boards);

					// Get array of values fro mpinCollection
					let pinVals = Object.values(pinCollection);

					// Loop through pins and boards to get the board name 
					for(var i = 0; i < pinVals.length; i++){
						var tempPin = pinVals[i];
						for(var j = 0; j < boards.length; j++){
							if(tempPin.boardId === boards[j].id){
								// Adds a key/val (name of board) pair to the object that is eventually resolved
								pinCollection.boardName = boards[j].title;
								console.log("OBJECT TO GIVE KEY/VAL TO: ", pinCollection.boardName);
							}else{

							}
						}
					}

					console.log("PinCollection: ", pinCollection);
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





	return {getBoardPins, getPinteretProfile, createPinteretProfile, getUserBoards, getAllPins, getUserPins, createNewPin, createNewBoard, deletePin, deleteBoard, checkUserExists};

});


