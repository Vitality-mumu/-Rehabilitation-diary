const app = getApp();
import http from "../../utils/http";
import * as echarts from "../../ec-canvas/echarts";
let chart1 = null;
let chart2 = null;
let chart3 = null;
let chart4 = null;
let chart5 = null;
let chart6 = null;

import {
  getOption1,
  getOption2,
  getOption3,
  getOption4,
  getOption5,
  getOption6,
} from "../../utils/ercharts";

Page({
  data: {
    x: 0,
    sex: null,
    tabsList: [
      "体温记录",
      "血压记录",
      "心率记录",
      "体重记录",
      "睡眠记录",
      "月经记录"
    ],
    tabsList2:[
      "体温记录",
      "血压记录",
      "心率记录",
      "体重记录",
      "睡眠记录",
      ""
    ],
    backstatus: true,
    Title: "数据统计",
    navBarHeight: app.globalData.navBarHeight,
    active: "体温记录",
    // 月经年份列表
    timeList: [],
    // 切换下拉框
    dropdownStatus: true,
    id: "",
    // 体温记录
    temperature: {
      lazyLoad: true,
    },
    // 血压记录
    blood: {
      lazyLoad: true,
    },
    // 心率记录
    heartRate: {
      lazyLoad: true,
    },
    // 体重记录
    weight: {
      lazyLoad: true,
    },
    // 睡眠记录
    sleep: {
      lazyLoad: true,
    },
    // 月经记录
    menstruation: {
      lazyLoad: true,
    },
    oneComponent: null,
    twoComponent: null,
    threeComponent: null,
    fourComponent: null,
    fiveComponent: null,
    sixComponent: null,
    data1: {},
    data2: {},
    data3: {},
    // 月经
    data4: {},
    // 查看月经的年份
    menstruationYear: null,
  },
  // 修改日期
  onChangeDate(e) {
    console.log(e.detail)
    this.setData({
      menstruationYear: e.detail,
    });
    console.log(e);
  },
  onOpenClick() {
    this.setData({
      dropdownStatus: false,
    });
  },
  onCloseClick() {
    this.setData({
      dropdownStatus: true,
    });
    console.log(this.data.data4.echars[this.data.menstruationYear])
    this.inint_six(this.data.data4.echars[this.data.menstruationYear]);
  },
  onReady() {
    //  初始化表格
    // this.oneComponent = this.selectComponent("#temperature");
    // this.twoComponent = this.selectComponent("#blood");
    // this.threeComponent = this.selectComponent("#heartRate");
    // this.fourComponent = this.selectComponent("#weight");
    // this.fiveComponent = this.selectComponent("#sleep");
    // this.sixComponent = this.selectComponent("#menstruation");
  },
  onLoad: function (options) {
    console.log(options.sex)
    this.setData({
      id: options.id,
      sex: options.sex
    },()=>{
      this.loadTemperature();
    });

    
    
  

  },

  switchTap(e) {
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    let itemWidth = screenWidth / 5;
    let {
      index,
      item
    } = e.currentTarget.dataset;
    const {
      tabsList
    } = this.data;
    let scrollX = itemWidth * index - itemWidth * 2;
    let maxScrollX = (tabsList.length + 1) * itemWidth;

    if (scrollX < 0) {
      scrollX = 0;
    } else if (scrollX >= maxScrollX) {
      scrollX = maxScrollX;
    }

    this.setData({
      x: scrollX,
      active: item,
    });

    this.triggerEvent("switchTap", item); //点击了导航,通知父组件重新渲染列表数据

    if (this.data.active == "体温记录") {
      this.loadTemperature();
    }
    if (this.data.active == "血压记录") {
      this.loadPressure();
    }
    if (this.data.active == "体重记录") {
      this.loadWeight();
    }
    if (this.data.active == "心率记录") {
      this.loadHreat();
    }
    if (this.data.active == "月经记录") {
      this.loadMenses();
    }

    if (this.data.active == "睡眠记录") {
      this.loadSleep();
    }
  },
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  inint_one(xdata, xValue) {
    this.oneComponent = this.selectComponent("#temperature");

    this.oneComponent.init((canvas1, width, height,dpr) => {
      chart1 = echarts.init(canvas1, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption1(chart1, xdata, xValue, this);
      chart1.finished = this.finish1();
      return chart1;
    });
  },
  finish1() {
    console.log('体温渲染完毕')
    console.log(this.selectComponent('#nav'));

  },

  inint_two(xdata, xValue) {
    this.twoComponent = this.selectComponent("#blood");
    this.twoComponent.init((canvas2, width, height,dpr) => {
      chart2 = echarts.init(canvas2, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption2(chart2, xdata, xValue);
      return chart2;
    });
  },

  inint_three(xdata, xValue) {
    this.threeComponent = this.selectComponent("#heartRate");
    this.threeComponent.init((canvas3, width, height,dpr) => {
      chart3 = echarts.init(canvas3, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption3(chart3, xdata, xValue);
      return chart3;
    });
  },

  inint_four(xdata, xValue) {
    this.fourComponent = this.selectComponent("#weight");
    this.fourComponent.init((canvas4, width, height,dpr) => {
      chart4 = echarts.init(canvas4, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption4(chart4, xdata, xValue);
      return chart4;
    });
  },
  inint_five(xdata, xValue) {
    this.fiveComponent = this.selectComponent("#sleep");
    this.fiveComponent.init((canvas5, width, height,dpr) => {
      chart5 = echarts.init(canvas5, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption5(chart5, xdata, xValue);
      return chart5;
    });
  },
  inint_six(data) {
    this.sixComponent = this.selectComponent("#menstruation");
    this.sixComponent.init((canvas6, width, height,dpr) => {
      chart6 = echarts.init(canvas6, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr,
      });
      getOption6(chart6, data);
      return chart6;
    });
  },

  // 请求体温数据
  async loadTemperature() {
    try {
      let res = await http.loadTemperature(
        wx.getStorageSync("token"),
        this.data.id
      );
      this.inint_one(res.dateList, res.echars);

      this.setData({
        data1: res.temperature,
      });
    } catch (ex) {
      console.log(ex);
    }
  },

  // 请求血压数据
  async loadPressure() {
    try {
      let res = await http.loadPressure(
        wx.getStorageSync("token"),
        this.data.id
      );
      this.inint_two(res.dateList, res.echars);
      this.setData({
        data2: res.temperature,
      });
    } catch (ex) {
      console.log(ex);
    }
  },

  // 请求心率
  async loadHreat() {
    try {
      let res = await http.loadHreat(wx.getStorageSync("token"), this.data.id);
      this.oneComponent = this.selectComponent("#temperature");
      this.inint_three(res.dateList, res.echars);
      this.setData({
        data3: res.temperature,
      });
    } catch (ex) {
      console.log(ex);
    }
  },
  // 请求体重
  async loadWeight() {
    try {
      let res = await http.loadWeight(wx.getStorageSync("token"), this.data.id);
      this.inint_four(res.dateList, res.echars);
    } catch (ex) {
      console.log(ex);
    }
  },

  // 请求睡眠
  async loadSleep() {
    try {
      let res = await http.loadSleep(wx.getStorageSync("token"), this.data.id);
      this.inint_five(res.dateList, res.echars);
    } catch (ex) {
      console.log(ex);
    }
  },

  // 请求月经
  async loadMenses() {
    try {
      let res = await http.loadMenses(wx.getStorageSync("token"), this.data.id);
      this.setData({
        menstruationYear: res.dateList[0],
        timeList: res.dateList.map((item) => {
          return {
            value: item,
            text: item,
          };
        }),
        data4: res,
      });
      this.inint_six(res.echars[this.data.menstruationYear]);
    } catch (ex) {
      console.log(ex);
    }
  },
});