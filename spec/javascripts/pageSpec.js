require(['app/vendor/page.js'], function(){ 
  require('app/vendor/page.js');
});

describe('PAGE', function() {
	describe("#initialize", function(){
		beforeEach(function(){
			PAGE.page = null;
		});

		it("should set the page variable", function(){
			PAGE.initialize("hello");

			expect(PAGE.page).toEqual("hello");
		});

		it("should call bindEvents", function(){
			runs(function(){
		        spyOn(PAGE, 'bindEvents');
		        PAGE.initialize("hello");
		    });

		    runs(function() {
		        expect(PAGE.bindEvents).toHaveBeenCalled();
		    });
		});
	});

	describe("#bindEvents", function(){
		it("should add device ready listener", function(){
			runs(function(){
		        spyOn(document, 'addEventListener');
		        PAGE.bindEvents();
		    });

		    runs(function() {
		        expect(document.addEventListener).toHaveBeenCalledWith('deviceready', PAGE.onDeviceReady, false);
		    });
		});
	});

	describe("#onDeviceReady", function(){
		it("should call pageInit", function(){
			runs(function(){
		        spyOn(PAGE, 'pageInit');
		        PAGE.onDeviceReady();
		    });

		    runs(function() {
		        expect(PAGE.pageInit).toHaveBeenCalled();
		    });
		});
	});

	describe("#pageInit", function(){
		it("should call pageInit", function(){
			runs(function(){
		        spyOn(PAGE, 'startThePageMan');
		        PAGE.pageInit();
		    });

		    runs(function() {
		        expect(PAGE.startThePageMan).toHaveBeenCalled();
		    });
		});
	});

	describe("#startThePageMan", function(){
		it("should call LIGER.getPageArgs", function(){
			runs(function(){
		        spyOn(LIGER, 'getPageArgs');
		        PAGE.startThePageMan();
		    });

		    runs(function() {
		        expect(LIGER.getPageArgs).toHaveBeenCalled();
		    });
		});
	});

	describe("#gotPageArgs", function(){
		beforeEach(function(){
			PAGE.page = "hello";
			PAGE.args = null;

			PAGE.hello = function(){};
		});

		it("should set the page args", function(){
			PAGE.gotPageArgs({'foo':'bar'});

			expect(PAGE.args).toEqual({'foo':'bar'});
		});

		it("should call common", function(){
			runs(function(){
		        spyOn(PAGE, 'common');
		        PAGE.gotPageArgs({'foo':'bar'});
		    });

		    runs(function() {
		        expect(PAGE.common).toHaveBeenCalled();
		    });
		});

		it("should call current PAGE.page", function(){
			runs(function(){
		        spyOn(PAGE, 'hello');
		        PAGE.gotPageArgs({'foo':'bar'});
		    });

		    runs(function() {
		        expect(PAGE.hello).toHaveBeenCalled();
		    });
		});
	});

	describe("#common", function(){
		it("should call addToolbar", function(){
			runs(function(){
		        spyOn(PAGE, 'addToolbar');
		        PAGE.common();
		    });

		    runs(function() {
		        expect(PAGE.addToolbar).toHaveBeenCalled();
		    });
		});
	});

	describe("#addToolbar", function(){
		it("should not call LIGER.toolbar if PAGE.toolbarItems is null", function(){
			runs(function(){
		        spyOn(LIGER, 'toolbar');
		        PAGE.addToolbar();
		    });

		    runs(function() {
		        expect(LIGER.toolbar).not.toHaveBeenCalled();
		    });
		});

		it("should call LIGER.toolbar if PAGE.toolbarItems", function(){
			runs(function(){
		        spyOn(LIGER, 'toolbar');
			PAGE.toolbarItems = [{},{}];
		        PAGE.addToolbar();
		    });

		    runs(function() {
		        expect(LIGER.toolbar).toHaveBeenCalledWith(PAGE.toolbarItems);
		    });
		});
	});

	describe("#setupRefresh", function(){
		it("should call LIGER.userCanRefresh", function(){
			runs(function(){
		        spyOn(LIGER, 'userCanRefresh');
		        PAGE.setupRefresh();
		    });

		    runs(function() {
		        expect(LIGER.userCanRefresh).toHaveBeenCalledWith(PAGE.userCanRefresh);
		    });
		});
	});

	describe("LIGER api", function(){
		describe("#openPage", function(){
			it("should call LIGER.openPage", function(){
				runs(function(){
			        spyOn(LIGER, 'openPage');
			        PAGE.openPage('test','test',{'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.openPage).toHaveBeenCalledWith('test','test',{'foo':'bar'});
			    });
			});
		});

		describe("#closePage", function(){
			it("should call LIGER.closePage", function(){
				runs(function(){
			        spyOn(LIGER, 'closePage');
			        PAGE.closePage();
			    });

			    runs(function() {
			        expect(LIGER.closePage).toHaveBeenCalled();
			    });
			});
		});

		describe("#closeToPage", function(){
			it("should call LIGER.closeToPage", function(){
				runs(function(){
			        spyOn(LIGER, 'closeToPage');
			        PAGE.closeToPage('test');
			    });

			    runs(function() {
			        expect(LIGER.closeToPage).toHaveBeenCalledWith('test');
			    });
			});
		});

		describe("#updateParent", function(){
			it("should call LIGER.updateParent", function(){
				runs(function(){
			        spyOn(LIGER, 'updateParent');
			        PAGE.updateParent({'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.updateParent).toHaveBeenCalledWith({'foo':'bar'});
			    });
			});
		});

		describe("#updateParentPage", function(){
			it("should call LIGER.updateParentPage", function(){
				runs(function(){
			        spyOn(LIGER, 'updateParentPage');
			        PAGE.updateParentPage('hello', {'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.updateParentPage).toHaveBeenCalledWith('hello', {'foo':'bar'});
			    });
			});
		});

		describe("#openDialog", function(){
			it("should call LIGER.openDialog", function(){
				runs(function(){
			        spyOn(LIGER, 'openDialog');
			        PAGE.openDialog('hello', {'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.openDialog).toHaveBeenCalledWith('hello', {'foo':'bar'});
			    });
			});
		});

		describe("#openDialogWithTitle", function(){
			it("should call LIGER.openDialogWithTitle", function(){
				runs(function(){
			        spyOn(LIGER, 'openDialogWithTitle');
			        PAGE.openDialogWithTitle('hello', 'hello', {'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.openDialogWithTitle).toHaveBeenCalledWith('hello', 'hello', {'foo':'bar'});
			    });
			});
		});

		describe("#closeDialog", function(){
			it("should call LIGER.closeDialog", function(){
				runs(function(){
			        spyOn(LIGER, 'closeDialog');
			        PAGE.closeDialog({'foo':'bar'});
			    });

			    runs(function() {
			        expect(LIGER.closeDialog).toHaveBeenCalledWith({'foo':'bar'});
			    });
			});
		});

		describe("#closeDialogArguments", function(){
			it("should call LIGER.closeDialogArguments", function(){
				runs(function(){
			        spyOn(PAGE, 'startThePageMan');
			        PAGE.closeDialogArguments({'foo':'bar'});
			    });

			    runs(function() {
			        expect(PAGE.startThePageMan).toHaveBeenCalled();
			    });
			});
		});

		describe("#toolbar", function(){
			it("should call LIGER.toolbar", function(){
				runs(function(){
			        spyOn(LIGER, 'toolbar');
			        PAGE.toolbar(['test','test1','test2']);
			    });

			    runs(function() {
			        expect(LIGER.toolbar).toHaveBeenCalledWith(['test','test1','test2']);
			    });
			});
		});

		describe("#canRefresh", function(){
			it("should call LIGER.userCanRefresh", function(){
				runs(function(){
			        spyOn(LIGER, 'userCanRefresh');
			        PAGE.canRefresh();
			    });

			    runs(function() {
			        expect(LIGER.userCanRefresh).toHaveBeenCalledWith(PAGE.userCanRefresh);
			    });
			});
		});
	});
});
