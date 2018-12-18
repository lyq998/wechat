// pages/warmUp/warmUp.js
Page({
  onLoad: function () {
    wx.showLoading({
      title: '视频加载中',
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }
})