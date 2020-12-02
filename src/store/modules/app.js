import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    loading: false,
    appHeight: 0,
    winHeight: 0,
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_APP_HEIGHT: (state, height) => {
      state.appHeight = height
    },
    SET_WIN_HEIGHT: (state, height) => {
      state.winHeight = height
    },
    TOGGLE_LOADING: (state) => {
      state.loading = !state.loading
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setAppHeight({ commit }, height) {
      commit( 'SET_APP_HEIGHT', height)
    },
    setWinHeight({ commit }, height) {
      commit( 'SET_WIN_HEIGHT', height)
    },
    toggleAppLoading({commit}) {
      commit('TOGGLE_LOADING')
    }
  }
}

export default app
