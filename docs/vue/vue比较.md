# vue 比较

渲染组件到不同 DOM，createPortal，teleport，

vue2 /3 :

源码：

- typescript 支持
- monorepo

性能：

- 模版优化 静态提升,静态 node/事件监听缓存
- defineProperty /proxy
- diff 优化，通过 patchFlag/openblock，减少 diff 次数
- SSR 优化，客户端中静态 node 直接用 innerHTML，不需要创建对象再渲染
- treeshaking 打包，vue3 直接引入具名函数，Vue2 是单例的，需要 Vue.method

语法 api：

- 组合式 api，优化逻辑组织，逻辑复用
