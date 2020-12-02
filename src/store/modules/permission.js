import { asyncRouterMap, constantRouterMap } from '@/router'
import { IS_MOCK } from '@/utils/const'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param rules
 * @param route
 */
function hasPermission(rules, route) {
  if (IS_MOCK) return true
  if (route.meta && route.meta.rule) {
    return rules.indexOf(route.meta.rule) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param rules
 */
function filterAsyncRouter(asyncRouterMap, rules) {
  const accessedRouters = asyncRouterMap.filter(route => {
    route.meta = route.meta || {}
    let sort = -1
    if (route.meta.rule) {
      sort = rules.indexOf(route.meta.rule)
    }

    // 菜单排序
    if (!route.meta.sort) {
      route.meta.sort = sort
    }

    if (hasPermission(rules, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, rules)
      }
      return true
    }
    return false
  })

  accessedRouters.sort(function(a, b) {
    return a.meta.sort - b.meta.sort
  })

  return accessedRouters
}

const permission = {
  state: {
    permited: false,
    routers: [].concat(constantRouterMap),
    addRouters: []
  },
  mutations: {
    SET_PERMITED: (state, permited) => {
      state.permited = permited
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = [].concat(constantRouterMap, routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { rules } = data
        let accessedRouters = filterAsyncRouter(asyncRouterMap, rules)
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_PERMITED', true)
        resolve()
      })
    }
  }
}

export default permission
