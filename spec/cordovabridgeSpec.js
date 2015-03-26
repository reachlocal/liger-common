define(['cordovabridge'], function(bridge) {
  describe('makes sure the bridge is ready', function() {
    describe('#bindEvents', function() {
      it('listens to device ready', function() {
        spyOn(document, 'addEventListener');

        bridge.bindEvents(function(){});

        expect(document.addEventListener).toHaveBeenCalledWith('deviceready', jasmine.anything(), jasmine.anything());
      });
    });

  });

  describe('Bridge API', function() {
    describe("#openPage", function() {
      it("opens a page", function() {
        spyOn(bridge, 'exec');

        bridge.openPage('test', 'test', {
          "foo": "bar"
        }, {
          "bar": "baz"
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', {
          "foo": "bar"
        }, {
          "bar": "baz"
        }]);
      });

      it("opens a page, with default options", function() {
        spyOn(bridge, 'exec');

        bridge.openPage('test', 'test', {
          "foo": "bar"
        });

        expect(bridge.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', {
          "foo": "bar"
        }, {}]);
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
        bridge.getPageArgs(function(args){});

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
      });

      it("gets called and executes successfully", function() {
        var test = {gotPageArgs:function(args){}};
        spyOn(test, 'gotPageArgs');
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          successCallback();
        });
        bridge.getPageArgs(test.gotPageArgs);

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
        expect(test.gotPageArgs).toHaveBeenCalled();
      });

      it("gets called and fails", function() {
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          failCallback();
        });
        bridge.getPageArgs(function(args){});

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
        var update = {test:'data'};
        var test = { childUpdates:function(update) {}};
        spyOn(test, 'childUpdates');
        bridge.addChildUpdates(test.childUpdates);
        PAGE.childUpdates(update);
        expect(test.childUpdates).toHaveBeenCalledWith(update);
      });
    });

    describe('#addCloseDialogArguments', function() {
      it('can be added', function() {
        var args = {test:'data'};
        var test = { closeDialogArguments:function(args) {}};
        spyOn(test, 'closeDialogArguments');
        bridge.addCloseDialogArguments(test.closeDialogArguments);
        PAGE.closeDialogArguments(args);
        expect(test.closeDialogArguments).toHaveBeenCalledWith(args);
      });
    });

    describe('#addHandleAppOpenURL', function() {
      it('can be added', function() {
        var url = 'ligermobile://isGreat/yes';
        var test = { handleAppOpenURL:function(args) {}};
        spyOn(test, 'handleAppOpenURL');
        bridge.addHandleAppOpenURL(test.handleAppOpenURL);
        PAGE.handleAppOpenURL(url);
        expect(test.handleAppOpenURL).toHaveBeenCalledWith(url);
      });
    });

    describe('#addHeaderButtonTapped', function() {
      it('can be added', function() {
        var button = 'done';
        var test = { headerButtonTapped:function(button) {}};
        spyOn(test, 'headerButtonTapped');
        bridge.addHeaderButtonTapped(test.headerButtonTapped);
        PAGE.headerButtonTapped(button);
        expect(test.headerButtonTapped).toHaveBeenCalledWith(button);
      });
    });

    describe('#addNotificationArrived', function() {
      it('can be added', function() {
        var payload = {notification:'yes please'};
        var test = { notificationArrived:function(payload, background) {}};
        spyOn(test, 'notificationArrived');
        bridge.addNotificationArrived(test.notificationArrived);
        PAGE.notificationArrived(payload, false);
        expect(test.notificationArrived).toHaveBeenCalledWith(payload, false);
      });
    });

    describe('#addOnPageAppear', function() {
      it('can be added', function() {
        var test = { pageAppear:function() {}};
        spyOn(test, 'pageAppear');
        bridge.addOnPageAppear(test.pageAppear);
        PAGE.onPageAppear();
        expect(test.pageAppear).toHaveBeenCalled();
      });
    });

    describe('#addCallback', function() {
      it('adds a function', function() {
        var test = { test:function(){} };
        spyOn(test, 'test');
        PAGE._addCallback('test', test.test);
        PAGE._callCallback('test');
        expect(test.test).toHaveBeenCalled();
      });
    });

    describe('#addPushNotificationTokenUpdated', function() {
      it('can be added', function() {
        var token = '1234';
        var type = 'test';
        var error = '';
        var test = { pushNotificationTokenUpdated:function() {}};
        spyOn(test, 'pushNotificationTokenUpdated');
        bridge.addPushNotificationTokenUpdated(test.pushNotificationTokenUpdated);
        PAGE.pushNotificationTokenUpdated(token, type, error);
        expect(test.pushNotificationTokenUpdated).toHaveBeenCalledWith(token, type, error);
      });
    });

  }); // callbacks

});
