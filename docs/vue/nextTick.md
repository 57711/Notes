# $nextTick

```js
let timerFunc = null;
// 确定timerFunc，触发异步的方法。
// 异步降级，Promise.then -> MutationObserver -> setImmediate -> setTimeout
if (typeof Promise !== 'undefiend') {
  timerFunc = () => {
    new Promise().then(flushCallbacks);
  };
} else if (typeof MutationObserver !== 'undefined') {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, { characterData: true });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else {
  // 省略了只在IE中的setImmediate
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

const callbacks = [];
let pending = false;
// 实际的nextTick函数
function nextTick(cb, ctx) {
  let _resolve;

  callbacks.push(() => {
    //  收集回调
    if (cb) {
      cb.call(ctx);
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true; // pending true 意味着开始触发回调了
    timerFunc(); // 触发micro task
  }
  // 没有回调返回一个promise
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}

function flushCallbacks() {
  pending = false; // 回调触发完了，可以开始下一次了
  // 拷贝一份，如果nextTick 中嵌套nextTick, 能防止内部的nextTick 在这一次被调用。
  const copies = callbacks.slice(0);
  callbacks.length = 0; // 不创建新数组，其他地方引用同一个变量，长度都为0
  // 最后遍历执行
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```
