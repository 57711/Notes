# let var

## var let 区别

`var` 有提升，`let` 没有提升，(预编译过程中)

`var` 函数或全局作用域。`let` 块作用域。

```js
var a;
// 1. 声明
// 2. 初始化
// 3. 赋值为undefined

{
  console.log(b); // undefined
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  // let 在块内只是声明了， 但是没有初始化和赋值。暂时性死区
  let a = 2;
  var b = 3;
}
```

## let 编译为 var

```js
let a = 2;
{
  let a = 1;
}
// 会被编译为
var a = 2;
{
  var _a = 1;
}
```

## 同时用 let var

```js
{
  var c = 1; // c alrady been declared. let c 的声明提升了
  let c = 4;
}
```
