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
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
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
    {{$api('getPosts').pedding}}
    {{$api('getPosts').error}}
  </div>
</template>

export default {
  computed: {
    getPostsPedding() {
      return this.$api('getPosts').pedding
    },
    getPostsError() {
      return this.$api('getPosts').error
    }
  }
}
```

### queryStringMixin

```js
import queryStringMixin from '@/mixins/queryStringMixin'

export default {
  mixins: [queryStringMixin],
  data() {
    return {
      filters: this.queryStringAssign({
        page: {type: Number, default: 1},
        per_page: {type: Number, default: 10}
      })
    }
  },
  watch: {
    filters: {
      handler(val) {
        this.getPosts(this.queryStringReplace(val))
      },
      immediate: true,
      deep: true,
    }
  }
}
```