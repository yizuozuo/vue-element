import { Loading } from 'element-ui'

export default {
  install(Vue) {
    Vue.prototype.$loading = function(options) {
      let opts = Object.assign({}, { text: '加载中...' }, options)
      return Loading.service(opts)
    }
  }
}
