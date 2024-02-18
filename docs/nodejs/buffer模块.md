# Buffer 模块

## buffer

buffer 用来处理二进制或非 unicode 编码的数据。

buffer 代表一个缓冲区，用于存储二进制数据，俗称字节流，是 i/o 传输时常用的处理方式。相比于字符串，buffer 可以免去编码和解码的过程，节省 cpu 成本，因此在使用 nodejs 进行服务端开发时，http、tcp、udp、io、数据库、处理图片、表文件商户餐等操作，都会用到 buffer。另外 buffer 其实也是 stream 的基础。

**应用：**

- 在使用 net 或 http 模块接受网络数据时，可用 buffer 作为数据结构进行传输，即 data 事件的参数。
- 用于大文件的读取和写入，以前 fs 读取的内容是 string，后来都改用 buffer，在大文件读取上，性能和内存有明显优势。
- 用于字符转码、进制转换。
- 用作数据结构，处理二进制数据，也可以处理字符编码。

## node中的buffer模块

二进制数据包

创建 `Buffer.from()`, `Buffer.alloc()`

`Buffer.from('string')`
`Buffer.from([1,2,3])`
`Buffer.alloc(20)`

00 为8位 `writeInt8`
00 00 为16位 `writeInt16BE` `writeInt16LE`

BE 大端放高位 / LE 大端放低位

## proto buffer 二进制协议编码库

`protocal-buffers` 先写一个 `test.proto` 结构化数据格式

`schema = protobuf(<proto file>)`

`schema.structure.encode({key: value})`

## 8KB

[减少内存使用](/nodejs/#%E5%87%8F%E5%B0%91%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8)

实例化一个新的 Buffer 类，会根据实例化时的大小去申请内存空间，如果需要的空间小于 8KB，则会多一次判定，判定当前的 8KB 载体剩余容量是否够新的 buffer 实例，如果够用，则将新的 buffer 实例保存在当前的 8KB 载体中，并且更新剩余的空间。
