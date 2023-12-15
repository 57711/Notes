
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

- 改善插入和删除操作 $O(1)$
- 不知道一共有多少个元素

**缺点**

- 查找需要 $O(n)$

应用

- 区块链 链表/二叉树

![block chain](/images/array-1.png)

### 例子

[反转链表](https://leetcode.cn/problems/reverse-linked-list/)
[两辆交换节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)
[判断有还](https://leetcode.cn/problems/linked-list-cycle/)

## 栈 / 队列

可以用数组或链表实现，或双链表

[![事件复杂度](/images/array-2.png)](https://www.bigocheatsheet.com/)
