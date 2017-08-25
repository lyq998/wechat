// pages/activity/activity.js
Page({
  data: {
    latitude: 30.5574384092,
    longitude: 104.0008521080,
    markers: [{
      id: 0,
      iconPath:"/images/marker.png",
      latitude: 30.5580112140,
      longitude: 103.9959168434,
      title: 'm0',
      width: 35,
      height: 35
    },{
      id: 1,
      iconPath: "/images/marker.png",
      latitude: 30.5587687893,
      longitude: 103.9949083328,
      title: 'm1',
      width: 35,
      height: 35
    },{
      id: 3,
      iconPath: "/images/marker.png",
      latitude: 30.5598035169,
      longitude: 104.0008199215,
      title: 'm2',
      width: 35,
      height: 35
    }

    ]
  },
  ConvertDegreeToRadins: function (degrees) {
    return degrees * Math.PI / 180;
  },
  ConvertRadinsToDegree: function (radian) {
    return radian * 180.0 / Math.PI;
  },
  HaverSin: function (theta) {
    var v = Math.Sin(theta / 2);
    return v * v;
  },
  Distance: function (lat1, lon1, lat2, lon2) {
    //经纬度转换成弧度
    lat1 = ConvertDegreesToRadians(lat1);
    lon1 = ConvertDegreesToRadians(lon1);
    lat2 = ConvertDegreesToRadians(lat2);
    lon2 = ConvertDegreesToRadians(lon2);

    //差值
    var vLon = Math.Abs(lon1 - lon2);
    var vLat = Math.Abs(lat1 - lat2);

    var h = HaverSin(vLat) + Math.Cos(lat1) * Math.Cos(lat2) * HaverSin(vLon);
    var distance = 2 * EARTH_RADIUS * Math.Asin(Math.Sqrt(h));
    return distance;
  },
  
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')

  },
  // onLoad: function () {
    
  // },
  markertap: function(e){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.showToast({
          title: 'Hahaha',
        })
      }
    })
    
  }
  
  // markertap: function(e){
  //   var that = this;
  //   var isNearBy = 0;
  //   wx.getLocation({
  //     success: function (res) {
  //       if(this.Distance(res.latitude, res.longitude, this.latitude, this.longtitude) <= 50)
  //       this.isNearBy = 1;
  //     },
  //   })
  //   if(isNearBy == 1){
  //     wx.scanCode({
  //       onlyFromCamera: true,
  //       success(res) {
  //         console.log(res)
  //         wx.showToast({
  //           title: 'Hahaha',
  //         })
  //       }
  //     })
  //   }
  // }
  // isNearBy: function(){
  //   this.wx.getLocation({
  //     success: function (res) {
  //       Distance(res.latitude, res.longitude, this.latitude, this.longtitude)<=50;
  //     },
  //   })
  // }
})