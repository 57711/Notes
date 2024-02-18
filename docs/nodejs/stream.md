# stream

按流的方式处理逐块读取文件内容，而不是全部读取到内存再处理。chunk 块一般是buffer，

分类

- Readable ：可以接收数据，但不能向其发送数据。当你将数据推送到可读流中时，它会被缓冲，直到消费者开始读取数据；
- writable ：可以发送数据，但不能从中接收；
- Duplex ：即可读也可写；
- Tranform ：与 Duplex 一样是可写又可读的，但它的输出与输入是相关联的。

```js
const fs = require("fs");
const rs = fs.createReadStream("test.md");
let data = "";
// 用事件
rs.on("data", function(chunk) {
  data += chunk;
});
rs.on("end", function() {
  console.log(data);
});

// 或者用pipe
rs.pipe(data)
```

优势：

- 内存效率：处理数据之前，不需要占用大量内存。
  - 与 fs.readFile 这种会缓冲整个文件相比， 流式传输充分地利用 Buffer （超过 8kb）不受 V8 内存控制的特点，利用堆外内存完成高效地传输。
- 时间效率：处理数据花费的时间更少，因为流是逐块来处理数据，而不是等到整个数据有效负载才启动。
  - 与 fs.FileSync 相比，有些优势
