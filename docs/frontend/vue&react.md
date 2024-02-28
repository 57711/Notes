# vue & react 区别

## 响应式不同

vue 拦截监听 getter， setter， 做数据劫持，强调数据可变

react 通过对比引用，props，setState，强调数据不可变。

### 更新流程

vue:

@click -> this.count ++ -> get/set -> notify -> watcher -> 调用 cb -> 更新 dom

react：

onClick -> setState/dispatch -> enqueueSetState -> scheduleUpdateOnFiber -> 层层判断组件发生了什么变化 -> 标记 -> 更新 dom

scheduleUpdateOnFiber 在 fiber 上调度更新，调度意味着从根节点开始。

::: tip
react jsx 语法比 vue template 更灵活，不容易像 vue 一样监听具体改变.
所以 react 需要从头完全跑一次，再跟旧的对比，异步可中断更新，双缓存。
:::

## 数据流向

vue 支持双向绑定， v-model，父子组件间用 props，event，或者 provie，inject

react 单项流，父子组件间用 props， callback，或者 context

## 功能组合

react 函数式编程，HOC, 创建自定义 hook

vue2 通过 mixin, vue3 创建 use 函数

## 模版

vue 通过 template

react 通过 jsx

## vuex， redux

vue 基于可变数据，数据拦截

vuex 直接将 store 注册到组件实例上 `this.$store`

redux 基于不可变数据，state 每次都是新的对象

redux 需要 subscribe，或者 react-redux 利用 connect 将 mapStateToProps，mapDispatchToProps 传入组件

## 都是基于虚拟 dom

vdom 简化 dom 结构，方便更新时 reconcile。方便跨端，可以在不同平台渲染为需要的元素

vue 是虚拟 dom

react 是 fiber
