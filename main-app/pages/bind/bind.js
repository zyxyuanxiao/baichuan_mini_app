// pages/bind/bind.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "",
    code: "",
    isValidTel: !1,
    codename: '获取验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  handleTel: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCode: function(e) {
    var that = this;
    var phone = that.data.phone;
    var openid = wx.getStorageSync("user_id");
    console.log("aa", openid)
    if (!(/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/).test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: app.API + 'bindPhone',
        method: 'GET',
        data: {
          phone: phone,
          openid:openid,
          order :1,
          code:""
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          console.log("后台返回的:",res)
          that.setData({
            iscode: res.data.code
          })
          var num = 61;
          var timer = setInterval(function() {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              that.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })
    }
  },
  submit:function(){

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