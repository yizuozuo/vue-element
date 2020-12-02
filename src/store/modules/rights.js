import { isAllNotEmpty } from '@/utils'
import { detailBaseRights, updateBaseRights } from '@/api/store'

const Rights = {
  state: {
    rightId: null,
    rightCode: null,
    currEntity: {}
  },
  mutations: {
    SET_RIGHT_ID: (state, v) => {
      state.rightId = v
    },

    SET_RIGHT_CODE: (state, v) => {
      state.rightCode = v
    },

    SET_CURR_ENTITY: (state, v) => {
      state.currEntity = v
    }
  },
  actions: {
    InitRights({ commit, state }, {rightId, rightCode}) {
      console.log(`code = ${rightCode}, id = ${rightId}`)
      return new Promise((resolve, reject) => {
        if (isAllNotEmpty(rightId, rightCode)) {
          commit('SET_RIGHT_ID', rightId)
          commit('SET_RIGHT_CODE', rightCode)
          detailBaseRights(rightId).then(res => {
            console.log(res)
            let right = {}
            if(res.success && res.entity){
              let d = res.entity || {}
              right = Object.assign({}, state.currEntity, d)
              commit('SET_CURR_ENTITY', right)
              resolve()
            } else {
              let msg = res.message || '加载详情信息失败'
              commit('SET_CURR_ENTITY', right)
              reject(new Error(msg))
            }
          }).catch(e => {
            reject(e)
          })
        } else {
          reject(new Error('rights id or template id is empty'))
        }
      })
    },

    SaveRightsData({commit, state}, right = {}) {
      return new Promise((resolve, reject) => {
        let id = state.rightId
        let data = Object.assign(state.currEntity, right)
        if (isAllNotEmpty(id, data)) {
          commit('SET_CURR_ENTITY', data)
          updateBaseRights(data)
            .then(res => {
              if (res.success && res.entity) {
                resolve()
              } else {
                let msg = res.message || '编辑基础权益失败'
                reject(new Error(msg))
              }
            })
            .catch(e => {
              reject(e)
          })
        } else {
          reject(new Error('参数错误'))
        }
      })
    }
  }
}

export default Rights

