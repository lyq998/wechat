// pages/CallOver/CallOver.js
Page({  
  data:{
    random:1,
    length:null,
    input:null,
    classmates: []
  },
  onLoad: function () {
    // 展示本地存储能力
    this.updateClassmates()
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
    wx.showToast({
      title: '添加成功',
    })
    this.updateClassmates()
  },
  start:function(){
    var length=this.data.length;
    this.setData({
      random: Math.floor(Math.random()*length)   
    })
  },
  clear :function(){
    wx.removeStorage({
      key: 'classmates',
      success: function(res) {
        wx.showToast({
          title: '清除成功',
        })
      },
    });
    this.updateClassmates()
  },
  updateClassmates:function(){
    this.setData({
      classmates: wx.getStorageSync('classmates')
    });
    this.setData({
      length: this.data.classmates.length
    })
  }
})

