angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&',
      zoom: '=',
      centerLat: '=',
      centerLng: '='
    },
    link: function ($scope, $element, $attr) {
      function initialize() {

        var zoom = $scope.zoom ? parseInt($scope.zoom) : 17;
        var centerLat = $scope.centerLat || 44.564566;
        var centerLng = $scope.centerLng || -123.262044; 

        var mapOptions = {
          center: new google.maps.LatLng(centerLat, centerLng), 
          zoom: zoom,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'caw_map_style']
          }
        };

        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});