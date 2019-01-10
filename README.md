# Vuex Api Request


### 安裝

```
$ vue add vuex-api-request
```

### 使用

使用請求 Instance，使用方法參考 axios

```js
// js 檔案
import Vue from 'vue'

// 不需要權限的請求
Vue.http.get(...)

// 需要權限的請求
Vue.auth.get(...)

```

```js
// vue 檔案
export default {
  methods: {
    getPosts() {
      // 不需要權限的請求
      this.$http.get(...)
      
      // 需要權限的請求
      this.$auth.get(...)
    },
  }
}

```

監控請求的狀態

```
import {watch} from 'vuex-api-request'

// vuex posts module
const actions = {
  async getPosts(context) {
    const [res, err] = await watch(context, {
      action: 'getPosts',
      request: fetchPosts(),
    })

    if (res) context.commit('SET_POSTS', res.data)

    return [res, err]
  },
}
```

在 Vue 檔取得狀態

```
// 請求 pedding 狀態
this.vuexApiRequest('getPosts').pedding

// 請求 error 訊息
this.vuexApiRequest('getPosts').error
```

在 vendor/vuex-api-request/auth 檔案中有 auth helpers