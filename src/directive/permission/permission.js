import store from '@/store'
import { IS_MOCK } from '@/utils/const'

export default {
  inserted(el, binding) {
    const { value } = binding
    const rules = store.getters && store.getters.rules
    let hasPermission = false

    if (value && value instanceof Array && value.length > 0) {
      hasPermission = IS_MOCK || rules.some(rule => {
        return value.includes(rule)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else if (value && typeof value === 'string') {
      hasPermission = IS_MOCK || rules.some(rule => rule === value)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','guest']" or v-permission="'admin'"`)
    }
  }
}
