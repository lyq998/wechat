//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/advertise0.jpg',
      '/images/advertise1.jpg',
      '/images/advertise2.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  //事件处理函数
  onLoad:function(){

  }
})

