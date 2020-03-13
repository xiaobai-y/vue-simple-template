const tabs = {
    state:{
        openTabs:[
            {
                name:'首页',
                path:'/welcome'
            }
        ],
        activeTab:'/welcome' //当前打开的标签页
    },
    mutations:{
        addTab(state,tabItem){
            var obj = {
                name:tabItem.name,
                path:tabItem.path 
            }
            state.openTabs.push(obj);
            state.activeTab = tabItem.path

        },
        changeTab(state,tabPath){
            state.activeTab = tabPath

        },
        removeTab(state,tabPath){
            // filter()方法操作数组不是响应式的 
            state.openTabs =  state.openTabs.filter(function(item){
               return item.path !== tabPath
            })

        }
    }
}
export default tabs