// pages/order/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber: 0,
    orderId:"",
    cathNumber:"",
    time:"",
    model: 0,//1是预约模式  0是到店模式
    appointTime: "",
    status:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    
    this.getMyOrderDetail(options.orderId)
   
  },
  //获取订单详情
  getMyOrderDetail:function(id){
    var that = this;
    wx.request({
      url: app.globalData.apiHost +'/getMyOrderDetail?openid=' + wx.getStorageSync('openId')+"&orderId="+id, //获取订单详情
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data.status)
        that.setData({
          model: res.data.data.model,
          appointTime: res.data.data.appointTime,
          cathNumber: res.data.data.cathNumber,
          cartList: JSON.parse(res.data.data.cartList),
          sumMonney: res.data.data.sumMoney,
          cutMonney: res.data.data.cutMonney ,
          cupNumber: res.data.data.cupNumber,
          orderId: res.data.data.orderId,
          time: res.data.data.time,
          status:res.data.data.status
        })
      }
    })
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