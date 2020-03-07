import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// 解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
// 原因：在路由中添加了相同的路由。
// 解决：
// 重写路由的push方法
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import Login from '../pages/login.vue'
import Index from '../pages/index.vue'

import AppointmentCareManage from '../pages/manager/appointmentCareManage.vue'
import AppointmentTreatManage from '../pages/manager/appointmentTreatManage.vue'
import CustomerMange from '../pages/manager/customerManage.vue'
import DoctorsManage from '../pages/manager/doctorsManage.vue'
import Logs from '../pages/manager/logs.vue'
import MediceManage from '../pages/manager/mediceManage.vue'
// import PetsManage from '../pages/manager/petsManage.vue'

import AppointmentCare from '../pages/customer/appointmentCare.vue'
import AppointmentTreat from '../pages/customer/appointmentTreat.vue'
import MessageBoard from '../pages/customer/messageBoard.vue'
import MyAppointmentCustomer from '../pages/customer/myAppointmentCustomer.vue'

import MyAppointmentDoctor from '../pages/doctor/myAppointmentDoctor.vue'

import PersonalInfo from '../pages/common/personalInfo.vue'
import Welcome from '../pages/common/welcome.vue'

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export const powerRouter = [
  {
    path: '/', redirect: '/welcome', name: 'Index', component: Index, hidden: false,
    children: [
      { path: '/welcome', name: '首页', component: Welcome, },
      { path: '/appointmentCareManage', name: '预约寄养管理', component: AppointmentCareManage, meta: { role: ['A'] } },
      { path: '/appointmentTreatManage', name: '预约就诊管理', component: AppointmentTreatManage, meta: { role: ['A'] } },
      { path: '/customerManage', name: '顾客管理', component: CustomerMange, meta: { role: ['A'] } },
      { path: '/doctorsManage', name: '医生管理', component: DoctorsManage, meta: { role: ['A'] } },
      { path: '/mediceManage', name: '药品管理', component: MediceManage, meta: { role: ['A'] } },
      // { path: '/petsManage', name: '宠物管理', component: PetsManage, meta: { role: ['A'] } },
      { path: '/logs', name: '日志', component: Logs, meta: { role: ['A'] } },     
      { path: '/appointmentCare', name: '预约寄养', component: AppointmentCare, meta: { role: ['B'] } },
      { path: '/appointmentTreat', name: '预约就诊', component: AppointmentTreat, meta: { role: ['B'] } },
      { path: '/messageBoard', name: '留言板', component: MessageBoard, meta: { role: ['B'] } },
      { path: '/myAppointmentCustomer', name: '我的预约就诊', component: MyAppointmentCustomer, meta: { role: ['B'] } },
      { path: '/myAppointmentDoctor', name: '我的预约', component: MyAppointmentDoctor, meta: { role: ['C'] } },    
      { path: '/personalInfo', name: '个人信息', component: PersonalInfo, },
    ]
  }
];