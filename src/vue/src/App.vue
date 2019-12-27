<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <FooterBar v-if="isShows" />
    <router-view/>
  </div>
</template>

<script>
	import FooterBar from '@/components/common/module/footerBar';
	import wx from './assets/js/wxConfig1.js'
	import fixedInput from './assets/js/fixedInput'
	import axios from 'axios';
export default {
  name: 'App',
  
  components:{
	  	FooterBar,
	  },
	mixins: [fixedInput],
	updated() {
      // 解决ios输入框弹出的页面样式问题
      document.querySelectorAll("input").forEach(item => {
        item.onblur = this.temporaryRepair;
      });
      document.querySelectorAll("select").forEach(item => {
        item.onchange = this.temporaryRepair;
      });
      document.querySelectorAll("textarea").forEach(item => {
        item.onblur = this.temporaryRepair;
      });
    },
  data(){
	  	return{
	  		isShows:true
	  	}
	  },
		mounted() {
//			console.log("$route", this.$route)
			// 获取loading图和banner图
			axios.get('https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=azAwi6YZQ9HHJ4lwyLF').then((res)=>{
//		    	console.log('resssssddd',JSON.parse(decodeURIComponent(res.data.data.content.info)))
		    	let data = JSON.parse(decodeURIComponent(res.data.data.content.info));
		    	let title = data.shareTitle?data.shareTitle:'微众银行#High FIVE Today#短视频挑战赛';
		    	let desc = data.shareContent?data.shareContent:'记录美好时刻，击掌赢大奖！（行内活动）';
		    	//分享信息配置
				const shareConfigCon = {
				  ShareUrl: "http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_2/public/index/wxlogin/Login",
				  Title: title,
				  Desc: desc,
				  ShareImage: "https://game.flyh5.cn/resources/game/wechat/zcc/wzs/image/share.png"
				}
				wx.wxRegister(shareConfigCon);
		    }).catch((res)=>{
		        console.log(res)
		    })
			//分享信息配置
//			const shareConfigCon = {
//				ShareUrl: "http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_2/public/index/wxlogin/Login",
//			  	Title: '微众银行#High FIVE Today#短视频挑战赛',
//			  	Desc: "记录美好时刻，击掌赢大奖！（行内活动）",
//			  	ShareImage: "https://game.flyh5.cn/resources/game/wechat/zcc/wzs/image/share.png"
//			}
//			wx.wxRegister(shareConfigCon);
		},
		watch: {
			$route(to, from) {
				console.log("to", to);
				if (
					to.name == 'index' ||
					to.name == 'personal' ||
					to.name == 'rank'
				) {
//					this.$store.dispatch('showFooter')
						this.isShows = true;
				} else {
						this.isShows = false;
//					this.$store.dispatch('hideFooter')
				}
			}
		}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  /*margin-top: 60px;*/
}
html,body{
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}
html.disable_scroll,
	body.disable_scroll {
		height: 100%;
		overflow: hidden;
	}
.inline{
	display: inline-block;
}
.el-input__prefix{
	display: none;
}
.el-input__inner{
	padding: 0 10px !important;
	border: 1px solid #BFBFBF; /*no*/
	border-radius: 4px;
}
.el-notification__closeBtn{
	display: none;
}
.el-date-editor.el-input{
	width: 100% !important;
}
.el-message-box{
	width: 60% !important;
}
.el-loading-mask{
		width: 100px !important;
    margin: auto !important;
    background: #eee !important;	
  }
	.el-loading-spinner{
		margin: 0 !important;
		top: 0 !important;
	}
	.circular{
		width: 100px !important;
		height: 100px !important;
	}
</style>
