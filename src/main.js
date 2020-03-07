import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import './plugins/element.js'
// css初始化文件
import 'normalize.css'
import './assets/public.css'
import { powerRouter } from './router'

// Vue.use(axios);
Vue.prototype.$axios = axios 

Vue.config.productionTip = false

// 路由拦截
router.beforeEach((to, from, next) => {
  if (store.getters.role) { //判断role 是否存在
    if (store.getters.newrouter.length !== 0) {  //判断是否已经有菜单
      next();
    } else {
      let newrouter

      let newchildren = powerRouter[0].children.filter(route => {
        if (route.meta) {
          if (route.meta.role == store.getters.role) {
            return true
          }
          return false
        } else {
          return true
        }
      });

      newrouter = powerRouter
      newrouter[0].children = newchildren
      router.addRoutes(newrouter) //添加动态路由
      // console.log('下面是newrouter')
      // console.log(newrouter)
      store.dispatch('Roles', newrouter).then(res => {
        // 没看懂这句代码啥意思
        next({ ...to })
      }).catch(() => {

      })
    }
  } else {
    if (['/login'].indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// 运行时模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
