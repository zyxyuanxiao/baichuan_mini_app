const app = getApp()
Page({
  data: {
    cateList: [{
      classname: "手机",
      id: 1
    }, {
      classname: "平板",
      id: 2
    }, {
      classname: "笔记本",
      id: 3
    }],
    brandList: [{
      productList: []
    }],
    cid: '',
    bid: "",
    num: 0,
    hasMore: 0,
    brandScrollTop: 0,
    productScrollTop: 0,
    left: 0,
    iconSearch: "../../img/icon-search.svg"
  },
  onLoad: function() {
    var openid = wx.getStorageSync("user_id");
    wx.request({
      url: app.API + 'isBindPhone',
      method: 'GET',
      data: {
        openid: openid
      },
      success: function (res) {
        if(res.data==0){
          wx.redirectTo({
            url: '../bind/bind',
          })
        } else{
          console.log("已绑定手机号！")
        }
      }
    })
  },

  //点击键盘上的搜索
  goSearch: function(e) {
    // console.log(e.detail.value);
    var keyword = e.detail.value;
    wx.redirectTo({
      url: '../search/search?keyword=' + keyword,
    })
  },
  cateTapHandler: function(e) {
    var id = e.target.dataset.cid;
    var arr = ["1", "2", "3"];
    var crurrnt = false;
    for (var i = 0; i< arr.length; i++) {
      if (id == arr[i]) {
        var cisd = arr[i]
      }
    }
    var that = this;
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
          brandList: res.data,
          cisd: cisd
        })
      }
    })
  },
  brandTapHandler: function(e) {
    var id = e.target.dataset.bid;
    var that = this;
    var arr1 = new Array(100);
    for (var i = 0; i < arr1.length; i++) {
      arr1[i] = i;
    }
    console.log()
    for(var a = 0;a< arr1.length;a++){
      if (id == arr1[a]) {
        var uuid = arr1[a]
      }
    }
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
          productList: res.data,
          uuid: uuid
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
        let data_arry = new Array;
        data_arry = res.data;
        var f_id = data_arry[0].id;
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