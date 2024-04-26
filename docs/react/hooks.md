# Hooks

## 更多 hooks 使用

[搞懂这 12 个 Hooks，保证让你玩转 React](https://juejin.cn/post/7101486767336849421#heading-28)
[深入 React 专栏](https://juejin.cn/column/7088194204316205092)

## hooks 运行原理

![hooks原理](/images/hooks原理.png)

调用 useState，会运行 ReactCurrentDispatcher.current 中的 useState，

renderWithHooks：

- ReactCurrentDispatcher.current 是在 renderWithHooks 中，根据 current 判断是 mount 还是 update，被更新的。
- renderWithHooks 中执行 Component（函数组件），返回的结果就是 children，递归这个 children。
- current 是当前 fiber 树， commit 阶段用来生成 dom 树
- workInProgress 是复制于 current，在上面更新，之后再赋值回 current

### mountState， mount 阶段的 useState

- mountWorkInProgressHook，将 hook 挂到 fiber 的 memoizedState 上，更新 workInProgressHook。并且 hook 是链表，有 next。
- hook 内部也有 memoizedState，存储 state， 或者 effect 对象（useEffect）
- hook 内部的 queue 用来保存待更新的队列或更新的函数，queue 内部有 dispatch， 也就是 useState 返回的第二个参数， 由 dispatchSetState() 返回。

dispatchSetState：

- 入餐包含自己写的状态
- 生成一个 update 对象，用于记录更新的信息；
- 判断如果是渲染阶段，update 放入等待更新的 pending
- 如果不是，获取最新的 state 值，从而进行更新。scheduleUpdateOnFiber

::: tip 层级关系

(=> 包含关系)

fiber => memoizedState === hook 链表

hook => queue 保存待更新的队列 => dispatch 更新的函数 => 由 dispatchSetState 生成, （内部生成 update，挂到 pending）
hook => queue 保存待更新的队列 => pending 就是 update 对象， 由 dispatchAction 创建
hook => baseQueue 保存最新的更新队列；

```ts
// hook 中的queue，可以理解为action， 遍历执行queue中的actions，更新hook中的baseState
// react 中action为hook上的lastRenderedReducer

const queue = (hook.queue = {
  pending: null, // 保存update对象
  dispatch: null, // // 保存dispatchAction.bind()的值
  lastRenderedReducer: reducer, // // 上一次render时使用的reducer
  lastRenderedState: (initialState: any), // // 上一次render时的state
});
```

:::

```ts
function mountState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  // 创建并返回当前的hook
  const hook = mountWorkInProgressHook();

  // ...赋值初始state

  // 创建queue
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });

  // ...创建dispatch
  return [hook.memoizedState, dispatch];
}
```

### updateState， update 阶段

updateState 调用 updateReducer，updateReducer 调用 updateWorkInProgressHook 获取新的 hook

将待更新的队列 pendingQueue 合并到 baseQueue 上， 之后进行循环更新，最后进行一次合成更新，也就是批量更新，统一更换节点。

markWorkInProgressReceivedUpdate 用于触发更新

```ts
function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState: any));
}

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? action(state) : action;
}

function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  // 获取当前hook
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;

  queue.lastRenderedReducer = reducer;

  // ...同update与updateQueue类似的更新逻辑

  const dispatch: Dispatch<A> = (queue.dispatch: any);
  return [hook.memoizedState, dispatch];
}
```

### 总结

mount 时可以确定是调用 ReactDOM.render 或相关初始化 API 产生的更新，只会执行一次。

update 可能是在事件回调或副作用中触发的更新或者是 render 阶段触发的更新，为了避免组件无限循环更新，后者需要区别对待。

React 用一个标记变量 didScheduleRenderPhaseUpdate 判断是否是 render 阶段触发的更新。

调用 setState，就是 dispatchSetState

![useState过程](/images/useState过程.png)

## useRef 使用

### ref callback

`useRef(callback)`, 利用 ref callback 可以用一个 ref 管理多个 DOM。何时调用 ref callback：

- 当 DOM 渲染到屏幕，调用参数为 dom node。当 DOM 移除，调用参数为 null
- ref callback 改变时会调用。每一次 render，ref callback 都是新的，会用 null 调用前一次 ref callback，用 DOM node 调用这一次 ref callback

### forwardRef

useRef 或 createRef 用来绑定在当前组件的 hostcomponent(宿主元素) 上，跨层级或者绑定到 react 组件用 fowardRef。

Function components cannot be given refs

### expose / useImperativeHandle()

父组件调用子组件内部方法。父组件传递 ref 到子组件，子组件用 forwardRef 包裹，子组件利用`useImperativeHandle`暴露子组件内部方法。可以组合多种操作，dom 操作。

用于子组件封装逻辑，父组件直接调用，modal，drawer 组件。

```js
const Parent = () => {
  const ref = useRef();
  return (
    <>
      <Child ref={ref} />
    </>
  );
};
export const Child = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      //  返回一个对象作为暴露的ref
      return { childMethod1 };
    },
    [deps] // 更新ref对象的依赖
  );
  const childMethod1 = () => {};
});
```

## context 使用

本质创建一个全局的闭包

```js
const ThemeContext = React.createContext("initial");

const Parent = () => {
  return (
    <ThemeContext.provider value="newValue">
      <Child1 />
      <Child2 />
      <ChildComp />
    </ThemeContext.provider>
  );
};

// legacy
const Child1 = () => {
  return (
    <ThemeContext.Consumer>
      {(value) => <div>{value}</div>}
    </ThemeContext.Consumer>
  );
};

const Child2 = () => {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
};

// legacy
class ChildComp extends React.Component {
  // 需要定义到静态属性上
  static contextType = ThemeContext;

  render() {
    return <div>{this.context}</div>;
  }
}
```

## useEffect

Effect 是由渲染引起的副作用，与外部系统联系的，网络，web api。

- effect 在 commit 之后执行。
- 明确 effect 的依赖状态
- 清理 effect

## useMemo 使用

useMemo 缓存回调函数的返回值

[父组件直接隔离子组件渲染](/react/运行时代码优化.html#usememo)

## useCallback

缓存回调函数

## useSignal

## HOC

### 属性代理

返回一个新组件，新组件渲染传入的组件。

### 反向继承

高阶组件返回一个组件继承入参的组件。可修改组件的声明周期。

```js
const HOC = (Component) => {
  return class A extends Component {
    ComponentDidMount (){
      ...
    }
    render() {
      return super.render();
    }
  };
};
```

## 利用 suspence 的异步变同步

- suspence 内的子组件 throw err 会渲染 fallback 的内容。
- suspence 子组件 throw 一个 promise，promise 敲定会重新渲染子组件。

wrap 可以包装一个 promise，返回 read 函数

```js
const wrap = (promise) => {
  let res;
  let status = "pending";
  const suspenser = promise.then(
    (value) => {
      res = value;
      status = "fullfilled";
    },
    (err) => {
      res = err;
      status = "rejected";
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw suspenser;
        case "fullfilled":
          return res;
        case "rejected":
          throw res;
      }
    },
  };
};

// 用suspence 包裹
<Suspense fallback={<div>loading...</div>}>
  <Child wrappedApi={wrap(getData())} />
</Suspense>;

// Child 内可以像同步一样使用

export const Child = ({ wrappedApi }) => {
  const list = wrappedApi.read();
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
```

### suspence 模拟实现

利用 componentDidCatch 和 getDerivedStateFromError 模拟 suspence

```js
export class Suspence1 extends React.Component {
  state = {
    loading: false,
  };
  componentDidCatch(error, info) {
    if (error.suspenser) {
      // 这里给 promise 添加 then，强制更新组件
      error.suspenser.then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { loading: true };
  }
  render() {
    return this.state.loading ? this.props.fallback : this.props.children;
  }
}
```
