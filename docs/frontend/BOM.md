# BOM

## location

属性

- `location.href` 完整路径
- `location.origin` https://www.baidu.com
- `location.host`
- `location.port`
- `location.protocol`
- `location.pathname`
- `location.search`
- `location.hash`

方法

- `location.assign()` 会跳转过去，可以用返回按钮跳到之前页面
- `location.replace()` 会替换当前浏览历史并且跳转, 不能再用返回按钮
- `location.reload()`
- `location.toString()`

### history / hash 路由

history 做 SPA 需要服务器将所有地址都代理到一个页面

hash history.pushState() 会话历史栈增加了一个条目。

### url 处理

- 正则
- 利用 api 处理

## history

会话历史栈

属性

- `history.state` 获取栈顶到值，

方法

- `history.replaceState()` 替换当前状态
- `history.pushState()` 增加条目，触发 popstate

事件

onpopstate，会被 `history.back(), history.forward` 和返回前进按钮触发。

## navigator

浏览器系统信息,硬件操作。做数据采集埋点

- `navigator.userAgent` 读取 UA，兼容性
- `navigator.clipboard` 剪切板

## screen

兼容性不同大小屏幕。

获取区域大小

- `window.innerHeight/innerWidth`
- `document.documentElement.clientWidth/clientHeight`
- offsetWidth 外框 = clientWidth 内框 + 滚动条 + 边框
- scrolTop/scrollLeft 滚动绝对距离,offsetLeft/offsetTop 滚动相对距离
- el.getBoundingClientRect() IE 会多出 2px

## 事件

捕获，冒泡，addEventListener 默认冒泡，true 为捕获

- event.stopPropergation() 阻止继续冒泡或捕获
- event.preventDefault()
- event.stopImmediatePropagation() 一个 el 上挂了多个监听器监听同一个事件，会阻止之后的回调触发
- attachEvent IE 非标准，可以直接在 el.[`on${event}`]

## ajax

### XMLHttpRequest

```js
const xhr = new XMLHttpRequest();
xhr.open(method, url, async);
xhr.send(data);
// data 需要encodeURIComponent转码
xhr.readyStatus; // 4为完成请求

xhr.onreadystatuschange= () => {
  if(xhr.readyStatus === 4 && xhr.status === 200){
    xhr.responseText
  }
}
xhr.timeout = 1000;
xhr.ontimeout = () => {
  ...
}
```

## fetch
