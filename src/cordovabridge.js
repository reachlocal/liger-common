var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
var cordova = iOS ? 'cordova-ios' : 'cordova-android';

define([cordova], function() {
  var exec = cordova.require('cordova/exec');
  return {
    PAGE: null,

    openPage: function(title, page, args, options) {
      if (options === undefined) {
        options = {};
      }

      exec(null, null, "Liger", "openPage", [title, page, args, options]);
    },

    closePage: function() {
      exec(null, null, "Liger", "closePage", []);
    },

    closeToPage: function(page) {
      exec(null, null, "Liger", "closePage", [page]);
    },

    updateParent: function(args) {
      exec(null, null, "Liger", "updateParent", [null, args]);
    },

    updateParentPage: function(page, args) {
      exec(null, null, "Liger", "updateParent", [page, args]);
    },

    childUpdates: function(args) {
      PAGE.childUpdates(args);
    },

    openPageArguments: function(args) {
      PAGE.args = args;
    },

    getPageArgs: function() {
      var thePage = this.PAGE;
      exec(
        function(args) {
          thePage.gotPageArgs(args);
        },
        function(error) {
          return false;
        }, "Liger", "getPageArgs", []);
    },

    openDialog: function(page, args, options) {
      if (options === undefined) {
        options = {};
      }

      exec(null, null, "Liger", "openDialog", [page, args, options]);
    },

    openDialogWithTitle: function(title, page, args, options) {
      if (options === undefined) {
        options = {};
      }

      exec(null, null, "Liger", "openDialogWithTitle", [title, page, args, options]);
    },

    closeDialog: function(args) {
      exec(null, null, "Liger", "closeDialog", [args]);
    },

    closeDialogArguments: function(args) {
      PAGE.closeDialogArguments(args);
    },

    toolbar: function(items) {
      exec(null, null, "Liger", "toolbar", [items]);
    }
  };
});
