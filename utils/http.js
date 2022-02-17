// 默认地址
const URL_ROOT = "https://wanbei.site/api/temperature";
// https://wanbei.site/api/temperature
// http://wanbei.site/api/temperature
let count = 0;
const request = (url, method, data = null) => {
  count++;
  wx.showLoading({
    title: '加载中'
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL_ROOT + url,
      method,
      data,
      header: {
        token: wx.getStorageSync("token").token,
      },

      success: (res) => {
        if (res.data.code == 1) {
          resolve(res.data.data);
        }
        if(res.data.code == 0){
          resolve(res.data.msg);
        }
      },
      fail: () => {
        reject('失败');
      },
      complete: () => {
        count--;
        if (count == 0) {
          wx.hideLoading();
        }
      },
    });
  });
};
let get = (url, data) => {
  return request(url, "GET", data);
};
let post = (url, data) => {
  return request(url, "POST", data);
};
module.exports = {
  login(data) {
    return post("/indexpro/login", data);
  },
  // 加载用户列表
  loadList(page) {
    return get(`/indexpro/userlist?page=${page}`);
  },
  //搜索用户
  searchUser(username) {
    return get(`/indexpro/search?username=${username}`);
  },
  //添加患者
  AddUser(data) {
    return post("/indexpro/addUser", data);
  },
  // 获取用户接口
  loadUser(userId, recordDate) {
    return post("/indexpro/userDetail", {
      userId,
      recordDate,
    });
  },
  // 增加体温
  AddTemperature(userId, temperature,recordDate) {
    return post("/indexpro/recordtemperature", {
      userId,
      temperature,
      recordDate
    });
  },
  // 增加血压
  AddPressure(userId, systolicPressure, diastolicPressure,recordDate) {
    return post("/indexpro/recordpressure", {
      userId,
      systolicPressure,
      diastolicPressure,
      recordDate
    });
  },
  // 增加心率
  addHeartRate(userId, heartRate,recordDate) {
    return post("/indexpro/recordheartrate", {
      userId,
      heartRate,
      recordDate
    });
  },
  // 增加体重
  addWeight(userId, weight,recordDate) {
    return post("/indexpro/recordweight", {
      userId,
      weight,
      recordDate
    });
  },
  // 增加睡眠
  addSleep(userId, sleepTime, wakeTime, wakeUpTimes,recordDate) {
    return post("/indexpro/recordsleep", {
      userId,
      sleepTime,
      wakeTime,
      wakeUpTimes,
      recordDate
    });
  },
  // 增加月经
  addMenses(userId, status,recordDate) {
    return post("/indexpro/recordmenses", {
      userId,
      status,
      recordDate
    });
  },

  // 请求体温
  loadTemperature(token,userId) {
    return post("/indexpro/temperaturestatistics", {
      token,userId
    });
  },
  // 请求血压
  loadPressure(token,userId){
    return post("/indexpro/pressurestatistics", {
      token,userId
    });
  },
  // 请求心率
  loadHreat(token,userId){
    return post('/indexpro/heartstatistics',{
      token,userId
    })

  },
  // 请求体重
  loadWeight(token,userId){
    return post('/indexpro/weightStatistics',{
      token,userId
    })
  },
  // 请求睡眠
  loadSleep(token,userId){
    return post('/indexpro/sleepStatistics',{
      token,userId
    })
  },
  // 请求月经
  loadMenses(token,userId){
    return post('/indexpro/mensesStatistics',{
      token,userId
    })
  }
};
