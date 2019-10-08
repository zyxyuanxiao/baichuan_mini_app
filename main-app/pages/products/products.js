const app = getApp()
Page({
  data: {
    cateList: [{
      classname: "手机",
      id: "1"
    }, {
      classname: "平板",
      id: "2"
    }, {
      classname: "笔记本",
      id: "3"
    }],
    brandList: [
      {productList: []}
    ],
    cid: "",
    bid: "",
    num: 0,
    hasMore: 0,
    brandScrollTop: 0,
    productScrollTop: 0,
    left: 0,
    iconSearch: "../../img/icon-search.svg"
  },
  onLoad: function() {},
  cateTapHandler: function(e) {
    var id = e.target.dataset.cid;
    var that = this;
    console.log("aaa", id);
    wx.request({
      url: app.API + "getListByTypeId",
      data: {
        type_id: id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          brandList: res.data
        })
      }
    })
  },
  brandTapHandler: function(e) {
    var id = e.target.dataset.bid;
    var that = this;
    // console.log("aaa", id);
    wx.request({
      url: app.API + "getListByFirstId",
      data: {
        first_id: id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data);
        that.setData({
          productList: res.data
        })
      }
    })
  },
  onShow: function() {
    var that = this;
    wx.request({
      url: app.API + "getListByTypeId",
      data: {
        type_id: 1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        let data_arry =  new Array;
        data_arry = res.data;
        var  f_id = data_arry[0].id;
        that.setData({
          brandList: res.data
        })
        wx.request({
          url: app.API + "getListByFirstId",
          data: {
            first_id: f_id
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            // console.log(res.data);
            that.setData({
              productList: res.data
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShareAppMessage: function(t) {}
});