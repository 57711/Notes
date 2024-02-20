# Vue Router

[手写Vue-router核心原理](https://cloud.tencent.com/developer/article/1880448)
[Vue-Router的实现原理](https://www.lsjlt.com/news/205727.html)

触发`popstate` 事件

1. 浏览器前进后退
2. `hostory.back()/go()/forward()`

`pushState/replaceState` 或 `<a>` 不触发popstate 事件，需要拦截调用。