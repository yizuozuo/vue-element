import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { isEmpty } from '.'
import { getToken } from './cache/auth'
import getMsgByStatus from './codes'
import { Message } from 'element-ui'
import {
  CHANNEL_CODE,
  DEFAULT_MODULE,
  SUCCESS_STATUS_CODE,
  UNLOGIN_STATUS_CODE,
  INTERNAL_ERROR_STATUS_CODE
} from './const'
const isPrd = process.env.ENV_CONFIG === 'prd'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

export function getUploadHttpHeader () {
  return {
    'source': CHANNEL_CODE,
    'token': getToken()
  }
}

export default (options = {}) => {
  const name = options.module || DEFAULT_MODULE

  return (params = {}) => {
    let baseUrl = process.env.URLS[name]
    let method = params.method || ''

    method = method.toUpperCase()

    if (METHODS.indexOf(method) === -1) {
      console.log(`Error: bad http method=${method}, req = ${JSON.stringify(params)},  will do a GET request`)
      params.method = 'GET'
    }

    let config = {
      baseURL: baseUrl,
      timeout: 15000,
      withCredentials: true,
      headers: {
        'source': CHANNEL_CODE,
        'token': getToken(),
        'content-type': 'application/json;charset=UTF-8'
      }
    }

    const body = Object.assign(config, params)
    return ajax(name, body)
  }
}

function ajax (module, body) {
  return new Promise((resolve, reject) => {
    axios(body).then(response => {
      const res = response.data || {}
      const code = res.status

      // if(!isPrd) {
      //   let c = 'color:#338ffc;'
      //   console.log('%c<------------------------------------------', c)
      //   console.log(window.location.href)
      //   console.log('~~~req~~~')
      //   console.log(JSON.stringify(body))
      //   console.log(`%c~~~res~~~`, c)
      //   console.log(`%c${JSON.stringify(res)}`, c)
      //   console.log('%c------------------------------------------>', c)
      // }

      if (code == SUCCESS_STATUS_CODE) {
        res.success = true
      } else {
        const status = isEmpty(module) ? code : `${module}-${code}`
        const msg = getMsgByStatus(status)
        res.success = false
        if (msg) {
          res.message = msg
        }
      }

      if (code === UNLOGIN_STATUS_CODE) {
        store.dispatch('FedLogOut').then(() => {
          const { href } = router.resolve({
            name: 'signin',
            query: {
              returnUrl: window.location.href,
              _: new Date().getTime()
            }
          })
          window.location.replace(href)
          reject(res)
        })
      } else if (code === INTERNAL_ERROR_STATUS_CODE) {
        reject(res)
      } else {
        resolve(res)
      }
    }).catch((err) => {
      if (!isPrd) {
        let c1 = 'color:#338ffc;'
        let c2 = 'color:#ff4035;'
        console.log('%c<------------------------------------------', c1)
        console.log(window.location.href)
        console.log('~~~req~~~')
        console.log(JSON.stringify(body))
        console.log(`%c~~~res~~~`, c1)
        console.log(`%c${JSON.stringify(err)}`, c2)
        console.log('%c------------------------------------------>', c1)
      }

      const status = err && err.response && err.response.status
      if (status === 401) { // Unauthorized
        store.dispatch('FedLogOut').then(() => {
          const { href } = router.resolve({
            name: 'signin',
            query: {
              returnUrl: window.location.href,
              _: new Date().getTime()
            }
          })
          window.location.replace(href)
        })
      } else if (status === 403) { // Forbidden
        Message({
          type: 'warning',
          message: '无访问权限',
          duration: 3 * 1000
        })
      } else {
        Message({
          type: 'error',
          message: '当前网络不稳定，请稍后重试',
          duration: 5 * 1000
        })
      }

      reject(err)
    })
  })
}
