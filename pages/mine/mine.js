const app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast.js";
import { AddUser } from "../../utils/http";
Page({
  data: {
    backstatus: false,
    Title: "添加患者",
    navBarHeight: app.globalData.navBarHeight,
    // 图标
    icon: {
      normal: "../../assets/image/white-radio.png",
      active: "../../assets/image/blue-radio.png",
    },
    //入院时间
    date: "",
    // 性别
    radio: "1",
    //  姓名
    name: "",
    // 年龄
    age: "",
    // 身份证号
    Id: "",
    // 病症
    cancer: "",
    // 手机号
    phone:'',
    show: false,
    title: "选择患者入院时间",
    imgSrc: "",
    currentDate: new Date().getTime(),
    minDate: new Date(1700, 1, 1).getTime(),
    maxDate: new Date().getTime(),
  },
  add0(m) {
    return m < 10 ? "0" + m : m;
  },
  formatter(value) {
    var time = new Date(value);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + "-" + this.add0(m) + "-" + this.add0(d);
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onConfirmTime() {
    let that = this;
    this.setData({
      show: false,
      date: that.formatter(that.data.currentDate),
      title: "",
    });
  },
  onCancelTime() {
    this.setData({
      show: false,
    });
  },

  // radio的切换
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onDisplay() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onConfirm(event) {
    let date = new Date(event.detail);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(date);
    this.setData({
      show: false,
      title: "",
      // 入园时间
      date,
    });
  },
  onNameChange(e) {
    this.setData({
      name: e.detail,
    });
  },

  onCancerChange(e) {
    this.setData({
      cancer: e.detail,
    });
  },
  onAgeChange(e) {
    this.setData({
      age: e.detail,
    });
  },
  onIdChange(e) {
    this.setData({
      Id: e.detail,
    });
  },

  onPhoneChange(e){
    this.setData({
      phone:e.detail,
    })
  },

  onPostClick() {
    let temp = {
      username: this.data.name,
      age: this.data.age,
      gender: this.data.radio,
      idCard: this.data.Id,
      joinDate: this.data.date,
      cancer: this.data.cancer,
      mobile: this.data.phone
    };

    if (this.data.date && this.data.name && this.data.age && this.data.Id) {
      let that = this;

      if (this.data.imgSrc != "") {
        // 有头像
        wx.uploadFile({
          url: "https://wanbei.site/api/temperature/index/addUser",
          filePath: that.data.imgSrc,
          name: "file",
          formData: temp,
          header: {
            token: wx.getStorageSync("token").token,
          },
          success(res) {
            console.log(res);
            let status = JSON.parse(res.data);
            if (status.code == 0) {
              Toast("添加失败,身份证错误");
              that.setData({
                Id: "",
              });
            }
            if (status.code == 1) {
              // 提交
              Toast("添加成功！");
              // 重置
              that.setData({
                date: "",
                name: "",
                age: "",
                Id: "",
                radio: "1",
                imgSrc: "",
                cancer: "",
                phone:"",
                title: "请输入住院时间",
              });
            }
          },
          fail() {
            // 提交
            Toast("添加失败！");
          },
        });
      } else {
        // 没头像
        console.log("没头像");
        this.AddUser();
      }
    }
  },
  onChangeImg() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const imgSrc = res.tempFilePaths;
        that.setData({
          imgSrc: imgSrc[0],
        });
      },
    });
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  async AddUser() {
    try {
      let res = await AddUser({
        username: this.data.name,
        age: this.data.age,
        gender: this.data.radio,
        idCard: this.data.Id,
        joinDate: this.data.date,
        cancer: this.data.cancer,
        mobile:this.data.phone
      });

      if (res == "idCard error") {
        Toast("添加失败,身份证错误");
        this.setData({
          Id: "",
        });
      } else if (res == "user exists"){
        Toast("添加失败,请勿重复添加用户");
        this.setData({
          Id: "",
        });
      }else{
        Toast("添加成功");
        // 重置
        this.setData({
          date: "",
          name: "",
          age: "",
          Id: "",
          radio: "1",
          imgSrc: "",
          cancer: "",
          title: "选择患者入院时间",
        });
      }
    } catch (ex) {
      Toast("添加" + ex);
    }
  },
});
