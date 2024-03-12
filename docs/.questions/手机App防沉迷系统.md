# 手机 App 防沉迷系统

**目录**

[题目](#%E9%A2%98%E7%9B%AE)

[思路](#t1)

[Code](#t2)

---

### 题目

> 智能手机方便了我们生活的同时，也侵占了我们不少的时间。“手机 App 防沉迷系统”能够让我们每天合理地规划手机 App 使用时间，在正确的时间做正确的事。  
> 它的大概原理是这样的:  
> 1.在一天 24 小时内，可以注册每个 App 的允许使用时段  
> 2.一个时间段只能使用一个 App  
> 3.App 有优先级，数值越高，优先级越高。注册使用时段时，**如果高优先级的 App 时间和低优先级的时段有冲突，则系统会自动注销低优先级的时段**，**如果 App 的优先级相同，则后添加的 App 不能注册**。  
> 请编程实现，根据输入数据注册 App，并根据输入的时间点，返回时间点使用的 App 名称，如果该时间点没有注册任何 App，请返回[字符串](https://so.csdn.net/so/search?q=%E5%AD%97%E7%AC%A6%E4%B8%B2&spm=1001.2101.3001.7020)“NA”。  
> 输入描述  
> 第一行表示注册的 App 数量 N (N <100)  
> 第二部分包括 N 行，每行表示一条 App 注册数据  
> 最后一行输入一个时间点，程序即返回该时间点使用的 App  
> 2  
> App1 1 09:00 10:00  
> App2 2 11:00 11:30  
> 09:30  
> 数据说明如下:  
> 1.N 行注册数据以空格分隔，四项数依次表示: App 名称、优先级、起始时间、结束时间  
> 2.优先级 1~5，数字越大，优先级越高  
> 3.[时间格式](https://so.csdn.net/so/search?q=%E6%97%B6%E9%97%B4%E6%A0%BC%E5%BC%8F&spm=1001.2101.3001.7020) HH:MM，小时和分钟都是两位，不足两位前面补 0  
> 4.起始时间需小于结束时间，否则注册不上  
> 5.注册信息中的时间段包含起始时间点，不包含结束时间点  
> 输出描述  
> 输出一个字符串，表示 App 名称，或 NA 表示空闲时间
>
> **示例 1  
> 输入**  
> 1  
> App1 1 09:00 10:00
>
> 09:30  
> 输出  
> App1  
> 说明  
> App1 注册在 9 点到 10 点间，9 点半可用的应用名是 App1  
> **示例 2  
> 输入**  
> 2  
> App1 1 09:00 10:00  
> App2 2 09:10 09:30  
> 09:20  
> 输出  
> App2  
> 说明  
> App1 和 App2 的时段有冲突，App2 优先级高，注册 App2 之后，App1 自动注销，因此输出 App2.
>
> **示例 3  
> 输入**
>
> **2**  
> App1 1 09:00 10:00
>
> App2 2 09:10 09:30
>
> 09:50  
> 输出  
> NA

## 思路

> 1：题目这么长，其实是个简单题。
>
> 2：核心也就是实现这三个 APP 原理
>
> \->在一天 24 小时内，可以注册每个 App 的允许使用时段  
> \->一个时间段只能使用一个 App  
> \->App 有优先级，数值越高，优先级越高。注册使用时段时，**如果高优先级的 App 时间和低优先级的时段有冲突，则系统会自动注销低优先级的时段**，**如果 App 的优先级相同，则后添加的 App 不能注册**。

## ![](https://img-blog.csdnimg.cn/42eca8c5691144f2a9511821b795bf3e.jpeg)

## Code

```js
let apps = [];
function transfer(input_str) {
  let nums = input_str.split(":");
  let total = 60 * parseInt(nums[0]) + parseInt(nums[1]);
  return total.toString();
}
function solve(infos) {
  let new_apps = [];
  console.log(new_apps);
  for (let i = 0; i < apps.length; i++) {
    console.log("1".localeCompare("2"));
    if (
      apps[i][2].localeCompare(infos[3]) >= 0 &&
      apps[i][3].localeCompare(infos[2]) <= 0 &&
      apps[i][1].localeCompare(infos[1]) > 0
    ) {
      new_apps.push(apps[i]);
    }
  }
  apps = new_apps;
  let flag = false;
  for (let i = 0; i < apps.length; i++) {
    if (
      apps[i][2].localeCompare(infos[3]) >= 0 &&
      apps[i][3].localeCompare(infos[2]) <= 0 &&
      apps[i][1].localeCompare(infos[1]) <= 0
    ) {
      flag = true;
    }
  }
  if (!flag) {
    apps.push(infos);
  }
  console.log(apps);
}
function main(n, app_infos, target_str) {
  for (let i = 0; i < n; i++) {
    let infos = app_infos[i];
    infos[2] = transfer(infos[2]);
    infos[3] = transfer(infos[3]);
    solve(infos);
  }
  let target = transfer(target_str);
  let output_str = "NA";
  for (let i = 0; i < apps.length; i++) {
    console.log(target);
    console.log(apps[i][2]);
    console.log(target.localeCompare(apps[i][2]));
    if (
      target.localeCompare(apps[i][2]) >= 0 &&
      target.localeCompare(apps[i][3]) <= 0
    ) {
      output_str = apps[i][0];
      break;
    }
  }
  console.log(output_str);
}
main(
  2,
  [
    ["App1", "1", "09:00", "10:00"],
    ["App2", "2", "09:10", "09:30"],
  ],
  "09:20"
);
```

> **【华为 od 机试真题 Python+JS+Java 合集】【超值优惠】：**[Py/JS/Java 合集](https://blog.csdn.net/misayaaaaa/category_12258991.html "Py/JS/Java合集")\*\*\*\*
>
> **【华为 od 机试真题 Python】：**[Python 真题题库](https://blog.csdn.net/misayaaaaa/category_12111005.html "Python真题题库")\*\*\*\*
>
> **【华为 od 机试真题 JavaScript】：**[JavaScript 真题题库](https://blog.csdn.net/misayaaaaa/category_12199270.html "JavaScript真题题库")\*\*\*\*
>
> **【华为 od 机试真题 Java】：**[Java 真题题库](https://blog.csdn.net/misayaaaaa/category_12111006.html "Java真题题库")\*\*\*\*
>
> **【华为 od 机试真题 C++】：**[C++真题题库](https://blog.csdn.net/misayaaaaa/category_12036814.html "C++真题题库")\*\*\*\*
>
> **【华为 od 机试真题 C 语言】：**[C 语言真题题库](https://blog.csdn.net/misayaaaaa/category_12217917.html "C语言真题题库")\*\*\*\*
>
> **【华为 od 面试手撕代码题库】：**[面试手撕代码题库](https://renjie.blog.csdn.net/article/details/130419388 "面试手撕代码题库")\*\*\*\*
>
> **【华为 od 机试面试交流群：830285880】**

文章知识点与官方知识档案匹配，可进一步学习相关知识

[算法技能树](https://edu.csdn.net/skill/algorithm/?utm_source=csdn_ai_skill_tree_blog)[首页](https://edu.csdn.net/skill/algorithm/?utm_source=csdn_ai_skill_tree_blog)[概览](https://edu.csdn.net/skill/algorithm/?utm_source=csdn_ai_skill_tree_blog)58196 人正在系统学习中

![](https://img-blog.csdnimg.cn/2f99f5a4ec6d46d183f094013fb0a34a.jpeg)

华为 od 笔试面试交流群

![](https://g.csdnimg.cn/extension-box/1.1.6/image/qq.png) QQ 群名片

![](https://g.csdnimg.cn/extension-box/1.1.6/image/ic_move.png)
