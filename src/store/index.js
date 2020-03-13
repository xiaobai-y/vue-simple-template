import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import tabs from './modules/tabs'
import loading from './modules/loading'
import getters from './getters.js'

Vue.use(Vuex);

const store =  new Vuex.Store({
    modules:{
        login,    
        tabs,   
        loading,
    },
    getters
})
export default store