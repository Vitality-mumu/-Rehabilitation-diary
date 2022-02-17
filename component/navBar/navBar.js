const app = getApp()
Component({
  properties: {
    //是否带返回键
    showBack: {
      type: Boolean,
      value: false
    },
    // 标题
    pageName: String,
    bgc:String
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },
  methods: {
    onBackClick() {
 
      wx.navigateBack();
    }
  }
})
