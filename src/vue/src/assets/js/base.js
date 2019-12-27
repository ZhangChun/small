export default {
	/*
	 * 判断是否是微信浏览器
	 * return false：is weChat brower
	 * return true：no weChat borwer
	 * */
	isWeiXin: function() {
		var browserInfo = window.navigator.userAgent.toLowerCase();
		if(browserInfo.match(/MicroMessenger/i) == 'micromessenger') {
			return false;
		} else {
			return true;
		}
	},
	/*
	 * 是否禁止页面滚动
	 * noScroll: this page diable not scroll
	 * yesScroll: this page diable scroll
	 * */
	isScroll: {
		noScroll: function() {
			document.querySelector('html').className = 'disable_scroll';
			document.querySelector('body').className = 'disable_scroll';
		},
		yesScroll: function() {
			document.querySelector('html').removeAttribute('class');
			document.querySelector('body').removeAttribute('class');
		}
	},
	/*
	 * 获取上传图片的本地路径
	 * obj: $event.srcElement
	 * index: index
	 * */
	getFileUrl: function(obj, index) {
		let url;
		url = window.URL.createObjectURL(obj.files.item(index));
		return url;
	},
	/*
	 * 复制传入的参数到剪切板
	 * val：要拷贝的值
	 * */
	copy: function(val) {
		var oInput = document.createElement('input');
		oInput.value = val;
		document.body.appendChild(oInput);
		// 选择对象
		oInput.select();
		// 执行浏览器复制命令
		document.execCommand("Copy");
		oInput.style.display = 'none';
		oInput.className = 'oInput';
		console.log('复制成功');
	}
}