// pages/CallOver/CallOver.js
Page({  
  data:{
    random:1,
    length:null,
    input:null,
    classmates: [],
    index:0,
    classarray:['一班','二班','三班','四班','五班'],
    state:'classmates0',
  },
  onLoad: function () {
    // 展示本地存储能力
    this.updateClassmates()
  },

  bindPickerChange: function (e) {
    var indexstr=e.detail.value;
    var orgkey='classmates';
    var key=orgkey.concat(indexstr);
    //设定存储中的key值
    this.setData({
      state:key
    })
    this.updateClassmates()
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(key)
    this.setData({
      index: e.detail.value
    })
  },
  //重置
  resetbox: function (e) {
    this.setData({
      inputValue:''
    })
  },
  //绑定的输入框
  getInput :function(e){
    this.input=e.detail.value
  },
  //添加
  insert:function(){
    var classmates = wx.getStorageSync(this.data.state) || []
    classmates.push(this.input)
    wx.setStorageSync(this.data.state, classmates)
    wx.showToast({
      title: '添加成功',
    })
    this.updateClassmates()
  },
  //开始点名
  start:function(){
    var length=this.data.length;
    this.setData({
      random: Math.floor(Math.random()*length)   
    })
  },
  //清空学生
  clear :function(){
    wx.showModal({
      title: '提示',
      content: '您确定要清空学生吗？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.removeStorage({
            key: this.data.state,
            success: function (res) {
              wx.showToast({
                title: '清除成功',
              })
            },
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
    this.updateClassmates()
  },
  //更新data中classmates
  updateClassmates:function(){
    this.setData({
      classmates: wx.getStorageSync(this.data.state)
    });
    this.setData({
      length: this.data.classmates.length
    })
  }
})

