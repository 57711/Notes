---
title: 映射 & 集合
date: 2023-12-15T12:26:51.728Z
---
# Map & Set

\[[toc]]

## 哈希表，哈希函数，碰撞

## 哈希函数

一个对象通过函数生成一个数组的下标

![哈希函数](/images/截屏2023-12-16-17.24.09.png "哈希函数")

### 碰撞

不同对象可能生成同一个下标, 可以防止链表

![哈希碰撞](/images/截屏2023-12-16-17.27.47.png "哈希碰撞")

## list vs map vs set

- list 数组/链表实现，元素可重复，查找$O(N)$, 插入$O(1)$。
- map 实现HashMap， TreeMap
- set 不可重复， 哈希表或二叉搜索树实现, HashSet, TreeSet，查找$O(1)$

## HashMap, HashSet, TreeMap, TreeSet
- Hash 实现查找$O(1)$
hash中乱序， 但是时间块
- Tree 二叉树实现的$O(logN)$
tree的元素排序好了， 相对有序的排列， 但是时间复杂