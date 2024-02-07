# ssr

## 基本结构

```js
// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```

```js
// client.js
import { createApp } from './app.js'

createApp().mount('#app')
```

```js
// server.js (不相关的代码省略)
import { createApp } from './app.js'

server.use(express.static('.')) // 来托管客户端文件 client.js

server.get('/', (req, res) => {
  const app = createApp()
  renderToString(app).then(html => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Vue SSR Example</title>
            <script type="importmap">
            {
            "imports": {
                "vue": "http://.../vue.js",
            }
            }
            </script>
            <!-- 加载vue -->
        </head>
        <body>
            <div id="app">${html}</div>
            <script type="module" src="/client.js"></script>
            <!-- 加载客户端入口文件 -->
        </body>
        </html>
    `)
  })
})
```

## 注意

- 服务端无响应性
- 只有created， beforeCreate 或者setup 钩子，内部不能有**异步**或者有**副作用**代码
- 不同平台api不同
- 跨请求状态污染

### 跨请求状态污染

在**每个请求中为整个应用创建一个全新的实例**，包括 router 和全局 store

```js
// app.js （在服务端和客户端间共享）
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// 每次请求时调用
export function createApp() {
  const app = createSSRApp(/* ... */)
  // 对每个请求都创建新的 store 实例
  const store = createStore(/* ... */)
  // 提供应用级别的 store
  app.provide('store', store) // provide 注入
  // 也为激活过程暴露出 store
  return { app, store }
}
```

## 两种获取数据方式

1. 接口内部获取数据，之后用props注入到组件中渲染，返回渲染好的html，数据注入到外部对象

    激活的时候从外部对象拿数据

2. 组件内部直接获取数据，vue中`serverPrefetch()`, 在渲染前的异步生命周期

    数据注入到外部对象， 激活的时候从外部对象拿数据, `store.replaceState()` 替换到store中
