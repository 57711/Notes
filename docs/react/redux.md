# Redux

[redux 知识点梳理](https://blog.csdn.net/Sharon598/article/details/109560211)

## 状态管理

软件主要是管理数据，明确数据的声明周期，作用范围，根据这些决定数据存在那里

react 中数据需要多个组件间共享，存在 js 运行时。全局变量，闭包都可以实现。

状态管理需要实现的功能：

- 组件之外，可以在全局共享数据
  - 闭包
  - 全局变量
- 数据可以被修改的方法，并且能被感知
  - 需要监听方法：拦截器 proxy，观察者模式
  - 需要按照一定规则修改，action
  - immutable 没有修改状态，而是新生成了一个状态
- 修改状态触发 DOM 更新渲染
  - forceUpdate
  - setState

## compose

```js
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

const log = compose(console1, console2, console3)(console.log);
function console1(nextConsole) {
  return (message) => {
    console.log('console1开始');
    nextConsole(message);
    console.log('console1结束');
  };
}

function console2(nextConsole) {
  return (message) => {
    console.log('console2开始');
    nextConsole(message);
    console.log('console2结束');
  };
}

function console3(nextConsole) {
  return (message) => {
    console.log('console3开始');
    nextConsole(message);
    console.log('console3结束');
  };
}

log('我是Log');

/* 
console1开始
console2开始
console3开始
我是Log
console3结束
console2结束
console1结束
*/
```

```js
function console1(nextConsole) {
  return (message) => {
    console.log("console1开始");
    ((message) => { // console2
        console.log("console2开始");
        （(message) => { // console3
            console.log("console3开始");
            nextConsole(message);
            console.log("console3结束");
        })(message)
        console.log("console2结束");
    })(message);
    console.log("console1结束");
  };
}

console1(console.log)
// 最后产生的函数样子
const final = (message) => {
    console.log("console1开始");
    ((message) => { // console2
        console.log("console2开始");
        （(message) => { // console3
            console.log("console3开始");
            console.log(message); // console1 传入的函数
            console.log("console3结束");
        })(message)
        console.log("console2结束");
    })(message);
    console.log("console1结束");
  };
```

::: tip Array.reduce()
reduce 没有第二个参数， 默认就是 funcs 里的第一个元素作为第二个参数， 然后从第二次循环开始 i == 1
:::

## redux

### dispatch

- 接收 action，内调用 reducer，reducer 修改 state
- 调用所有的 listener 更新订阅的方法

### store

store 中提供的方法：subscribe, dispatch, getState

createStore 接收 reducer，返回 store。

- dispatch 接收 action，调用 reducer，reducer 修改 state
- getState 返回 state
- subscribe 给 observer 中 push 方法，观察者模式

### 更新 middleware

拦截的就是 dispatch 提交到 reducer 的这个过程，增强 dispatch 的功能；

applyMiddleware 接收 store 和 middleware 队列，调用每个 middleware，每个 middleware 接收 store，返回修改过的 dispatch。最终更新 store 中的 dispatch

createStore 中传入 heightener （applyMiddleware），高阶函数，返回增强的 createStore，并调用。

```js
const logger = (store) => (next) => (action) => {
  console.log('log');
  return next(action);
};

const applyMiddleware =
  (...middlewares) =>
  (createStore) =>
  (reducer) => {
    const store = createStore(reducer);
    let { getState, dispatch } = store;
    const params = {
      getState,
      dispatch: (action) => dispatch(action),
    };
    const middlewareArr = middlewares.map((middle) => middle(params));
    // [(next) => (action) => {}, ...]
    disptach = compose(middlewareArr)(dispatch); // 增强后的dispatch，dispatch 传递给参数next
    return { ...store, dispatch };
  };
```

### subscribe

被观察者提供 addObserver 以及 nodify 方法。观察者提供 update 方法

```js
// 观察者
const Obsercer = (fn) => {
  this.update = fn;
};

// 被观察者
class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  notify() {
    this.observers.forEach((observer) => observer.update());
  }
}
```

- dispatch 调用完 reducer 之后执行 nofify
- subscribe 相当于 addObserver

### combineReducer

合并 reducer，最后还是返回新的 reducer

```js
const combineReducer = (reducers) => {
  return (state, action) => {
    const nextState = {};
    Object.keys.forEach((key) => {
      nextState[key] = reducers[key](state[key], action);
    });
    return nextState;
  };
};
```

## react-redux

包括两部分 Provider, connect

provider：

- provider 是一个 react component，利用 react 中的 context 传递 store 给所有子组件

connect：

- 一个 HOC
- state, dispatch 加载为 props。connect 接收`mapStateToProps,mapDispatchToProps` 方法。将 state 和 dispatch（action）挂载在子组件的 props 上

- 订阅更新组件。componentDidMount 中调用 store.subscribe 传入重新渲染函数。更新函数用于强制更新 react 组件。

- `mapStateToProps,mapDispatchToProps` 把 state 和 dispatch 挂到组件的 prop 上

```js
const connect = (mapStateToProps,mapDispatchToProps) => (Component) => {
    return class Connect extends React.components {
        static contextType = ReduxContext;
        componentDidMount(){
            this.context.store.subscribe(this.storeHandler.bind(this));
        }
        storeHandler(){
            this.forceUpdate(); // 收到store 更新就更新组件
        }
        render (){
            return <Component
                {...props}
                {...mapStateToProps(this.context.store.getState())}
                {mapDispatchToProps(this.context.store.dispatch)}
            />
        }
    }
}
```

### hooks

```js
const count = useSeelctor((state) => state.value);

const dispatch = useDispatch();
```

## redux-thunk

处理异步操作，action 可以为函数。对 actionCreator 进行操作;

action 函数接收 dispatch, getState, 可以 fetch 之后异步调用 dispatch，或者返回新的 action

```js
return action === 'function'
  ? action(dispatch, getState, extraArgument)
  : next(action);
```

## redux-saga

把所有的异步请求放在了 saga.js（mySaga）文件中，文件中通过使用 redux-sage 的 call、put、takeEvery、takeLatest 方法方法封装成一个异步的一个文件

通过 generator 实现

当组件中通过 dispatch(action)提交 action 后，会在 saga.js 文件中的 generater (本质就是一个状态机，通过。next() 调用) 中监测到，通过 redux-saga 的 `createSagaMiddleware().run(mySaga: generater)`

```js
const run = (generator) => {
  const it = generator(); // 返回generator 迭代器
  const next = (action) => {
    let {value, done}it.next(action);
    if(!done){
        switch(value.type){
            case 'TAKE':
                events.once(effect.actionType, next);
                // 使用events注册事件，若是take到对应的actionType来到执行next继续往下
                break;
            case 'CALL':
                let {fn, args, context} = effect.payload;
                // 这里得到的是从delay函数中解析出的payload
                // 其中得到的fn函数返回的是一个promise
                fn.apply(context, args).then(next);
                break;
            case 'PUT':
                dispatch(effect.action);  // put就直接派发action
                next();  // 递归，继续往下进行操作搜集
                break;
            case 'FORK':
                run(effect.task);
                next();  // 这里为了不阻塞进程的运行，立即调用next()
                break;
            default:
                break;
        }
    }

  };
  next(); // 调用第一次next
};
```

::: tip generate 方法

- next(action)

  action 将作为 yield 的结果传入。

- return()

  结束生成器并允许生成器与 try...finally 块结合使用时执行任何清理任务

  好像一个 return 语句被插入到生成器主体的当前暂停位置
  :::
