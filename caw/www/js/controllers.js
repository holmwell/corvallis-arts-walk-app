angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListCtrl', function($scope, Destinations) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.destinations = Destinations.all().sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  $scope.remove = function(dest) {
    Destinations.remove(dest);
  };

})

.controller('DestDetailCtrl', function($scope, $stateParams, $ionicLoading, Destinations) {
  $scope.dest = Destinations.get($stateParams.destinationId);
  var destination = $scope.dest;

  $scope.mapCreated = function (map) {
    $scope.map = map;

    // Center on the destination's position.
    var myLatlng = new google.maps.LatLng(
      destination.geocode.lat,
      destination.geocode.lng);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });

    map.setCenter(myLatlng);
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    var map = $scope.map;

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      var myPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); 
      map.setCenter(myPosition);

      // Place a marker where we're at
      var myPosMarker = new google.maps.Marker({
        position: myPosition,
        map: map
      });

      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})

.controller('MapCtrl', function ($scope, Destinations) {
  $scope.mapCreated = function(map) {
    $scope.map = map;

    var monroeAnd4th = new google.maps.LatLng(44.564639,-123.262014);

    var destinations = Destinations.all();
    var openWindow = undefined;

    for (var id in destinations) {
      var closure = function () {
        var dest = destinations[id];

        var position = new google.maps.LatLng(
          dest.geocode.lat,
          dest.geocode.lng);

        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: dest.name
        });

        var contentString = '<div id="content">'+
        '<h4 id="firstHeading" class="firstHeading">' + dest.name + '</h4>'+
        '<div id="bodyContent">'+
        '<pre>' + dest.summary + '</pre>'+
        '<p><a href="#/tab/map/destinations/' + dest.id + '">'+
        'View details</a></p>'+
        '</div>'+
        '</div>';

        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
          if (openWindow) {
            openWindow.close();
          }
          infoWindow.open(map,marker);
          openWindow = infoWindow;
        });        
      }(); // closure
    }

    map.setCenter(monroeAnd4th);
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('TopLevelController', function ($scope, $http) {
  // $http.get("config.json")
  // .success(function (data) {
  //   $scope.GoogleMapsApiKey = data.GoogleMapsApiKey;
  // });
});
