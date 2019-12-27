// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import { Alert } from 'vux'  // 全局引入
import 'lib-flexible/flexible'
import './assets/js/wxConfig1.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload' //懒加载
import  VConsole  from  'vconsole' //绿标
//const  vConsole = new VConsole() //注意 
Vue.use(VueLazyload)
Vue.use(ElementUI)
import VueTouch from 'vue-touch' // 引入滑动插件
Vue.use(VueTouch, {name: 'v-touch'})

// 引入外部js文件
import Api from '@/assets/js/api.js'
Vue.prototype.apiUrl= Api;

//  获取地址栏参数
import {UrlSearch} from '@/assets/js/url.js'
let getUrl = new UrlSearch();
Vue.prototype.$getUrl= getUrl;

// 禁止滚动
import Base from './assets/js/base';
Vue.prototype.base = Base;

import axios from 'axios';
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
