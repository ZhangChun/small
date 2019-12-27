import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Rank from '@/components/rank'
import Personal from '@/components/personal'
import Upload from '@/components/upload'
import Pubu from '@/components/pubu'
import Spwer1 from '@/components/spwer1'
import Spwer2 from '@/components/spwer2'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},  //路由重定向
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {path: '/rank',name: 'rank',component: Rank},  //排行榜
    {path: '/personal',name: 'personal',component: Personal},  //个人中心
    {path: '/upload',name: 'upload',component: Upload},  //发布页面
    {path: '/pubu',name: 'pubu',component: Pubu},  //瀑布流页面
    {path: '/spwer1',name: 'spwer1',component: Spwer1},  //轮播页面
    {path: '/spwer2',name: 'spwer2',component: Spwer2},  //轮播页面
  ]
})
