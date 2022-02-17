const http = require("../../utils/http");

const app = getApp();
Page({
  data: {
    backstatus:false,
    title:'首页',
    navBarHeight: app.globalData.navBarHeight,
    // 数据
    list:[],
     //入院时间
     date: '',
     show: true,
    //  当前页
    page:1,
    // 到底刷新
    ReachStatus:true
  },

  onAdd(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  onGoSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onGoRecord(e){
        wx.navigateTo({
      
      url: `/pages/record/record?id=${this.data.list[parseInt(e.currentTarget.dataset.index)].id }`,
    })
  },


  async loadList(){
    try{
      let res = await http.loadList(this.data.page);
      console.log(res);
      let temp = this.data.list;
      let tempPage = ++this.data.page;
      if(res&&this.data.ReachStatus){
        temp.push(...res);
      }
      if(JSON.stringify(res) =='[]'){
        this.setData({
          ReachStatus:false
        })
      }
      if(res){
        this.setData({
          page:tempPage,
          list:temp
        })
        
      }
    }catch(ex){
      console.log(ex);

    }
  },


  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function (options) {
    this.setData({
      list:[],
      page:1,
      ReachStatus:true
    },()=>{
      this.loadList();
    }) 
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    if(this.data.ReachStatus==true){
      this.loadList();
    }
  }
})