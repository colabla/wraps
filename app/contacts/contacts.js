'use strict';

angular.module('wrapApp.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//CONTACT CONTROLLER
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

		
		var ref = new Firebase('https://wraps.firebaseio.com/contacts');

    //GET CONTACTS
		$scope.contacts = $firebaseArray(ref);
 		
 		//SUBMIT CONTACT
		$scope.addFormSubmit = function() {
			console.log('adding contact...');

				//ASSIGN VALUES
				if($scope.name){ var name = $scope.name } else { var name = null; }
				if($scope.email){ var email = $scope.email } else { var name = null; }

				//BUILD OBJECT 
				$scope.contacts.$add({
					name: name,
					email: email

				}).then(function(ref) {
						var id = ref.key();
						console.log('Added Contact with ID: '+id);

						//Clear the form 
						clearFields();

						//Send Message 
						$scope.msg = "Contact Added";
				});


		}

		// Clear $scope Fields
	function clearFields(){
		console.log('Clearing All Fields...');

		$scope.name = '';
		$scope.email = '';
		
	}

}]);