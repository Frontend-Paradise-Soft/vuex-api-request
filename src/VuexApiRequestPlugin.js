
// import vuexModule from './vuexModule/api';

const VuexApiRequestPlugin = function(store) {
  // if (store && store.registerModule) store.registerModule('api', vuexModule);

  return {
    install(Vue) {
      Vue.mixin({
        methods: {
          $api(action) {
            const apiState = this.$store.state.api;
            if (!apiState) return;

            return {
              pedding: apiState.pedding[action] || false,
              error: apiState.error[action] || null,
              clear: () => this.$store.dispatch('api/clearErrorByAction', action),
            };
          },
        },
        // watch: {
        //   $route(to, from) {
        //     if (to.name !== from.name) this.$store.dispatch('api/clearError');
        //   },
        // },
      });
    },
  };
};

export default VuexApiRequestPlugin;
