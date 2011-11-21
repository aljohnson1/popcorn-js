// PLUGIN: Disabilitypause/text

(function ( Popcorn ) {

  /**
   * Disabilitypause popcorn plug-in
   * Pause a video element allowing audio for a blind person.
   * Options parameter will need a start, end, target and text.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * Text is the text that you want to appear in the target id applicable
   * Target is the id of the document element that the text needs to be
   * attached to, this target element must exist on the DOM
   *
   * @param {Object} options
   *
   * Example:
     var p = Popcorn('#video')
        .pauseoptions({
          start: 5, // seconds
          end: 15, // seconds
          //text: 'Paust for disability',
          //target: 'disdabilitydiv'
        } )
   *
   */

    Popcorn.plugin( "Disabilitypause", {

      manifest: {
        about: {
          name: "",
          version: "",
          author: "",
          website: ""
        },
        options: {
          start: {
            elem: "input",
            type: "text",
            label: "In"
          },
          pause: {
            elem: "input",
            type: "text",
            label: "Text"
          },
          target: "pause-container"
        }
      },
    _setup: function( options ) {

    },
    /**
     * @member diasbilitypause
     * The start function will be executed when the currentTime
     * of the video  reaches the pause time provided by the
     * options variable
     */
    start: function( event, options ){

      if ( !this.paused() ) { 

        window.setTimeout(function() {

          this.play(); 
        }, options.pause * 1000 );

        this.pause(); 
      }
    },
    /**
     * @member diasbilitypause
     * The end function will be executed when the currentTime
     * of the video  reaches the end time provided by the
     * options variable
     */
    end: function( event, options ){
    },
  });
})( Popcorn );
