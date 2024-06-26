# Canvas & WebGL

## svg

类 xml，元素作为 dom，矢量图

## canvas

- 2D 图形渲染: 主要用于二维图形的渲染。
- 简单易用: Canvas API 相对简单，上手快。
- 适用场景: 适用于图表、简单游戏、图像编辑等场景。
- 性能: 对于不需要复杂 3D 效果的应用，性能足够好。

平移 `ctx.translate(dx, dy)`, 缩放 `ctx.scale(1.1)`, 需要平移要清除所有的像素重画。

### canvas 优化

- 上下文切换开销大。减少对上下文`context`的修改，修改一次绘制所有有关的像素。
- canvas 拆分，根据堆叠层级拆分，根据绘制范围拆分。
- offscreencanvas
  - `document.createElement("canvas")`创建缓存中的 canvas，在上面绘制，用`ctx.drawImage(canvasOffscreen, x, y)` 绘制到屏幕上的 canvas。
    - 适合重复元素绘制，或者不需要变更的内容。
    - 双缓存，两个 canvas 交替绘制
  - OffscreenCanvas API，
    - 可以在主线程或 worker 中执行。避免主线程卡顿。
    - 同步`new OffscreenCanvas(256, 256); offscreen.transferToImageBitmap(); ctx.transferFromImageBitmap(bitmapOne)`
    - 异步`canvasEl.transferControlToOffscreen(); worker.postMessage({ canvas: offscreen }, [offscreen]);`
- 增量渲染，如果有滚动，可以将上一帧内容保存，复用上一帧内容渲染，再加上下一帧内容实现滚动。

## WebGL

WebGL 提供了更底层的图形 API，可以用来创建复杂的 3D 图形和效果。

- 3D 图形渲染: 专注于 3D 图形的渲染。
- 复杂和强大: 提供底层图形渲染能力，可以创建复杂的 3D 图形和动画。
- 适用场景: 适用于 3D 游戏、可视化模拟、复杂动画等场景。
- 性能: 利用 GPU 加速，能够处理更复杂和资源密集的图形任务。

1. 场景（Scene）：一个场景包含所有你想渲染的物体，可以理解为一个容器，用于设置和存放渲染的世界。
2. 相机（Camera）：相机决定了哪部分的场景会被渲染。Three.js 提供多种相机，其中最常用的是透视相机（PerspectiveCamera），它模仿人眼所看到的视角。
3. 渲染器（Renderer）：渲染器用于计算并绘制最终的图像到屏幕上。WebGLRenderer 是最常用的渲染器。3d 渲染到 2d 屏幕上。
4. 几何体（Geometry）：定义了物体的形状。Three.js 提供了多种预定义的几何体，如立方体、球体等。
5. 材质（Material）：定义了物体的外观（颜色、纹理等）。Three.js 支持多种材质，如 MeshBasicMaterial、MeshLambertMaterial 等。
6. 光源（Light）：光源影响场景中物体的渲染效果。Three.js 提供了多种光源，如环境光（AmbientLight）、点光源（PointLight）等。
7. 纹理（Texture）：纹理是映射到几何体表面的图像，用于增加物体的细节和真实感。
8. 动画（Animation）：Three.js 支持通过关键帧（Keyframe）和骨骼动画（Skeletal Animation）来实现复杂的动画效果。

几何体和材质共同组成 mesh

### 渲染管线

[梳理渲染管线流程](https://zhuanlan.zhihu.com/p/465212097?utm_id=0)

将 3d 空间转换为 2D 的空间数组，以显示在屏幕上，两步骤：

1. 将 3D 空间坐标转换和投影为 2D 坐标。
2. 将 2D 坐标转换为实际有颜色的像素输出到屏幕上面。

渲染管线类似于流水线，顶点着色器 vertex shader，片元着色器 fragment shader 就是管线上的自定义步骤，在 GPU 并行执行。

![graphic pipeline](/images/graphic-pipeline.png)

### bvh 优化 raycaster

[ThreeJs 中的 BVH 解析](https://zhuanlan.zhihu.com/p/566945215)

本质是二叉树深度遍历，每个节点是包围盒。

## webGPU

- 渲染管线用于渲染图形，通常渲染到 `<canvas>` 元素中，但它也可以在画面之外的地方渲染图形。它有两个主要阶段：

  - 顶点着色阶段：在该阶段中，顶点着色器（vertex shader）接受 GPU 输入的位置数据并使用像旋转、平移或透视等特定的效果将顶点在 3D 空间中定位。然后，这些顶点会被组装成基本的渲染图元，例如三角形等，然后通过 GPU 进行光栅化，计算出每个顶点应该覆盖在 canvas 上的哪些像素。

  - 片元着色阶段：在该阶段中，片元着色器（fragment shader）计算由顶点着色器生成的基本图元所覆盖的每个像素的颜色。这些计算通常使用输入，如图像（以纹理的方式）提供表面细节以及虚拟化光源的位置和颜色。

- 计算管线用于通用计算。计算管线包含单独的计算阶段，在该阶段中，计算着色器（compute shader）接受通用的数据，在指定数量的工作组之间并行处理数据，然后将结果返回到一个或者多个缓冲区。这些缓冲区可以包含任意类型的数据。

## 可视化

可视化三个具有前后顺序的动作：数据分组、数据计算和可视化。这也是本文的重点，我将详细说明。

数据分组是确定从什么视⻆看什么数据，比如，我们想要看不同班级学生的中考分数，这时候「不同班级」就是我们的切分视⻆，「班级」这个字段，就成了我们的维度。

数据计算，就是给指标附上一个具有统计意义的值。这个值是从指标字段的明细数据中计算得来的，也可以说是聚合得来的，所以我们一般叫做聚合函数。如果我想看大家的平均分，那就是对班级中的分数明细数据求平均，如果我想看每个班学生的最高分呢，用的就是求最大值函数。
