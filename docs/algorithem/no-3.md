---
title: 映射 & 集合
date: 2023-12-15T12:26:51.728Z
---
# Map & Set

[[toc]]

**Map 和 set 多用于查询和计数**

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

## 题目

- [字母异位](https://leetcode.cn/problems/valid-anagram/)

**Method 1**：排序，快排 $O(NlogN)$

**Method 2**：计数，利用map $O(N)$

- [two sum](https://leetcode.cn/problems/two-sum/) 利用map 或set 

- [three sum](https://leetcode.cn/problems/3sum/)

**method1**: 前两个树嵌套循环， 最后一个数用set查找, set 中放自己，查找就找我需要的， set 中放需要的， 查找就找自己（被需要）， $O(n^2)$， 空间$O(N)$

```js
if(set.has(b)){ // b 是自己， 查找自己有没有被需要
    result.add([a, -a-b, b].toString())
} else {
    set.add(-a-b) // 放需要的
}
```

```js
const c = -a - b // b 是自己， c是需要的
if(set.has(c)){ // 查找需要的
    result.add([a, c, b].toString())
} else {
    set.add(b) // 放自己
}
```

**method2**: sort & find, 先排序$O(NlogN)$，遍历一个数， 后两个数双指针， 大于目标右指针左移， 小于目标左指针右移 $O(n^2)$， 空间不需要set， 空间复杂度小

- [four sum](https://leetcode.cn/problems/4sum/)

