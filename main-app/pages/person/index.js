// pages/person/index.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routers: [{
        name: '待发货',
        url: '../my-orderlist/my-orderlist?status=0',
        icon: '../../img/person/dai.png',
        id: "001"
      }, {
        name: '已发货',
        url: '../my-orderlist/my-orderlist?status=1',
        icon: '../../img/person/yifa.png',
        id: "002"
      }, {
        name: '待完成',
        url: '../my-orderlist/my-orderlist?status=2',
        icon: '../../img/person/dwc.png',
        id: "003"
      },
      {
        name: '待收款',
        url: '../my-orderlist/my-orderlist?status=3',
        icon: '../../img/person/dsk.png',
        id: "003"
      }, {
        name: '已完成',
        url: '../my-orderlist/my-orderlist?status=4',
        icon: '../../img/person/wan.png',
        id: "003"
      }, {
        name: '待退回',
        url: '../my-orderlist/my-orderlist?status=5',
        icon: '../../img/person/dth.png',
        id: "004"
      }, {
        name: '已退回',
        url: '../my-orderlist/my-orderlist?status=6',
        icon: '../../img/person/yth.png',
        id: "006"
      }, {
        name: '地址管理',
        url: '../address/address',
        icon: '../../img/person/dizhi.png',
        id: "006"
      }, {
        name: '全部订单',
        url: '../myallorder/myallorder',
        icon: '../../img/person/qbdd.png',
        id: "006"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
      wx.getSetting({
        success(res) {
          console.log('aa', res)
          if (res.authSetting['scope.userInfo']) {
            var alredys = 1;
            that.setData({
              alredys: alredys
            })
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                console.log(res);
              }
            })
          } else {
            alredys = 2;
            that.setData({
              alredys: alredys
            })
          }
        }
      })
  },
  bindGetUserInfo(e) {
    var that = this;
    console.log(e.detail.userInfo)
    wx.login({
      success: function(res) {
        console.log(res.code);
        wx.request({
          url: APP.API + 'login',
          method: 'GET',
          data: {
            code: res.code,
            avatar_url: e.detail.userInfo.avatarUrl,
            city: e.detail.userInfo.province
          },
          success: function(res) {
            console.log("后台返回的=====>", res);
            var user_id = res.data.openid;
            wx.setStorageSync("user_id", user_id);
            //wx.setStorageSync("phone_", data)
            //console.log("user_id", user_id);
            var sue = 1;
            that.setData({
              alredys: sue
            })
            wx.showToast({
              title: '登陆成功!',
            })
          }
        })
      }
    })
  },
  phoneCall: function(e) {
    console.log("aaa", e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
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