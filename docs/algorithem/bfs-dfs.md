---
title: BFS & DFS
date: 2023-12-17T05:50:53.186Z
---
# 广度优先BFS & 深度优先DFS

## BFS

很大集合中找特定节点，依次把子节点加入队列中来实现。 对于图需要判重的操作。

### 代码模版

利用queue

```js
function BFS (graph, start, end){
    const queue = []
    queue.push(start)
    const visited = [start]

    while (queue.length){
        const node = queue.pop()
        visited.push(node)
        process(node)

        const childrenWOVisited = process_children(node.chilren)
        queue.push(childrenWOVisited)
    }
}
```

## DFS

### 代码

利用递归

```js
const visited = []
function DFS (node, visited){
    visited.push(node)

    for(let nextNode of node.chilren){
        if(!nextNode in visited){
           DFS(nextNode, visited)
        }
    }
}
```

循环写法， 利用stack

```js
function DFS (graph, start, end){
    const stack = [start]
    const visited = []

    while (stack.length){
        const node = stack.pop()
        visited.push(node)
        process(node)

        const childrenWOVisited = process_children(node.chilren)
        stack.push(childrenWOVisited)
    }
}
```

## 题目

- [二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

**解1**： BFS，需要记录每一层结束的节点。$O(N)$

1. 记录level，level信息同节点一样加入queue中，或者每个节点带上level 信息
2. 每一层单独扫描， batch process, 记录这一层一共需要多少次遍历。BFS的步长为每一层元素的个数。不需要加任何标识，

**解2**： DFS, 需要记录level 信息， 按level放入对应位置数组中。 $O(N)$

- [最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)
- [最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

**解1**： DFS, $O(N)$

**解2**： BFS, $O(N)$

**解3**：分治，

1. 算最大，算左边和右边， 取最大值加1，为该层的最大，并返回。
2. 算最小， 算左边和右边。 如果左边null， 右边直接加1。 如果右边null， 左边直接加1. 如果左右都不为null， 分别算，取最小值并且加1。


- [n括号](https://leetcode.cn/problems/generate-parentheses/)

**解1**： 递归/深度优先/剪枝 $O(2^N)$

剪枝判断
1. 局部不合法，不再递归
2. 左右括号用尽，不再递归


