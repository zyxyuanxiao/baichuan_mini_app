// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSearch: "../../img/icon-search.svg",
    keyw:'',
    isValidTel:!1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var keyw = options.keyword;
    var that =this;
    that.setData({
      keyw:keyw
    })
    wx.request({
      url: app.API + "searchIdAndName",
      data: {
        second_name: keyw,
        start: 0,
        size: 100
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("查询结果",res)
        that.setData({
          phoneList: res.data
        })
      }
    })
  },
  getKeyw:function(e){
    var that = this;
    wx.request({
      url: app.API + "searchIdAndName",
      data: {
        second_name: e.detail.value,
        start: 0,
        size: 100
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("查询结果", res)
        that.setData({
          phoneList: res.data
        })
      }
    })
  },
  gowelcome:function(){
    wx.switchTab({
      url: '../welcome/welcome',
    })
  },
  goProduct:function(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    console.log("二级id",id);
    wx.navigateTo({
      url: '../product/product?id=' + id  + '&name=' + name ,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})