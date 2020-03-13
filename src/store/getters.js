const getters = {
    username:state=>state.login.username,
    role:state=>state.login.role,
    userid:state=>state.login.userid,
    phone:state=>state.login.phone,
    money:state=>state.login.money,
    newrouter:state=>state.login.newrouter,
    opentabs:state=>state.tabs.openTabs,
    activetab:state=>state.tabs.activeTab,
    isShow:state=>state.loading.isShow,
    
}
export default getters