# Vue Router

[手写 Vue-router 核心原理](https://cloud.tencent.com/developer/article/1880448)
[Vue-Router 的实现原理](https://www.lsjlt.com/news/205727.html)

## 路由的本质：

- SPA 应用。
- 路由变化 -> 数据变化 -> UI 变化
- 监听 path 变化，根据 path 和组件的关系触发组件的 unmount 和 mount
- 用 context 注入上下文

## hash 和 history

两种路由区别

- hash 用锚点#，不会像服务器发请求
- history 使用真实 path， 需要后端返回同一个页面， nginx 配置
- hash 不方便 ssr，

## popstate

触发`popstate` 事件:

1. 浏览器前进后退
2. `hostory.back()/go()/forward()`

`pushState/replaceState` 或 `<a>` 不触发 popstate 事件，需要拦截调用。

## 简易 router

```html
<body>
  <div id="menu">
    <a href="/">home</a>
    <a href="/list">list</a>
    <a href="/about">about</a>
  </div>
  <div id="content"></div>
  <script>
    class Router {
      routes = {};
      appendRoute(path, renderFn) {
        // 路由json
        this.routes[path] = renderFn;
      }
      go(path, isPush = true) {
        const renderFn = this.routes[path] || null;
        if (!renderFn) return;
        isPush && window.history.pushState({}, null, path);
        // 类似于组件渲染方法
        renderFn();
      }
    }
    const router = new Router();
    router.appendRoute('/', () => renderText('home page'));
    router.appendRoute('/list', () => renderText('list page'));
    router.appendRoute('/about', () => renderText('about page'));
    function renderText(text) {
      content.innerHTML = text;
    }
    menu.addEventListener('click', (e) => {
      const el = e.target;
      if (el.tagName === 'A') {
        e.preventDefault();
        router.go(el.getAttribute('href'));
      }
    });
    // 监听前进后退按钮
    window.addEventListener('popstate', () => {
      router.go(location.pathname, false);
    });
  </script>
</body>
```
