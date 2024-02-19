# AsyncLocalStorage

## 获取上下文的问题

深层次调用，参数只能逐级传递。

```js
const http = require('http');
function handler1(req, res) {
    handler2(req, res);
}

function handler2(req, res) {
     console.log(req.url);
}

http.createServer((req, res) => {
    handler1(req, res);
    res.end();
}).listen();

```

## AsyncLocalStorageL 使用

```js
const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function handler1() { 
    const { req } = asyncLocalStorage.getStore(); // 同步调用
    console.log(req.url);
}

function handler2() {
    setImmediate(() => {
        const { req } = asyncLocalStorage.getStore(); // 异步调用
        console.log(req.url);
    });
}

http.createServer((req, res) => {
    // run 里的第一个参数是上下文
    asyncLocalStorage.run({ req, res }, () => {   
        handler1();
        handler2();
    });
    res.end();
}).listen(9999, () => {
    http.get({ port: 9999, path: '/test' })
});

// /test
// /test
```
