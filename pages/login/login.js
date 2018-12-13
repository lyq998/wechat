Page({
  data: {
    inputPassword: false,
    isLoading: false,
    account: '',
    password: ''
  },
  onLoad: function () {
  },
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  bindLogin: function () {
    wx.switchTab({

      url: "/pages/index/index",

    })
  },
})
