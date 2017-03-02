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
                console.log("DisplayName = ", result.user.displayName)
                if (function(user){
                	return FirebaseFactory.checkUserExists(user);
                }) {
                	$location.path("/profile");
                	$scope.$apply();
                } else {
                	$scope.profile = {
                		uid: user
                	};
                	$('#createUser').modal('show')
                }             
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
        	console.log("profile info = ", $scope.profile, profile)
        }

		$scope.loginUser = function() {
			console.log("you clicked login");
	    	AuthFactory
		    .loginUser($scope.account)
		    .then( (result) => {
		    	var user = result.uid;
                console.log("user =", user);
		        $window.location.href = "#!/";
		        $scope.isLoggedIn = true;
			});
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
