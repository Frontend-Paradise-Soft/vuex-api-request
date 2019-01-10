import Axios from 'axios'

export default ({
  axiosConfig = {},
  store,
  authBinding = (state) => state.auth.accessToken,
  authCompleted = (store) => store
}) => ({
  install(Vue) {
    Vue.prototype.$auth = Vue.auth = Axios.create(axiosConfig)

    this.addInterceptors(Vue)
  },

  addInterceptors(Vue) {
    store.watch(
      authBinding,
      (accessToken) => {
        if (accessToken) {
          Vue.auth.defaults.headers.common['Authorization'] = accessToken
          authCompleted(store)
        } else {
          delete Vue.auth.defaults.headers.common['Authorization']
        }
      },
      {deep: true, immediate: true}
    )
  },
})
