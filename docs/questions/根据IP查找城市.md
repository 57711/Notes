# 根据 IP 查找城市

**目录**

[题目](#%E9%A2%98%E7%9B%AE)

[思路](#t1)

[Code](#t2)

---

### 题目

> 某业务需要根据终端的[IP 地址](https://so.csdn.net/so/search?q=IP%E5%9C%B0%E5%9D%80&spm=1001.2101.3001.7020)获取该终端归属的城市，可以根据公开的 IP 地址池信息查询归属城市地址池格式如下:  
> **城市名=起始 IP，结束 IP**  
> 起始和结束地址按照英文逗号分隔，多个地址段采用英文分号分隔。比如:  
> City1=1.1.1.1,1.1.1.2;City1=1.1.1.1,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6 一个城市可以有多个 IP 段，比如 City1 有 2 个 IP 段城市间也可能存在包含关系，如 City3 的 IP 段包含 City2 的 IP 段范围
>
> **现在要根据输入的 IP 列表，返回最佳匹配的城市列表**  
> 注:**最佳匹配即包含待查询 P 且长度最小的 IP 段**，比如例子中
>
> 3.4.4.4 最佳匹配是 City2=3.3.3.3,4.4.4.4，
>
> 5.5.5.5 的最佳匹配是 City3=2.2.2.2,6.6.6.6
>
> **输入描述**  
> 输入共 2 行。
>
> 第一行为城市的 IP 段列表，多个 IP 段采用英文分号， 分隔，IP 段列表最大不超过 500000。城市名称只包含[英文字母](https://so.csdn.net/so/search?q=%E8%8B%B1%E6%96%87%E5%AD%97%E6%AF%8D&spm=1001.2101.3001.7020)、数字和下划线。最多不超过 100000 个。IP 段包含关系可能有多层，但不超过 100 层。  
> 第二行为查询的 IP 列表，多个 IP 采用英文逗号“，分隔，最多不超过 10000 条  
> **输出描述**  
> 最佳匹配的城市名列表，采用英文逗号，分隔，城市列表长度应该跟查询的 IP 列表长度一致。  
> **备注**  
> 。无论是否查到匹配正常都要输出分隔符。举例: 假如输入 IP 列表为 IPa,IPb，两个 IP 均未有匹配城市，此时输出为","即只有一个逗号分隔符，两个城市均为空;  
> 可以假定用例中的所有输入均合法，IP 地址均为合法的 ipv4 地址，满足(1/255),(0/255)(0/255,0/255)的格式，且可以假定用例中不会出现组播和广播地址，
>
> 示例 1：
>
> 输入:
>
> City1=1.1.1.1,1.1.1.2;City1=1.1.1.1,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6
>
> 3.4.4.4,5.5.5.5
>
> 输出：
>
> City2,City3

## 思路

> 1：题目比较核心的一个点：【**起始 IP，结束 IP**】，这里我们首先要做的一个事，就是拿到这个区间内的所有 IP，一般的 ip 表达是   xxx.xxx.xxx.xxx ，由 4 个数字组成，每个数字的最大上限为 255，这样我们其实可以用一个 8 位的二进制数组来表达每个数组，再将四个数字的对应二进制数组合并，这样我们就可以得到一个正整数，用这个正整数，我们就可以很方便的获取对应其中的 IP 了。

## ![](https://img-blog.csdnimg.cn/42eca8c5691144f2a9511821b795bf3e.jpeg)

## Code

```js
function transfer(ip_str) {
  let ips = ip_str.split(".");
  let result = 0;
  for (let i = 0; i < 4; i++) {
    result = result * 256;
    result |= parseInt(ips[i]);
  }
  return result;
}
function main(input1, input2) {
  let city_str = input1.split(";");
  let target_ip = input2.split(",");
  let ip_ranges = {};
  for (let i = 0; i < city_str.length; i++) {
    let ranges = city_str[i].split("=")[1].split(",");
    if (ip_ranges.hasOwnProperty(city_str[i].split("=")[0])) {
      ip_ranges[city_str[i].split("=")[0]].push([
        transfer(ranges[0]),
        transfer(ranges[1]),
      ]);
    } else {
      ip_ranges[city_str[i].split("=")[0]] = [];
      ip_ranges[city_str[i].split("=")[0]].push([
        transfer(ranges[0]),
        transfer(ranges[1]),
      ]);
    }
  }
  let output_str = "";
  let i = 0;
  while (true) {
    if (i >= target_ip.length) {
      break;
    } else {
      let target_num = transfer(target_ip[i]);
      let target_city = "";
      let size = Number.MAX_VALUE;
      for (let j = 0; j < city_str.length; j++) {
        let ranges = ip_ranges[city_str[j].split("=")[0]];
        for (let k = 0; k < ranges.length; k++) {
          let start = ranges[k][0];
          let end = ranges[k][1];
          if (target_num >= start && target_num <= end) {
            if (end - start < size) {
              target_city = city_str[j].split("=")[0];
              size = end - start;
            }
          }
        }
      }
      output_str += target_city + ",";
    }
    i += 1;
  }
  if (output_str.length > 0) {
    output_str = output_str.substring(0, output_str.length - 1);
  }
  console.log(output_str);
}
main(
  "City1=1.1.1.1,1.1.1.2;City1=1.1.1.1,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6",
  "3.4.4.4,5.5.5.5"
);
```

###

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
