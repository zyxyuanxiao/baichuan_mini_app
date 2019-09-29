// pages/product/product.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attributeList: [],
    attrLsits: [],
    searchModel:[],
    second_id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var second_id = options.id;
    var second_name = options.name;
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
      success: function(res) {
        console.log("参数数组", res.data);
        that.setData({
          attributeList: res.data,
          phoneName: second_name
        })
      }
    })
  },
  go_order: function() {
    wx.redirectTo({
      url: '../order/order',
    })
  },
  chooseSx: function(e) {
    let FiledArr = []
    // 暂存指针
    let that = this;
    // 解构
    let { attributeList, searchModel } = this.data
    // 解构
    let { item , id , attrid , boxindex , detailindex } = e.currentTarget.dataset
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
    let searchModelArr =[]
    searchModel.forEach(el=>{
      searchModelArr.push(el)
    })
    // 发送请求
    searchModelArr.length == attributeList.length && this.queryMoney();
    console.log("boxindex的值",boxindex+1);
  },
  // 请求金额
  queryMoney(e) {
    // 解构
    let { searchModel, second_id } = this.data
    let filter = searchModel.join('_')
    var that = this;
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