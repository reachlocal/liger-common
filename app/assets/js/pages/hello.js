//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.hello = function() {
  HELLO.initialize();
}

//  All of the code unique to the page's functionality
var HELLO = {
  initialize: function() {
    var me = this;

    /* 
		*
		*    All arguments that have been passed to this page are now ready to be accessed.
		*    They can be found in the PAGE.args object.  
		*
		*
		*/

    if (PAGE.args) {
      if ("world" in PAGE.args) {
        // Call other stuff that works with world object

      }
    }

    console.log("HELLO.initialize succesful");
  }

  // lots of other cool stuff
}
