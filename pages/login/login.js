// pages/login/login.js
Page({
  data: {
    user: '',
    password: ''
  },

  // 获取输入账号 
  userInput: function (e) {
    this.setData({
      user: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.user.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 判断条件
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})