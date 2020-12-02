import engine from 'store/src/store-engine'
import sessionStorage from 'store/storages/sessionStorage'
import localStorage from 'store/storages/localStorage'
import cookieStorage from 'store/storages/cookieStorage'
import defaultPlg from 'store/plugins/defaults'
import expirePlg from 'store/plugins/expire'

const storages = [
  sessionStorage,
  localStorage,
  cookieStorage
]

const plugins = [
  defaultPlg,
  expirePlg
]

const store = engine.createStore(storages, plugins)

export default store
