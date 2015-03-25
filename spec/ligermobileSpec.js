define(['ligermobile', 'cordovabridge'], function() {
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
      var lm = require('ligermobile');
      var bridge = require('cordovabridge');
      spyOn(bridge, 'bindEvents');

      lm.initialize('page_example');

      expect(lm.page).toBe('page_example');
      expect(bridge.bindEvents).toHaveBeenCalled();
    });

    it('gets the page\'s args', function() {
      var lm = require('ligermobile');
      var bridge = require('cordovabridge');
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
        var lm = require('ligermobile');
        var bridge = require('cordovabridge');
        spyOn(bridge, 'getPageArgs');
        lm.pageInit();

        expect(bridge.getPageArgs).toHaveBeenCalled();
      });
    });

    describe("#gotPageArgs", function() {
      beforeEach(function() {
        var lm = require('ligermobile');
        lm.page = "page_example";
        lm.args = null;

        lm.page_example = function() {};
      });

      afterEach(function() {
        var lm = require('ligermobile');
        delete lm.page_example;
      });

      it("should set the page args", function() {
        var lm = require('ligermobile');
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.args).toEqual({
          'foo': 'bar'
        });
      });

      it("should call common", function() {
        var lm = require('ligermobile');
        spyOn(lm, 'common');
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.common).toHaveBeenCalled();
      });

      it("should call the lm.page", function() {
        var lm = require('ligermobile');
        spyOn(lm, 'page_example');
        lm.gotPageArgs({
          'foo': 'bar'
        });

        expect(lm.page_example).toHaveBeenCalled();
      });
    });

    describe("#common", function() {
      it("should call addToolbar", function() {
        var lm = require('ligermobile');
        spyOn(lm, 'addToolbar');
        lm.common();

        expect(lm.addToolbar).toHaveBeenCalled();
      });
    });

    describe("LIGER api", function() {

    });

    describe('page API', function() {
      describe("#addToolbar", function() {
        it("should do nothing if toolbarItems is null", function() {
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
          spyOn(bridge, 'toolbar');

          lm.addToolbar();

          expect(bridge.toolbar).not.toHaveBeenCalled();
        });

        it("should initialize the toolbar if toolbarItems are set", function() {
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
          spyOn(bridge, 'toolbar');
          lm.toolbarItems = [{}, {}];
          lm.addToolbar();

          expect(bridge.toolbar).toHaveBeenCalledWith(lm.toolbarItems);
        });
      });

      describe("#openPage", function() {
        it("opens a new page if the current page is a collection page", function() {
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
          spyOn(bridge, 'closePage');

          lm.closePage();

          expect(bridge.closePage).toHaveBeenCalled();
        });
      });

      describe("#closeToPage", function() {
        it("closes the current page and all previous pages until the named page is found (if in a collection and not the last page)", function() {
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
          spyOn(bridge, 'closeToPage');
          lm.closeToPage('test');

          expect(bridge.closeToPage).toHaveBeenCalledWith('test');
        });
      });

      describe("#updateParent", function() {
        it("update the parent's page with a json structure", function() {
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');

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
          var lm = require('ligermobile');
          var bridge = require('cordovabridge');
          spyOn(bridge, 'toolbar');

          lm.toolbar(['test', 'test1', 'test2']);

          expect(bridge.toolbar).toHaveBeenCalledWith(['test', 'test1', 'test2']);
        });
      });


    }); // 'page API'

  });
});
