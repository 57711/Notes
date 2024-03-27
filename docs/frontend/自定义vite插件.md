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

## 问题

### vite 比 webpack 慢

vite 用原生 esm， 不进行打包压缩。导致下载的资源是没有压缩编译过的，vite 需要在请求资源的时候才进行编译，webpack 在编译的时候已经将所有资源编译好了。 Vite 的 optimizeDeps 功能预构建依赖，以减少首次运行的编译时间。

hmr 只编译修改的部分而不是整个项目。

### 依赖预构建 optimizeDeps

- 开发模式中，利用 esbuild
- 兼容 cjs，umd：将 cjs，umd 转换为 esm
- 性能：将多个 esm 模块转换为单个，lodash
