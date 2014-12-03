var PAGE = {
  page: null,
  args: null,
  toolbarItems: null,
  userCanRefresh: false,

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
    LIGER.getPageArgs();
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

  setupRefresh: function() {
    LIGER.userCanRefresh(this.userCanRefresh);
  },

  openPage: function(title, page, args, options) {
    LIGER.openPage(title, page, args, options);
  },

  closePage: function() {
    LIGER.closePage();
  },

  closeToPage: function(page) {
    LIGER.closeToPage(page);
  },

  updateParent: function(args) {
    LIGER.updateParent(args);
  },

  updateParentPage: function(page, args) {
    LIGER.updateParentPage(page, args);
  },

  openDialog: function(page, args, options) {
    LIGER.openDialog(page, args, options);
  },

  openDialogWithTitle: function(title, page, args, options) {
    LIGER.openDialogWithTitle(title, page, args, options);
  },

  closeDialog: function(args) {
    LIGER.closeDialog(args);
  },

  toolbar: function(items) {
    LIGER.toolbar(items);
  },

  canRefresh: function() {
    LIGER.userCanRefresh(PAGE.userCanRefresh);
  },

  // Callbacks

  childUpdates: function(args) {},
  closeDialogArguments: function(args) {},
  handleAppOpenURL: function(url) {},
  headerButtonTapped: function(button) {},
  notificationArrived: function(payload, background) {},
  onPageAppear: function() {},
  pushNotificationTokenUpdated: function(token, type, error) {},
  refresh: function(user) {}
};
