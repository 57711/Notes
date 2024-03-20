# Webpack

## config 结构

```js
{
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].[hash:10].js",
    clean: true,
    publicPath: '/', // 打包后文件的公共前缀路径
  }
  // resolve 是路径相关
  resolve:{
    // 可以省略的文件后缀，优先级有关性能
    extension: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins:{
    new HTMLWebpackPlugin();
  }
  module: {
    rules: []
  },
  // 以下在mode: development配置
  devtools: "eval-cheap-module-source-map", // source-map
  devServer: {
    conpress: false, // 不压缩，热更新更快
    hot: true, // 热更新
    static: {
      directory: path.resolve(__dirname, '/public')
    }, // 静态资源托管
  },
  // 以下可以在mode: production配置
  optimization: {
    minimize: true,
    minimizer: {
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_func: [
              'console.log',
              'console.warn',
            ]
          }
        },
      }),
    },
    splitChunk: {
      chunks: true,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_module/,
          // minChunk: 使用次数
          // minSize: 多大的文件才提取
          // chunks: 'initial' 不管异步文件
        },
        commons: {
          name: 'commons',

        }
      },
    },
  }, // 优化
}
```

## hash

- hash 全局，牵一发动全身
- chunkhash， 根据入口
- contenthash，根据文件自身内容

## 微内核架构

微内核架构包含**核心系统**和**插件系统**，核心系统是最小可运行的模块，它提供的是通用逻辑（比如 Tapable），插件系统这是些具体的逻辑（比如 HtmlWebpackPlugin 插件）。插件之间可以相互独立，也可以互相依赖。

抽象不依赖于实现，每次扩展，内核不需要修改。意味着内核又很强的扩展性。微内核依赖扩展（plugin），内核驱动 plugin 执行

通过 webpack.config.js 注册表，核心系统可以知道哪些插件可用。读取注册表可以订阅事件，注册回调。

核心系统和插件系统通过 tapable 的 hooks，类似于生命周期，进行通信。核心系统需要提供一个上下文对象（Context），插件通过 context 与外部交互。

核心系统的生命周期顺序执行的过程，也就伴随这对应时期的插件的生命周期交替执行，生命周期走完了，整个程序流程也就结束了。

## webpack require 代码

[webpack-实现代码](/js/模块化.html#webpack-实现代码)

## import() 懒加载

[Webpack 异步](https://blog.csdn.net/qq_41581588/article/details/129177089)

import 会编译成一个独立的 chunk，

执行时：

1. 先通过 jsonp 的方式去加载 test.js，模块所对应的文件（放到`<script>` 中， 监听 oload， onerror），返回一个 promise
2. 加载回来后调用`webpackJsonpCallback`，将请求过来的模块定义合并到 main.js 中的 modules 中去，再 resolve 上面的 promise。
3. 合并完后，去加载这个模块，调用 webpack_require
4. 拿到该模块导出的内容，执行模块

## HMR

![webpack-hmr](/images/webpack-hmr.png)

webpack-dev-middleware

- 将资打包的文件储在内存
- 监听文件变化
- socketjs 连接浏览器与服务器通信

webpack-hot-middleware

- 打包 HMR runtime 代码到客户端，客户端订阅服务端更新变化
- 实现页面重载

webpack-dev-server/client 浏览器端服务，与服务器连接，接收通知得到 hash 值，通知 webpack/hot/dev-server，

webpack/hot/dev-server 判断直接 reload 还是 hmr

hmr 过程，通知 hotModuleReplacement.runtime 获取更新文件，利用 jsonp，先获取 hash 的 json，再根据 hash 获取最新代码块。

hotModulePlugin 接收代码块，新旧对比，更新模块和引用。hotApply 方法：

- 找出过期模块和过期依赖
- 删除过期模块和过期依赖
- 将新的模块添加到 modules 中，当下次调用 **webpack_require** 时，就是获取新的模块了。

## 提取公共代码

[增量打包](https://juejin.cn/post/6844903553127940110)

plugin commonsChunkPlugin，entry 中设置相当于多入口.

还需要分离 manifest 映射关系文件，webpack-md5-hash 插件可以不生成 manifest。

```js
entry: {
  // 相当于多入口
  common: ['lodash', 'jquery'];
  react: ['react', 'react-dom'];
}

plugins:{
  new commonsChunkPlugin({
    name: ['common', 'react'],
    minChunks: 2,
  }),
  new WebpackMd5Hash(),
}
```
