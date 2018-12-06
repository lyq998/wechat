// pages/activity/activity.js
var utils = require('../../utils/distance.js');
var markers = [
  { markers_lat: 30.5580112140, markers_lon: 103.9959168434 },
  { markers_lat: 30.5587687893, markers_lon: 103.9949083328},
  { markers_lat: 30.5598035169, markers_lon: 104.0008199215},
  { markers_lat: 30.5589073695, markers_lon: 103.9935457706},
  { markers_lat: 30.5580296915, markers_lon: 103.9957344532},
  { markers_lat: 30.5583345700, markers_lon: 103.9939641953},
  { markers_lat: 30.5596095063, markers_lon: 103.9979445934},
  { markers_lat: 30.5592815351, markers_lon: 103.9978855848},
  { markers_lat: 30.5597896590, markers_lon: 103.9966678619},
  { markers_lat: 30.5586302089, markers_lon: 103.9990603924}

];
var count = [0,1,2,3,4];
// var index = new Array();
// index = Math.round(Math.random() * (markers.length - 1));
// for (var i=1;i<5;i++){
//   var temp = 0;
//   do{
//     temp = Math.round(Math.random() * (markers.length - 1));
//   }while(temp!=index[i-1]);
//   index[i] = temp;
// };
Page({
  data: {
    latitude: 30.5574384092,
    longitude: 104.0008521080,
    markers: [{
      id: 0,
      iconPath:"/images/marker.png",
      latitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lat,
      longitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lon,
      title: 'm0',
      width: 35,
      height: 35
    },{
      id: 1,
      iconPath: "/images/marker.png",
      latitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lat,
      longitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lon,
      title: 'm1',
      width: 35,
      height: 35
    },{
      id: 2,
      iconPath: "/images/marker.png",
      latitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lat,
      longitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lon,
      title: 'm2',
      width: 35,
      height: 35
    },{
      id: 3,
      iconPath: "/images/marker.png",
      latitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lat,
      longitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lon,
      title: 'm3',
      width: 35,
      height: 35
    },{
      id: 4,
      iconPath: "/images/marker.png",
      latitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lat,
      longitude: markers[Math.round(Math.random() * (markers.length - 1))].markers_lon,
      title: 'm4',
      width: 35,
      height: 35
    }

    ]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')

  },
  // onLoad: function () {
    
  // },
  // markertap: function(e){
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success(res) {
  //       console.log(res)
  //       wx.showToast({
  //         title: 'Hahaha',
  //       })
  //     }
  //   })
    
  // },
  markertap: function(e){
    var that = this;
    var flag = 0;     //判断是否为新目标点
    var isNearBy = 0; //判断是否在目标点附近
    var idtemp = that.id;
    var titletemp = that.title;
    for(var i=0;i<5;i++){
      if(idtemp=count[i])
      flag = 1;
    };
    if(flag==1){
      wx.getLocation({
        success: function (res) {
          if (utils.Distance(res.latitude, res.longitude, that.latitude, that.longtitude) <= 50)
            that.isNearBy = 1;
        },
      })
      if (isNearBy == 1) {
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            console.log(res)
            wx.showToast({
              title: titletemp + 'is successfully found!',
            })
            count[idtemp] += 10;
          }
        })
      }
    }
  },
  finishtap: function(e){
    var sum = 0;
    for(var i=0;i<5;i++){
      sum +=count[i];
    }
    if(sum==60){
      wx.showToast({
        title: 'Congratulations！',
        icon: 'success',
        duration: 2000,
        success: function () {
          console.log('haha');
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000) //延迟时间
        }
      })
  }
  }
})