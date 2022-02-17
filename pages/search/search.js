const app = getApp();
import {
  searchUser
} from '../../utils/http'
Page({
  data: {
    backstatus: true,
    title: '搜索',
    navBarHeight: app.globalData.navBarHeight,
    historyList: [],
    value: '',
    resList: [],
    resStatus: false,
    searchTxt:'取消'
  },

  onFocusClick() {
    
    this.setData({
      resStatus: false,
      searchTxt:'取消'
    })
  },
  onChangeClick(e) {
    this.setData({
      value: e.detail
    })
  },

  onGoRecord(e) {
    wx.navigateTo({
      url: `/pages/record/record?id=${ parseInt(e.currentTarget.dataset.index) }`,
    })
  },

  onHistoryClick(e){
    let value =e.target.dataset.item;
    this.setData({
      value
    })
    this.onConfirmClick();

  },
  


  onConfirmClick(e) {
    if(!this.data.value){
      // 输入为空不能搜索
      return ;
    }
    // 发送请求
    this.searchUser();
    // 生成历史记录
    let temp = this.data.historyList;
    if (temp.includes(this.data.value)) {
      let index = temp.indexOf(this.data.value);
      temp.unshift(...temp.splice(index, 1));
    } else {
      temp.unshift(this.data.value);
    }
    this.setData({
      resStatus: true,
      historyList: temp,
      searchTxt:'完成'
    }, () => {
      wx.setStorageSync('history', temp)
    })
  },
  onCancelClick() {
    this.setData({
      value: '',
      resStatus: false
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync('history')) {
      this.setData({
        historyList: wx.getStorageSync('history')
      })
    }
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },


  async searchUser() {
    try {
      let res = await searchUser(this.data.value);
      this.setData({
        resList: res
      })
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }
})