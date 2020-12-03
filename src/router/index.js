import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
// import EmptyLayout from '@/views/layout/empty'
import SignLayout from '@/views/layout/sign'
// import SkeletonLayout from '@/views/layout/skeleton'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401'),
    hidden: true
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    hidden: true
  }, {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/500'),
    hidden: true
  }, {
    path: '/auth',
    name: 'auth',
    component: SignLayout,
    hidden: true,
    children: [{
      path: 'signin',
      component: () => import('@/views/auth/signin'),
      name: 'signin',
      props: true,
      meta: { title: 'signin' }
    },{
      path: 'forget',
      name: 'forget',
      component: () => import('@/views/auth/forget'),
      meta: { title: 'forget' }
    }]
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'dashboard', icon: 'ht-icon-home' },
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', rule: 'dashboard' }
    }]
  }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/store',
    component: Layout,
    redirect: 'noredirect',
    name: 'store',
    meta: { title: 'store', icon: 'ht-icon-shop', rule: 'store' },
    children: [{
      path: 'list',
      name: 'storeList',
      component: () => import('@/views/store/list'),
      meta: { title: 'storeList', rule: 'store-list' }
    }, {
      path: 'add',
      name: 'storeAdd',
      component: () => import('@/views/store/add'),
      meta: { title: 'storeAdd', rule: 'store-add' },
    }, {
      path: 'store/:id/edit',
      name: 'storeEdit',
      hidden: true,
      props: true,
      component: () => import('@/views/store/edit'),
      meta: { title: 'storeEdit', rule: 'store-edit' }
    }, {
      path: ':id/detail',
      name: 'storeDetail',
      hidden: true,
      props: true,
      component: () => import('@/views/store/detail'),
      meta: { title: 'storeDetail', rule: 'store-detail' }
    }]
  }, {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: 'user',
    meta: { title: 'user', icon: 'ht-icon-gear', rule: 'user' },
    children: [{
      path: 'info',
      name: 'userInfo',
      component: () => import('@/views/user/info'),
      meta: { title: 'userInfo', rule: 'user-info' }
    }, {
      path: 'pass',
      name: 'userPass',
      component: () => import('@/views/user/pass'),
      meta: { title: 'userPass', rule: 'user-password' }
    }]
  }, {
    path: '*',
    redirect: '404',
    meta: { sort: Number.MAX_VALUE },
    hidden: true
}]
