var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
var cordova = iOS ? 'cordova-ios' : 'cordova-android';

define([cordova], function() {
  var exec = cordova.require('cordova/exec');
  var cordovabridge = {
    PAGE: null,
    exec:cordova.require('cordova/exec'),

    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
      cordovabridge.PAGE.pageInit('deviceready');
    },

    // Bridge
    openPage: function(title, page, args, options) {
      if (options === undefined) {
        options = {};
      }

      this.exec(null, null, "Liger", "openPage", [title, page, args, options]);
    },

    closePage: function() {
      this.exec(null, null, "Liger", "closePage", []);
    },

    closeToPage: function(page) {
      this.exec(null, null, "Liger", "closeToPage", [page]);
    },

    updateParent: function(args) {
      this.exec(null, null, "Liger", "updateParent", [null, args]);
    },

    updateParentPage: function(page, args) {
      this.exec(null, null, "Liger", "updateParent", [page, args]);
    },

    getPageArgs: function() {
      var page = cordovabridge.PAGE;
      this.exec(
        function(args) {
          cordovabridge.PAGE.gotPageArgs(args);
        },
        function(error) {
          return false;
        }, "Liger", "getPageArgs", []);
    },

    openDialog: function(page, args, options) {
      if (options === undefined) {
        options = {};
      }

      this.exec(null, null, "Liger", "openDialog", [page, args, options]);
    },

    openDialogWithTitle: function(title, page, args, options) {
      if (options === undefined) {
        options = {};
      }

      this.exec(null, null, "Liger", "openDialogWithTitle", [title, page, args, options]);
    },

    closeDialog: function(args) {
      this.exec(null, null, "Liger", "closeDialog", [args]);
    },

    closeDialogArguments: function(args) {
      cordovabridge.PAGE.closeDialogArguments(args);
    },

    toolbar: function(items) {
      this.exec(null, null, "Liger", "toolbar", [items]);
    }
  };
  return cordovabridge;
});
