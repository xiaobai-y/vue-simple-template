# vue-simple-template
vue/cli3脚手架搭建的简单模板 包含登录 退出 权限路由
共三个角色 adan barbara carrie
adan可以看到管理类界面
barbara 顾客角色 可以看到预约界面
carrie  医生角色 可以看到我的预约界面

技术栈
vue                 -- js框架
vue-router          -- 路由工具
vuex                -- 实现不同组件间的状态共享
webpack             -- 打包神器
bable               -- 将es6代码转化为es5
normalize.css       -- 重置掉浏览器默认的css样式
element-ui          -- ui框架

项目初始化
cd vue-simple-template
安装依赖
npm install 
运行
npm run serve

项目结构
src
├── App.vue ---- 页面入口
├── api ---- api请求
│   └── login.js ---- 模拟json对象数据
├── assets ---- 主题 字体等静态资源,css样式文件
│   └── logo.png
├── components ---- 组件
│   ├── index.vue
│   └── login.vue
├── main.js ---- 初始化组件 加载路由
├── router ---- 路由
│   └── index.js
└── store ---- vuex状态管理
├── getters.js
├── index.js
└── modules --vuex的模块
└── login.js

重点
动态路由的关键在于route配置的meta字段和vuex的状态共存

router/index.js 

// 初始化路由
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
// 动态路由 meta 定义了role
export const powerRouter =[
    { path: '/',redirect:'/red', name: 'index',component: Index,hidden:false,
      children: [
        { path: '/red', name: 'red', component: red,},
        { path: '/yellow', name: 'yellow', component: yellow, meta: {role: 'B'}},
        { path: '/blue', name: 'blue', component: blue, meta: {role: 'C'}}
      ]
    }
];


store/modules/login.js  actions部分

Logins({ commit }, info){
          return new Promise((resolve, reject) => {
              let data={};
              loginByUserInfo.map(function (item) { //获取所以用户信息
                  if(info.username === item.username || info.pew === item.pew){
                      commit('SET_USERNAME',item.username);  //将username和role进行存储
                      sessionStorage.setItem('USERNAME', item.username); //存入 session
                      commit('SET_ROLE',item.role);
                      sessionStorage.setItem('ROLE', item.role);
                      return data={username:item.username,introduce:item.introduce};
                  }else{
                      return data;
                  }
            });
              resolve(data);
        }).catch(error => {
            reject(error);
        });
      },
      Roles({ commit }, newrouter){
        return new Promise((resolve, reject) => {
              commit('SET_NEWROUER',newrouter); //存储最新路由
              resolve(newrouter);
        }).catch(error => {
            reject(error);
        });
      },



main.js 
// 路由拦截
router.beforeEach((to, from, next) => {
    if(store.getters.role){ //判断role 是否存在
 
        if(store.getters.newrouter.length !== 0){
               next() //resolve 钩子
        }else{
            let newrouter
               if (store.getters.role == 'A') {  //判断权限
                newrouter = powerRouter
            } else {
                let newchildren = powerRouter[0].children.filter(route => {
                    if(route.meta){
                        if(route.meta.role == store.getters.role){
                            return true
                        }
                        return false
                    }else{
                        return true
                    }
                });
                newrouter = powerRouter
                newrouter[0].children = newchildren
            }
            router.addRoutes(newrouter) //添加动态路由
            store.dispatch('Roles',newrouter).then(res => {
                next({ ...to })
            }).catch(() => {       
 
            })
        }
    }else{
           if (['/login'].indexOf(to.path) !== -1) {
           next()
        } else {
           next('/login')
        }
    }
})


components/index.vue 

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
 
...mapGetters([
        'newrouter'
    ])

写到这 可以算是一个项目的基础框架有了 再写项目直接拿这个代码开始写业务代码
