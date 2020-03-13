import loginByUserInfo from '../../api/login'
const login = {
    state: {
        username: sessionStorage.getItem('USERNAME'),
        role: sessionStorage.getItem('ROLE'),
        newrouter: [],
        userid:sessionStorage.getItem('USERID'),
        phone:sessionStorage.getItem('PHONE'),
        money:sessionStorage.getItem('MONEY'),
    },
    mutations: {
        SET_USERNAME(state, username) {
            state.username = username
        },
        SET_ROLE(state, role) {
            state.role = role
        },
        SET_NEWROUER(state, newrouter) {
            state.newrouter = newrouter
        },
        SET_USERID(state,userid){
            state.userid = userid
        },
        SET_PHONE(state,phone){
            state.phone = phone
        },
        SET_MONEY(state,money){
            state.money = money
        }
    },
    actions: {
        // Logins({ commit }, info) {
        
            // return new Promise((resolve, reject) => {                 

                // let data = {};
                // loginByUserInfo.map(function (item) { //获取所以用户信息
                //     if ((info.username === item.username) && (info.pew == item.pew)) {
                //         commit('SET_USERNAME', item.username);  //将username和role进行存储
                //         sessionStorage.setItem('USERNAME', item.username); //存入 session 
                //         commit('SET_ROLE', item.role);
                //         sessionStorage.setItem('ROLE', item.role);
                //         return data = { username: item.username, introduce: item.introduce };
                //     } else {
                //         return data;
                //     }
                // });

                // resolve(data);

            // }).catch(error => {
            //     reject(error);
            // });
        // },
        Roles({ commit }, newrouter) {
            return new Promise((resolve, reject) => {
                commit('SET_NEWROUER', newrouter); //存储最新路由
                resolve(newrouter);
            }).catch(error => {
                reject(error);
            });
        },
        Logout({ commit, state }) {
            return new Promise((resolve, reject) => {
              
                commit('SET_USERNAME','');
                commit('SET_ROLE','');
                commit('SET_NEWROUER',[]);
                commit('SET_USERID','');
                commit('SET_PHONE','');
                commit('SET_MONEY','');
                location.reload();
                sessionStorage.removeItem('USERNAME');
                sessionStorage.removeItem('ROLE');
                sessionStorage.removeItem('USERID');
                sessionStorage.removeItem('PHONE');
                sessionStorage.removeItem('MONEY');
                // 清除token
                sessionStorage.removeItem('AUTH_TOKEN');
                resolve();
              }).catch(error => {
                reject(error);
              });
          },
    }
}
export default login 