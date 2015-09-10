'use strict';

// Declare app level module which depends on views, and components
angular.module('wrapApp', [
  'ngRoute',
  'firebase',
  'wrapApp.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});

    //Initialize Stripe
		window.Stripe.setPublishableKey('PUBLISH_KEY');
	
}]);
