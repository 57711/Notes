# React

## react 相关概念

### 异步可中断 / fiber

react 没有收集依赖，所以更新只能从头遍历一边，找不同。fiber 用来实现**异步可中断更新**

- v16 之前就是 stack reconciler，从根节点开始递归，同步，但是慢，调用栈长

- v16.9 ～ v17.0.2 是 fiber reconciler，遍历时在每个节点做**异步可中断更新**。 v17.0.2 有 fiber 结构，但是默认 legacy 模式 不会中断更新。concurrent 模式可以高优先级打断低优先级执行

- v18 concurrent 模式

### 双缓存

有 current，和 workInProgress， 在前一帧计算出下一帧要渲染的内容，下一帧再渲染。这种在内存中构建并直接替换的技术叫做双缓存.

### react 中数据结构：vdom/fiber/真实 dom

#### vdom / element

通过 babel `@babel/preset-react` 解析 jsx，生成`createElement, jsx`, `createElement` 执行生成 vdom。

vdom 是嵌套的结构

```js
const VDOM = {
  type: 'div',
  props: {
    className: 'app',
    children: [{}, {}],
  },
};
```

#### fiber 链表形式

- fiber 就是数据结构，包含了 dom，链表，effectList 相关属性
- react 中有两个 fiber， current，和 workInProgress，用来实现双缓存
- 每次更新用 vdom 和 current fiber 比较生成 wip fiber。

```js
const FiberNode = {
  // 静态数据
  tag, // 组件类型
  key,
  elementType, // 函数组件用memo包裹
  type, // dom 元素类型
  stateNode, // 真实dom
// 与其他fiber 关系, 链表
  return, // 父级
  child,
  sibling, // 右边第一个兄弟
  index,
// 动态数据
//  状态类
  pendingProps,
  memoizedProps,
  updateQueue,
  memoizedState,
  dependencies,
  mode,
//  副作用 Effect
  effectTag, // 搜集副作用 Effect
  nextEffect,
  firstEffect,
  lastEffect,
// 调度优先级相关
  lanes,
  childLanes,
// 更新要对应的fiber
  alternate, // 双缓存
}
```

### react 包

- react 提供 vdom api，提供用户相关 api，（useState）
- react-reconciler
  - beginWork
  - completeWork
  - commitWork
- react-dom dom 相关

## 渲染流程

![fiberRender](/images/fiberRender.png)

### render 开始

1. `render`，接收 container，挂载位置的真实 dom
2. `legacyRenderSubtreeIntoContainer`
   1. container.\_reactRootContainer.
   2. 判断是否有 root， 没有创建，`legacyCreateRootFromDomContainer`， 最后`new FiberRootNode()`
   3. 最后形成这种结构

```js
// container._reactRootContainer._internalRoot.current
// (挂载的dom)->     (root)    -> (FiberRoot) -> (RootFiber)

function createFiberRoot(containerInfo, tag) {
  const root = new FiberRootNode(containerInfo, tag);
  // root 中 root.containerInfo 就是挂载的dom
  // root.containerInfo.__reactContainer === root.current
  root.current = createHostRootFiber(tag);
  return root;
}
```

![reactRootNode](/images/reactRootNode.png)

3. scheduleUpdateOnFiber -> performSyncWorkOnRoot -> workLoopSync -> performUnitOfWork
4. performSyncWorkOnRoot -> commitWork

```js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield) {
    // shouldYield 可中断，不执行下一次beginWork
    performUnitOfWork(workInProgress);
  }
}
function performUnitOfWork(unitOfWork) {
  //                            current↓
  let next = beginWork(unitOfWork.alternate, unitOfWork);
  if (next === null) {
    // 如果没有产生新的work，就完成当前work
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}
```

### beginWork

- 使用 v-dom 和 current fiber **对比**，生成新的 workInProgressFiber， 向下按照 child 指针逐层向下调和

- 期间会执行函数组件，类组件（声明周期），diff 子节点，

- **标记上不同的 effectTag** 也就是 flags 属性，增删改

```js
function beginWork(current, workInProgress) {
  // 根据 current === null 判断是mount 还是 update
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case FunctionComponent:
    case ClassComponent:
    case HostComponent:
  }
}
```

### completeWork

- 向上归并的过程，有兄弟节点就返回兄弟节点

- 根据 effectTag 创建 effectList

- 创建真实 dom，`createInstance`， 放到 fiber 中

### commitWork

render 结束后，在`performSyncWorkOnRoot`中调用`commitWork`, 最后进到`commitRootImpl.bind()`

flushPassiveEffects() 用来处理还没执行完的 useEffect，上一次销毁函数，这一次回调函数

commitWork 也有三个阶段

```js
invokeGuardedCallback(null, commitBeforeMutationEffects); // 更新前
// 更新前调用 getSnapshotBeforeUpdate
getSnapshotBeforeUpdate();
// 之后开始更新，mutation阶段，处理placement， deletion，update
invokeGuardedCallback(null, commitMutationEffects); // 更新时
// 更新完切换双缓存
root.current = finishedWork; // 切换双缓存
// 更新后 声明周期componentDidMount,componentDidUpdate, setState的callback在这里执行
// useEffect push到一个队列里异步执行，调用useLayoutEffect， 同步执行
invokeGuardedCallback(null, commitLayoutEffects); // 更新后
```

## 可中断更新

如何调用下一次任务， 而且不阻塞渲染？

- requestIdleCallback，时间不确定，兼容性差
- setTimeout，嵌套的话有 4ms 延迟
- promise，不需要为任务，需要宏任务，需要在渲染后执行
- requestAnimationFrame 也在渲染之前
- MessageChannel 可以

### 模拟实现

1. 有 tash 就用 MessageChannel，预定(startTransition)下一个宏任务(flush)(类似于 vue 的 $nextTick)
2. flush 循环执行 task，碰到 shouldYield 就停止循环，再预定下一个宏任务(startTransition(flush))

```js
const taskQueue = [];
const transitionQueue = [];
let deadline;
const threshold = 5; // 5ms 超时

function schedule(task) {
  taskQueue.push(task);
  // 预定一个调度
  startTransition(flush);
}

function startTransition(flush) {
  transitionQueue.push(flush);
  postMessage(); // postMessage 利用MessageChannel预定下一个宏任务
}

const postMessage = (() => {
  // IIFE
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = () => {
    // 下一个宏任务执行 需要执行flush, [flush]
    transitionQueue.splice(0, 1).forEach((fn) => fn());
  };
  // 返回开始计时的函数, 类似于vue 的 $nextTick
  return () => port2.postMessage();
})();

function shouldYield() {
  // 如果超时， 或者用isInputPending模拟更高优先级任务，就打断
  return performance.now() >= deadline || navigator.scheduling.isInputPending();
}

function flush() {
  // 类似于 workLoopConcurrent
  // 更新超时时间，shouldYield 可以用来比较
  deadline = performance.now() + threshold;

  let workInProgress = taskQueue.shift(); // task 类似于 workInProgress

  while (workInProgress && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }

  // 执行到这里有两种情况
  // 1. workInProgress 没有了，完全执行完了
  // 2. 被shouldYield打断了
  // 如果被打断了，就再预定下一个定时

  if (workInProgress) {
    // 下一次flush执行还能找到当前的task
    taskQueue.unshift(workInProgress);
    // 开启一次调度
    startTransition(flush);
  }
}
function performUnitOfWork(fn) {
  return fn();
}
```
