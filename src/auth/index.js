import Vue from 'vue'
import store from '@/store'
import Axios from 'axios'

export default (config = {}) => ({
  install(Vue) {
    Vue.prototype.$auth = Vue.auth = Axios.create(config)

    this.addInterceptors()
  },

  addInterceptors() {
    store.watch(
      (state) => state.auth.accessToken,
      (accessToken) => {
        if (accessToken) {
          Vue.auth.defaults.headers.common['Authorization'] = accessToken
          store.dispatch('authCompleted')
        } else {
          delete Vue.auth.defaults.headers.common['Authorization']
        }
      },
      {deep: true, immediate: true}
    )
  },
})
