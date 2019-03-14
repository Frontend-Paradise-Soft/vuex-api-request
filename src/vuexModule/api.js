const INITIAL_STATE = {
  pending: {},
  error: {},
};

const mutations = {
  REQUEST_PENDING(state, { action }) {
    state.pending = { ...state.pending, [action]: true };
    state.error = { ...state.error, [action]: null };
  },
  REQUEST_SUCCESS(state, { action }) {
    state.pending = { ...state.pending, [action]: false };
  },
  REQUEST_FAILURE(state, { action, error }) {
    state.pending = { ...state.pending, [action]: false };
    state.error = { ...state.error, [action]: error };
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
  pending: (state) => (action) => state.pending[action],
  pendingRequests: (state) => {
    const requests = [];

    for (var key in state.pending) {
      if (state.pending[key]) requests.push(key);
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
