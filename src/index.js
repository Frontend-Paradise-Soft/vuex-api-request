import Axios from 'axios'
import Http from './Http'
import Auth from './Auth'
import apiModule from './apiModule'

export {default as Http} from './Http'
export {default as Auth} from './Auth'
export {default as LocalStoragePlugin} from './LocalStoragePlugin'
export {default as queryStringMixin} from './queryStringMixin'

const VuexApiRequest = function(store) {
  store.registerModule('api', apiModule)

  return {
    install(Vue) {
      Vue.mixin({
        methods: {
          vuexApiRequest(action) {
            const apiState = this.$store.state.api
            if (!apiState) return
  
            return {
              pedding: apiState.pedding[action] || false,
              error: apiState.error[action] || null,
            }
          },
          clearErrorByAction(action) {
            this.$store.dispatch('api/clearErrorByAction', action)
          }
        },
        watch: {
          '$route'(to, from) {
            if (to.name !== from.name) this.$store.dispatch('api/clearError')
          }
        },
      })
    },
  }
}

VuexApiRequest.createWatch = ({
  response = (e) => e,
  error = (e) => e,
  errorHandler = (context, err) => {}
} = {
  response: (e) => e,
  error: (e) => e,
  errorHandler: (context, err) => {}
}) => (context, action) => (request) => {
  context.commit('api/REQUEST_PENDING', {action}, {root: true})
  return request
    .then(res => {
      context.commit('api/REQUEST_SUCCESS', {action}, {root: true})
      return res
    })
    .catch(err => {
      context.commit('api/REQUEST_FAILURE', {action, error: error(err)}, {root: true})
      errorHandler(context, err)
      throw err
    })
}

export default VuexApiRequest