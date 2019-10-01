// pages/product/product.js
const app = getApp();
var util = require('../../utils/util.js');
var f = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attributeList: [],
    attrLsits: [],
    searchModel: [],
    second_id: null,
    filter: '',
    baojiaList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var second_id = options.id;
    var second_name = options.name;
    wx.setStorageSync("second_id", options.id)
    console.log(second_id, second_name)
    var that = this;
    that.setData({
      second_id: second_id
    })
    wx.request({
      url: app.API + "getAttributeAndValue",
      data: {
        second_id: second_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("参数数组", res.data);
        that.setData({
          attributeList: res.data,
          phoneName: second_name
        })
      }
    })
  },
 
  chooseSx: function (e) {
    let FiledArr = []
    // 暂存指针
    let that = this;
    // 解构
    let { attributeList, searchModel } = this.data
    console.log(searchModel)

    // 解构
    let { item, id, attrid, boxindex, detailindex } = e.currentTarget.dataset
    console.log(item, id, attrid, boxindex, detailindex)

    f[attrid] = id

    // 赋值字段名称
    let setDataFiled = `attributeList[${boxindex}].child[${detailindex}].isMark`
    // 关闭其他高亮
    attributeList[boxindex].child.forEach((el, index) => {
      // 关闭高亮的字段名称
      let setDataFiled = `attributeList[${boxindex}].child[${index}].isMark`
      that.setData({
        [setDataFiled]: false
      })
    })
    // 参数存储
    let serachModelSave = `searchModel[${boxindex}]`

    // 打开当前高亮
    that.setData({
      [setDataFiled]: true,
      [serachModelSave]: item
    })
    // 暂存数组
    let searchModelArr = []

    searchModel.forEach(el => {
      searchModelArr.push(el)

    })
    // 发送请求
    if (searchModelArr.length == attributeList.length) {
      var tempArr = [];
      for (var key in f) {
        tempArr.push(f[key])
      }
      that.setData({
        filter: tempArr.join("_")
      })
      this.queryMoney()

    }
    //searchModelArr.length == attributeList.length && this.queryMoney();
    console.log("boxindex的值", boxindex + 1);
  },
  // 请求金额
  queryMoney(e) {
    // 解构
    let { searchModel, second_id } = this.data

    // let filter = searchModel.join('_')
    // console.log(filter)

    var that = this;
    var filter = that.data.filter;
    console.log("filter",filter);
    wx.request({
      url: app.API + "getAssess",
      data: {
        filter,
        second_id
      },
      // header: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        that.setData({
          baojiaList: res.data
        })
      }
    })
  },
  radio: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync("assess_id", id)
    this.setData({
      id: id,
    })
  },
  go_order: function (e) {
    var currenTime = util.formatTime(new Date());
    console.log("时间", currenTime);
    var user_id = wx.getStorageSync("user_id");
    var second_id = wx.getStorageSync("second_id");
    var assess_id = wx.getStorageSync("assess_id");   //这里不应该用缓存，后期会改进
    console.log("要提交的", user_id, second_id, assess_id);
    if (assess_id===""){
      wx.showModal({
        title: "信息提示",
        content: "请选择报价标准再提交"
      })
    }else{
      wx.request({
        url: app.API + "addOrder",
        data: {
          openid: user_id,
          second_id: second_id,
          assess_id: assess_id,
          orderTime: currenTime
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("下单返回", res)
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '../order/order',
            })
          } else {
            wx.showModal({
              title: "信息提示",
              content: " 下单失败了！！！"
            })
          }
        }
      })
    }
   
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})