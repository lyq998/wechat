// pages/activity/activity.js
var utils = require('../../utils/distance.js');
const EARTH_RADIUS = 6378137; //m
var marker = [
  { marker_lat: 30.5580112140, marker_lon: 103.9959168434 },
  { marker_lat: 30.5587687893, marker_lon: 103.9949083328},
  { marker_lat: 30.5598035169, marker_lon: 104.0008199215},
  { marker_lat: 30.5589073695, marker_lon: 103.9935457706},
  { marker_lat: 30.5580296915, marker_lon: 103.9957344532},
  { marker_lat: 30.5583345700, marker_lon: 103.9939641953},
  { marker_lat: 30.5596095063, marker_lon: 103.9979445934},
  { marker_lat: 30.5592815351, marker_lon: 103.9978855848},
  { marker_lat: 30.5597896590, marker_lon: 103.9966678619},
  { marker_lat: 30.5586302089, marker_lon: 103.9990603924}

];
// var index = new Array();
// index = Math.round(Math.random() * (markers.length - 1));
// for (var i=1;i<5;i++){
//   var temp = 0;
//   do{
//     temp = Math.round(Math.random() * (markers.length - 1));
//   }while(temp!=index[i-1]);
//   index[i] = temp;
// };
var count = [0, 1, 2, 3, 4];
var isNearBy = 0; //判断是否在目标点附近
var flag = 0;     //判断是否为新目标点
Page({
  data: {
    timer:'',
    seconds:0,
    score: '00:00:00',
    latitude: 30.5574384092,
    longitude: 104.0008521080,
    markers: [{
      id: 0,
      iconPath:"/images/marker.png",
      latitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lat,
      longitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lon,
      title: 'm0',
      width: 35,
      height: 35
    },{
      id: 1,
      iconPath: "/images/marker.png",
      latitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lat,
      longitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lon,
      title: 'm1',
      width: 35,
      height: 35
    },{
      id: 2,
      iconPath: "/images/marker.png",
      latitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lat,
      longitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lon,
      title: 'm2',
      width: 35,
      height: 35
    },{
      id: 3,
      iconPath: "/images/marker.png",
      latitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lat,
      longitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lon,
      title: 'm3',
      width: 35,
      height: 35
    },{
      id: 4,
      iconPath: "/images/marker.png",
      latitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lat,
      longitude: marker[Math.round(Math.random() * (marker.length - 1))].marker_lon,
      title: 'm4',
      width: 35,
      height: 35
    }
    ]
  },
  // 计时
  Countdown:function() {
    var that = this;
    var this_seconds=that.data.seconds;
    setTimeout(function () {
      console.log("----Countdown----");
      that.setData({ seconds: this_seconds + 1000 });
      that.setData({ score: that.formatTime(this_seconds) });
      that.Countdown();
    }, 1000);
  },

  // 秒数 --> 时：分：秒
  formatTime: function(seconds) {
    var newseconds=seconds/1000;
    return [
      parseInt(newseconds / 60 / 60), // 时
      parseInt(newseconds / 60 % 60), // 分
      parseInt(newseconds % 60)       // 秒
    ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')

  },
  onLoad: function () {
    this.Countdown();
  },
  // markertap: function(e){
  //   console.log(e.markerId);
  //   var id = e.markerId;
  //   var that = this;
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success(res) {
  //       console.log(res)
  //       wx.showToast({
  //         title:'Successfully!',
  //       })
  //       count[id] += 10;
  //     }
  //   })
  // },
  markertap: function(e){
    console.log(isNearBy);
    var that = this;
    var id = e.markerId;
    console.log(count[id]);
    for(var i=0;i<5;i++){
      if(id=count[i])
      flag = 1;
    };
    if(flag==1){
      wx.getLocation({
        success: function (res) {
          that.setData({nowlat:res.latitude});
          that.setData({nowlong:res.longitude});
          var la1 = parseFloat(res.latitude);
          var lo1 = parseFloat(res.longitude);
          var la2 = that.data.markers[e.markerId].latitude;
          var lo2 = that.data.markers[e.markerId].longitude;
          console.log(la1);
          console.log(lo1);
          console.log(la2);
          console.log(lo2);
          console.log(that.Distance(la1, lo1, la2, lo2));
          if (that.Distance(la1, lo1, la2, lo2) <= 10000)
            isNearBy = 1;
        },
      })
      if (isNearBy == 1) {
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            console.log(res)
            wx.showToast({
              title: 'Successfully!',
            })
            // count[id] += 10;
            isNearBy = 0;
            flag = 0;
          }
        })
       
      }
    }
  },
  finishtap: function(e){
    console.log(count[0]);
    console.log(count[1]);
    console.log(count[2]);
    console.log(count[3]);
    
    var that = this;
    var sum = 0;
    for(var i=0;i<5;i++){
      sum +=count[i];
    }
    // console.log(sum);
    if(sum==10){
      var this_seconds = that.data.seconds;
      var this_timer = that.data.timer;
      clearTimeout(this_timer);
      that.setData({ seconds: this_seconds + 1000 });
      that.setData({ score: that.formatTime(this_seconds) });
      wx.showToast({
        title: that.formatTime(this_seconds),
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000) //延迟时间
        }
      })
    }
  },
  ConvertDegreesToRadians: function (degrees) {
    return degrees * Math.PI / 180;
  },
  ConvertRadiansToDegrees: function (radian) {
    return radian * 180.0 / Math.PI;
  },
  HaverSin: function (theta) {
    var v = Math.sin(theta / 2);
    return v * v;
  },
  Distance: function (lat1, lon1, lat2, lon2) {
    var that = this;
    //经纬度转换成弧度
    lat1 = that.ConvertDegreesToRadians(lat1);
    lon1 = that.ConvertDegreesToRadians(lon1);
    lat2 = that.ConvertDegreesToRadians(lat2);
    lon2 = that.ConvertDegreesToRadians(lon2);

    //差值
    var vLon = Math.abs(lon1 - lon2);
    var vLat = Math.abs(lat1 - lat2);

    var h = that.HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * that.HaverSin(vLon);
    var distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
    return distance;
  }
})


