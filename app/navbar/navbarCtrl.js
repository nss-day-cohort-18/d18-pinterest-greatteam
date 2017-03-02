app.controller('navbarCtrl', function($scope, FirebaseFactory, AuthFactory, $location, $window){
		//initialize navbar
		$scope.account = { email: '', password: '' };
		$scope.isLoggedIn = false;

		$scope.loginGoogle = function() {
            console.log("you clicked login with Google");
            AuthFactory.authWithProvider()
            .then(function(result) {
                var user = result.user.uid;
                console.log("user =", user);
                var displayName = result.user.displayName;
                console.log("DisplayName = ", result.user.displayName);
                FirebaseFactory.checkUserExists(user).then(function(result){
                	boolean = result;
                    if (boolean) {
                    console.log("it is true");
                    $scope.isLoggedIn = true;
                    $location.path("/profile");
                } else {
                    console.log("it is false");
                    $scope.profile = {
                        name: displayName,
                        uid: user
                    };
                    $('#createUser').modal('show')
                }   
                })
                          
              }).catch(function(error) {
                // Handle the Errors.
                console.log("error with google login", error);
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
        };

        $scope.createUser = function(profile){
        	console.log("profile info = ", profile)
        }

		$scope.loginUser = function() {
			console.log("you clicked login");
	    	AuthFactory
		    .loginUser($scope.account)
		    .then((result) => {
		    	var user = result.uid;
                console.log("user =", user);
                FirebaseFactory.checkUserExists(user).then(function(result){
                    boolean = result;
                    if (boolean) {
                        console.log("it is true");
                        $scope.isLoggedIn = true;
                        $location.path("/profile");
                    } else {
                        console.log("it is false");
                        $scope.profile = {
                            uid: user
                        };
                        $('#createUser').modal('show');
                    }  
                })
		    })
		};

		$scope.logoutUser = function() {
			console.log("logout clicked");
			AuthFactory.logoutUser()
			.then(function(data){
				$window.location.url = "#!/login";
				$scope.isLoggedIn = false;
			});
		};

		$scope.register = () => {
	    	console.log("you clicked register");
		    AuthFactory.createUser({
		      email: $scope.account.email,
		      password: $scope.account.password
		    })
		    .then( (userData) => {
		      console.log("UserCtrl newUser:", userData );
		      $scope.loginUser();
		    }, (error) => {
		        console.log("Error creating user:", error);
		    });
	  	};
	});
