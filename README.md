# Vuex Api Request

減少 api 請求重複代碼，開心開發 :)

## 安裝

```
$ yarn add vuex-api-request
```

## API Document

### Http

使用請求 Instance，我們使用 [Axios](https://github.com/axios/axios) 套件，相關設定請看 Axios。

```js
import Vue from 'vue'
import {Http} from 'vuex-api-request'

const axiosConfig = {
  baseURL: 'http://localhoat:3002',
}

// 將請求 Instance 綁定在 Vue 上
Vue.use(Http(axiosConfig))
```
在 js 檔案中使用

```js
import Vue from 'vue'

Vue.http.get('/posts')

```

在 vue 檔案中使用

```js
export default {
  methods: {
    getPosts() {
      this.$http.get('/posts')
    },
  }
}

```

### LocalStoragePlugin

localStorage 與 vuex 做綁定，當 vuex 的狀態會跟 localStorage 同步，可使用來儲存使用者 token 等資料

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import {LocalStoragePlugin} from 'vuex-api-request'

Vue.use(Vuex)

const authLocalStoragePlugin = LocalStoragePlugin({
  storageKey: 'paradise-soft',
  vuexModule: ['auth', auth], // [moduleName, module]
  clearWhen: (action) => action.type === 'clear',
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    clear() {
      // 當這個 action 被執行時，會順便清掉 localStorage
    },
  },
  getters: {},
  modules: {
    auth,
  },
  plugins: [authLocalStoragePlugin],
})
```

### Auth

當我們使用 LocalStoragePlugin 跟 vuex 做綁硬後，我們就可以記住使用者的登入狀態，我們可以從
localStorage 或 vuex module state 取得 token 建立帶有 token 的請求

```js
import Vue from 'vue'
import store from '@/store'
import {Auth} from 'vuex-api-request'

const axiosConfig = {
  baseURL: '/api',
}

Vue.use(
  Auth({
    axiosConfig,
    headerBinding: {
      Authorization: [store, (state) => state.auth.accessToken]
    },
  })
)
```
在 js 檔案中使用

```js
import Vue from 'vue'

Vue.auth.get('/posts')

```

在 vue 檔案中使用

```js
export default {
  methods: {
    getPosts() {
      this.$auth.get('/posts')
    },
  }
}

```

### VuexApiRequest

Step 1 - 安裝 VuexApiRequest 與 store 做綁定，及加入 VuexApiRequest mixin

```js
// main.js
import Vue from 'vue'
import store from 'store'
import VuexApiRequest from 'vuex-api-request'

Vue.use(VuexApiRequest(store))
```

Step 2 - 建立 watch

```js
import VuexApiRequest from 'vuex-api-request'

const watch = VuexApiRequest.createWatch({
  response: (res) => res.data,
  error: (err) => err,
  errorHandler: (context, err) => {
    if (err.status === 401) context.dispatch('auth/logout')
  },
})

// vuex posts module
const actions = {
  async getPosts(context, payload) {
    const res = await watch(context, 'getPosts')(fetchPosts(payload))
  },
}
```

在 Vue 檔取得狀態

```js
<template>
  <div>
    {{vuexApiRequest('getPosts').pedding}}
    {{vuexApiRequest('getPosts').error}}
  </div>
</template>

export default {
  computed: {
    getPostsPedding() {
      return this.vuexApiRequest('getPosts').pedding
    },
    getPostsError() {
      return this.vuexApiRequest('getPosts').error
    }
  }
}
```