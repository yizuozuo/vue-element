import Vue from 'vue'
import qs from 'qs'
import Main from './main.vue'
import { isFullUrl } from '@/utils'

const Exportor = Vue.extend(Main)
let instance

export default function(options = {}) {
  const url = options.url || ''
  const data = options.data || {}
  const module = options.module || 'common'
  const baseUrl = process.env.URLS[module]
  const p = Object.assign({ _ : Date.now()}, data)
  const q = qs.stringify(p, { indices: false })
  let downloadUrl

  if (isFullUrl(url)) {
    downloadUrl = `${url}?${q}`
  } else {
    downloadUrl = `${baseUrl}${url}?${q}`
  }

  if (!instance) {
    instance = new Exportor({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }

  Vue.nextTick(() => {
    instance.method = options.method || 'GET'
    instance.url = downloadUrl
  })
}
