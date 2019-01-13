const INITIAL_STATE = {
  pedding: {},
  error: {},
}

const mutations = {
  REQUEST_PENDING(state, {action}) {
    state.pedding = {...state.pedding, [action]: true}
    state.error = {...state.error, [action]: null}
  },
  REQUEST_SUCCESS(state, {action}) {
    state.pedding = {...state.pedding, [action]: false}
  },
  REQUEST_FAILURE(state, {action, error}) {
    state.pedding = {...state.pedding, [action]: false}
    state.error = {...state.error, [action]: error}
  },
  // eslint-disable-next-line
  CLEAR(state) {
    state = Object.assign(state, JSON.parse(JSON.stringify(INITIAL_STATE)))
  },
  CLEAR_ERROR(state) {
    state.error = {}
  },
  CLEAR_ERROR_BY_ACTION(state, action) {
    state.error = {...state.error, [action]: null}
  }
}

const actions = {
  clear({commit}) {
    commit('CLEAR')
  },
  clearError({commit}) {
    commit('CLEAR_ERROR')
  },
  clearErrorByAction({commit}, action) {
    commit('CLEAR_ERROR_BY_ACTION', action)
  },
}

export default {
  namespaced: true,
  state: JSON.parse(JSON.stringify(INITIAL_STATE)),
  mutations,
  actions,
}

