define(['cordovabridge'], function(bridge) {
  describe('makes sure the bridge is ready', function() {
    describe('#bindEvents', function() {
      it('listens to device ready', function() {
        spyOn(document, 'addEventListener');

        bridge.bindEvents();

        expect(document.addEventListener).toHaveBeenCalledWith('deviceready', jasmine.anything(), jasmine.anything());
      });
    });

    describe('#onDeviceReady', function() {
      it('calls pageInit when the device is ready', function() {
        spyOn(bridge.PAGE, 'pageInit');

        bridge.onDeviceReady();

        expect(bridge.PAGE.pageInit).toHaveBeenCalled();
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
        bridge.getPageArgs();

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
      });

      it("gets called and executes successfully", function() {
        spyOn(bridge.PAGE, 'gotPageArgs');
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          successCallback();
        });
        bridge.getPageArgs();

        expect(bridge.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
        expect(bridge.PAGE.gotPageArgs).toHaveBeenCalled();
      });

      it("gets called and fails", function() {
        spyOn(bridge, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
          failCallback();
        });
        bridge.getPageArgs();

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
      spyOn(bridge.PAGE, 'closeDialogArguments');
      bridge.closeDialogArguments({
        'foo': 'bar'
      });

      expect(bridge.PAGE.closeDialogArguments).toHaveBeenCalledWith({
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

  });
});
