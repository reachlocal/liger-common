define(['cordovabridge'], function(bridge) {
  describe('makes sure the bridge is ready', function() {
    describe('#bindEvents', function() {
      it('listens to device ready', function() {
        spyOn(document, 'addEventListener');

        bridge.bindEvents(function() {});

        expect(document.addEventListener).toHaveBeenCalledWith('deviceready', jasmine.anything(), jasmine.anything());
      });
    });

  });

  describe('Bridge API', function() {
    describe("#openPage", function() {
      it("opens a page", function() {
        var args = {
          "foo": "bar"
        };
        var options = {
          "bar": "baz"
        };
        spyOn(bridge, 'exec');
        bridge.openPage('test', 'test', args, options);

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', args, options]);
      });

      it("opens a page, with default options", function() {
        var args = {
          "foo": "bar"
        };
        spyOn(bridge, 'exec');

        bridge.openPage('test', 'test', args);

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', args, {}]);
      });
    });

    it("#closePage", function() {
      spyOn(bridge, 'exec');
      bridge.closePage();
      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", []);
    });

    it("#closeToPage", function() {
      spyOn(bridge, 'exec');
      bridge.closeToPage('test');
      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "closeToPage", ['test']);
    });

    it("#updateParent", function() {
      spyOn(bridge, 'exec');
      bridge.updateParent({
        'foo': 'bar'
      });
      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", [null, {
        'foo': 'bar'
      }]);
    });

    it("#updateParentPage", function() {
      spyOn(bridge, 'exec');
      bridge.updateParentPage('test', {
        'foo': 'bar'
      });

      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", ['test', {
        'foo': 'bar'
      }]);
    });

    describe("#getPageArgs", function() {
      it("gets called", function() {
        spyOn(bridge, 'exec');
        bridge.getPageArgs(function(args) {});

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
      });

      it("gets called and executes successfully", function() {
        var spy = jasmine.createSpy('gotPageArgs');
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          successCallback();
        });
        bridge.getPageArgs(spy);

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
        expect(spy).toHaveBeenCalled();
      });

      it("gets called and fails", function() {
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          failCallback();
        });
        bridge.getPageArgs(function(args) {});

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
      });
    });

    describe("#openDialog", function() {
      it("#opens a dialog", function() {
        spyOn(bridge, 'exec');
        bridge.openDialog('test', {
          'foo': 'bar'
        }, {
          'bar': 'baz'
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {
          'foo': 'bar'
        }, {
          'bar': 'baz'
        }]);
      });

      it("#opens a dialog with default options", function() {
        spyOn(bridge, 'exec');
        bridge.openDialog('test', {
          'foo': 'bar'
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {
          'foo': 'bar'
        }, {}]);
      });
    });

    describe("#openDialogWithTitle", function() {
      it("opens a dialog with a title", function() {
        spyOn(bridge, 'exec');
        bridge.openDialogWithTitle('test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'baz'
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {
          'foo': 'bar'
        }, {
          'bar': 'baz'
        }]);
      });

      it("opens a dialog with title using the default options", function() {
        spyOn(bridge, 'exec');
        bridge.openDialogWithTitle('test', 'test', {
          'foo': 'bar'
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {
          'foo': 'bar'
        }, {}]);
      });
    });

    it("#closeDialog", function() {
      spyOn(bridge, 'exec');
      bridge.closeDialog({
        'foo': 'bar'
      });

      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "closeDialog", [{
        'foo': 'bar'
      }]);
    });

    it("#closeDialogArguments", function() {
      spyOn(PAGE, 'closeDialogArguments');
      bridge.closeDialogArguments({
        'foo': 'bar'
      });

      expect(PAGE.closeDialogArguments).toHaveBeenCalledWith({
        'foo': 'bar'
      });
    });

    it("#toolbar", function() {
      spyOn(bridge, 'exec');
      bridge.toolbar(['test', 'test1', 'test2']);

      expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "toolbar", [
        ['test', 'test1', 'test2']
      ]);
    });

  }); // Bridge API

  describe('callbacks', function() {
    describe('#addChildUpdates', function() {
      it('can be added', function() {
        var update = {
          test: 'data'
        };
        var spy = jasmine.createSpy('childUpdates');
        bridge.addChildUpdates(spy);
        PAGE.childUpdates(update);
        expect(spy).toHaveBeenCalledWith(update);
      });
    });

    describe('#addCloseDialogArguments', function() {
      it('can be added', function() {
        var args = {
          test: 'data'
        };
        var spy = jasmine.createSpy('closeDialogArguments');
        bridge.addCloseDialogArguments(spy);
        PAGE.closeDialogArguments(args);
        expect(spy).toHaveBeenCalledWith(args);
      });
    });

    describe('#addHandleAppOpenURL', function() {
      it('can be added', function() {
        var url = 'ligermobile://isGreat/yes';
        var spy = jasmine.createSpy('handleAppOpenURL');
        bridge.addHandleAppOpenURL(spy);
        PAGE.handleAppOpenURL(url);
        expect(spy).toHaveBeenCalledWith(url);
      });
    });

    describe('#addHeaderButtonTapped', function() {
      it('can be added', function() {
        var button = 'done';
        var spy = jasmine.createSpy('headerButtonTapped');
        bridge.addHeaderButtonTapped(spy);
        PAGE.headerButtonTapped(button);
        expect(spy).toHaveBeenCalledWith(button);
      });
    });

    describe('#addNotificationArrived', function() {
      it('can be added', function() {
        var payload = {
          notification: 'yes please'
        };
        var spy = jasmine.createSpy('notificationArrived');
        bridge.addNotificationArrived(spy);
        PAGE.notificationArrived(payload, false);
        expect(spy).toHaveBeenCalledWith(payload, false);
      });
    });

    describe('#addOnPageAppear', function() {
      it('can be added', function() {
        var spy = jasmine.createSpy('pageAppear');
        bridge.addOnPageAppear(spy);
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
        bridge.addPushNotificationTokenUpdated(spy);
        PAGE.pushNotificationTokenUpdated(token, type, error);
        expect(spy).toHaveBeenCalledWith(token, type, error);
      });
    });

  }); // callbacks

  describe('PAGE callback management', function() {
    describe('#_addCallback', function() {
      it('adds a function', function() {
        var spy = jasmine.createSpy('test');
        PAGE._addCallback('test', spy);
        PAGE._callCallback('test');
        expect(spy).toHaveBeenCalled();
      });
    });
  });

});
