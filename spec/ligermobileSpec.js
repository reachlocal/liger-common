define(['ligermobile'], function() {
  describe('Load the module', function() {
    it('an object should appear', function() {
      var lm = require('ligermobile');
      expect(lm).not.toBe(null);
      expect(lm).not.toBe(undefined);
    });
  });

  describe('initialize', function() {
    it('sets the page name', function() {
      var lm = require('ligermobile');
      spyOn(lm, 'bindEvents');

      lm.initialize('page_example');

      expect(lm.page).toBe('page_example');
      expect(lm.bindEvents).toHaveBeenCalled();
    });

    it('gets the page\'s args', function() {
      var lm = require('ligermobile');
      var bridge = require('cordovabridge');
      spyOn(bridge, 'getPageArgs').and.callFake(function(){
        bridge.PAGE.gotPageArgs({example:"args"});
      });
      lm.page_example = function(){};
      spyOn(lm, 'page_example');

      lm.pageInit();

      expect(lm.args).toEqual({example:"args"})
      expect(bridge.getPageArgs).toHaveBeenCalled();
      expect(lm.page_example).toHaveBeenCalled();
      delete page_example;
    });

  });
});


////// -------- OLD --------


xdescribe('PAGE', function() {
  describe("#initialize", function() {
    beforeEach(function() {
      PAGE.page = null;
    });

    xit("should set the page variable", function() {
      PAGE.initialize("hello");

      expect(PAGE.page).toEqual("hello");
    });

    xit("should call bindEvents", function() {
      spyOn(PAGE, 'bindEvents');
      PAGE.initialize("hello");
      expect(PAGE.bindEvents).toHaveBeenCalled();
    });
  });

  describe("#bindEvents", function() {
    xit("should add device ready listener", function() {
      spyOn(document, 'addEventListener');
      PAGE.bindEvents();

      expect(document.addEventListener).toHaveBeenCalledWith('deviceready', PAGE.onDeviceReady, false);
    });
  });

  describe("#onDeviceReady", function() {
    xit("should call pageInit", function() {
      spyOn(PAGE, 'pageInit');
      PAGE.onDeviceReady();

      expect(PAGE.pageInit).toHaveBeenCalled();
    });
  });

  describe("#pageInit", function() {
    xit("should call pageInit", function() {
      spyOn(PAGE, 'startThePageMan');
      PAGE.pageInxit();

      expect(PAGE.startThePageMan).toHaveBeenCalled();
    });
  });

  describe("#startThePageMan", function() {
    xit("should call LIGER.getPageArgs", function() {
      spyOn(LIGER, 'getPageArgs');
      PAGE.startThePageMan();

      expect(LIGER.getPageArgs).toHaveBeenCalled();
    });
  });

  describe("#gotPageArgs", function() {
    beforeEach(function() {
      PAGE.page = "hello";
      PAGE.args = null;

      PAGE.hello = function() {};
    });

    xit("should set the page args", function() {
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.args).toEqual({
        'foo': 'bar'
      });
    });

    xit("should call common", function() {
      spyOn(PAGE, 'common');
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.common).toHaveBeenCalled();
    });

    xit("should call current PAGE.page", function() {
      spyOn(PAGE, 'hello');
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.hello).toHaveBeenCalled();
    });
  });

  describe("#common", function() {
    xit("should call addToolbar", function() {
      spyOn(PAGE, 'addToolbar');
      PAGE.common();

      expect(PAGE.addToolbar).toHaveBeenCalled();
    });
  });

  describe("#addToolbar", function() {
    xit("should not call LIGER.toolbar if PAGE.toolbarItems is null", function() {
      spyOn(LIGER, 'toolbar');
      PAGE.addToolbar();

      expect(LIGER.toolbar).not.toHaveBeenCalled();
    });

    xit("should call LIGER.toolbar if PAGE.toolbarItems", function() {
      spyOn(LIGER, 'toolbar');
      PAGE.toolbarItems = [{}, {}];
      PAGE.addToolbar();

      expect(LIGER.toolbar).toHaveBeenCalledWith(PAGE.toolbarItems);
    });
  });

  describe("LIGER api", function() {
    describe("#openPage", function() {
      xit("should call LIGER.openPage", function() {
        spyOn(LIGER, 'openPage');
        PAGE.openPage('test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(LIGER.openPage).toHaveBeenCalledWith('test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#closePage", function() {
      xit("should call LIGER.closePage", function() {
        spyOn(LIGER, 'closePage');
        PAGE.closePage();

        expect(LIGER.closePage).toHaveBeenCalled();
      });
    });

    describe("#closeToPage", function() {
      xit("should call LIGER.closeToPage", function() {
        spyOn(LIGER, 'closeToPage');
        PAGE.closeToPage('test');

        expect(LIGER.closeToPage).toHaveBeenCalledWith('test');
      });
    });

    describe("#updateParent", function() {
      xit("should call LIGER.updateParent", function() {
        spyOn(LIGER, 'updateParent');
        PAGE.updateParent({
          'foo': 'bar'
        });

        expect(LIGER.updateParent).toHaveBeenCalledWith({
          'foo': 'bar'
        });
      });
    });

    describe("#updateParentPage", function() {
      xit("should call LIGER.updateParentPage", function() {
        spyOn(LIGER, 'updateParentPage');
        PAGE.updateParentPage('hello', {
          'foo': 'bar'
        });

        expect(LIGER.updateParentPage).toHaveBeenCalledWith('hello', {
          'foo': 'bar'
        });
      });
    });

    describe("#openDialog", function() {
      xit("should call LIGER.openDialog", function() {
        spyOn(LIGER, 'openDialog');
        PAGE.openDialog('hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(LIGER.openDialog).toHaveBeenCalledWith('hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#openDialogWithTitle", function() {
      xit("should call LIGER.openDialogWithTitle", function() {
        spyOn(LIGER, 'openDialogWithTitle');
        PAGE.openDialogWithTitle('hello', 'hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(LIGER.openDialogWithTitle).toHaveBeenCalledWith('hello', 'hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#closeDialog", function() {
      xit("should call LIGER.closeDialog", function() {
        spyOn(LIGER, 'closeDialog');
        PAGE.closeDialog({
          'foo': 'bar'
        });

        expect(LIGER.closeDialog).toHaveBeenCalledWith({
          'foo': 'bar'
        });
      });
    });

    describe("#toolbar", function() {
      xit("should call LIGER.toolbar", function() {
        spyOn(LIGER, 'toolbar');
        PAGE.toolbar(['test', 'test1', 'test2']);

        expect(LIGER.toolbar).toHaveBeenCalledWith(['test', 'test1', 'test2']);
      });
    });
  });

  describe("empty callbacks", function() {
    describe("#closeDialogArguments", function() {
      xit("does nothing when called", function() {
        PAGE.closeDialogArguments({
          'foo': 'bar'
        });
      });
    });

    describe("#childUpdates", function() {
      xit("does nothing when called", function() {
        PAGE.childUpdates({
          bar: 'baz'
        });
      });
    });

    describe("#onPageAppear", function() {
      xit("does nothing when called", function() {
        PAGE.onPageAppear();
      });
    });

    describe("#pushNotificationTokenUpdated", function() {
      xit("does nothing when called", function() {
        PAGE.pushNotificationTokenUpdated('token', 'type', 'error');
      });
    });

    describe("#notificationArrived", function() {
      xit("does nothing when called", function() {
        PAGE.notificationArrived('payload', 'background');
      });
    });

    describe("#handleAppOpenURL", function() {
      xit("does nothing when called", function() {
        PAGE.handleAppOpenURL('url');
      });
    });

    describe("#headerButtonTapped", function() {
      xit("does nothing when called", function() {
        PAGE.headerButtonTapped("done");
      });
    });

  });
});
