import Axios from 'axios'
import Http from './Http'
import Auth from './Auth'
import vuexModule from './module'

const defaultVuexModuleName = 'api'

export {default as Http} from './Http'
export {default as Auth} from './Auth'
export {default as LocalStoragePlugin} from './LocalStoragePlugin'

const VuexApiRequest = function({
  vuexModuleName = defaultVuexModuleName
} = {
  vuexModuleName: defaultVuexModuleName
}) {
  return {
    install(Vue) {
      Vue.mixin({
        methods: {
          vuexApiRequest(action) {
            const apiState = this.$store.state[vuexModuleName]
            if (!apiState) return
  
            return {
              pedding: apiState.pedding[action] || false,
              error: apiState.error[action] || null
            }
          },
          clearErrorByAction(action) {
            this.$store.dispatch(`${vuexModuleName}/clearErrorByAction`, action)
          }
        },
        watch: {
          '$route'(to, from) {
            if (to.name !== from.name) this.$store.dispatch(`${vuexModuleName}/clearError`)
          }
        },
      })
    },
  }
}

VuexApiRequest.createWatch = ({
  vuexModuleName = defaultVuexModuleName,
  response = (e) => e,
  error = (e) => e,
  errorHandler = (context, err) => {}
} = {
  vuexModuleName: defaultVuexModuleName,
  response: (e) => e,
  error: (e) => e,
  errorHandler: (context, err) => {}
}) => (context, action) => (request) => {
  context.commit(`${vuexModuleName}/REQUEST_PENDING`, {action}, {root: true})
  return request
    .then(res => {
      context.commit(`${vuexModuleName}/REQUEST_SUCCESS`, {action}, {root: true})
      return res
    })
    .catch(err => {
      context.commit(`${vuexModuleName}/REQUEST_FAILURE`, {action, error: error(err)}, {root: true})
      errorHandler(context, err)
      throw err
    })
}

VuexApiRequest.module = vuexModule

export default VuexApiRequest