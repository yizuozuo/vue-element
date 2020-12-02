import { isEmpty, isArray } from '@/utils'
import { getBrandDetail } from '@/api/store'
import { loginIn, loginOut, enterApply, updateUserInfo } from '@/api/sys'
import { ROLE_BRAND, ROLE_STORE, ROLE_STUFF } from '@/utils/const'
import {
  getRules,
  setRules,
  getUserId,
  setUserId,
  getStoreId,
  setStoreId,
  setNickName,
  getNickName,
  setUserName,
  getUserName,
  setUserRole,
  getUserRole,
  getRealName,
  setRealName,
  setAvatar,
  getAvatar,
  getToken,
  setToken,
  getBrandName,
  setBrandName,
  getBrandLogo,
  setBrandLogo,
  clearAll,
} from '@/utils/cache/auth'

function calcMenus(menus) {
  let rules = []

  if(!isArray(menus)) {
    return rules
  }

  for(let item of menus) {
    if(!isEmpty(item.code)) {
      rules.push(item.code)
    }
    rules = rules.concat(calcMenus(item.sysMenuList))
  }
  return rules
}

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    storeId: getStoreId(),
    nickname: getNickName(),
    realName: getRealName(),
    avatar: getAvatar(),
    rules: getRules(),
    userName: getUserName(),
    userRole: getUserRole(),
    brandName: getBrandName(),
    brandLogo: getBrandLogo()
  },

  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_STORE_ID: (state, storeId) => {
      state.storeId = storeId
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICK_NAME: (state, name) => {
      state.nickname = name
    },
    SET_REAL_NAME: (state, name) => {
      state.realName = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, rules) => {
      state.rules = rules
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    },
    SET_USER_ROLE: (state, role) => {
      state.userRole = role
    },
    SET_BRAND_NAME: (state, name) => {
      state.brandName = name
    },
    SET_BRAND_LOGO: (state, logo) => {
      state.brandLogo = logo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ dispatch, commit }, loginInfo) {
      const user = loginInfo.user.trim()
      const pass = loginInfo.pass
      const brand = loginInfo.brand

      return new Promise((resolve, reject) => {
        loginIn(user, pass, brand)
          .then(res => {
            if (res.success && res.entity) {
              const { id, headImg, nickName, code, storeId, realName, token, userName, sysMenuList } = res.entity
              let menus = sysMenuList || []

              if (isArray(menus) && menus.length > 0) {
                let rules = calcMenus(menus)

                if (code === ROLE_BRAND) {
                  rules.push('user-role-brand')
                }

                if (code === ROLE_STORE) {
                  rules.push('user-role-store')
                }

                if (code === ROLE_STUFF) {
                  rules.push('user-role-stuff')
                }

                commit('SET_ROLES', rules)
                setRules(rules)
              } else {
                return reject(new Error('无权限'))
              }

              commit('SET_USER_ID', id)
              commit('SET_STORE_ID', storeId)
              commit('SET_AVATAR', headImg)
              commit('SET_NICK_NAME', nickName)
              commit('SET_REAL_NAME', realName)
              commit('SET_TOKEN', token)
              commit('SET_USER_NAME', userName)
              commit('SET_USER_ROLE', code)

              setUserId(id)
              setStoreId(storeId)
              setAvatar(headImg)
              setNickName(nickName)
              setRealName(realName)
              setToken(token)
              setUserName(userName)
              setUserRole(code)

              dispatch('LoadBrandInfo')
                .then(() => {
                  resolve()
                })
                .catch(err => {
                  reject(new Error(err.message || '加载品牌信息失败'))
                })
            } else {
              reject(new Error(res.message))
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 申请入驻
    ApplyEnter({ dispatch, commit }, data = {}) {
      return new Promise((resolve, reject) => {
        enterApply(data)
          .then(res => {
            if (res.success && res.entity) {
              const { id, headImg, nickName, code, storeId, realName, token, userName, sysMenuList } = res.entity
              let menus = sysMenuList || []

              if (isArray(menus) && menus.length > 0) {
                let rules = calcMenus(menus)

                if (code === ROLE_BRAND) {
                  rules.push('user-role-brand')
                }

                if (code === ROLE_STORE) {
                  rules.push('user-role-store')
                }

                if (code === ROLE_STUFF) {
                  rules.push('user-role-stuff')
                }

                commit('SET_ROLES', rules)
                setRules(rules)
              } else {
                return reject(new Error('无权限'))
              }

              commit('SET_USER_ID', id)
              commit('SET_STORE_ID', storeId)
              commit('SET_AVATAR', headImg)
              commit('SET_NICK_NAME', nickName)
              commit('SET_REAL_NAME', realName)
              commit('SET_TOKEN', token)
              commit('SET_USER_NAME', userName)
              commit('SET_USER_ROLE', code)

              setUserId(id)
              setStoreId(storeId)
              setAvatar(headImg)
              setNickName(nickName)
              setRealName(realName)
              setToken(token)
              setUserName(userName)
              setUserRole(code)

              dispatch('LoadBrandInfo')
                .then(() => {
                  resolve()
                })
                .catch(err => {
                  reject(new Error(err.message || '加载品牌信息失败'))
                })
            } else {
              reject(new Error(res.message))
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    LoadBrandInfo({ commit }) {
      return new Promise( resolve => {
        getBrandDetail()
          .then(res => {
            let name = null
            let logo = null
            if (res.success && res.entity) {
              let d = res.entity
              logo = d.logo
              name = d.shortName || d.zhName || d.enName
            }
            commit('SET_BRAND_NAME', name)
            commit('SET_BRAND_LOGO', logo)
            setBrandName(name)
            setBrandLogo(logo)
          })
          .catch(() => {
            commit('SET_BRAND_NAME', null)
            commit('SET_BRAND_LOGO', null)
            setBrandName(null)
            setBrandLogo(null)
          }).finally(() => {
            resolve()
          })
        })
    },

    // 更新用户信息
    UpdateUserInfo({ commit }, data = {}) {
      return new Promise((resolve, reject) => {
        updateUserInfo(data)
          .then(res => {
            if (res.success && res.entity) {
              const { userName } = data
              commit('SET_REAL_NAME', userName)
              setRealName(userName)
              resolve()
            } else {
              reject(new Error(res.message))
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 前端登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {

        clearAll()
        resolve()
      })
    },

    // 后端登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        loginOut().finally(() => {
          clearAll()
          resolve()
        })
      })
    }
  }
}

export default user
