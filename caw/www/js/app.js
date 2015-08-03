// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

// From: http://codereview.stackexchange.com/questions/59678/simple-async-google-maps-initializer-with-angularjs
// Google async initializer needs global function, so we use $window
.factory('googleMaps', function googleMapsFactory ($window, $q) {

    //Google's url for async maps initialization accepting callback function
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?sensor=true&callback=',
        mapsDefer = $q.defer();

    //Callback function - resolving promise after maps successfully loaded
    $window.googleMapsInitialized = mapsDefer.resolve; // removed ()

    //Async loader
    var asyncLoad = function(asyncUrl, callbackName) {
      var script = document.createElement('script');
      //script.type = 'text/javascript';
      script.src = asyncUrl + callbackName;
      document.body.appendChild(script);
    };
    //Start loading google maps
    asyncLoad(asyncUrl, 'googleMapsInitialized');

    //Usage: Initializer.mapsInitialized.then(callback)
    return {
        mapsInitialized : mapsDefer.promise
    };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html',
          controller: 'ListCtrl'
        }
      }
  })

  .state('tab.list-detail', {
    url: '/destinations/:destinationId',
    views: {
      'tab-list': {
        templateUrl: 'templates/dest-detail.html',
        controller: 'DestDetailCtrl'
      }
    }
  })
  
  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.map-detail', {
    url: '/map/destinations/:destinationId',
    views: {
      'tab-map': {
        templateUrl: 'templates/dest-detail.html',
        controller: 'DestDetailCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/list');

});
