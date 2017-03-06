// var angular = require('angular');
// require('angular-animate');

angular.module('calendarApp', ['ui.calendar', 'angular-google-gapi'])
	.controller('calCtrl', function($scope, $window, gapiService, uiCalendarConfig){
		window.uiCalendarConfig = uiCalendarConfig;

		$scope.eventSources = [
			// {
			// 	googleCalendarId: 'primary',
			// 	color: 'red',
			// 	textColor: 'black'
			// },
			{
				events: [],
				color: 'yellow',
				textColor: 'black'
			}
		];

		var events = $window.events = $scope.eventSources[0].events;
		var onLoaded = function() {
			// load $scope.eventSources up
			gapi.client.calendar.events.list({calendarId:'primary'}).then(function(r){
			    r.result.items.forEach(function(entry) {
					var url = entry.htmlLink || null;

					// // make the URLs for each event show times in the correct timezone
					// if (timezoneArg && url !== null) {
					// 	url = injectQsComponent(url, 'ctz=' + timezoneArg);
					// }

					events.push({
						id: entry.id,
						title: entry.summary,
						start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
						end: entry.end.dateTime || entry.end.date, // same
						url: url,
						location: entry.location,
						description: entry.description
					});
				});
				$scope.$apply();
			});
		};

		// // Injects a string like "arg=value" into the querystring of a URL
		// function injectQsComponent(url, component) {
		// 	// inject it after the querystring but before the fragment
		// 	return url.replace(/(\?.*?)?(#|$)/, function(whole, qs, hash) {
		// 		return (qs ? qs + '&' : '?') + component + hash;
		// 	});
		// }


		$window.gClientInit = function() {
			gapiService.init(onLoaded)
		};
		// $rootScope.gdata = GData;

  //       // var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

  //       // GApi.load('myApiName','v1',BASE);
  //       // GApi.client.setApiKey(window.auth.google.apiKey);
  //       GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/)
  //       console.log('clientId: ' + window.auth.google.clientId);
  //       GAuth.setClient(window.auth.google.clientId)
  //       GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar');

  //       // load the auth api so that it doesn't have to be loaded asynchronously
  //       // when the user clicks the 'login' button.
  //       // That would lead to popup blockers blocking the auth window
  //       // GAuth.load();

  //       // or just call checkAuth, which in turn does load the oauth api.
  //       // if you do that, GAuth.load(); is unnecessary
  //       GAuth.checkAuth().then(
  //           function (user) {
  //               console.log(user.name + ' is logged in');
  //               // $state.go('webapp.home'); // an example of action if it's possible to
  //                                       // authenticate user at startup of the application
  //           },
  //           function() {
  //           	console.log('login failed');
  //               // $state.go('login'); // an example of action if it's impossible to
  //                                 // authenticate user at startup of the application
  //           }
  //       );
	})
	.service('gapiService', function(){
		this.init = function(callback) {
			gapi.client.init(window.auth.google).then(function() {
				if (gapi.auth2.getAuthInstance().isSignedIn.get()) handleAuthResult(true);
            	else gapi.auth2.getAuthInstance().signIn().then(handleAuthResult);
			});

			function handleAuthResult(result) {
	            gapi.client.load('calendar', 'v3').then(callback);
            }
		}
	})
