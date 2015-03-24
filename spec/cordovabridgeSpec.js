xdescribe('cordovabridge', function() {
  xit('require', function() {
    var lm = require('../../app/vendor/cordovabridge.js');
  });
});

xdescribe('LIGER', function() {
  describe("#openPage", function() {
    xit("#opens a page", function() {
      spyOn(cordova, 'exec');
      LIGER.openPage('test', 'test', {
        "foo": "bar"
      }, {
        "bar": "baz"
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', {
        "foo": "bar"
      }, {
        "bar": "baz"
      }]);
    });

    xit("#opens a page, with default options", function() {
      spyOn(cordova, 'exec');
      LIGER.openPage('test', 'test', {
        "foo": "bar"
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", ['test', 'test', {
        "foo": "bar"
      }, {}]);
    });
  });

  xit("#closePage", function() {
    spyOn(cordova, 'exec');
    LIGER.closePage();

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", []);
  });

  xit("#closeToPage", function() {
    spyOn(cordova, 'exec');
    LIGER.closeToPage('test');

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", ['test']);
  });

  xit("#updateParent", function() {
    spyOn(cordova, 'exec');
    LIGER.updateParent({
      'foo': 'bar'
    });

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", [null, {
      'foo': 'bar'
    }]);
  });

  xit("#updateParentPage", function() {
    spyOn(cordova, 'exec');
    LIGER.updateParentPage('test', {
      'foo': 'bar'
    });

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", ['test', {
      'foo': 'bar'
    }]);
  });

  xit("#childUpdates", function() {
    spyOn(PAGE, 'childUpdates');
    LIGER.childUpdates({
      'foo': 'bar'
    });
    expect(PAGE.childUpdates).toHaveBeenCalledWith({
      'foo': 'bar'
    });
  });

  xit("#openPageArguments", function() {
    beforeEach(function() {
      PAGE.args = null;
    });

    LIGER.openPageArguments({
      'foo': 'bar'
    });
    expect(PAGE.args).toEqual({
      'foo': 'bar'
    });
  });

  describe("#getPageArgs", function() {
    xit("gets called", function() {
      spyOn(cordova, 'exec');
      LIGER.getPageArgs();

      expect(cordova.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
    });

    xit("gets called and executes successfully", function() {
      spyOn(PAGE, 'gotPageArgs');
      spyOn(cordova, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
        successCallback();
      });
      LIGER.getPageArgs();

      expect(cordova.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
      expect(PAGE.gotPageArgs).toHaveBeenCalled();
    });

    xit("gets called and fails", function() {
      spyOn(cordova, 'exec').and.callFake(function(successCallback, failCallback, service, action, actionArgs) {
        failCallback();
      });
      LIGER.getPageArgs();

      expect(cordova.exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Liger", "getPageArgs", []);
    });
  });

  describe("#openDialog", function() {
    xit("#opens a dialog", function() {
      spyOn(cordova, 'exec');
      LIGER.openDialog('test', {
        'foo': 'bar'
      }, {
        'bar': 'baz'
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {
        'foo': 'bar'
      }, {
        'bar': 'baz'
      }]);
    });

    xit("#opens a dialog with default options", function() {
      spyOn(cordova, 'exec');
      LIGER.openDialog('test', {
        'foo': 'bar'
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {
        'foo': 'bar'
      }, {}]);
    });
  });

  describe("#openDialogWithTitle", function() {
    xit("opens a dialog with a title", function() {
      spyOn(cordova, 'exec');
      LIGER.openDialogWithTitle('test', 'test', {
        'foo': 'bar'
      }, {
        'bar': 'baz'
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {
        'foo': 'bar'
      }, {
        'bar': 'baz'
      }]);
    });

    xit("opens a dialog with title using the default options", function() {
      spyOn(cordova, 'exec');
      LIGER.openDialogWithTitle('test', 'test', {
        'foo': 'bar'
      });

      expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {
        'foo': 'bar'
      }, {}]);
    });
  });
  xit("#closeDialog", function() {
    spyOn(cordova, 'exec');
    LIGER.closeDialog({
      'foo': 'bar'
    });

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closeDialog", [{
      'foo': 'bar'
    }]);
  });

  xit("#closeDialogArguments", function() {
    spyOn(PAGE, 'closeDialogArguments');
    LIGER.closeDialogArguments({
      'foo': 'bar'
    });

    expect(PAGE.closeDialogArguments).toHaveBeenCalledWith({
      'foo': 'bar'
    });
  });

  xit("#toolbar", function() {
    spyOn(cordova, 'exec');
    LIGER.toolbar(['test', 'test1', 'test2']);

    expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "toolbar", [
      ['test', 'test1', 'test2']
    ]);
  });

});
