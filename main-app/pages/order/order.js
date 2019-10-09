// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDay: null,
    countHour: null,
    countMinute: null,
    countSecond: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order_id = options.orderid;
    var that = this;
    that.setData({
      orderid: order_id
    })
  },
  goProduct: function() {
    wx.switchTab({
      url: '../products/products',
    })
  },
  goDeliver: function() {
    var oid = this.data.orderid;
    wx.navigateTo({
      url: '../deliver/deliver?oid='+ oid,
    })
  },
  goIndex: function() {
    wx.switchTab({
      url: '../welcome/welcome',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      countDay: '00',
      countHour: '24',
      countMinute: '00',
      countSecond: '00',
    });

    // 设置开始时间，1天=86400秒
    var totalSecond = 86400 - 1;

    // 设置定时器
    var timeInterval = setInterval(function() {
      // 天
      var day = Math.floor(totalSecond / 3600 / 24);
      if (day < 10) day = '0' + day;

      // 时
      var hour = Math.floor((totalSecond - day * 3600 * 24) / 3600);
      if (hour < 10) hour = '0' + hour;

      // 分
      var minute = Math.floor((totalSecond - day * 3600 * 24 - hour * 3600) / 60);
      if (minute < 10) minute = '0' + minute;

      // 秒
      var second = totalSecond - day * 3600 * 24 - hour * 3600 - minute * 60;
      if (second < 10) second = '0' + second;

      this.setData({
        countDay: day,
        countHour: hour,
        countMinute: minute,
        countSecond: second,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(timeInterval);
        wx.showToast({
          title: '倒计时结束',
        });
        this.setData({
          countDay: '00',
          countHour: '00',
          countMinute: '00',
          countSecond: '00',
        });
      }
    }.bind(this), 1000);
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