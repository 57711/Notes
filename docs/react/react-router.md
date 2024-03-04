# react router

## 用法

- Routes 一组路由
- Route 基础路由
- Link
- Outlet
- useRoutes，可以传入 json，返回整个 routes 组件
- useParams， 获取`/post/:id`变量
  - `const {id} = useParams();`
- useNavigate，获取跳转方法
  - `const nav = useNavigate(); nav("/post/11")`
- useLocation，获取上下文信息
  - `const location = useLocation()`

```js
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/list" element={<List />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Link to="/">home</Link>
        <Link to="/list">List</Link>
        <Link to="/about">About</Link>
      </header>
      <Outlet />
    </div>
  );
};
```

### 懒加载

利用 react 的 suspence 和 lazy

```js
import {lazy, Suspence} from 'react'
const LazyComp = lazy(() => import("./lazyComp"))

<Route path="/lazy" element={
  <Suspence fallback={<div>loading</div>}>
    <LazyComp/>
  </Suspence>
}/>
```

## 原理

```js
import {
  Children,
  createContext,
  useContext,
  useRef,
  useMemo,
  useLayoutEffect,
  useState,
} from 'react';
import { createBrowserHistory } from 'history';

const LocationContext = createContext({});
const NavigationContext = createContext({});

export const Link = ({ children, to }) => {
  const nav = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    nav(to);
  };
  return (
    <a href={to} onClick={clickHandler}>
      {children}
    </a>
  );
};

export const BrowserRouter = ({ children }) => {
  // 1. 创建history
  // 2. 监听history变化，利用useLayoutEffect
  //    派发更新，渲染整个router树

  const historyRef = useRef();
  if (!historyRef.current) {
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // useLayoutEffect 页面渲染完立即马上触发，
  // 给history添加监听，如果history改变，就setState，渲染整个router树
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigatorType={state.action}
    />
  );
};

const Router = ({ children, location: locationProp, navigator }) => {
  // 添加provider
  const navigationContext = useMemo(() => navigator, [navigator]);
  const locationContext = useMemo(() => locationProp, [locationProp]);

  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider value={locationContext}>
        {children}
      </LocationContext.Provider>
    </NavigationContext.Provider>
  );
};

const useLocation = () => {
  // 利用context 获取location
  return useContext(LocationContext);
};

const useNavigate = () => {
  return useContext(NavigationContext).push;
};

const useRoutes = (routes) => {
  // 根据当前路径，匹配routes，返回element
  // TODO: 考虑children
  const { pathname } = useLocation();
  for (let i = 0; i < routes.length; i++) {
    const { path, element } = routes[i];
    if (pathname.match(new RegExp(`^${path}`))) {
      return element;
    }
  }
  return null;
};

const createRoutesFromChildren = (children) => {
  const routes = [];
  Children.forEach(children, (child) => {
    const { path, element, children } = child.props;
    routes.push({
      path,
      element,
      children: children ? createRoutesFromChildren(children) : undefined,
    });
  });
  return routes;
};

export const Routes = ({ children }) => {
  // 1. children 渲染为json
  // 2. useRoutes 渲染为最终的组件
  return useRoutes(createRoutesFromChildren(children));
};

export const Route = () => {};
```
