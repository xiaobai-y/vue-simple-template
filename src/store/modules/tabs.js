const tabs = {
    state:{
        openTabs:[
            {
                name:'首页',
                path:'/welcome'
            }
        ],
        activeTab:''
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
        changeTab(state,tabItem){
            console.log(tabItem)
            state.activeTab = tabItem.path
        },
    }
}
export default tabs