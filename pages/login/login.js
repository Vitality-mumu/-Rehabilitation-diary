/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2021-11-01 14:58:28
 * @LastEditors: ðð½ððð¾ð¸.
 * @LastEditTime: 2022-02-08 10:54:18
 */
const app = getApp();
import http from "../../utils/http";
Page({
  /**
   * é¡µé¢çåå§æ°æ®
   */
  data: {
    backstatus: false,
    title: "ç»å½",
    navBarHeight: app.globalData.navBarHeight,
    // ç¨æ·å
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
        title: "è¯·åæç»å½æå¡åè®®åéç§æ¿ç­",
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
        // è·åsession
        wx.setStorageSync("token", res);
        wx.switchTab({
          url: "/pages/home/home",
        });
      } else {
        wx.showToast({
          title: "ç»å½å¤±è´¥",
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
