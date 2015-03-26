define(['cordovabridge'], function() {
  var bridge = require('cordovabridge');

  var PAGE = {
    page: null,
    args: null,
    toolbarItems: null,

    initialize: function(page) {
      this.page = page;
      bridge.bindEvents(PAGE.pageInit);
    },

    pageInit: function() {
      bridge.getPageArgs(PAGE.gotPageArgs);
    },

    gotPageArgs: function(args) {
      PAGE.args = args;
      PAGE.common();
      PAGE[PAGE.page]();
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

    addChildUpdates: function(childUpdate) {
      bridge.addChildUpdates(childUpdate);
    },

    addHandleAppOpenURL: function(handleAppOpenURL) {
      bridge.addHandleAppOpenURL(handleAppOpenURL);
    },

    addCloseDialogArguments: function(closeDialogArguments) {
      bridge.addCloseDialogArguments(closeDialogArguments);
    },

    addHeaderButtonTapped: function(headerButtonTapped) {
      bridge.addHeaderButtonTapped(headerButtonTapped);
    },

    addNotificationArrived: function(notificationArrived) {
      bridge.addNotificationArrived(notificationArrived);
    },

    addOnPageAppear:function(pageAppear) {
      bridge.addOnPageAppear(pageAppear);
    },

    addPushNotificationTokenUpdated:function(pushNotificationTokenUpdated) {
      bridge.addPushNotificationTokenUpdated(pushNotificationTokenUpdated);
    },
  };

  return PAGE;
});
