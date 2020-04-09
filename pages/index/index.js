//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //用户基本信息
    userInfo: {},
    //是否获取到了授权
    hasUserInfo: false,
    //判断用户微信版本是否支持
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //是否显示输入框
    inp:false,
    //是否显示按钮
    buttonFlag:true
  },
  onLoad: function () {
    //如果已经获取到了用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  clickButton: function () {
    this.setData({
      inp:true,
      buttonFlag:false
    })

  }
})
