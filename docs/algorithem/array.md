---
title: 线性数据结构
date: 2023-12-15T14:16:43.852Z
---
# 线性数据结构

## Array 数组

内存中连续的一段区域

**查找** $O(1)$

**插入** 后面的元素需要向后挪动 $O(n)$

**删除** 后面的元素也需要向前移动 $O(n)$

## linked list 链表

单链表
双链表: 有前驱，后继，可以双向走

**优点**

* 改善插入和删除操作 $O(1)$
* 不知道一共有多少个元素

**缺点**

* 查找需要 $O(n)$

应用

* 区块链 链表/二叉树

![block chain](/images/array-1.png)

### 例子

* [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
* [两辆交换节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)
* [判断有环](https://leetcode.cn/problems/linked-list-cycle/)

## 栈 / 队列

可以用数组或链表实现，或双链表

### 例子

* [判断括号问题](https://leetcode.cn/problems/valid-parentheses/)
  用栈或者字符串replace
* [用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/) 
  一个输入栈， 一个输出栈

[![事件复杂度](/images/array-2.png)](https://www.bigocheatsheet.com/)

## 优先队列

正常入，按照优先级出。 优先级大小，次数，或者某个属性

### 实现

* 堆（binary 二叉堆， binominal多项式堆， fibonacci斐波那契堆）

  * 小顶二叉堆，越小越排前面， 父节点比左右子节点大， 最小元素永远在堆顶
  * 大顶堆， 最大元素永远在堆顶
* 二叉搜索树

### 例子

* [实时判断第K大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)

**思路1**: 记录前k大元素， 并且排序，每次进来元素都需要排序 `O(N*KlogK)

**思路2**: 不用排序， 利用优先队列， 前K大元素放到小顶堆中， 堆顶为第k大的元素(堆中最小值)， 每次进来元素调整堆， 把原来堆中小的剔除， 返回堆顶元素  `O(N*(1 + log_2 K))` => `O(NlogK)`

* [滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

**思路1**: 堆。窗口中k个元素放入大顶堆中， 每次滑动移除或添加新的元素到堆中，堆顶为K中的最大值 `O(NlogK)`

**思路2**: 双端队列， 前后都可以进出。每次入元素就维护队列， 保持最左边的为队列中最大值， 从窗口的右侧开始遍历，比入数小的都pop出去。维护的复杂度为1。 适用于K大小恒定，且只关心最大值， 不需要维护第K大的值。 `O(N)`

### 堆的时间复杂度

![](assets/截屏2023-12-16-15.58.37.png "堆的时间复杂度")