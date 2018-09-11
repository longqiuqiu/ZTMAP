// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './vuex/store'


import './assets/css/normal.css'
import './assets/css/bootstrap.css'

import Overall from './components/Overall' // 地图

//路由
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

// 引入组件
// 定义路由 & 路由重定向
const routes = [
  {
    path: '/',
    component: Overall
  },
  {
    path: '/Overall',
    component: Overall
  }
]

// 创建router实例，传入配置routes
const router = new VueRouter({
  routes
})

// 创建和挂载根实例，通过router配置参数注入路由
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

