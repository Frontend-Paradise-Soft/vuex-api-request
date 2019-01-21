import Axios from 'axios';

export default (config = {}) => ({
  install(Vue) {
    Vue.prototype.$http = Vue.http = Axios.create(config);
  },
});
