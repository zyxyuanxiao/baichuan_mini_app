// pages/deliver/deliver.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '佰川回收 181-9857-5678',
    address: '贵州省贵阳市南明区和丰大厦商城2楼1号佰川回收'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var oid = options.oid;
    console.log("deliver", oid);
    var that = this;
    that.setData({
      ordid: oid
    })
  },
  orderlistnuminput: function(e) {
    this.setData({
      orderlistnum: e.detail.value
    })
  },
  sumbit:function(){
    var ooid = this.data.ordid;
    wx.request({
      url: app.API + "upOrderStatus",
      data: {
        id: ooid,
        status: 1,
        express_num: this.data.orderlistnum
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("修改订单", res)
        if (res.data.code == 1) {
          wx.switchTab({
            url: '../person/index',
          })
        } else {
          wx.showModal({
            title: "信息提示",
            content: " 连接网络失败！！！"
          })
        }
      }
    })
  },
  getAddress: function() {
    var that = this;
    wx.chooseAddress({
      success: function(res) {
        console.log(res)
        var usemessage = res;
        that.setData({
          addressList: usemessage
        })
      }
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