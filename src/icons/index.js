import Vue from 'vue'
import SvgIcon from '@/components/common/svgIcon' // svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const importAll = r => r.keys().forEach(r)
importAll(require.context('./svg', true, /\.svg$/))
