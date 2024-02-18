# node 执行流程

## 1 PlatformInit()

用于对文件进行描述，以及注册两个信号处理函数。

```js
RegisterSignalHander(SIGINT, SignalExit, true);
RegisterSignalHander(SIGTERM, SignalExit, true);
```

## 2 argv = uv_setup_args(argc,grgv)

uv_setup_args 是定义在 libuv 中的方法，用于进行 process.title 的设置和读取。

## 3 Init(&argc,const_cast(argv),&exec_argc,&exec_argv)

- 初始化 Uptime 值
- 对 node 命令行接收的参数和 V8 的 flag 参数进行映射处理。
- 将 node_is_initialized 标记为 true。

## 4 V8::Initialize()

所有的 nodejs 源码（js 文件）都会先由 V8 引擎来解释并运行。

## 5 Start(uv_default_loop(),argc,argv,exec_argc,exec_argv)

主要针对于 libuv 进行操作

- 准备工作
- 执行 loadEnvironment(&env), 构建 process 对象。
- 开启 eventloop，无线循环
- 收尾，内存回收，断开 debug 连接。
