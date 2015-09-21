angular.module('starter.services', [])
.factory('Location', function ($interval, $ionicLoading) {

  var scope = undefined;
  var positionMarker = undefined;

  function showMyPosition (map, showLoading) {
    if (showLoading) {
      scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });      
    }


    navigator.geolocation.getCurrentPosition(function (pos) {
      var myPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); 
      
      var starImage = {
        url: 'img/ionic/ios7-star-small.png',
        // This marker is 32 pixels square.
        size: new google.maps.Size(32, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the center of the star.
        anchor: new google.maps.Point(16, 16)
      };

      // Remove the previous marker from the map
      var lastPosition;
      if (positionMarker) {
        lastPosition = positionMarker;
      }

      // Place a marker where we're at
      positionMarker = new google.maps.Marker({
        clickable: false,
        icon: starImage,
        shadow: null,
        zIndex: 999,
        title: "You are here",
        map: map,
        position: myPosition
      });

      if (showLoading) {
        $ionicLoading.hide();
      }

      if (lastPosition) {
        lastPosition.setMap(null);
      }

    }, function (error) {
      // Don't care
      console.log('Unable to get location: ' + error.message);
      if (showLoading) {
        $ionicLoading.hide();
      }
    });
  };  

  var promise = undefined;

  return {
    setScope: function (s) {
      scope = s;
    },
    startShowing: function (map) {
      showMyPosition(map, true);

      if (promise) {
        $interval.cancel(promise);
        promise = undefined;
      }

      var threeSeconds = 3000;
      promise = $interval(function () {
        showMyPosition(map, false);
      }, threeSeconds);
    },
    stopShowing: function () {
      $interval.cancel(promise);
    }
  }
})

.factory('Destinations', ['$http', function ($http) {
  // Might use a resource here that returns a JSON array

  var configUrl = "https://raw.githubusercontent.com/holmwell/corvallis-arts-walk-assets/master/config.json";
  var promise = $http.get(configUrl);
  var destinations = [];

  promise.success(function (config) { 
    destinations = config.destinations;

    for (var index in destinations) {
      if (destinations[index].photoUrl) {
        destinations[index].photoUrl = config.assetsUrl + destinations[index].photoUrl;
      }
    }
  });

  return {
    all: function (callback) {
      promise.success(function () {
        if (callback) {
          callback(destinations);
        }
      });
    },
    remove: function (destination) {
      destinations.splice(destinations.indexOf(destination), 1);
    },
    get: function(destinationId, callback) {
      promise.success(function () {
        if (callback) {
          for (var i = 0; i < destinations.length; i++) {
            if (destinations[i].id.toString() === destinationId) {
              return callback(destinations[i]);
            }
          }
          return callback();
        }
      });
    }
  };
}]);
