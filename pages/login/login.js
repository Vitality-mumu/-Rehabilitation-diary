/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2021-11-01 14:58:28
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-02-08 10:54:18
 */
const app = getApp();
import http from "../../utils/http";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backstatus: false,
    title: "登录",
    navBarHeight: app.globalData.navBarHeight,
    // 用户名
    user: "",
    pass: "",
    radio: "",
  },
  onChange(e) {
    this.setData({
      radio: e.detail,
    });
  },
  onUserChange(e) {
    this.setData({
      user: e.detail,
    });
  },
  onPassChange(e) {
    this.setData({
      pass: e.detail,
    });
  },
  onLoginClick(e) {
    if (!(this.data.user && this.data.pass)) {
      return;
    }

    if (this.data.radio == 1) {
      this.login();
    } else {
      wx.showToast({
        title: "请同意登录服务协议和隐私政策",
        icon: "none"
      });
    }
  },
  async login() {
    try {
      let res = await http.login({
        username: this.data.user,
        password: this.data.pass,
      });
      if (res.token) {
        // 获取session
        wx.setStorageSync("token", res);
        wx.switchTab({
          url: "/pages/home/home",
        });
      } else {
        wx.showToast({
          title: "登录失败",
          icon: "error",
          duration: 2000,
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  },

  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},

  onShareAppMessage: function () {},
});
