test("Popcorn Google Map Plugin", function () {
  
  var popped = Popcorn("#video"),
      expects = 13, 
      count = 0,
      setupId;
  
  expect(expects);
  
  function plus() {
    if ( ++count===expects) {
      start();
    }
  }
  
  stop();

  ok ('googlemap' in popped, "googlemap is a mehtod of the popped instance");
  plus();
  
  ok ( document.getElementById('map').innerHTML === "", "initially, there is nothing inside the map" );
  plus();
  
  ok ( document.getElementById('map2').innerHTML === "", "initially, there is nothing inside the map2" );
  plus();
  
  ok ( document.getElementById('map3').innerHTML === "", "initially, there is nothing inside the map3" );
  plus();
  
  popped.googlemap({
    start: 0, // seconds
    end: 2, // seconds
    type: 'ROADMAP',
    target: 'map',
    lat: 43.665429,
    lng: -79.403323,
    zoom: 10
  })
  .googlemap({
      start: 0, // seconds
      end: 2, // seconds
      type: 'SATELLITE',
      target: 'map2',
      location:'toronto',
      zoom: 15
  });
  var mapz = popped.googlemap({
    start: 2, // seconds
    end: 4, // seconds
    type: "STREETVIEW",
    target: "map3",
    location: "6th Line, Oakville, Ontario",
    zoom: "1",
    heading: "180",
    pitch: "1",
	  interval: 1000,
	  tween: "York university"
  })
  .volume(0);

  setupId = popped.getLastTrackEventId();

  popped.exec( 1, function() {
    ok(google.maps, "Google maps is available");
    plus();
    ok(google.maps.Geocoder, "Google maps Geocoder is available");
    plus();
    ok (document.getElementById('actualmap1'), "First map is on the page" );
    plus();
    equals (document.getElementById('actualmap1').offsetParent.id, "map", "First map is inside the 'map' div" );
    plus();
  });

  popped.exec( 1, function() {
    ok (document.getElementById('actualmap2'), "Second map is on the page" );
    plus();
    equals (document.getElementById('actualmap2').offsetParent.id, "map2", "Second map is inside the 'map2' div" );
    plus();
  });

  popped.exec( 3, function() {
    equals (document.getElementById('actualmap3').offsetParent.id, "map3", "Tweening map is inside the 'map3' div" );
    plus();
  });

  popped.exec( 5, function() {
    ok (document.getElementById('actualmap2').style.display === "none" && 
        document.getElementById('actualmap1').style.display === "none" &&
        document.getElementById('actualmap3').style.display === "none", "All maps are no longer visible" );
    plus();
    popped.pause().removeTrackEvent( setupId );

    ok( !document.getElementById('actualmap4'), "removed map was properly destroyed"  );
    plus();
  });

  popped.play();
  
});

