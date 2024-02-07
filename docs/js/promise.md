# Promise

## 方法

**`Promise.all()`**: **全兑现才兑现**，**有一个拒绝就拒绝**

**`Promise.any()`**: **有一个兑现就兑现**，全拒绝返回 `AggregateError`

**`Promise.race()`**: 只跟第一个敲定的有关

**`Promise.allSettled`**: 所有都敲定，不管有没有拒绝。可以知道每个promise结果

**`Promise.withResolvers()`**: `let { promise, resolve, reject } = Promise.withResolvers()`

## promise 多级嵌套，eventloop执行

```js {.line-numbers}
Promise.resolve().then(function F1() {
    console.log('promise1')
    Promise.resolve().then(function F4() {
        console.log('promise2');
        Promise.resolve().then(function F5() {
            console.log('promise4');
        }).then(function F6() {
            console.log('promise7');
        })
    }).then(function F7() {
        console.log('promise5');
    })
}).then(function F2() {
    console.log('promise3');
}).then(function F3() {
    console.log('promise6');
})
```

1. 开始执行1,13,15 行的then， 但是13，15行的then没有fillfilled，只有1行的f1加入到微队列中. [f1]
2. 执行f1，f4 放入微队列，此时1行f1 then fullfilled，f2 加入微队列. [f4, f2]
3. 执行f4，f5 放入微队列，此时3行f4 then fullfilled，f7 加入微队列. [f2, f5, f7]
4. 执行f2，f2 对应的then fillfilled，f3 放入微队列，[f5, f7, f3]
5. 执行f5，f6 放入微队列, [f7, f3, f6]
6. 执行f7 [f3, f6]
7. 执行f3 [f6]
8. 执行f6 []

输出

```js
promise1
promise2
promise3
promise4
promise5
promise6
promise7
```

## promise 内同时resolve，reject

- throw 之后的代码都不执行，错误会被内部捕获
- throw 之前没有fullfilled，状态变为reject，错误打印到控制台，之前已经fullfilled了，不打印到控制台
- reject 或者resolve 之后的代码都会执行
- 状态变为reject，都会打印错误到控制台

throw 之后都不会执行，promise reject 会打印error到控制台

```js
new Promise((resolve, reject) => {
    console.log(1)
    throw new Error('error')
    console.log(2)
    resolve()
    console.log(3)
})
// 1
```

resolve 或reject 之后的代码都会执行

throw 之前已经fullfilled，错误被promise 内部捕获，控制台没有error

throw 之后的代码不执行

```js
new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
    reject()
    console.log(3)
    throw new Error()
    console.log(4)
})
// 1
// 2
// 3
```
