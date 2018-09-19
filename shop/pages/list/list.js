// pages/list/list.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0, //当前分类
    currentIndex: 0,//当前分类下序号
    sizeIndex: 0,//杯型分类序号
    sugarIndex: 0,//甜度分类序号
    temIndex: 0,//温度分类序号
    sugar: ['正常糖', '少糖', '半糖'],
    tem: ['正常冰', '少冰', '去冰'],
    size: ['常规', '珍珠', '西米露'],
    cartList: [],//购物车
    sumMonney: 0,//总金额
    cupNumber: 0,//总杯数
    scrollH: 1000,
    showCart: false,//是否显示购物车
    loading: false,
    cartMap: {},//购物车map
    model: 0,//1是预约模式  0是到店模式
    appointTime: "",
    scrollArr: [],
    sizeBox: [],
    sizeEx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.model)
    console.log(options.appointTime)
    if (options.model == 1) {
      this.setData({
        model: 1,
        appointTime: options.appointTime
      })
    }
    var that = this;
    this.getList()
  },
  getList() {
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log(sysinfo)
    wx.showLoading({
    })
    let offsetS = 120
    //兼容iphoe5滚动
    if (sysinfo < 550) {
      offsetS = -40
    }
    //兼容iphoe Plus滚动
    if (sysinfo > 650 && sysinfo < 700) {
      offsetS = 240
    }
    wx.request({
      url: app.globalData.apiHost + '/getfoodList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        let scrollArr = [0]
        //动态计算联动节点
        for (let i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].foods.length)
          scrollArr.push(scrollArr[i] + 73 * res.data.data[i].foods.length + 18)
        }
        that.setData({
          scrollArr: scrollArr,
          listData: res.data.data,
          loading: true,
          scrollH: sysinfo * 2 - offsetS
        })
        wx.hideLoading();
      }
    })
  },

  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
    })
  },
  //监听滚动 完成右到左的联动
  scroll: function (e) {
    var dis = e.detail.scrollTop
    for (let i = 0; i < this.data.scrollArr.length; i++) {
      if (i < this.data.scrollArr.length - 1) {
        if (dis > this.data.scrollArr[i] && dis < this.data.scrollArr[i + 1]) {
          console.log(i)
          this.setData({
            activeIndex: i,
          })
          break;
        }
      } else {
        this.setData({
          activeIndex: this.data.scrollArr.length - 1,
        })
      }

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  selectInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var a = this.data;
    var tem = a.listData[type].foods[index].tem;
    var temBox = [];
    for (let i = 0; i < tem.length; i++) {
      temBox.push(tem[i].specs)
    }
    this.setData({
      showModalStatus: !this.data.showModalStatus,
      currentType: type,
      currentIndex: index,
      sizeBox: ["常规"],
      sizeEx: 0,
      sugarIndex: 0,
      temIndex: 0,
      tem: temBox
    });
  },
  closeModal: function () {
    this.setData({
      showModalStatus: false
    });
  },
  chooseSE: function (e) {
    var a = this.data.listData;
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      var item = a[this.data.currentType].foods[this.data.currentIndex].size
      var sizeBox = this.data.sizeBox;
      var sizeEx = this.data.sizeEx;
      if (item[index].packing_fee == 0) {
        item[index].packing_fee = 1
        sizeBox.push(item[index].specs)
        sizeEx += item[index].price
      } else {
        item[index].packing_fee = 0
        for (let i = 0; i < sizeBox.length; i++) {
          if (sizeBox[i] == item[index].specs) {
            sizeBox.splice(i, 1)
            sizeEx -= item[index].price
          }
        }

      }
      this.setData({
        listData: a,
        sizeBox: sizeBox,
        sizeEx: sizeEx
      });
    }
    if (type == 1) {
      this.setData({
        sugarIndex: index
      });
    }
    if (type == 2) {
      this.setData({
        temIndex: index
      });
    }
  },
  //查看是否添加过相同规格的商品
  isSameAdd: function () {
    var a = this.data
    var name = a.listData[a.currentType].foods[a.currentIndex].name
    var detail = a.size[a.sizeIndex] + "+" + a.sugar[a.sugarIndex] + "+" + a.tem[a.temIndex]
    var cartList = this.data.cartList;
    for (var i = 0; i < cartList.length; i++) {
      if ((name == cartList[i].name) && (detail == cartList[i].detail)) {
        return i
      }
    }
  },
  //加入购物车
  addToCart: function () {
    var a = this.data
    var listData = a.listData;
    var cartList = this.data.cartList;
    if (this.isSameAdd() != undefined) {
      console.log("添加过")
      cartList[this.isSameAdd()].number += 1
    } else {
      console.log("没加过")
      var detail = "";
      for (let i = 0; i < a.sizeBox.length; i++) {
        detail += a.sizeBox[i] + ","
      }
      var addItem = {
        "cType": a.currentType,
        "cIndex": a.currentIndex,
        "name": a.listData[a.currentType].foods[a.currentIndex].name,
        "price": a.listData[a.currentType].foods[a.currentIndex].price + a.sizeEx,
        "enName": a.listData[a.currentType].foods[a.currentIndex].enName,
        "detail": detail + "+" + a.sugar[a.sugarIndex] + "+" + a.tem[a.temIndex],
        "number": 1,
        "sum": a.listData[a.currentType].foods[a.currentIndex].price + a.sizeEx,
        "img": a.currentType + 1 + "-" + a.listData[a.currentType].foods[a.currentIndex].img,
        "desc": a.listData[a.currentType].foods[a.currentIndex].desc
      }
      cartList.push(addItem);
    }


    //刷新总金额
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].price + a.sizeEx;
    //刷新单品杯数
    listData[a.currentType].foods[a.currentIndex].num += 1
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1,
      listData: listData
    });
    console.log(this.data.cartList)
  },
  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    var listData = this.data.listData
    console.log(listData[cartList[index].cType].foods[cartList[index].cIndex].num)
    listData[cartList[index].cType].foods[cartList[index].cIndex].num = listData[cartList[index].cType].foods[cartList[index].cIndex].num + 1
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;
    this.setData({
      listData: listData,
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    var listData = this.data.listData
    listData[cartList[index].cType].foods[cartList[index].cIndex].num = listData[cartList[index].cType].foods[cartList[index].cIndex].num - 1
    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      listData: listData,
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
      wx.navigateTo({
        url: '../order/balance/balance?model=' + this.data.model + "&appointTime=" + this.data.appointTime
      })
    }
  },
  //提示
  notice: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '因含有规格，请在购物车内删减',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            showCart: true
          });
        }
      }
    })
  },
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