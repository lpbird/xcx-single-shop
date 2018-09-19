// pages/mine/mine.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    phone:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success: function (res) {

        var userInfo = res.userInfo

        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        })
      }
    })
    this.getKeyInfo()
  },
  gocut:function(){
    wx.navigateTo({
      url: '../cut/cut'
    })
  },
  bitphone:function(){
    wx.makePhoneCall({
      phoneNumber: '4001118024' 
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
      wx.request({
        url: app.globalData.apiHost +'/bindPhone?openId=' + wx.getStorageSync('openId'), //注册
        method: 'POST',
        data: {
          "encryptedData": e.detail.encryptedData,
          "iv": e.detail.iv,
          "session": wx.getStorageSync('session_key'),
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.getKeyInfo()
        }
      })
  } ,
  getUserInfo: function (e) {
    console.log(e)
    var userInfo = e.detail.userInfo
    //用户信息获取成功 则开始首次用户注册
    userInfo.openId = wx.getStorageSync('openId');
    wx.setStorageSync('userInfo', userInfo);
    console.log(userInfo)
    wx.request({
      url: app.globalData.apiHost +'/register', //注册
      method: 'POST',
      data: userInfo,
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    })
  },
  getKeyInfo:function(){
    var that =this;
    wx.request({
      url: app.globalData.apiHost +'/getMyInfo?openId=' + wx.getStorageSync('openId'), //获取用户信息
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          phone: res.data.data[0].phone,
        })
      }
    })
  }
})