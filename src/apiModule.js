import Vue from 'vue';

const INITIAL_STATE = {
  pedding: {},
  error: {},
};

const mutations = {
  REQUEST_PENDING(state, { action }) {
    state.pedding[action] = true;
    state.error[action] = null;
  },
  REQUEST_SUCCESS(state, { action }) {
    state.pedding[action] = false;
  },
  REQUEST_FAILURE(state, { action, error }) {
    // Vue.set(state.error, action, error)
    state.pedding[action] = false;
    state.error[action] = error;
  },
  // eslint-disable-next-line
  CLEAR(state) {
    state = Object.assign(state, JSON.parse(JSON.stringify(INITIAL_STATE)));
  },
  CLEAR_ERROR(state) {
    state.error = {};
  },
  CLEAR_ERROR_BY_ACTION(state, action) {
    state.error = { ...state.error, [action]: null };
  },
};

const actions = {
  clear({ commit }) {
    commit('CLEAR');
  },
  clearError({ commit }) {
    commit('CLEAR_ERROR');
  },
  clearErrorByAction({ commit }, action) {
    commit('CLEAR_ERROR_BY_ACTION', action);
  },
};

const getters = {
  pedding: (state) => (action) => state.pedding[action],
  peddingRequests: (state) => {
    let requests = [];

    for (var key in state.pedding) {
      if (state.pedding[key]) requests.push(key);
    }

    return requests;
  },
  error: (state) => (action) => state.error[action],
};

export default {
  namespaced: true,
  state: () => JSON.parse(JSON.stringify(INITIAL_STATE)),
  mutations,
  actions,
  getters,
};
