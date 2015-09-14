# wraps

Set your ENV Variables, and then...

npm install && ruby app.rb

<hr>

### Description

This <a href="https://wraps.firebaseapp.com/#/contacts" title="MyApp" target="_blank">app</a> is deployed on <a href="https://www.firebase.com/" target="_blank" title="Firebase Website">Firebase.</a> <strong>Firebase is a cloud-based db system.</strong> This app is the base structure for a single page app that will take in user info and order details. It also comes bundled with the stripe api which will process orders and credit-card info. Best to leave the sensitive handling of payment processing to the pros rather than try and hand-roll it myself. 

This app will eventually evolve to handle the subscription of and order process of a company called <a href="https://wraps.cratejoy.com/" target="_blank">wraps</a> which is currently using cratejoy as there test site. (See Adam's <a href="https://github.com/colabla/colab-dev-guides/wiki/Wraps">cratejoy</a> mark down) This app aims to handle all views without loading another page. Using angular on the front-end there are a lot of neat tricks through the power of angular directives that allow things to be hidden and animated and stripe's payment modal pops-up overlaying the entire page when the user is ready to checkout. 

### Software Used 
* [angular-seed](https://github.com/angular/angular-seed) (angular version 1.4)
* firebase (cloud-based db)
* zurb - foundation (css library similar to twitter bootstrap)
* [ng-stripe-tutorial](https://github.com/airpair/ng-stripe-tutorial)
* [sinatra-stars-and-stripes](https://github.com/itsakap/sinatra-stars-and-stripes)

### Setup
1. Setup an account at <a href="https://www.firebase.com/" target="_blank" title="Firebase Website">Firebase.</a>
2. Create an app from the dashboard. Then click manage app. You will need the url of this db later to sync the app with the db.
3. Download the zip file from [angular-seed](https://github.com/angular/angular-seed) extract all the files from the directory and put them in a new directory that you created. 

<strong>Configure the angular seed app</strong>
* Open directory in your text editor and in file ```package.json``` insert ```"firebase": "*"``` inside devDependencies bracket. and add ```<script src="bower_components/firebase/firebase.js"></script>``` at the bottom of index.html below the angular script tags. To run firebase with angular you will also need to run ```bower install angularfire --save```. In order to use some cool animating effects we will need ngAnimate run ```bower install angular-animate --save```.
* cd into the app directory from terminal run ```sudo npm install``` then type ```npm start``` and go to localhost:8000
* Install Foundation run ```bower install foundation --save```. and put this link at the top of the index.html page ```<link rel="stylesheet" href="bower_components/foundation/css/foundation.css">```
* Open file ```app.js``` and change to the default app name after ```angular.module``` to customize your app in my case I changed it to wrapApp. This instance will be called in the index.html and in view controller change the default app name in those files as well. Delete version, view1, and view2 but leave ngRoute. Change the route name below to ```'/contacts'```. As the point is to save contact info.
* In the directory delete the ```view2``` folder. And change the ```view1``` folder to contacts. Now inside the contacts folder change all files accordingly ```contacts.js contacts.html and contacts_test.js```. 
* In the ```index.html``` we want to link the modules we installed above. Copy in paste this block of script links over the existing one in index.html.

```js
 <script src="bower_components/angular/angular.js"></script>
 <script src="bower_components/angular-route/angular-route.js"></script>
 <script src="bower_components/angular-animate/angular-animate.js"></script>
 <script src="bower_components/firebase/firebase.js"></script>
 <script src="bower_components/angularfire/dist/angularfire.js"></script>
 <script src="bower_components/foundation/js/foundation.js"></script>
``` 

* Create a container in ```index.html``` above the script links inside the body with a title of your app.

```
<div class="container">
    <div class="row">
      <div class="large-12 columns">  <!-- FOUNDATION CLASS -->
        <h1>Wraps</h1> <!-- header title -->
        <hr>
      </div>
    </div> <!-- END ROW -->
  <div ng-view></div>
</div> <!-- END CONTAINER -->
```
* Notice the ng-view is placed inside the container below the row. The angular-seed directory places ```ng-view``` by it-self make sure you only have one ```ng-view``` in your index or it will duplicate the view. Also delete the line about angular version. It is not needed for this app. At top of the index.html delete the links to html5boilerplate, normalize.css, and modernizer. They are not needed for this app. 
* Add this script link tag ```<script src="bower_components/jquery/dist/jquery.js"></script>``` above the body but below the ```app.css``` link tag.
* Go to ```localhost:8000/#!/contacts``` and you should see the title with a horizontal line at the top of the page.

<strong>Configure The Contacts Controller</strong> 

* Open ```app.js``` and below ```ngRoute``` declare the firebase object, ngAnimate, and the contacts module.

```js

angular.module('wrapApp', [
  'ngRoute',
  'ngAnimate', 
  'firebase',
  'wrapApp.contacts'
]).

```

* Inject firebase into the controller and add $scope as we will need access to the scope. consolog.log the scope to test if the controller is connected properly. If not try to restart the server and check your console for a connection to the controller. 

```js
angular.module('wrapApp.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//CONTACT CONTROLLER
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
          console.log($scope);
}]);
```
* Put this in the ```contacts.html``` to add the name and email inputs to obtain from a contact.

```
<div class="row" ng-controller="ContactsCtrl">
	<div class="large-10 columns"> <!-- FOUNDATION CLASS -->
			<!-- ADD CONTACT -->
			
		<form>
		  		<h3>Add Contact</h3>
		  		<!-- Add Form -->
		  		<div class="row">
				    <div class="large-6 columns">
				      <label>Name:
				        <input type="text" ng-model="name" placeholder="Contact Name" required />
				      </label>
				    </div>
				    <div class="large-6 columns">
				      <label>Email:
				        <input type="text" ng-model="email" placeholder="Contact Email" required />
				      </label>
				    </div>
				 </div>
				 <div class="row">
				    <div class="large-12 columns">
				        <input type="submit" value="Sign Up" class="button" />
				    </div>
				 </div>
		</form>
	</div>
</div>

```

* Let's connect to that firebase db created earlier by adding this code to the controller below ```console.log($scope);```. Copy the url from the db that was created homepage and use it in this code.

```js
	var ref = new Firebase('https://nameofappdb.firebaseio.com/contacts'); //USE DB URL IN THIS LINE with/contacts added for collection.       

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
```

* This code above will clear all the inputs fields after it submits and output a message which can be dynamically displayed in the view. You will alter contacts.html like so by adding an alert box div with double curlies calling the msg from ```contacts.js``` and add the ng-submit directive to call the addFormSubmit function. Now when submit successful a nice message should appear up top and the input fields should clear. Also check the firebase db to see the info stored inside the named attributes from the form. 

```

	<div data-alert ng-show="msg" class="alert-box">{{msg}}</div>
		<form ng-submit="addFormSubmit()">


```

##Part 2 (Adding in Stripe api tutorial plus Adam's Sinatra code) ...