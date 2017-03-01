app.controller('navbarCtrl', function($scope, FirebaseFactory, AuthFactory){
		//initialize navbar
		$scope.account = { email: '', password: '' };
		$scope.isLoggedIn = false;

		$scope.login = function() = {
			console.log("you clicked login");
	    	AuthFactory
		    .loginUser($scope.account)
		    .then( () => {
		        $window.location.href = "#!/";
		        $scope.isLoggedIn = true;
			});
		};

		$scope.logout = function() = {
			console.log("logout clicked");
			AuthFactory.logoutUser()
			.then(function(data){
				$window.location.url = "#!/login";
				$scope.isLoggedIn = false;
			});
		};
	};