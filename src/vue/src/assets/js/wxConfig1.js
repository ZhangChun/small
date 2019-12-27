import wx from 'weixin-js-sdk'
// import { loadScript, GetQueryString } from 'common/js/util'
// import { shareConfig } from 'api/request'

//分享信息配置
//const shareConfigCon = {
//	ShareUrl: "http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh/public/index/wxlogin/Login",
//	Title: '定格美好时光——2019年微众银行国庆摄影比赛',
//	Desc: "总有一些美好瞬间想要记录下来？快来参加，更多惊喜大奖，够胆就来！",
//	ShareImage: "https://game.flyh5.cn/resources/game/wechat/zcc/wz/image/shareImg.png"
//}
//console.log("【分享配置信息】")
//console.log(shareConfigCon)
//console.log(window.location)
	const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (shareConfigCon) {
  	// 接收页面传过来的分享数据  也可以上面自己写死 
  	shareConfigCon = shareConfigCon;
//	console.log("传过来的分享数据=======》",shareConfigCon)
    wxConfigInit()
  	//分享信息方法
		function wxConfigInit() {
//		  console.log('【wx】')
//		  console.log(wx)
		  //加载配置微信jssdk参数标签    
		  loadScript("https://game.flyh5.cn/game/twolevel_autho/share.php?auth_appid=wx7c3ed56f7f792d84&type=js&isonlyopenid=true", () => {    
		    //配置微信jssdk   
		    wxConfig()           
		  })
		}
		function loadScript(src, callback) {
		  var s = document.createElement("script")
		  s.async = false
		  s.src = src
		  var evtName = null
		  var evtListener = null
		  function logic() {
		    s.parentNode.removeChild(s)
		    s.removeEventListener(evtName, evtListener, false)
		    callback && callback()
		  }
		  if (!-[1,]) {
		    evtName = "readystatechange"
		    evtListener = function () {
		      (this.readyState == "loaded" || this.readyState == "complete") && logic()
		    }
		  } else {
		    evtName = "load"
		    evtListener = logic
		  }
		  s.addEventListener(evtName, evtListener, false)
		  document.body.appendChild(s)
		}
		function wxConfig(configData, openJssdkDebug) {
		  let _self = this
//		  console.log("【微信jssdk注册参数】")
//		  console.log(wx_config)
//		  console.log("传过来的分享数据=======》",shareConfigCon)
		  wx.config({
		    debug: window.openJssdkDebug,
		    appId: wx_config["appId"],
		    timestamp: wx_config["timestamp"],
		    nonceStr: wx_config["nonceStr"],
		    signature: wx_config["signature"],
		    jsApiList: [
		    'checkJsApi', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice','onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'getLocalImgData', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
		    ]
		  })
		  wx.ready(function () {
		    console.log("【wx.ready OK】")  
		    shareConfigure()
		  })
		  wx.error(function (res) {
		    console.log("wx.config error:", res);
		    wxConfig();
		  })
		}
		function shareConfigure() {
			console.log("aaaaaaaaaaa")
		  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
		  wx.updateAppMessageShareData({ 
		    title: shareConfigCon.Title, // 分享标题
		    desc: shareConfigCon.Desc, // 分享描述
		    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: shareConfigCon.ShareImage, // 分享图标
		    success: function () {
		      // 设置成功
		      console.log('【分享配置OK1111】')
		    }
		  })
		  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
		  wx.updateTimelineShareData({ 
		    title: shareConfigCon.Title, // 分享标题
		    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: shareConfigCon.ShareImage, // 分享图标
		    success: function () {
		      // 设置成功
		      console.log('【分享配置OK2222】')
		    }
		  })
		  //2.1监听“分享到朋友”按钮点击、自定义分享内容及分享结果接口
		  wx.onMenuShareAppMessage({
		    title: shareConfigCon.Title, // 分享标题
		    desc: shareConfigCon.Desc, // 分享描述
		    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: shareConfigCon.ShareImage, // 分享图标
		    success: function(res) {
		      console.log('【分享配置OK3333】')
		    },
		    cancel: function(res) {},
		    fail: function(res) {}
		  });
		    
		  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		  wx.onMenuShareTimeline({
		    title: shareConfigCon.Title, // 分享标题
		    desc: shareConfigCon.Desc, // 分享描述
		    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: shareConfigCon.ShareImage, // 分享图标
		    success: function(res) {
		      console.log('【分享配置OK4444】') 
		    },
		    cancel: function(res) {},
		    fail: function(res) {}
		  });
		}
  },
}
export default wxApi

// })
