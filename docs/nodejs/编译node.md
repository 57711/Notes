# 编译node

- ./configure
- make
- make install

## configure 命令

configure 命令一般用来生成 Makefile，为下一步的编译做准备，你可以通过在 configure 后加上参数来对安装进行控制，比如代码`./configure –prefix=/usr` 意思是将该软件安装在 `/usr` 下面，执行文件就会安装在 `/usr/bin`（而不是默认的 `/usr/local/bin`)，资源文件就会安装在 `/usr/share`（而不是默认的`/usr/local/share`）。

同时一些软件的配置文件你可以通过指定 `–sys-config=` 参数进行设定。有一些软件还可以加上`–with、–enable、–without、–disable` 等等参数对编译加以控制，你可以通过 `./configure –help` 查看详细的说明帮助。

## make

make 表示编译，大多数的源代码包都经过这一步进行编译。如果 在 make 过程中出现 error ，你就要记下错误代码（注意不仅仅是最后一行），然后你可以向开发者提交 bugreport，或者你的系统少了一些依赖库等，这些需要自己仔细研究错误代码。

常见错误

make *** 没有指明目标并且找不到 makefile，停止。

问题很明显，没有 Makefile，原来是要先 ./configure 一下，再 make。

## make install

这条命令来进行安装，这一步一般需要你有 root 权限（因为要向系统写入文件）。
