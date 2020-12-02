import router from './router'
import store from './store'
import { IS_MOCK } from '@/utils/const'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isNotEmpty } from '@/utils'
import { getToken } from '@/utils/cache/auth'

NProgress.configure({
  showSpinner: false
})

// permissiom judge function
function hasPermission(rules = [], permissionRule = '') {
  if (IS_MOCK || permissionRule.length === 0 ) {
    return true
  }
  return rules.indexOf(permissionRule) >= 0
}

// 白名单
const whiteList = ['/401', '/404', '/500', '/auth/signin']
const loginPath = '/auth/signin'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()

  if (isNotEmpty(token)) { // 判断是否登录
    if (to.path === loginPath) {
      next({ path: '/' })
      NProgress.done()
    } else {
      const rules = store.getters.rules
      const isPermited = store.getters.permited
      if (rules.length === 0) {
        // 无权限重新登录
        store.dispatch('FedLogOut').then(() => {
          next({ path: loginPath })
        })
      } else if (!isPermited) {
        store.dispatch('GenerateRoutes', { rules }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch(err => {
          console.log(err)
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断
        if (hasPermission(rules, to.meta.rule)) {
          next()
        } else {
          next({path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(loginPath) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
