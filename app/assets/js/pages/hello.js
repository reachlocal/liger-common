//  This will be called by the included PAGE.js as part of the liger initialization.
PAGE.hello = function(){
	HELLO.initialize();
}

/* 
*
*  If this page will be receiving updates from a child window, you can setup the unique
*  functionality by overwriting the PAGE.childUpdates() function here.
*
*/       
PAGE.childUpdates = function(args){
	// Maybe for instance you want to reintialize the page.
	HELLO.initalize();
}

//  All of the code unique to the page's functionality
var HELLO = {
	initialize: function(){
		var me = this;

		/* 
		*
		*    All arguments that have been passed to this page are now ready to be accessed.
		*    They can be found in the PAGE.args object.  
		*
		*
		*/

		if(PAGE.args){
			if("world" in PAGE.args){
			// Call other stuff that works with world object
			
			}
		}

		console.log("HELLO.initailize succesful");
	}

	// lots of other cool stuff
}