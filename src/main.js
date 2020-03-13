import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// css初始化文件
import 'normalize.css'
import './assets/public.css'
import { powerRouter } from './router'




// 导入封装后的axios
// axios不是vue自带的组件 是第三方插件 所以使用不能使用Vue.use() 这样来用Vue.prototype.$apiAxios = apiAxios
import { apiAxios } from './api/request.js'
Vue.prototype.$http = apiAxios 
Vue.config.productionTip = false


// 路由拦截
router.beforeEach((to, from, next) => {
  if (store.getters.role != null) { //判断role 是否存在
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
      store.dispatch('Roles', newrouter).then(res => {
        // 没看懂这句代码啥意思
        next({ ...to })
      }).catch(() => {

      })
    }
  } else {
    if (['/login'].indexOf(to.path) !== -1 || ['/register'].indexOf(to.path) !== -1) {
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
