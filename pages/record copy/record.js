const app = getApp();
import { formatTime } from "../../utils/util.js";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast.js";
import http from "../../utils/http.js";
Page({
  data: {
    scrollable: true, // 页面是否可滚动
    backstatus: true,
    Title: "个人信息",
    navBarHeight: app.globalData.navBarHeight,
    // 遮罩层
    temperatureShow: false,
    pressureShow: false,
    heartrateShow: false,
    weightShow: false,
    sleepShow: false,
    timePicker1: false,
    timePicker2: false,
    // 每次新增的温度
    temperature: '',
    // 血压
    systolicPressure: '',
    diastolicPressure: '',
    // 心率
    heartrate: '',
    // 体重
    weight: '',
    // 睡眠
    sleepTime: '',
    wakeTime: '',
    wakeUpTimes: 0,
    // 时间列表
    timeList: [],
    // 当前时间
    date: "",
    // 当天
    currentDate: "",
    id: "",
    // 数据
    data: {
      temperature: {},
      weight: {
        recentRecordTime: "",
        val: "",
      },
      pressure: {
        recentRecordTime: "",
        systolicPressure: "",
        diastolicPressure: "",
      },
      heart_rate: {
        recentRecordTime: "",
        val: "",
      },
      menses: {
        recentRecordTime: "",
        status: "",
        startTime: "",
        endTime: "",
      },
      sleep: {
        recentRecordTime: "",
        sleepTime: "",
        wakeTime: "",
        wakeUpTimes: "",
        sleepDuration: "",
      },
    },
    title1: "请选择时间",
    title2: "请选择时间",
    currentDate1: "20:00",
    currentDate2: "6:00",
    mensesStatus: 0,
    userData: null,
  },

  onInputChange(e) {
    console.log(e.detail)
    this.setData({
      temperature: e.detail.value,
    });

    
    
  },

  onSystolicPressureChange(e) {
    console.log(e.detail)

    this.setData({
      systolicPressure: e.detail.value,
    });
  },

  onDiastolicPressureChange(e) {
    console.log(e.detail)

    this.setData({
      diastolicPressure:e.detail.value,
    });
  },
  onHeartrateChange(e) {
    console.log(e.detail)

    this.setData({
      heartrate: e.detail.value,
    });
  },
  onWeightChange(e) {
    this.setData({
      weight:  e.detail.value,
    });
  },
  onwakeUpTimesChange(e) {
    console.log(e.detail);
    this.setData({
      wakeUpTimes: e.detail.value,
    });
  },
  // 体温
  onAddClick() {
    this.setData({
      temperatureShow: true,
    });
  },
  onCancelClick() {
    this.setData({
      temperatureShow: false,
      temperature:null,
    });
  },
  onOkClick() {
   
      this.addTemperature();
  
  },
  // 血压
  onPressureShow() {
    this.setData({
      pressureShow: true,
    });
  },

  onPressureCancel() {
    this.setData({
      pressureShow: false,
      systolicPressure: null,
      diastolicPressure: null,
    });
  },
  onPressureOk() {
    // 血压发送请求
    this.AddPressure();
    
   
   
  },

  // 心率
  onHeartrateShow() {
    this.setData({
      heartrateShow: true,
    });
  },

  onHeartrateCancel() {
    this.setData({
      heartrateShow: false,
    });
  },
  onHeartrateOk() {
    this.addHeartRate();
    
  },
  // 体重
  onWeightShow() {
    this.setData({
      weightShow: true,
    });
  },
  onWeightCancel() {
    this.setData({
      weightShow: false,
    });
  },
  onWeightOk() {
    this.addWeight();
  },
  // 睡眠
  onSleepShow() {
    this.setData({
      sleepShow: true,
    });
  },
  onDisplay1() {
    this.setData({
      timePicker1: true,
    });
  },
  ontimePicker1Close() {
    this.setData({
      timePicker1: false,
    });
  },
  onConfirm1Time(e) {
    this.setData({
      sleepTime: e.detail,
      timePicker1: false,
      title1: "",
    });
  },

  onCancel1Time() {
    this.setData({
      timePicker1: false,
    });
  },

  onDisplay2() {
    this.setData({
      timePicker2: true,
    });
  },
  ontimePicker2Close() {
    this.setData({
      timePicker2: false,
    });
  },
  onConfirm2Time(e) {
    console.log(e);
    this.setData({
      wakeTime: e.detail,
      timePicker2: false,
      title2: "",
    });
  },

  onCancel2Time() {
    this.setData({
      timePicker2: false,
    });
  },

  onsleepCancel() {
    this.setData({
      sleepShow: false,
    });
  },

  onsleepOk() {
    this.addSleep();

  },
  onErchartsClick() {
    // 记录信息
    wx.navigateTo({
      url: `/pages/ercharts/ercharts?id=${this.data.userData.id}&&sex=${this.data.userData.gender}`,
    });
  },
  onChangeDate(e) {
    this.setData(
      {
        date: e.detail,
      },
      () => {
        this.loadUser();
      }
    );
  },
  onOpenDropdown() {
    this.setData({
      scrollable: false
    })
  },
  onCloseDropdown() {
    this.setData({
      scrollable: true
    })
  },
  // 开始
  onStartClick(e) {
    // 传1
    if (this.data.data.menses.recentRecordTime.split(' ')[0]==this.data.currentDate) {
      wx.showToast({
        title: '请勿重复记录',
        icon: 'error',
        duration: 2000
      })
    } else {
      console.log(this.data.mensesStatus)
      if (this.data.mensesStatus == 1) {
        return;
      }
      this.setData({
        mensesStatus: 1,
      });
      this.addMenses();
    }
  },
  // 结束
  onEndClick(e) {
    // 传0
    if (this.data.data.menses.recentRecordTime.split(' ')[0]==this.data.currentDate) {
      wx.showToast({
        title: '请勿重复记录',
        icon: 'error',
        duration: 2000
      })
    } else {
      console.log(this.data.mensesStatus)
      if (this.data.mensesStatus == 0) {
        return;
      }
      this.setData({
        mensesStatus: 0,
      });
      this.addMenses();
    }
  },
  onLoad: function (options) {
    
    const date = new Date();
    let temp = this.data.timeList;
    temp.push({
      value: formatTime(date),
      text: formatTime(date),
    });
    this.setData({
      date: formatTime(date),
      currentDate: formatTime(date),
      timeList: temp,
    });
    console.log(this.data.date)
    this.setData(
      {
        id: options.id,
      },
      () => {
        this.loadUser();
      }
    );
    
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  async loadUser() {
    try {
      console.log(this.data.date)
      let res = await http.loadUser(this.data.id, this.data.date);
      if (res.record.menses) {
        // 如果有
        this.setData({
          mensesStatus: res.record.menses.status,
        });
      }
      this.setData({
        timeList: res.dateList.map((item) => {
          return {
            value: item.record_date,
            text: item.record_date,
          };
        }),
        data: res.record,
        userData: res.userData,
      });
    } catch (ex) {
      console.log(ex);
    }
  },
  // 增加心率
  async addHeartRate() {
    try {
      let res = await http.addHeartRate(this.data.id, this.data.heartrate);
      this.setData({
        heartrateShow: false,
        heartrate: null,
      });
      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },

  // 增加体温
  async addTemperature() {
    try {
      console.log(this.data.temperature);
      let res = await http.AddTemperature(this.data.id, this.data.temperature);
      this.setData({
        temperatureShow: false,
        temperature: "",
      });
      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },
  // 增加血压
  async AddPressure() {
    try {
      let res = await http.AddPressure(
        this.data.id,
        this.data.systolicPressure,
        this.data.diastolicPressure
      );
      console.log('清空')
      // 清空
      this.setData({
        pressureShow: false,
        systolicPressure: null,
        diastolicPressure: null,
      });
      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },
  // 增加体重
  async addWeight() {
    try {
      let res = await http.addWeight(this.data.id, this.data.weight);
      this.setData({
        weightShow: false,
        weight:null
      });
      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },

  // 增加睡眠
  async addSleep() {
    try {
      let res = await http.addSleep(
        this.data.id,
        this.data.sleepTime,
        this.data.wakeTime,
        this.data.wakeUpTimes,
      );
        this.setData({
          sleepTime:'20:00',
          wakeTime:'6:00',
          wakeUpTimes:0,
          sleepShow: false
        })

      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },
  // 月经
  async addMenses() {
    try {
      let res = await http.addMenses(this.data.id, this.data.mensesStatus);
      console.log(res);
      if (res) {
        if (this.data.mensesStatus == 1) {
          this.setData({
            mensesStatus: 0,
          });
        } else {
          this.setData({
            mensesStatus: 1,
          });
        }
      }
      this.loadUser();
    } catch (ex) {
      console.log(ex);
    }
  },
});
