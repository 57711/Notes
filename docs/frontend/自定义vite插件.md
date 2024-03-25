# 自定义 vite 插件

[开发一个 Vite 插件](https://cloud.tencent.com/developer/article/2293322)

## vite 动态导入

利用`const modules = import.meta.glob('./dir/*.js')`封装 require 方法。

```js
const require = (url) => {
  const modules = import.meta.globEager('../assets/images/**');
  return modules[url].default;
};
```
