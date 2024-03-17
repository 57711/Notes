# Symbol

- Symbol 不能作为构造函数，避免创建包装对象。
- 全局符号注册表 `Symbol.for();Symbol.keyFor()`.

内置 symbol：

- [Symbol.asyncIterator](/js/promise.html#async-generator) 被`for await ... of`使用
- Symbol.iterator，被 `for ... of` 调用
- Symbole.hasInstance， 被 instanceof 调用
- Symbol.toPrimitive 强制类型转换
