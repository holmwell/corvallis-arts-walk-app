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
    summary: "Group show.  Installation and photography from Shar Fagersten, surrealist Cyrus Peery, mathematic art from Jeremy Smith, pop works from Tim Blackburn, metallurgic pieces from Tony Fisher, and more. Treats too.",
    description: "Ranging from an examination of marriage and society to surrealism and pop, this group show brings together many walks of life and, mixed material.  Installation and photography from Shar Fagersten,  surrealist painting and sculpture by Cyrus Peery, mathematic flat pieces and origami from Jeremy Smith, urban pop stencil and spray paint by Tim Blackburn, metallurgic landscape pieces from Tony Fisher, and more. Treats too.",
    photoUrl: 'img/advocate.jpg'
  }, {
    id: 1,
    name: 'Art in the Valley',
    address: '209 SW 2nd St',
    geocode: {
      lat: 44.5628093,
      lng: -123.2603014
    },
    summary: '“Paint Out” by Cherrill Boissinou at Art in the Valley @ 209 SW 2nd St. features acrylic and pastel paintings.  Refreshments and surprises abound.',
    description: "\“Paint Out\” by Cherrill Boissonou is featured at Art in the Valley @ 209 SW 2nd St. during September.  Cherrill combines traveling with painting.  She is known for her pastels and acrylics. Her landscapes, which she renders on site, and animals that she creates using photos for reference, make a diverse and exciting show.  Refreshments will be served from 4-8 PM.",
  }, {
    id: 2,
    name: 'ArtWorks (CEI) Gallery',
    address: '408 SW Monroe Ave Suite 110',
    geocode: {
      lat: 44.564372, 
      lng: -123.262252
    },
    summary: 'colors made in heaven. Roxanna Hendricks. mixed media works',
    description: "colors made in heaven. Roxanna Hendricks. mixed media works. 541-224-6503, ceiworks.org",
    photoUrl: 'img/art-works.jpg'
  }, {
    id: 'azure',
    name: 'Azure Fine Art Gallery',
    address: '341 SW 2nd St',
    geocode: {
      lat: 44.561371, 
      lng: -123.261053
    },
    summary: 'Join us in September and explore the boundless exploration of the universe with Stacy Spangler\’s collage, where dreams find their way into the waking world.  Then follow us into the ocean depths in Rinee Merritt\’s glass coral in the birdcage.',
    photoUrl: 'img/azure.jpg'
  }, {
    id: 3,
    name: 'Kaleidoscope Studios',
    address: '341 SW 2nd St, Suite 2',
    geocode: {
      lat: 44.561258, 
      lng: -123.261147
    },
    summary: 'Copper Autumn. Copper is our September focus and our featured jewelry artist is Jeanmarie Denning of Blessing Stones. Her Fall designs incorporate stone & organic elements.',
    description: 'Copper Autumn\n\nWe are ready for Autumn!  For the September Art Walk and beyond, we will highlight warm, earthy copper and jewelry in Autumn organic colors.  Our featured local jewelry artist is Jeanmarie Denning of Blessing Stones. Her Fall designs incorporate stone and organic elements, often complemented with copper or antique brass.\n\nFall favorite snacks, *free* bracelet project and a copper component sale round out the evening!',
    photoUrl: 'img/kaleidoscope.jpg' 
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
    summary: '\"Safe Places to Fall\" will host paintings of Willamette Valley by artists Margret Hay and William Shumway and several other local image makers.\n\nMixed media pieces by artists Jim Noel, Bill Shumway and Jennifer Bennett will be on display along with metal sculptures by Raymond Hunter',
    photoUrl: 'img/pegasus.jpg'
  },{
    id: 'studio262',
    name: 'Studio262',
    address: '425 SW Madison Ave, Suite H-1',
    geocode: {
      lat: 44.563996, 
      lng: -123.262440
    },
    summary: 'Jennifer Lommers & Carrie Tasman unveil their new Collaborative Paintings. Artists reception, 4-8pm. Meet the artists and see this exciting new project. ',
    description: "Botanical Abstracts: Collaborative Works by Carrie Tasman & Jennifer Lommers\n\nPlease join us for our artist reception, 4-8pm, where Carrie & Jennifer will unveil their latest project, creating paintings together. Enjoy their attention to color and design as their styles overlap in new and exciting ways.",
    photoUrl: 'img/studio262.jpg'
  },{
    id: 'studio-beatrice',
    name: 'Studio Beatrice',
    address: '230 NW 6th St',
    geocode: {
      lat: 44.566827,
      lng: -123.263545
    },
    summary: 'Studio Beatrice hosts “Injeanious Silks” hand painted silk wall hangings and scarves by Jean Lawrence.  Refreshments, Music.',
    description: "\“Injeanious Silks\”, the September feature show at Studio Beatrice features Jean Lawrence presenting arange of hand painted silk wall hangings and scarves.  Vibrant colors and diverse motifs embellish precious silk fabric.  Refreshments and guitar music by Marshall Adams and add to the festivities at 230 NW 6th Street from 4-8 PM. "
  },{
    id: 'arts-center',
    name: 'The Arts Center',
    address: '700 SW Madison Ave',
    geocode: {
      lat: 44.5643109,
      lng: -123.266023
    },
    summary: 'The Arts Center features Contemporary Art Quilts by Bonnie Bucknam and Linda McLaughlin, as part of Quilt County.',
    description: "The Arts Center features Contemporary Art Quilts by Bonnie Bucknam and Linda McLaughlin, as part of Quilt County.\n\nBucknam’s quilts are abstract interpretation of landscape and trees; McLaughlin concentrates in the meditative power of the circle."
  }, {
    id: 'majestic',
    name: 'Majestic Theatre',
    address: '115 SW 2nd St',
    hours: '4-7 p.m.',
    geocode: {
      lat: 44.563638, 
      lng: -123.259978
    },
    summary: "LOLZ: Instances of Humor in Art, a themed community art show! LOLZ celebrates the relationship of comedy and creativity – highlighting how local artists incorporate humor in visual art.",
    description: "LOLZ: Instances of Humor in Art is the first of a series of themed community art shows slated for the Majestic Theatre in the coming year. Our objective is to celebrate and explore the relationship when comic meets creativity, and highlight the unique viewpoints of our local artists and how they choose to incorporate humor in visual art. Whether it’s exuberant, smile-inducing slapstick comic strips or bold and snarky insults shouted by Shakespeare’s tragic heroes, there’s no question of the importance of the presence of comedy in art throughout the ages, reminding us of the absurdity of sanity and that if all else fails, laughter is the best medicine.",
    photoUrl: 'img/majestic.jpg'
  }, {
    id: 'fairbanks',
    name: 'Fairbanks Art Gallery',
    address: '220 SW 26th St',
    hours: '4-7 p.m.',
    geocode: {
      lat: 44.5648582,
      lng: -123.2804139
    },
    summary: "This exhibit has a broad diversity of approaches to the making of art, with faculty working in photography, painting, drawing, mixed media, printmaking and video."
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
