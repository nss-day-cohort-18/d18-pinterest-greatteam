app.controller('navbarCtrl', function($scope, FirebaseFactory, AuthFactory){
		//initialize navbar
		$scope.account = { email: '', password: '' };
		$scope.isLoggedIn = false;

		$scope.loginUser = function() = {
			console.log("you clicked login");
	    	AuthFactory
		    .loginUser($scope.account)
		    .then( () => {
		        $window.location.href = "#!/";
		        $scope.isLoggedIn = true;
			});
		};

		$scope.logoutUser = function() = {
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
		      $scope.login();
		    }, (error) => {
		        console.log("Error creating user:", error);
		    });
	  	};
	};
