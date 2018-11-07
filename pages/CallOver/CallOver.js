// pages/CallOver/CallOver.js
Page({  
  data:{
    input:null,
    classmates: []
  },
  onLoad: function () {
    // 展示本地存储能力
    this.setData({
      classmates:wx.getStorageSync('classmates')})
  },

  resetbox: function (e) {
    this.setData({
      inputValue:''
    })
  },
  getInput :function(e){
    this.input=e.detail.value
  },
  insert:function(){
    var classmates = wx.getStorageSync('classmates') || []
    classmates.push(this.input)
    wx.setStorageSync('classmates', classmates)
  }
})

