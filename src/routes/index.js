import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'
Vue.use(Router);

const guest = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/dashboard')
}

const authenticate = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue'),
      meta:{
        layout: 'site'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      beforeEnter:authenticate
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      beforeEnter:guest,
      meta:{
        layout:'auth'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      beforeEnter:guest,
      meta:{
        layout:'auth'
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue'),
      beforeEnter:guest,
      meta:{
        layout:'auth'
      }
    }
  ]
});
