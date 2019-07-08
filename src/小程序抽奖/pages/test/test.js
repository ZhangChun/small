//index.js
const tool = require('../../utils/publics/tool.js')
//获取应用实例
const app = getApp()
Page({
   data: {
      prize: [
         { id: 1, name: "启辰汽车5年使用权" },
         { id: 2, name: "谢谢参与" },
         { id: 3, name: "高档篮球" },
         { id: 4, name: "精品球衣" },
         { id: 5, name: "免费洗车券" },
         { id: 6, name: "谢谢参与" },
         { id: 7, name: "高档球鞋" },
         { id: 8, name: "谢谢参与" },
         
      ],
      prize_cur: [
         { num: 6, name: "启辰汽车5年使用权" },
         { num: 1, name: "精品球衣" },
         { num: 3, name: "谢谢参与" },
         { num: 1, name: "精品球衣" },
         { num: 4, name: "高档球鞋" },
         { num: 1, name: "精品球衣" },
         { num: 0, name: "高档篮球" },
         { num: 4, name: "高档球鞋" },
         { num: 4, name: "高档球鞋" },
         { num: 5, name: "谢谢参与" },
         { num: 4, name: "高档球鞋" },
         { num: 0, name: "高档篮球" },
         { num: 4, name: "高档球鞋" },
         { num: 7, name: "谢谢参与" },
         { num: 4, name: "高档球鞋" },
         { num: 0, name: "高档篮球" }
      ],
      curNumDeg: 0,
      needleDeg: 0,
      // needleDeg: -90,
      isPrize: true,
      time: 5000,
      isPrizeOk: true,
      isPrizeOk2: true
   },
   onLoad() {
      this.init()
      
   },
   onReady(){
   },
   init() {
      var _prize = this.data.prize
      var _curNum = _prize.length
      var _curNumDeg = 360 / _curNum
      var _allDeg = []
      for (var i = 0; i < _curNum; i++) {
         _prize[i].deg = _curNumDeg * i
      }
      this.setData({
         prize: _prize,
         curNumDeg: _curNumDeg
      })
   },
   start() {
      if (this.data.isPrize) {
         var _num = Math.floor(Math.random() * this.data.prize_cur.length)
         var surplus = Math.floor(Math.random() * 7 + 2) / 10;
         _num = 0;
         console.log("surplus=============>", surplus, _num)
         console.log("【" + this.data.prize_cur[_num].name + "】")
         var _needleDeg = (this.data.prize_cur[_num].num + surplus) * this.data.curNumDeg + this.data.needleDeg + (360 - this.data.needleDeg % 360) + 1800
         console.log(this.data.prize_cur[_num].num, surplus, this.data.curNumDeg, this.data.needleDeg, 360, this.data.needleDeg,360,1800)
         this.setData({
            isPrize: false,
            needleDeg: _needleDeg
         })
         console.log("旋转度数====》", _needleDeg)
         var _self = this
         setTimeout(function () {
            let _nums = (_self.data.prize_cur[_num]).num
            console.log("____________nums",_nums)
            if (_nums == 3 || _nums == 5 || _nums == 7) {
               _self.setData({
                  isPrizeOk: false
               })
            } else {
               tool.confirm('中奖通知', `恭喜您中奖了，奖品：【${_self.data.prize_cur[_num].name}】`, '好的,#E53D3D', false)
            }
            _self.setData({
               isPrize: true
            })
         }, _self.data.time + 300)
      }
   },
   exchange() {
      this.setData({
         isPrizeOk: true,
         isPrizeOk2: false
      })
   },
   closeModel() {
      this.setData({
         isPrizeOk: true,
         isPrizeOk2: true
      })
   }
})
