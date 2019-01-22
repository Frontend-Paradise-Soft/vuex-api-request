import Axios from 'axios';

export default (axiosConfig = {}, { headerBinding }) => ({
  install(Vue) {
    Vue.prototype.$auth = Vue.auth = Axios.create(axiosConfig);

    this.addInterceptors(Vue);
  },

  addInterceptors(Vue) {
    if (!headerBinding) return console.error('headerBinding is required');
    const [store, changeStateFunc] = headerBinding.Authorization;

    store.watch(
      changeStateFunc,
      (accessToken) => {
        if (accessToken) {
          Vue.auth.defaults.headers.common['Authorization'] = accessToken;
        } else {
          delete Vue.auth.defaults.headers.common['Authorization'];
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
  },
});
