import Axios from 'axios'
import Http from './http'
import Auth from './auth'
import to from './utils/to'

const defaultVuexModuleName = 'api'

export {default as vuexApiModule} from './module'
export {default as Http} from './http'
export {default as Auth} from './auth'
export {default as AuthLocalStoragePlugin} from './auth/authLocalStoragePlugin'

export const createWatch = ({
  vuexModuleName = defaultVuexModuleName,
  response = (e) => e,
  error = (e) => e
} = {
  vuexModuleName: defaultVuexModuleName,
  response: (e) => e,
  error: (e) => e
}) => (context, {action, request}) => {
  context.commit(`${vuexModuleName}/REQUEST_PENDING`, {action}, {root: true})
  return request
    .then(res => {
      context.commit(`${vuexModuleName}/REQUEST_SUCCESS`, {action}, {root: true})
      return res
    })
    .catch(err => {
      context.commit(`${vuexModuleName}/REQUEST_FAILURE`, {action, error: error(err)}, {root: true})
      throw err
    })
}

export const watch = createWatch()

export default ({
  vuexModuleName = defaultVuexModuleName
} = {
  vuexModuleName: defaultVuexModuleName
}) => ({
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
})