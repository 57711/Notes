# provide inject

## vue3

vue3 利用原型链实现，父组件调用 provide：

1. 渲染，复制自己父组件的 provides，
2. `provides = Object.create(parentProvides)` 自己的 provides 的原型指向父组件的 provdes
3. 将 key 和 value 存到 provides 上。

子组件调用 inject

1. 到父组件实例中找到 provides 直接拿，没有就向原型链上找。

## vue2

子组件直接利用 vm.parent 向上找。
