// pages/order/balance/balance.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutid:0,
    cutMonney: 0,
    cupNumber:0,
    model: 0,//1是预约模式  0是到店模式
    appointTime: "",
    cutText:"",
    cutid:''
  },

  onShow: function () {
    var openid = wx.getStorageSync('openId')
    this.webSocketHandleMsg(openid, this);
    this.getMyOrder()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openId')
    this.webSocketInit(openid, this)
    if (options.model == 1) {
      this.setData({
        model: 1,
        appointTime: options.appointTime
      })
    }
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cupNumber: wx.getStorageSync('cupNumber'),
    })
  },
  //长链接
  webSocketInit: function (openid, that) {
    wx.connectSocket({
      url: 'ws://127.0.0.1:8181?token=' + openid,
    })
  },
  webSocketHandleMsg: function (openid, that) {
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    //心跳重连
    wx.onSocketClose(function (res) {
      wx.connectSocket({
        url: 'ws://127.0.0.1:8181?token=' + openid,
      })
      console.log('WebSocket 已关闭！')
    })
  },
  onUnload: function () {
    wx.closeSocket()
  },
  //获取我的优惠券
  getMyOrder: function () {
    wx.showLoading();
    var that = this;
    //获取我的订单
    wx.request({
      url: app.globalData.apiHost + '/getCutList?openid=' + wx.getStorageSync('openId') + "&model=0",
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        for (let i = 0; i < res.data.msg.length;i++){
          if (res.data.msg[i].status==0){
            console.log(res.data.msg[i].detail)
            if (res.data.msg[i].detail.type==1){
              if (wx.getStorageSync('sumMonney') > res.data.msg[i].detail.rule-1){
                that.setData({
                  cutText: "满" + res.data.msg[i].detail.rule + "元立减" + res.data.msg[i].detail.cut + "元",
                  cutMonney: res.data.msg[i].detail.cut,
                  cutid: res.data.msg[i].id
                })
              }
            }else{
              let list = wx.getStorageSync('cartList')
              for (let j = 0; j < list.length;j++){
                console.log(list[j].name)
                if (res.data.msg[i].detail.name == list[j].name){
                  that.setData({
                    cutText: "单品优惠立减" + res.data.msg[i].detail.cut + "元",
                    cutMonney: res.data.msg[i].detail.cut,
                    cutid: res.data.msg[i].id
                  })
                }
              }
              
              
            }
          }
        }
      }
    })
  },



  gopay:function(){
    // wx.navigateTo({
    //   url: '../detail/detail'
    // })
    var that =this;
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 8));
    nonce = nonce.toString()
    var total = that.data.sumMonney - that.data.cutMonney
    
    wx.request({
      url: app.globalData.apiHost + '/wxPay?openid=' + wx.getStorageSync('openId'),
      method: 'POST',
      data:{
        "nonce_str": nonce+"a"+ total
      },
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          var payModel = res.data.msg;
          wx.requestPayment({
            'timeStamp': payModel.timestamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'MD5',
            'paySign': payModel.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              console.log("dasda", payModel.package.substr(10))
              that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
            },
            'fail': function (res) {
            }
          })
        }
      },
      fail: function () {

      }
    })
  },
  //下订单
  addOrder: function (out_trade_no,packages){
    wx.showLoading({
      title: '正在生成餐号',
    })
    var that = this;
    wx.request({
      url: app.globalData.apiHost + '/addOrder?openid=' + wx.getStorageSync('openId'), //下单
      method: 'POST',
      data: {
        out_trade_no: out_trade_no,
        cartList: wx.getStorageSync('cartList'),
        sumMonney: wx.getStorageSync('sumMonney') - that.data.cutMonney,
        cutMonney: that.data.cutMonney,
        cutText:that.data.cutText,
        cupNumber: wx.getStorageSync('cupNumber'),
        model:this.data.model,
        appointTime: this.data.appointTime,
        packages:packages,
        note:that.data.note,
      },
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync('orderInfo', res.data.msg);
        wx.setStorageSync('cutMoney', that.data.cutMonney);
        wx.sendSocketMessage({
          data: "newOrder"
        }) 
        that.useCut()
        wx.hideLoading()
        wx.redirectTo({
          url: '../detail/detail?orderId=' + res.data.msg.orderId
        })
      }
    })
  },
  //使用优惠券
  useCut: function () {
    wx.showLoading();
    var that = this;
    //获取我的订单
    wx.request({
      url: app.globalData.apiHost + '/useCut?id=' + that.data.cutid,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
      }
    })
  },
  //添加备注
  note:function(e){
    console.log(e.detail.value)
    this.setData({
      note: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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