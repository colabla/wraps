'use strict';

//Initialize Stripe
Stripe.setPublishableKey('pk_test_uEjOOvW1SsjL73migaeIdea2');

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
            templateUrl: 'thankyou.html'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/plan');
}])

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $firebaseArray, $http, $modal, $location) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
  
    var ref = new Firebase('https://wraps.firebaseio.com/contacts');

    //GET CONTACTS
    $scope.contacts = $firebaseArray(ref);
    
    //Load products from server
    $http.get('products.json').success(function (response) {
      $scope.products = response.products;
      $scope.sizes = response.sizes;
      $scope.sublengths = response.sublengths;
    });
   
    //Add active class to selection
    $scope.selected = 0;
    $scope.select= function(index) {
         $scope.selected = index; 
      };
    
    var handler = StripeCheckout.configure({
      key: 'pk_test_uEjOOvW1SsjL73migaeIdea2',
      image: 'img/wraps-favi.png',
      locale: 'auto',
      billingAddress: 'true',
      shippingAddress:'true',
      token: function(token, response, email) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
         event.preventDefault();
         console.log(token, response);
         $scope.response = response;
         $scope.token = token;
      
         var $amount = $('<input type=hidden name=amount />').val($scope.formData.plan.price * $scope.formData.subLength.month * 100);
         var $description = $('<input type=hidden name=description />').val($scope.formData.plan.quantity+' wraps '+$scope.formData.size.size+' size '+$scope.formData.subLength.month+' month plan '+$scope.formData.subLength.id);
         var $email = $('<input type=hidden name=email />').val($scope.token.email);
         var $size = $('<input type=hidden name=size />').val($scope.formData.size.size); 
         var $plan = $('<input type=hidden name=plan />').val($scope.formData.plan.quantity);
         var $month = $('<input type=hidden name=month />').val($scope.formData.subLength.month); 
         var $input = $('<input type=hidden name=stripeToken />').val($scope.token.id);
         $("#checkoutForm").append($input).append($amount).append($plan).append($size).append($month).append($email).append($description).submit();
         $location.path('form/thankyou');

         console.log('adding contact...');
         console.log($scope.formData.plan.price * $scope.formData.subLength.month);

          //ASSIGN VALUES
          if($scope.response){ var response = $scope.response } else { var response = null; }
          if($scope.token){ var token = $scope.token } else { var token = null; }
          if($scope.formData){ var formData = $scope.formData } else { var formData = null; }
          
          //BUILD OBJECT 
          $scope.contacts.$add({
            response: response,
            token: token,
            formData: formData
       
          }).then(function(ref) {
              var id = ref.key();
              console.log('Added response with ID: '+id);

               //Clear the form 
              // clearFields();

              //Send Message 
              $scope.msg = "Contact Added";
             
          });
  
      } 

          // Clear $scope Fields
          // function clearFields(){
          //   console.log('Clearing All Fields...');
          //   $scope.formData = '';
          // }

  });



    $scope.checkout = function () {
        // Open Checkout with further options
        handler.open({
        name: 'Wraps',
        description: $scope.formData.plan.quantity+' wraps '+$scope.formData.size.size+' size '+$scope.formData.subLength.month+' month plan',
        amount: ($scope.formData.plan.price * $scope.formData.subLength.month * 100)
      });
    };

    // Close Checkout on page navigation
    $(window).on('popstate', function() {
      handler.close();

    });

});

