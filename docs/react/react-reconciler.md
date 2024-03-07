# 自定义 react renderer

在 completeWork，commitWork 阶段，可以自定义 createInstance 等 hostConfig。利用 react-reconciler 库

[Hello World Custom React Renderer](https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc)

`reactReconciler(hostConfig)`, hostConfig 对象包含以下方法

- complete 阶段
  - 在 mount/update 的情况下，调用 `createInstance` 生成宿主对象
  - 在 mount/update 的情况下，调用 `createTextInstance` 生成文本节点
- complete 阶段完成时：

  - 在 mount 的情况下，调用 `finalizeInitialChildren` 处理 props 的属性;
  - 在 update 的情况下，调用 `prepareUpdate` 处理更新的 props 属性，生成 effectList;

- Mutation 阶段

  - Placement:

    - 如果是 hostRoot(根节点)，会调用`appendChildToContainer`
    - 如果是 hostComponent(宿主节点)，会调用`appendChild`

  - Update:

    - 如果是 element 节点 `commitUpdate`
    - 如果是文本节点`commitTextUpdate`

  - Deletion:
    - 如果是 hostRoot(根节点)，会调用`removeChildFromContainer`
    - 如果是 hostComponent(宿主节点)，会调用`removeChild`

## vue 中

vue 中使用`@vue/runtime-core` 中的 `createRenderer` 方法
[vue3 自定义渲染-实现 canvas](https://www.cnblogs.com/soonK/p/14590869.html)
[A Custom Renderer for Vue 3](https://vuejs-course.com/blog/a-custom-renderer-for-vue-3)
