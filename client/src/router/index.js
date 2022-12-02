import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/MenuPage')
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage')
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterPage')
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminPage')
    },
    {
      path: '*',
      component: () => import('@/views/LoginPage')
    }
  ]
})
