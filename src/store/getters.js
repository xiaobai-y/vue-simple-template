const getters = {
    // username(state){
    //     return this.username = state.username
    // },
    username:state=>state.login.username,
    role:state=>state.login.role,
    newrouter:state=>state.login.newrouter,
    opentabs:state=>state.tabs.openTabs,
    activetab:state=>state.tabs.activeTab,
}
export default getters