// pages/welcome/welcome.js
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonelist: [
      {
        name:'回收客服热线',
        phoneNo:'18198575678' 
      },
      {
        name: '销售客服热线',
        phoneNo: '18198576789' 
      }],
    imgUrls: [{
        url: "../couponget/index",
        src: "../../img/activie.png"
      },
      {
        url: "../couponget/index",
        src: "../../img/banner.png"

      }
    ],
    cateList: [{
      cid: 1,
      bid: -1,
      text: "手机回收",
      imgSrc: "../../img/icon-mobile-1.png"
    }, {
      cid: 3,
      bid: -1,
      text: "平板回收",
      imgSrc: "../../img/icon-pad-1.png"
    }, {
      cid: 2,
      bid: -1,
      text: "笔记本回收",
      imgSrc: "../../img/icon-notebook-1.png"
    }],
    curModelInfo: null,
    commentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //this.bindGetUserInfo(e);
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo);
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
            console.log("user_id", user_id);
            wx.switchTab({
              url: '../products/products',
            })
          }
        })
      }
    })
  },
  phoneCall:function(e){
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