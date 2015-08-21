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

.factory('Destinations', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var destinations = [{
    id: 0,
    name: 'The Corvallis Advocate Loft',
    address: '425 SW Madison Ave (upstairs)',
    geocode: {
      lat: 44.563871, 
      lng: -123.262889
    },
    summary: "One of Shar Fagersten's most recent Portland showings offered text and photography depicting ridiculous advice she and her friends sometimes receive, another a photo series and ashes depicting her wedding dress as it burned as a reflection on the stages of her marriage and divorce.  Her work does not settle on being explicit, as one may suspect, she works instead to affect questions and conversations. Open 4 to 8 pm, refreshments as usual at the loft.",
    description: "One of Shar Fagersten's most recent Portland showings offered text and photography depicting ridiculous advice she and her friends sometimes receive, another a photo series and ashes depicting her wedding dress as it burned as a reflection on the stages of her marriage and divorce.  Her work does not settle on being explicit, as one may suspect, she works instead to affect questions and conversations. Open 4 to 8 pm, refreshments as usual at the loft.",
    photoUrl: 'img/advocate.jpg'
  }, {
    id: 1,
    name: 'Art in the Valley',
    address: '209 SW 2nd St',
    geocode: {
      lat: 44.5628093,
      lng: -123.2603014
    },
    summary: '\"Illustrated Clay\" by Marcella Henkels, guest artist. Featuring vivid pictorial raku clay tiles framed in barn wood.  Refreshments. 4-8 PM',
    description: "Art in the Valley is the oldest co-operative artist owned gallery in Corvallis. From time to time we feature an outside guest artist.\n\nThis month, Marcella Henkels will be featured as a guest artist, showing her juicy raku ceramic tiles framed in rustic barn wood.\n\nThere is also a selection of 2D and 3D work, which changes monthly. Refreshments will be served. 4-8 PM",
  }, {
    id: 2,
    name: 'ArtWorks (CEI) Gallery',
    address: '408 SW Monroe Ave Suite 110',
    geocode: {
      lat: 44.564372, 
      lng: -123.262252
    },
    summary: 'Jamie Walsh. \"Dots\".',
    description: "Jamie Walsh. \"Dots\".\n\nJamie Walsh is an artist, activist and program coordinator for OSLP's Arts and Culture Program in Eugene",
    photoUrl: 'img/art-works.jpg'
  }, {
    id: 'azure',
    name: 'Azure Fine Art Gallery',
    address: '341 SW 2nd St',
    geocode: {
      lat: 44.561371, 
      lng: -123.261053
    },
    summary: 'When it rains, Pam Serra-Wenz finds a way to appreciate it with her Oregon Rain Paintings. Each piece has several rains and can take up to three days to dry in between.  Come see them hung away from the wall and see how the natural light reveals their transparency.'
  }, {
    id: 3,
    name: 'Kaleidoscope Studios',
    address: '341 SW 2nd St, Suite 2',
    geocode: {
      lat: 44.561258, 
      lng: -123.261147
    },
    summary: 'For August, we continue our show of vibrant geometrical art by Jeremy Smith & geometrical jewelry. Plus we will have a FREE beading project & a drawing for fun art prizes!',
  }, {
    id: 4,
    name: 'Cyrano\'s',
    address: '361 SW 2nd St', 
    geocode: {
      lat: 44.561122, 
      lng: -123.260822
    },
    summary: 'Susan Stogsdill has been revisiting the past with childhood books, turning them into journals.  Come see if your favorite book might be among the stacks!',
  }, {
    id: 5,
    name: 'Brittney West',
    address: '340 SW 2nd St., Studio #3 (Above Corvallis Cyclery)',
    geocode: {
      lat: 44.561378, 
      lng: -123.261429
    },
    summary: 'Come see thought-provoking activist art promoting a more compassionate coexistence, browse through older work and Eco-Prints for sale!',
    description: "Come view over a decade of Brittney West's oil paintings and mixed-media drawings as well as view her recent activist artwork, exhibiting thought-provoking imagery intended to create a more compassionate coexistence. Enjoy snacks and wine in her ambient studio, pick at the artist's brain and snoop around. All are welcome!",
    photoUrl: 'img/brittney-west.jpg'
  }, {
    id: 'pegasus',
    name: 'Pegasus & Old World Deli',
    address: '341 SW 2nd St',
    geocode: {
      lat: 44.561185, // pegasus
      lng: -123.261147
    },
    summary: 'A sampling of art from the 37 local artists who comprise the Philomath Open Studio Tour.  This exhibit includes Ceramics, Jewelry, Fiber, Glass, Painting, Photography, and Encaustics.  The artists reception during the walk is a rare opportunity to find the artists of POST in a single place at the same time.',
    description: "Held in October, the Philomath Open Studio Tour (POST) is an annual event where local artists open up their studio space and process to viewing by the public.  This exhibit offers an opportunity to see a sampling of art from all the artists on display in a single space allowing you to identify favorites and plan your tour of POST 2015.  Exhibited mediums include Ceramics, Jewelry, Fiber, Glass, Painting, Photography, and Encaustics.\n\nThe artists reception that will be held during the August CAW is a rare chance to find all these great artists together at once.  Prepare for an art party! ",
    photoUrl: 'img/pegasus.jpg'
  },{
    id: 'studio262',
    name: 'Studio262',
    address: '425 SW Madison Ave, Suite H-1',
    geocode: {
      lat: 44.563996, 
      lng: -123.262440
    },
    summary: 'Featured Artist Series: Ginny Gibson. Artist reception for beloved local clay artist, Ginny Gibson. Meet the artist to learn about her process and inspiration.',
    description: "Featured Artist Series: Ginny Gibson\n\nPlease join us for our artist reception for beloved local clay artist, Ginny Gibson. Highlighted in her most recent figurative and landscape pieces, Ginny brings a unique combination of depth and whimsy to her work. Meet Ginny and learn more about her process and inspiration while enjoying a tasty treat.",
    photoUrl: 'img/studio262.jpg'
  },{
    id: 'studio-beatrice',
    name: 'Studio Beatrice',
    address: '230 NW 6th St',
    geocode: {
      lat: 44.566827,
      lng: -123.263545
    },
    summary: 'Guest artist Russell McCrackin shows his art from across the USA, east coast to west.  Enjoy the reception with complimentary music and refreshments.  4-8 PM',
    description: "Russell McCrackin is featured artist for the month of August.  He is a physics professor emeritus who has also enjoyed working as a blacksmith, hiking, camping, and traveling. He spent 11 winters in Arizona, painting en plein air. He enjoys using a limited palette when he works outdoors in oil. He is presenting scenes from New England, the Northwest and the Southwest.\n\nRefreshments and music will add to the fun.  4-8PM "
  },{
    id: 'arts-center',
    name: 'The Arts Center',
    address: '700 SW Madison Ave',
    geocode: {
      lat: 44.5643109,
      lng: -123.266023
    },
    summary: 'The Arts Center features SUBTEXT, An exploration of Language in the Visual Arts with Pat Boas, Marie Sivak and Robert Tomlinson. Come and play with letters, lettering, your initials or a short phrase in sumi ink and tempera paint.',
    description: "The Arts Center features SUBTEXT, An exploration of Language in the Visual Arts with Portland artists Pat Boas, Marie Sivak and Robert Tomlinson from Independence. They take letters, words, writing as a pictorial element in their work. Does the shape of the word influence the meaning?\n\nCome and play with letters, lettering, your initials or a short phrase in sumi ink and tempera paint. We’ll have ink and paint available for you to create card-size compositions of letter shapes in black and white or color. Simple, yet great for a small memento, a bit of creative time... ",
    photoUrl: 'img/arts-center.jpg'
  }];

  return {
    all: function() {
      return destinations;
    },
    remove: function(destination) {
      destinations.splice(destinations.indexOf(destination), 1);
    },
    get: function(destinationId) {
      for (var i = 0; i < destinations.length; i++) {
        if (destinations[i].id.toString() === destinationId) {
          return destinations[i];
        }
      }
      return null;
    }
  };
});
