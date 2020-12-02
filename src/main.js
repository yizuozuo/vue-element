import Vue from 'vue'
import 'babel-polyfill'
import '~/normalize.css/normalize.css'// A modern alternative to CSS resets'
import Element from 'element-ui'
import '@/assets/sass/element-variables.scss'
import '@/assets/sass/index.scss'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
import './icons'
import './errorLog'
import './permission'
import permission from './directive/permission'
import * as filters from './filters' // global filters

Vue.directive('permission', permission)

Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable no-new */
  // 全局配置
  Vue.config.debug = false
  Vue.config.devtools = false
  Vue.config.silent = true
  Vue.config.productionTip = false
}

setTimeout(function() {
  window.app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    i18n
  })
}, 0)

if (process.env.NODE_MOCK === 'mock') {
  require('@/mock') // simulation data
}
