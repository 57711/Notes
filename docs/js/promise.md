# Promise

## 方法

**`Promise.all()`**: **全兑现才兑现**，**有一个拒绝就拒绝**

**`Promise.any()`**: **有一个兑现就兑现**，全拒绝返回 `AggregateError`

**`Promise.race()`**: 只跟第一个敲定的有关

**`Promise.allSettled`**: 所有都敲定，不管有没有拒绝。可以知道每个 promise 结果

**`Promise.withResolvers()`**: `let { promise, resolve, reject } = Promise.withResolvers()`

## Promise.race()

### 可以用于请求的超时

```js
const data = Promise.race([
  fetch('/api'),
  new Promise((resolve, reject) => {
    // Reject after 5 seconds
    setTimeout(() => reject(new Error('Request timed out')), 5000);
  }),
])
  .then((res) => res.json())
  .catch((err) => displayError(err));

// --------------------------

let _reject;
Promise.race([
  new Promise((resolve, reject) => {
    _reject = reject;
  }),
  fetch('./api'),
]);

_reject(); // 调用reject来停止 Promise.race 实现超时

// 或者利用 abortController 实现超时
```

### 用于查看 promise 状态

```js
function promiseState(promise) {
  const pendingState = { status: 'pending' };

  return Promise.race([promise, pendingState]).then(
    (value) =>
      value === pendingState ? value : { status: 'fulfilled', value },
    (reason) => ({ status: 'rejected', reason })
  );
}
```

### 用于限制同时执行 promise 个数

利用 Promise.race 来控制新的 promise 插入队列。循环剩余的队列，利用 then 来顺序执行。

```js
function limitPromise(urls, handler, limit) {
  let queue = urls.slice();
  let promises = queue.splice(0, limit).map((url, index) => {
    return handler(url).then(() => index);
  });

  return queue
    .reduce((prePromise, url) => {
      return prePromise
        .then(() => {
          return Promise.race(promises);
        })
        .then((index) => {
          promises[index] = handler(url).then(() => index);
        })
        .catch((err) => console.error(err));
    }, Promise.resolve())
    .then(() => Promise.all(promises));
}
```

## promise 多级嵌套，eventloop 执行

```js {.line-numbers}
Promise.resolve()
  .then(function F1() {
    console.log('promise1');
    Promise.resolve()
      .then(function F4() {
        console.log('promise2');
        Promise.resolve()
          .then(function F5() {
            console.log('promise4');
          })
          .then(function F6() {
            console.log('promise7');
          });
      })
      .then(function F7() {
        console.log('promise5');
      });
  })
  .then(function F2() {
    console.log('promise3');
  })
  .then(function F3() {
    console.log('promise6');
  });
```

1. 开始执行 1,13,15 行的 then， 但是 13，15 行的 then 没有 fillfilled，只有 1 行的 f1 加入到微队列中. [f1]
2. 执行 f1，f4 放入微队列，此时 1 行 f1 then fullfilled，f2 加入微队列. [f4, f2]
3. 执行 f4，f5 放入微队列，此时 3 行 f4 then fullfilled，f7 加入微队列. [f2, f5, f7]
4. 执行 f2，f2 对应的 then fillfilled，f3 放入微队列，[f5, f7, f3]
5. 执行 f5，f6 放入微队列, [f7, f3, f6]
6. 执行 f7 [f3, f6]
7. 执行 f3 [f6]
8. 执行 f6 []

输出

```js
promise1;
promise2;
promise3;
promise4;
promise5;
promise6;
promise7;
```

## promise 内同时 resolve，reject

- throw 之后的代码都不执行，错误会被内部捕获
- throw 之前没有 fullfilled，状态变为 reject，错误打印到控制台，之前已经 fullfilled 了，不打印到控制台
- reject 或者 resolve 之后的代码都会执行
- 状态变为 reject，都会打印错误到控制台

throw 之后都不会执行，promise reject 会打印 error 到控制台

```js
new Promise((resolve, reject) => {
  console.log(1);
  throw new Error('error');
  console.log(2);
  resolve();
  console.log(3);
});
// 1
```

resolve 或 reject 之后的代码都会执行

throw 之前已经 fullfilled，错误被 promise 内部捕获，控制台没有 error

throw 之后的代码不执行

```js
new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
  reject();
  console.log(3);
  throw new Error();
  console.log(4);
});
// 1
// 2
// 3
```

## async function

- async 函数返回 promise
- 函数中 return 代表 resolve， throw 代表 reject
- return 一个 promise，实际上是将这个函数的 resolve，reject 给到了这个 promise 的 then 里，当这个 promise 敲定，会调用函数的 resolve 或 reject
  也就是说 async 函数敲定之后都是最终 resolve 的结果
- async 函数中不写 return， 默认 resolve undefined。

所以在 async 函数中，返回一个 promise 时，写不写 await 都一样

重试执行一个函数

```js
async function retryFn(fn, tryTimes) {
  try {
    return fn();
  } catch (err) {
    if (tryTimes > 1) {
      return retryFn(fn, tryTimes - 1);
    } else {
      throw err;
    }
  }
}
```
