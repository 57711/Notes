# KeepAlive 组件

实际就是组件内部有一个 cache，所有的 vm 实例缓存在里面。render 函数负责根据传入的 vnode 根据 include，exclude 渲染。

max 属性用 LRU 维护总体缓存个数
