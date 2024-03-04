# worker

## 利用 blob 开启 worker

```js
const getWorker = (worker) => {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);
  return new Worker(URL.createObjectURL(blob));
};
```

## 功能

### 特点

- 并行，独立线程，有独立上下文，不共享内存
- 不能访问 window，
- 通过序列化消息通信

### 应用场景

- 缓存 service worker
- 跨窗口 postMessage
- 大计算
- 网络请求，轮询
- 计时，不受 showpage 影响
- 文件操作
