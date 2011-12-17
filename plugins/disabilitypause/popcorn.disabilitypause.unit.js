test( "Popcorn Disabilitypause Plugin", function() {

  var popcorn = Popcorn( "#video" ),
      expects = 10,
      count = 0,
      setupId,
      time = 0,
      pauseStarted = 0,
      pauseEnded = 0,
      pauseDuration = 0,
      dpausediv = document.getElementById( "dpausediv" );
  expect( expects );

  function plus() {
    if ( ++count===expects ) {
      start();
    }
  }
  popcorn.disabilitypause({
    start: 5,
    pause: 5
  })
  .disabilitypause({
    start: 20,
    pause: 7
  });

  setupId = popcorn.getLastTrackEventId();
  stop();
  popcorn.play();
  
  popcorn.exec( 0, function() {
    equals(setupId.substring(0,15), "disabilitypause", "disability pause feature has been setup");
    plus();
  });
    
  popcorn.exec( 3, function() {
    ok( "disabilitypause" in popcorn, "disabilitypause is a mehtod of the Popcorn instance");
    plus();
  });
     
  popcorn.exec( 5, function() {
    ok(popcorn.paused(),"The video should be paused");
    plus();
  });
  
  popcorn.exec( 5, function() {
    time = new Date();
    pauseStarted = time.getSeconds();
    ok((popcorn.roundTime()-1) === 5,"The video should be paused at 5 seconds");
    plus();
  });
   
   popcorn.exec( 6, function() {
    time = new Date();
    pauseEnded = time.getSeconds();
    //Possibility of a rap around
    if((pauseEnded - pauseStarted) > 6){
      pauseDuration = (60 - pauseStarted) + pauseEnded;
    }else{
      pauseDuration = (pauseEnded - pauseStarted);
    }
    //Calculations could vary a littly based on a fraction of a second
    ok(pauseDuration === 5 || 6,"The video should have been paused for 5 seconds");
    plus();
  });
   
  popcorn.exec( 10, function() {
    ok(!popcorn.paused(),"The video should not be paused");
    plus();
  });
  
  popcorn.exec( 20, function() {
    time = new Date();
    pauseStarted = time.getSeconds();
    //alert("second pause " + time.getSeconds());
    ok(popcorn.paused(),"The video should be paused for a second time");
    plus();
  });
  
  popcorn.exec( 20, function() {
    ok((popcorn.roundTime()-1) === 20,"The video should be paused at 20 seconds");
    plus();
  });
  
  popcorn.exec( 21, function() {
    time = new Date();
    pauseEnded = time.getSeconds();
    
    //Possibility of a rap around
    if((pauseEnded - pauseStarted) > 8){
      pauseDuration = (60 - pauseStarted) + pauseEnded;
    }else{
      pauseDuration = (pauseEnded - pauseStarted);
    }
    //Calculations could vary a little based on a fraction of a second
    ok(pauseDuration === 7 || 8,"The video should have been paused for 7 seconds");
    plus();
  });
  
  popcorn.exec(21, function(){
    ok(!popcorn.paused(),"The video should not be paused");
    plus();
  });
});

