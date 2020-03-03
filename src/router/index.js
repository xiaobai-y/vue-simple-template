import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import Login from '../pages/login.vue'
import Index from '../pages/index.vue'

import AppointmentCareManage from '../pages/appointmentCareManage.vue'
import AppointmentCare from '../pages/appointmentCare.vue'
import AppointmentTreatManage from '../pages/appointmentTreatManage.vue'
import AppointmentTreat from '../pages/appointmentTreat.vue'
import CustomerMange from '../pages/customerManage.vue'
import DoctorsManage from '../pages/doctorsManage.vue'
import Logs from '../pages/logs.vue'
import MediceManage from '../pages/mediceManage.vue'
import MessageBoard from '../pages/messageBoard.vue'
import MyAppointment from '../pages/myAppointment.vue'
import PersonalInfo from '../pages/personalInfo.vue'
import PetsManage from '../pages/petsManage.vue'
import Welcome from '../pages/welcome.vue'

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
      { path: '/petsManage', name: '宠物管理', component: PetsManage, meta: { role: ['A'] } },
      { path: '/logs', name: '日志', component: Logs, meta: { role: ['A'] } },     
      { path: '/appointmentCare', name: '预约寄养', component: AppointmentCare, meta: { role: ['B'] } },
      { path: '/appointmentTreat', name: '预约就诊', component: AppointmentTreat, meta: { role: ['B'] } },
      { path: '/messageBoard', name: '留言板', component: MessageBoard, meta: { role: ['B'] } },
      { path: '/myAppointment', name: '我的预约', component: MyAppointment, meta: { role: ['C'] } },
      { path: '/personalInfo', name: '个人信息', component: PersonalInfo, },
    ]
  }
];