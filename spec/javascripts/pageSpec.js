describe('PAGE', function() {
  describe("#initialize", function() {
    beforeEach(function() {
      PAGE.page = null;
    });

    it("should set the page variable", function() {
      PAGE.initialize("hello");

      expect(PAGE.page).toEqual("hello");
    });

    it("should call bindEvents", function() {
      spyOn(PAGE, 'bindEvents');
      PAGE.initialize("hello");
      expect(PAGE.bindEvents).toHaveBeenCalled();
    });
  });

  describe("#bindEvents", function() {
    it("should add device ready listener", function() {
      spyOn(document, 'addEventListener');
      PAGE.bindEvents();

      expect(document.addEventListener).toHaveBeenCalledWith('deviceready', PAGE.onDeviceReady, false);
    });
  });

  describe("#onDeviceReady", function() {
    it("should call pageInit", function() {
      spyOn(PAGE, 'pageInit');
      PAGE.onDeviceReady();

      expect(PAGE.pageInit).toHaveBeenCalled();
    });
  });

  describe("#pageInit", function() {
    it("should call pageInit", function() {
      spyOn(PAGE, 'startThePageMan');
      PAGE.pageInit();

      expect(PAGE.startThePageMan).toHaveBeenCalled();
    });
  });

  describe("#startThePageMan", function() {
    it("should call LIGER.getPageArgs", function() {
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

    it("should set the page args", function() {
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.args).toEqual({
        'foo': 'bar'
      });
    });

    it("should call common", function() {
      spyOn(PAGE, 'common');
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.common).toHaveBeenCalled();
    });

    it("should call current PAGE.page", function() {
      spyOn(PAGE, 'hello');
      PAGE.gotPageArgs({
        'foo': 'bar'
      });

      expect(PAGE.hello).toHaveBeenCalled();
    });
  });

  describe("#common", function() {
    it("should call addToolbar", function() {
      spyOn(PAGE, 'addToolbar');
      PAGE.common();

      expect(PAGE.addToolbar).toHaveBeenCalled();
    });
  });

  describe("#addToolbar", function() {
    it("should not call LIGER.toolbar if PAGE.toolbarItems is null", function() {
      spyOn(LIGER, 'toolbar');
      PAGE.addToolbar();

      expect(LIGER.toolbar).not.toHaveBeenCalled();
    });

    it("should call LIGER.toolbar if PAGE.toolbarItems", function() {
      spyOn(LIGER, 'toolbar');
      PAGE.toolbarItems = [{}, {}];
      PAGE.addToolbar();

      expect(LIGER.toolbar).toHaveBeenCalledWith(PAGE.toolbarItems);
    });
  });

  describe("LIGER api", function() {
    describe("#openPage", function() {
      it("should call LIGER.openPage", function() {
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
      it("should call LIGER.closePage", function() {
        spyOn(LIGER, 'closePage');
        PAGE.closePage();

        expect(LIGER.closePage).toHaveBeenCalled();
      });
    });

    describe("#closeToPage", function() {
      it("should call LIGER.closeToPage", function() {
        spyOn(LIGER, 'closeToPage');
        PAGE.closeToPage('test');

        expect(LIGER.closeToPage).toHaveBeenCalledWith('test');
      });
    });

    describe("#updateParent", function() {
      it("should call LIGER.updateParent", function() {
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
      it("should call LIGER.updateParentPage", function() {
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
      it("should call LIGER.openDialog", function() {
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
      it("should call LIGER.openDialogWithTitle", function() {
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
      it("should call LIGER.closeDialog", function() {
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
      it("should call LIGER.toolbar", function() {
        spyOn(LIGER, 'toolbar');
        PAGE.toolbar(['test', 'test1', 'test2']);

        expect(LIGER.toolbar).toHaveBeenCalledWith(['test', 'test1', 'test2']);
      });
    });
  });

  describe("empty callbacks", function() {
    describe("#closeDialogArguments", function() {
      it("does nothing when called", function() {
        PAGE.closeDialogArguments({
          'foo': 'bar'
        });
      });
    });

    describe("#childUpdates", function() {
      it("does nothing when called", function() {
        PAGE.childUpdates({
          bar: 'baz'
        });
      });
    });

    describe("#onPageAppear", function() {
      it("does nothing when called", function() {
        PAGE.onPageAppear();
      });
    });

    describe("#pushNotificationTokenUpdated", function() {
      it("does nothing when called", function() {
        PAGE.pushNotificationTokenUpdated('token', 'type', 'error');
      });
    });

    describe("#notificationArrived", function() {
      it("does nothing when called", function() {
        PAGE.notificationArrived('payload', 'background');
      });
    });

    describe("#handleAppOpenURL", function() {
      it("does nothing when called", function() {
        PAGE.handleAppOpenURL('url');
      });
    });

    describe("#headerButtonTapped", function() {
      it("does nothing when called", function() {
        PAGE.headerButtonTapped("done");
      });
    });

  });
});
