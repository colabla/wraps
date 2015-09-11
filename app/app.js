'use strict';

// Declare app level module which depends on views, and components
angular.module('wrapApp', [
  'ngRoute',
  'angularPayments',
  'mm.foundation', 
  'ngAnimate', 
  'angularSpinner',
  'firebase',
  'wrapApp.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});

    //Initialize Stripe
		//window.Stripe.setPublishableKey('PUBLISH_KEY');
	
}]);
