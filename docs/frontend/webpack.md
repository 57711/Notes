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
