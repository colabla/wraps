'use strict';

angular.module('wrapApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])


.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

		var ref = new Firebase('https://wraps.firebaseio.com/contacts');

		$scope.contacts = $firebaseArray(ref);
		
		$scope.addFormSubmit = function() {
			console.log('adding contact...');
		}

}]);