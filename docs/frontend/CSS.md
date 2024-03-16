# CSS

## 各种距离

- client-xxx 内边距
- offset-xxx 外边距
- scroll-xxx 可滚动的

![css各种距离](/images/CSS各种距离.png)

## 盒模型

元素都是盒模型，包括 content, padding, border, margin。可以设置宽高，内外边距，border，display，box-sizing，背景色。

|              | height/width | padding                     | border                      | margin                      | line-height           |
| ------------ | ------------ | --------------------------- | --------------------------- | --------------------------- | --------------------- |
| block        | 有效         | 有效                        | 有效                        | 有效                        | 有效                  |
| inline-block | 有效         | 有效                        | 有效                        | 有效                        | 有效                  |
| inline       | 无效         | 水平有效<br/>垂直不占用空间 | 水平有效<br/>垂直不占用空间 | 水平有效<br/>垂直不占用空间 | 有效<br/>但不影响背景 |

- box-sizing:

  - border-box, 包含 border 和 padding 的宽高，不受内部内容影响，可以优化页面重排，提高 CLS。
  - content-box，只设置 content 的宽高

- display:
  - flex 弹性盒
  - float 浮动盒
  - grid
  - inline-block, block, inline,

### inline 之间的空格

换行符会合并成一个空格，导致 inline 元素之间有空隙。

这个空隙实际上是一个空格字符，可以设置父元素字体大小`font-size: 0`，再恢复子元素（inline）字体大小`font-size: initial`。子元素再通过设置水平外边距调节间距。

### 外边距合并

block 子元素之间外边距可以合并取较大值。inline-block 之间不会合并

父子元素之间也可以合并。父元素`margin-top: 0`且没有 padding，子元素`margin-top: 10px`，合并后父元素距上一个元素距离为 10px。父元素设置 padding，或 border 就不会合并了。

不合并的方法：

- 子元素间设置为 inline-block
- 父子元素，设置父元素的 padding 或 border
- 设置父元素 float，grid，flex，`position:absolute`
- 设置父元素 overflow 为非 visible
