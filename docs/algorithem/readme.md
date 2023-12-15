# 数据结构 & 算法

[[toc]]

## 数据结构

线性数据结构

- Array
- Stack / Queue
- PriorityOqueue (Heap)
- LinkedList(single / double)

树形结构

- Tree / Binary Tree
- Binary Search Tree
- HashTable
- Disjoint Set 并查集
- Trie 单词查找树
- BloomFilter 布隆过滤器
- LRU Cache

![分类](/images/algorithem-index-1.png)

## 算法

- 经典题目
- In-order/Pre-order/Post-order traversal 针对树的遍历
- Greedy 贪心
- Recursion/Backtrace 回溯/递归
- Breadth-first search 广度优先
- Depth-first search 深度优先
- Divide and Conquer 分治
- Dynamic Programming 动态规划
- Binary Search 二分查找
- Graph 图

## 复杂度

$O(1) < O(logN) < O(N) < O(NlogN) < O(N^2) < O(2^N)$

**$O(logN)$**
步长为两倍的，迭代次数为$logN$

```js
while (i < 10){
 i = i * 2
}
```

## Master Thoren

常见递归算法事件复杂度
|Algorithem|Recurrence relationship|Run time|Comment|
|  ----  | ----  |  ----  | --------------------- |
|Binary search <br> 二分查找| $$T(n) = T(n/2) + O(1)$$ |$O(log n)$|Apply Master theorem case $c = log_b a$, where $a = 1, b = 2, c = 0, k = 0$|
|Binary tree traversal <br>二叉树每个节点仅遍历一次|$T(n) = 2T(n/2) + O(1)$|$O(n)$|Apply Master theorem case $c < log_b a$ where $a = 2, b = 2, c = 0$|
|Optimal sorted matrix search <br>二维矩阵排序|$T(n) = 2T(n/2) + O(1og n)$|$O(n)$|Apply the Akra-Bazzi theorem for $p = 1$ and $g(u) = log(u)$ to get $\theta(2n - log n)$|
|Merge sort <br>快排 归并排序|$T(n) = 2T(n/2) + O(n)$|$O(nlog n)$|Apply Master theorem case $c = log_b a$, where $a = 2, b = 2, c = 1, k = 0$ |
