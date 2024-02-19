# tree shaking

## 实现原理

1. Make 阶段， 从入口文件遍历所有模块，形成AST，模块依赖关系图 ModuleGraph
2. Seal 阶段，运行代码，遍历ModuleGraph，用到过的代码，做好标记
3. Terser 删掉这些没被用到的导出语句。

Tree Shaking在去除代码冗余的过程中，程序会从入口文件出发扫描所有的模块依赖，以及模块的子依赖，然后将它们链接起来形成一个“抽象语法树”(AST)。随后，运行所有代码，查看哪些代码是用到过的，做好标记。最后，再将“抽象语法树”中没有用到的代码“摇落”。经历这样一个过程后，就去除了没有用到的代码。

webpack 中配置
`optimization.usedExports = true`

或者package.json

```json
// package.json
{
  "sideEffects": ["*.css", "*.scss"]
}
```

## 下面我们看下ES Module的特性

- 只能作为模块顶层的语句出现（而不嵌套在条件语句中）
- import 的模块名只能是字符串常量（只对文件进行字符串读取）
- 导入和导出语句没有动态部分（不允许使用变量等）静态导入
