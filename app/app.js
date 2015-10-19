'use strict';

// Declare app level module which depends on views, and components
angular.module('wrapApp', [
  'ui.router',
  'angularPayments',
  'mm.foundation', 
  'ngAnimate', 
  'angularSpinner',
  'firebase'
  
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.plan', {
            url: '/plan',
            templateUrl: 'form-plan.html'
        })
        
        // url will be /form/size
        .state('form.size', {
            url: '/size',
            templateUrl: 'form-size.html'
        })
        
        // url will be /form/length
        .state('form.length', {
            url: '/length',
            templateUrl: 'form-length.html'
        })
         // url will be /form/thankyou 
        .state('form.thankyou', {
            url: '/thankyou',
            templateUrl: 'form-thankyou.html'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/plan');
}])

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };
    
});
//   //Initialize Stripe
//   window.Stripe.setPublishableKey('PUBLISHABLE_KEY');

//   $routeProvider.otherwise({redirectTo: '/contacts'});

    
	
// }]).
// controller('wrapApp', function($scope) {
//     // Stripe Response Handler
//     $scope.stripeCallback = function (code, result) {
//       if (result.error) {
//         window.alert('it failed! error: ' + result.error.message);
//       } else {
//         window.alert('success! token: ' + result.id);
//       }
//     };
// });