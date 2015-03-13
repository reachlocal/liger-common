define(['./cordovabridge'], function() {
  var bridge = require('cordovabridge');

  var PAGE = {
    page: null,
    args: null,
    toolbarItems: null,

    initialize: function(page) {
      this.page = page;
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
      PAGE.pageInit('deviceready');
    },

    pageInit: function(id) {
      this.startThePageMan();
    },

    startThePageMan: function() {
      bridge.getPageArgs();
    },

    gotPageArgs: function(args) {
      this.args = args;
      this.common();
      this[this.page]();
    },

    common: function() {
      this.addToolbar();
    },

    // API

    addToolbar: function() {
      if (PAGE.toolbarItems) {
        PAGE.toolbar(PAGE.toolbarItems);
      }
    },

    openPage: function(title, page, args, options) {
      bridge.openPage(title, page, args, options);
    },

    closePage: function() {
      bridge.closePage();
    },

    closeToPage: function(page) {
      bridge.closeToPage(page);
    },

    updateParent: function(args) {
      bridge.updateParent(args);
    },

    updateParentPage: function(page, args) {
      bridge.updateParentPage(page, args);
    },

    openDialog: function(page, args, options) {
      bridge.openDialog(page, args, options);
    },

    openDialogWithTitle: function(title, page, args, options) {
      bridge.openDialogWithTitle(title, page, args, options);
    },

    closeDialog: function(args) {
      bridge.closeDialog(args);
    },

    toolbar: function(items) {
      bridge.toolbar(items);
    },

    // Callbacks

    childUpdates: function(args) {},
    closeDialogArguments: function(args) {},
    handleAppOpenURL: function(url) {},
    headerButtonTapped: function(button) {},
    notificationArrived: function(payload, background) {},
    onPageAppear: function() {},
    pushNotificationTokenUpdated: function(token, type, error) {}
  };

  bridge.PAGE = PAGE;

  return PAGE;
});
