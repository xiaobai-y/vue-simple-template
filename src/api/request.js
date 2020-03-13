import axios from 'axios'
import qs from 'qs'
import store from '../store';
export function apiAxios(config) {
    // 创建一个axios实例 提供一些默认配置
    const instance = axios.create({
        baseURL: 'http://192.168.0.104:8080/pethospitalmanagement',
    })
    // 添加请求拦截器 
    // 配置axios请求头，axios每次发起请求携带token，在Network中的headers看的到
    // token  是请求头的字段
    // 这里 return config 这一步一定要有 否则就真被拦截掉不往下走了
    let token = sessionStorage.getItem('AUTH_TOKEN')
    instance.interceptors.request.use(function (config) {
        // token
        if (token) {
            config.headers.token = sessionStorage.getItem('AUTH_TOKEN');
        }
        // loading动画
        store.commit('SET_ISSHOW',true);
        // post qs.stringify()
        if(config.method == 'post'){
            config.data = qs.stringify({data:JSON.stringify(config.data)})
        }
        return config
    }, function (error) {
        console.log(err)
    })
    // 响应拦截器
    instance.interceptors.response.use(config=>{
        store.commit('SET_ISSHOW',false);
        return config
    })
    // 这里return 的是一个promise
    return instance(config)
}