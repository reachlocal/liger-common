define(['ligermobile', 'cordovabridge'], function(lm, bridge) {
  describe('load the module', function() {
    it('an object should appear', function() {
      var lm = require('ligermobile');
      var bridge = require('cordovabridge');
      bridge.PAGE = lm;

      expect(lm).not.toBe(null);
      expect(lm).not.toBe(undefined);
    });
  });

  describe('#initialize', function() {
    it('sets the page name', function() {
      spyOn(bridge, 'bindEvents');

      lm.initialize('page_example');

      expect(lm.page).toBe('page_example');
      expect(bridge.bindEvents).toHaveBeenCalled();
    });

    it('gets the page\'s args', function() {
      spyOn(bridge, 'getPageArgs').and.callFake(function() {
        bridge.PAGE.gotPageArgs({
          example: "args"
        });
      });
      lm.page_example = function() {};
      spyOn(lm, 'page_example');

      lm.pageInit();

      expect(lm.args).toEqual({
        example: "args"
      })
      expect(bridge.getPageArgs).toHaveBeenCalled();
      expect(lm.page_example).toHaveBeenCalled();
      delete page_example;
    });

    describe("#pageInit", function() {
      it("should call pageInit", function() {
        spyOn(bridge, 'getPageArgs');
        lm.pageInit();

        expect(bridge.getPageArgs).toHaveBeenCalled();
      });
    });

    describe("#gotPageArgs", function() {
      beforeEach(function() {
        lm.page = "page_example";
        lm.args = null;

        lm.page_example = function() {};
      });

      afterEach(function() {
        delete lm.page_example;
      });

      it("should set the page args", function() {
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.args).toEqual({
          'foo': 'bar'
        });
      });

      it("should call common", function() {
        spyOn(lm, 'common');
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.common).toHaveBeenCalled();
      });

      it("should call the lm.page", function() {
        spyOn(lm, 'page_example');
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.page_example).toHaveBeenCalled();
      });
    });

    describe("#common", function() {
      it("should call addToolbar", function() {
        spyOn(lm, 'addToolbar');
        lm.common();

        expect(lm.addToolbar).toHaveBeenCalled();
      });
    });

  });

  describe('page API', function() {
    describe("#addToolbar", function() {
      it("should do nothing if toolbarItems is null", function() {
        spyOn(bridge, 'toolbar');

        lm.addToolbar();

        expect(bridge.toolbar).not.toHaveBeenCalled();
      });

      it("should initialize the toolbar if toolbarItems are set", function() {
        spyOn(bridge, 'toolbar');
        lm.toolbarItems = [{}, {}];
        lm.addToolbar();

        expect(bridge.toolbar).toHaveBeenCalledWith(lm.toolbarItems);
      });
    });

    describe("#openPage", function() {
      it("opens a new page if the current page is a collection page", function() {
        spyOn(bridge, 'openPage');

        lm.openPage('test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(bridge.openPage).toHaveBeenCalledWith('test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#closePage", function() {
      it("closes the current page (if in a collection and not the last page)", function() {
        spyOn(bridge, 'closePage');

        lm.closePage();

        expect(bridge.closePage).toHaveBeenCalled();
      });
    });

    describe("#closeToPage", function() {
      it("closes the current page and all previous pages until the named page is found (if in a collection and not the last page)", function() {
        spyOn(bridge, 'closeToPage');
        lm.closeToPage('test');

        expect(bridge.closeToPage).toHaveBeenCalledWith('test');
      });
    });

    describe("#updateParent", function() {
      it("update the parent's page with a json structure", function() {
        spyOn(bridge, 'updateParent');

        lm.updateParent({
          'foo': 'bar'
        });

        expect(bridge.updateParent).toHaveBeenCalledWith({
          'foo': 'bar'
        });
      });
    });

    describe("#updateParentPage", function() {
      it("update the first parent page named with a json structure", function() {
        spyOn(bridge, 'updateParentPage');
        lm.updateParentPage('hello', {
          'foo': 'bar'
        });

        expect(bridge.updateParentPage).toHaveBeenCalledWith('hello', {
          'foo': 'bar'
        });
      });
    });

    describe("#openDialog", function() {
      it("opens up a dialog", function() {
        spyOn(bridge, 'openDialog');

        lm.openDialog('hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(bridge.openDialog).toHaveBeenCalledWith('hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#openDialogWithTitle", function() {
      it("opens up a dialog with the page inside of a navigator with title", function() {
        spyOn(bridge, 'openDialogWithTitle');

        lm.openDialogWithTitle('hello', 'hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });

        expect(bridge.openDialogWithTitle).toHaveBeenCalledWith('hello', 'hello', {
          'foo': 'bar'
        }, {
          'bar': 'foo'
        });
      });
    });

    describe("#closeDialog", function() {
      it("closes the currently open dialog if the page is in a dialog", function() {
        spyOn(bridge, 'closeDialog');
        lm.closeDialog({
          'foo': 'bar'
        });

        expect(bridge.closeDialog).toHaveBeenCalledWith({
          'foo': 'bar'
        });
      });
    });

    describe("#toolbar", function() {
      it("sets the toolbar items on the toolbar", function() {
        spyOn(bridge, 'toolbar');

        lm.toolbar(['test', 'test1', 'test2']);

        expect(bridge.toolbar).toHaveBeenCalledWith(['test', 'test1', 'test2']);
      });
    });
  }); // 'page API'

  describe('callbacks', function() {
    describe('#addChildUpdates', function() {
      it('can be added', function() {
        var update = {test:'data'};
        var spy = jasmine.createSpy('childUpdates');
        lm.addChildUpdates(spy);
        PAGE.childUpdates(update);
        expect(spy).toHaveBeenCalledWith(update);
      });
    });

    describe('#addCloseDialogArguments', function() {
      it('can be added', function() {
        var args = {test:'data'};
        var spy = jasmine.createSpy('closeDialogArguments');
        lm.addCloseDialogArguments(spy);
        PAGE.closeDialogArguments(args);
        expect(spy).toHaveBeenCalledWith(args);
      });
    });

    describe('#addHandleAppOpenURL', function() {
      it('can be added', function() {
        var url = 'ligermobile://isGreat/yes';
        var spy = jasmine.createSpy('handleAppOpenURL');
        lm.addHandleAppOpenURL(spy);
        PAGE.handleAppOpenURL(url);
        expect(spy).toHaveBeenCalledWith(url);
      });
    });

    describe('#addHeaderButtonTapped', function() {
      it('can be added', function() {
        var button = 'done';
        var spy = jasmine.createSpy('headerButtonTapped');
        lm.addHeaderButtonTapped(spy);
        PAGE.headerButtonTapped(button);
        expect(spy).toHaveBeenCalledWith(button);
      });
    });

    describe('#addNotificationArrived', function() {
      it('can be added', function() {
        var payload = {notification:'yes please'};
        var spy = jasmine.createSpy('notificationArrived');
        lm.addNotificationArrived(spy);
        PAGE.notificationArrived(payload, false);
        expect(spy).toHaveBeenCalledWith(payload, false);
      });
    });

    describe('#addOnPageAppear', function() {
      it('can be added', function() {
        var spy = jasmine.createSpy('pageAppear');
        lm.addOnPageAppear(spy);
        PAGE.onPageAppear();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#addPushNotificationTokenUpdated', function() {
      it('can be added', function() {
        var token = '1234';
        var type = 'test';
        var error = '';
        var spy = jasmine.createSpy('pushNotificationTokenUpdated');
        lm.addPushNotificationTokenUpdated(spy);
        PAGE.pushNotificationTokenUpdated(token, type, error);
        expect(spy).toHaveBeenCalledWith(token, type, error);
      });
    });

  }); // callbacks

});
