App({
  onLaunch() {
    const that = this;
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    that.globalData.menuHeight = menuButtonInfo.height;
  },
  globalData: {
    userInfo: null
  }
})
