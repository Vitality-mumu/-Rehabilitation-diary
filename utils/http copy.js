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
    return post("/index/login", data);
  },
  // 加载用户列表
  loadList(page) {
    return get(`/index/userlist?page=${page}`);
  },
  //搜索用户
  searchUser(username) {
    return get(`/index/search?username=${username}`);
  },
  //添加患者
  AddUser(data) {
    return post("/index/addUser", data);
  },
  // 获取用户接口
  loadUser(userId, recordDate) {
    return post("/index/userDetail", {
      userId,
      recordDate,
    });
  },
  // 增加体温
  AddTemperature(userId, temperature) {
    return post("/index/recordtemperature", {
      userId,
      temperature,
    });
  },
  // 增加血压
  AddPressure(userId, systolicPressure, diastolicPressure) {
    return post("/index/recordpressure", {
      userId,
      systolicPressure,
      diastolicPressure,
    });
  },
  // 增加心率
  addHeartRate(userId, heartRate) {
    return post("/index/recordheartrate", {
      userId,
      heartRate,
    });
  },
  // 增加体重
  addWeight(userId, weight) {
    return post("/index/recordweight", {
      userId,
      weight,
    });
  },
  // 增加睡眠
  addSleep(userId, sleepTime, wakeTime, wakeUpTimes,dream) {
    return post("/index/recordsleep", {
      userId,
      sleepTime,
      wakeTime,
      wakeUpTimes,
      dream
    });
  },
  // 增加月经
  addMenses(userId, status) {
    return post("/index/recordmenses", {
      userId,
      status,
    });
  },

  // 请求体温
  loadTemperature(token,userId) {
    return post("/index/temperaturestatistics", {
      token,userId
    });
  },
  // 请求血压
  loadPressure(token,userId){
    return post("/index/pressurestatistics", {
      token,userId
    });
  },
  // 请求心率
  loadHreat(token,userId){
    return post('/index/heartstatistics',{
      token,userId
    })

  },
  // 请求体重
  loadWeight(token,userId){
    return post('/index/weightStatistics',{
      token,userId
    })
  },
  // 请求睡眠
  loadSleep(token,userId){
    return post('/index/sleepStatistics',{
      token,userId
    })
  },
  // 请求月经
  loadMenses(token,userId){
    return post('/index/mensesStatistics',{
      token,userId
    })
  }
};
