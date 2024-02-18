# 实现tab之间通信

## 直接交换

- 父页面window.open 和 子页面Window.postMessage
- 同源 BroadcastChannel， bc.onmessage(), bc.postMessage()

## 第三方存储

- 同域共享localstorage ， 监听window.onstorage
- IndexedDB
- 同域共享cookie， 脏轮询脏检查， 如果是httpOnly不能获取cookie

## 第三方中转

- serviceWorker/shared worker
