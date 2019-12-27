<template>
  <div class="warp">
    <div class="fabu box" ref="box" data-dom="box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @click="fabu()"></div>
    <div class="btn" @click="link('pubu')">瀑布流显示</div>
    <div class="btn" @click="link('spwer1')">轮播1</div>
    <div class="btn" @click="link('spwer2')">轮播2</div>
  </div>
</template>

<script>
	import axios from 'axios';
	export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	      msg: '首页',
	      pageTitle: "自由拖拽",
	      //拖拽相关
	      inputs: [],
	      isOpenDrop: true,//是否开启拖拽
	      isTouch: false,//默认为没有触摸
	      itemX: 0,//触摸点与拖拽体的间距x
	      itemY: 0//触摸点与拖拽体的间距y
	    }
	  },
		mounted:function(){

		},
	  methods:{
	  	// 打开发布弹窗
	  	fabu(){
	  		this.$router.push({name:'upload'});
	  	},
	  	link(url){
	  		this.$router.push({name:url});
	  	},
        //拖拽相关
	    touchstart(event) {
	      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
	      if (!this.isOpenDrop) return
	      let _touch
	      if (event.touches[0]) {
	        _touch = event.touches[0]
	      } else {
	        _touch = event
	      }
	      let { clientX, clientY } = _touch
	      this.itemX = clientX - dom.offsetLeft
	      this.itemY = clientY - dom.offsetTop
	      this.isTouch = true
	    },
	    touchmove(event) {
	      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
	      if (!this.isTouch) return
	      let _touch
	      if (event.touches[0]) {
	        _touch = event.touches[0]
	      } else {
	        _touch = event
	      }
	      let { clientX, clientY } = _touch
	      let [_headerH, _tabH] = [0, 0]
	      if (document.getElementsByClassName('header')[0]) _headerH = document.getElementsByClassName('header')[0].clientHeight
	      if (document.getElementsByClassName('tab')[0]) _tabH = document.getElementsByClassName('tab')[0].clientHeight
	      let [_x, _y] = [clientX - this.itemX, clientY - this.itemY]
	      let [p_W, p_H] = [window.innerWidth, window.innerHeight]
	      let {
	        clientWidth: _moveW,
	        clientHeight: _moveH,
	        style: styleObject
	      } = dom
	      if (_x > p_W - _moveW) _x = p_W - _moveW
	      if (_x < 0) _x = 0
	      if (_y > p_H - _moveH  - _tabH) _y = p_H - _moveH  - _tabH
	      if (_y < _headerH) _y = _headerH
	      styleObject.left = `${_x}px`
	      styleObject.top = `${_y}px`
	      styleObject.right = `auto`
	      styleObject.bottom = `auto`
	      event.preventDefault()
	    },
	    touchend() {
	      this.isTouch = false
	    }
    },
    
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.warp{
		width: 100%;
		height: 100%;
		padding-bottom: 46px;
	}
	.btn{
		width: 100px;
		height: 25px;
		line-height: 28px;
		background: #eee;
		border: 1px solid #ddd;/*no*/
		border-radius: 6px;
		margin: 5px auto;
		text-align: center;
	}
	.screenshot{position: relative;z-index: 100;touch-action:none;}
  .box{width: 70px;height: 70px;padding-bottom:30px;background-image: url(../assets/img/fabu.png);background-size:100%;background-repeat: no-repeat;position: fixed;right:6px;bottom:72px;z-index: 100;animation: breathing-lamp 1s infinite alternate;}
  .box.on{z-index: 99;}
</style>
