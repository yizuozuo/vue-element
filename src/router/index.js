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
    // component: SkeletonLayout,
    // hidden: true,
    // children: [{
    //   path: '/path',
    //   component: SignLayout,
    //   children: [{
    //     path: 'signin',
    //     component: () => import('@/views/auth/signin'),
    //     name: 'signin',
    //     props: true,
    //     meta: { title: 'signin' }
    //   }]
    // }]
    component: SignLayout,
    hidden: true,
    children: [{
      path: 'signin',
      component: () => import('@/views/auth/signin'),
      name: 'signin',
      props: true,
      meta: { title: 'signin' }
    }]
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'dashboard', icon: 'ht-icon-home' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
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
      hidden: true,
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
    path: '*',
    redirect: '404',
    meta: { sort: Number.MAX_VALUE },
    hidden: true
  }]
