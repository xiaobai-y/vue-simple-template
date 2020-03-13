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
import Register from '../pages/register.vue'

import AppointmentCareManage from '../pages/manager/appointmentCareMange/index.vue'
import AppointmentCareNoverify from '../pages/manager/appointmentCareMange/appointmentCareNoverify.vue'
import AppointmentCareSuccess from '../pages/manager/appointmentCareMange/appointmentCareSuccess.vue'
import AppointmentCareComplete from '../pages/manager/appointmentCareMange/appointmentCareComplete.vue'
import AppointmentCareReject from '../pages/manager/appointmentCareMange/appointmentCareReject.vue'

import AppointmentTreatManage from '../pages/manager/appointmentTreatManage/index.vue'
import AppointmentTreatNoverify from '../pages/manager/appointmentTreatManage/appointmentTreatNoverify.vue'
import AppointmentTreatSuccess from '../pages/manager/appointmentTreatManage/appointmentTreatSuccess.vue'
import AppointmentTreatComplete from '../pages/manager/appointmentTreatManage/appointmentTreatComplete.vue'
import AppointmentTreatReject from '../pages/manager/appointmentTreatManage/appointmentTreatReject.vue'

import CustomerMange from '../pages/manager/customerManage.vue'
import DoctorsManage from '../pages/manager/doctorsManage.vue'
import Logs from '../pages/manager/logs.vue'
import MediceManage from '../pages/manager/mediceManage.vue'

import AppointmentCare from '../pages/customer/appointmentCare.vue'
import AppointmentTreat from '../pages/customer/appointmentTreat.vue'
import MessageBoard from '../pages/customer/messageBoard.vue'
import MyAppointmentCustomer from '../pages/customer/myAppointmentCustomer.vue'

import MyAppointmentDoctor from '../pages/doctor/myAppointmentDoctor/index.vue'
import AppointmentTreatNoverifyD from '../pages/doctor/myAppointmentDoctor/appointmentTreatNoverifyD.vue'
import AppointmentTreatSuccessD from '../pages/doctor/myAppointmentDoctor/appointmentTreatSuccessD.vue'
import AppointmentTreatCompleteD from '../pages/doctor/myAppointmentDoctor/appointmentTreatCompleteD.vue'
import AppointmentTreatRejectD from '../pages/doctor/myAppointmentDoctor/appointmentTreatRejectD.vue'

import PersonalInfo from '../pages/common/personalInfo.vue'
import Welcome from '../pages/common/welcome.vue'

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})

export const powerRouter = [

  {
    path: '/', redirect: '/welcome', name: 'Index', component: Index, hidden: false,
    children: [
      { path: '/welcome', name: '首页', component: Welcome, },
      { path: '/appointmentCareManage', name: '预约寄养管理', component: AppointmentCareManage, meta: { role: ['0'] },
      children:[
        {
          path: '/appointmentCareNoverify', name: '待审核', component: AppointmentCareNoverify, meta: { role: ['0'] }
        },
        {
          path: '/appointmentCareSuccess', name: '预约成功', component: AppointmentCareSuccess, meta: { role: ['0'] }
        },
        {
          path: '/appointmentCareComplete', name: '已完成', component: AppointmentCareComplete, meta: { role: ['0'] }
        },
        {
          path: '/appointmentCareReject', name: '已拒绝', component: AppointmentCareReject, meta: { role: ['0'] }
        }
      ] },

      { path: '/appointmentTreatManage', name: '预约就诊管理', component: AppointmentTreatManage, meta: { role: ['0'] },
      children:[
        {
          path: '/appointmentTreatNoverify', name: '待审核', component: AppointmentTreatNoverify, meta: { role: ['0'] }
        },
        {
          path: '/appointmentTreatSuccess', name: '预约成功', component: AppointmentTreatSuccess, meta: { role: ['0'] }
        },
        {
          path: '/appointmentTreatComplete', name: '已完成', component: AppointmentTreatComplete, meta: { role: ['0'] }
        },
        {
          path: '/appointmentTreatReject', name: '已拒绝', component: AppointmentTreatReject, meta: { role: ['0'] }
        }
      ] },
      { path: '/customerManage', name: '顾客管理', component: CustomerMange, meta: { role: ['0'] } },
      { path: '/doctorsManage', name: '医生管理', component: DoctorsManage, meta: { role: ['0'] }},
      { path: '/mediceManage', name: '药品管理', component: MediceManage, meta: { role: ['0'] } },
      { path: '/logs', name: '日志', component: Logs, meta: { role: ['0'] } },     
      { path: '/appointmentCare', name: '预约寄养', component: AppointmentCare, meta: { role: ['2'] } },
      { path: '/appointmentTreat', name: '预约就诊', component: AppointmentTreat, meta: { role: ['2'] } },
      { path: '/messageBoard', name: '留言板', component: MessageBoard, meta: { role: ['2'] } },
      { path: '/myAppointmentCustomer', name: '我的预约就诊', component: MyAppointmentCustomer, meta: { role: ['2'] } },
      { path: '/myAppointmentDoctor', name: '我的预约', component: MyAppointmentDoctor, meta: { role: ['1'] },
      children:[
        {
          path: '/appointmentTreatNoverifyD', name: '待审核', component: AppointmentTreatNoverifyD, meta: { role: ['1'] }
        },
        {
          path: '/appointmentTreatSuccessD', name: '预约成功', component: AppointmentTreatSuccessD, meta: { role: ['1'] }
        },
        {
          path: '/appointmentTreatCompleteD', name: '已完成', component: AppointmentTreatCompleteD, meta: { role: ['1'] }
        },
        {
          path: '/appointmentTreatRejectD', name: '已拒绝', component: AppointmentTreatRejectD, meta: { role: ['1'] }
        }
      ]  },    
      { path: '/personalInfo', name: '个人信息', component: PersonalInfo, },
    ]
  }
];