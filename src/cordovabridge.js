var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
var cordova = iOS ? 'cordova-ios' : 'cordova-android';

define([cordova], function() {
  var cordovabridge = {
    exec: cordova.require('cordova/exec'),

    bindEvents: function(onDeviceReady) {
      document.addEventListener('deviceready', onDeviceReady, false);
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

    getPageArgs: function(callback) {
      var error = function(error) {
        return false;
      };
      this.exec(callback, error, "Liger", "getPageArgs", []);
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
      PAGE.closeDialogArguments(args);
    },

    toolbar: function(items) {
      this.exec(null, null, "Liger", "toolbar", [items]);
    },

    // Callbacks
    addChildUpdates: function(childUpdate) {
      PAGE._addCallback('childUpdates', childUpdate);
    },

    addCloseDialogArguments: function(args) {
      PAGE._addCallback('closeDialogArguments', args);
    },

    addHandleAppOpenURL: function(handleAppOpenURL) {
      PAGE._addCallback('handleAppOpenURL', handleAppOpenURL);
    },

    addHeaderButtonTapped: function(headerButtonTapped) {
      PAGE._addCallback('headerButtonTapped', headerButtonTapped);
    },

    addNotificationArrived: function(notification) {
      PAGE._addCallback('notificationArrived', notification);
    },

    addOnPageAppear: function(pageAppear) {
      PAGE._addCallback('onPageAppear', pageAppear);
    },
    addPushNotificationTokenUpdated: function(pushNotificationTokenUpdated) {
      PAGE._addCallback('pushNotificationTokenUpdated', pushNotificationTokenUpdated);
    }
  };
  return cordovabridge;
});

var PAGE = {
  childUpdates: function(updates) {
    this._callCallback('childUpdates', updates);
  },
  closeDialogArguments: function(args) {
    this._callCallback('closeDialogArguments', args);
  },
  handleAppOpenURL: function(url) {
    this._callCallback('handleAppOpenURL', url);
  },
  headerButtonTapped: function(button) {
    this._callCallback('headerButtonTapped', button);
  },
  notificationArrived: function(payload, background) {
    this._callCallback('notificationArrived', payload, background);
  },
  onPageAppear: function() {
    this._callCallback('onPageAppear');
  },
  pushNotificationTokenUpdated: function(token, type, error) {
    this._callCallback('pushNotificationTokenUpdated', token, type, error);
  },

  // Callback API
  _callbacks: {},

  _addCallback: function(type, callback) {
    if (this._callbacks[type] === undefined) {
      this._callbacks[type] = [];
    }
    this._callbacks[type].push(callback);
  },

  _callCallback: function(type) {
    var callbacks = this._callbacks[type];
    for (var i = 0; i < callbacks.length; i++) {
      switch (arguments.length) {
        case 2:
          callbacks[i](arguments[1]);
          break;
        case 3:
          callbacks[i](arguments[1], arguments[2]);
          break;
        case 4:
          callbacks[i](arguments[1], arguments[2], arguments[3]);
          break;
        default:
          callbacks[i]();
          break;
      }
    }
  }
};
