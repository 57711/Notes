# node js

全局环境变量

`setTimeout, setInterval, setImmdiate, __filename, __dirname`

`process: kill, exit, hrtime, cpuUsage, memoryUsage, env, argv,`

## process 对象

- 统计信息，cpu，内存等。
  - process.cpuUsage();
  - memoryUsage()
  - env
  - argv
- 事件循环机制，process.nextTick。
  - nodejs 为事件循环位置了一个队列，nextTick 入队列，\_tickCallback 出队列。
- uncaughtException 事件。
  - 全局异常捕获。
- 其他
  - 进程管理，exit，kill。
  - i/o 相关，stdout，stderr，stdin。
  - 路径处理，cwd，chdir 等。
  - 执行时间 hrtime

## RPC

RPC vs ajax

- RPC 寻址不使用 DNS
- 协议层不使用 HTTP，而是基于 TCP 或 UDP，半双工或双工
- 数据包格式使用二进制，不用 JSON

## net 模块

同 http 服务一样需要服务端和客户端

```js
const server = net.creatServer((socket) => {
  // 写入数据
  socket.write();

  // 监听数据
  socket.on('data', (buffer) => {
    buffer.toString();
    buffer.readInt16BE();
    socket.write(Buffer.from('value'));
  });
});
server.listen(4000);
```

```js
const socket = new net.Socket({});
socket.connnect({
  host: '127.0.0.1',
  port: '4000',
});
socket.write('hello');
socket.on('data', (buffer) => buffer.toString());
```

全双工，加包序号标记
粘包， tcp 会把同时发的多个小包合成一个大包一次发送， 需要粘包切分
处理粘包，不完整包需要标记包长
错误处理

## restful api

简单，根据动词
数据聚合不好， 需要更多数据需要拉很多接口， 需要少的数据会有冗余

## GraphQL

专注于数据聚合， 需要什么返回什么，不会冗余。

```js
const { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);
// 对于每个api接口，root 提供了resolver 函数, 取数据的方式
var root = {
  hello: () => 'Hello',
};

graphql(schema, '{ hello }', root).then((res) => console.log(res));
```

结果 `{data: {hello: "Hello"}}`

## 前后端同构

同一个模版/组件 可以在浏览器端渲染， 也可以在 nodejs 端渲染

`ReactDomServer.renderToString(component)`

`VueServerRenderer.renderToString()`

注重职责的分离：处理数据逻辑，处理环境逻辑的部分需要**代码分割**

## 压测

apache bench

`-c` 并发量，同时请求服务器的请求数量。 `-n` 总共多少请求。`-t` 压测时间

`ab -c200 -n1600 -t15 url`

**性能指标**

- `request per second`, `qps`每秒能承载的请求量， 并发量
- `time per reqest`, `RT`每次请求所需时间
- `time per reqest concurrent`, 多久并发量能得到结果
- `transfer rate`, 吞吐量， 每秒数据的流量， 跟带宽差不多

qps 和 rt 最重要

根据性能指标找**性能瓶颈**

**linux 命令**

- `top` 查看 cpu, 内存
- `iostat` io 设备，硬盘

js 的运算能力会可能导致 cpu 占用大

## nodejs 性能分析工具

- profile， 运行 prof 时做 ab 压测

  `node --prof index.js`

  分析得到的 log
  `node --prof-process xxx.log > profile.txt`

  bottom up / heavy 调用栈， 看占用大头的来源

- Chrome devtool

  `node --inspect-brk index.js`

  浏览器访问 `chrome://inspect`, profile 标签开始 cpu profile， 进行 ab

- clinic.js

## 优化的方法

**提前计算**，**将服务阶段代码移动到启动阶段做**。

1. 减少不必要计算，尽量将中间件中的计算移到程序启动时执行，而不在 http 请求响应过程中做
2. 空间换时间，把重复的计算缓存，

例子：

- fs.readFileSync 耗时， 可以不在每次请求都调用， 而是放到全局中。
- byteLengthUtf8 耗时，readFileSync 第二个参数可以不用`'utf-8'`, 而是返回 buffer 直接给到 body。

## 垃圾回收 GC

[垃圾回收](js/内存.html#垃圾回收)

js 会记录所有创建过的 js 对象，隔一段时间定时清理没有再被使用的对象。

**新生代**，容量小，垃圾回收块。

Cheney

所有新创建的都进入新生代，GC 频率高。新生代中经历了几次 GC 都没被清理掉的进入老生代。

**老生代**， 容量大，垃圾回收慢，GC 频率低

**策略：**

- 减少内存使用
- 避免内存泄漏

### 减少内存使用

池，减少分配及销毁的消耗，使内存被复用。

nodejs buffer 是由 nodejs 所定义的，内存分配策略由 nodejs 定义。

nodejs 对于小于 8kb buffer 的内存策略， 共享创建的 8kb 内存复用，而不是每次都新建 8kb

### 检查内存泄漏

使用 chrome devtool，memory，进行 ab 过程中截取内存快照。

epipe 报错, ab 的 tcp 已经断开后， 服务器还向这个 tcp 中写数据

gc roots，没有被其他对象所引用的变量都会挂在 gc roots 上

## 编写 c++插件加速运行

c++ 文件通过 node-gyp 编译为`.node` 文件

**成本：** c++变量和 v8 变量的转换

**收益：** C++ 运算比 js 快

**成本也可能会大过收益。**

## 环境变量

### 命令行设置环境变量

`npm run env` 获取完整变量列表

windows 环境下`set NODE_ENV=development && node index.js` 设置到`process.env`。

mac `export NODE_ENV=development && node index.js`

利用 cross-env `cross-env NODE_ENV=development node index.js`

### `.env` 文件设置环境变量

利用 dotenv 读取`.env` 文件 `require('.env').config()`

### 替换 process 在浏览器中使用

webpack 中利用`new webpack.DefinePlugin()`将环境变量定义到`process.env`中。业务代码可以拿到配置的环境变量
