# TS

## 类型 type

类型的背后是值所拥有的属性和方法。变量引用一个值，每个值都具有类型 type。

值`'red'` 类型是 string。拥有所有 string 的方法和属性。

所以：

- ts 可以帮助判断代码错误
- 编码时可以知道内部的数据类型，有哪些方法或属性可用。

基础类型：
number string boolean symbol null undefined void

对象类型：
objects arrays functions classes 自定义的类型

对象类型可以欺骗 ts。

## 类型注释 annotation 推断 inference

注释：一段代码用来告诉 ts 变量引用的值的类型，我们告诉 ts type
推断：ts 自动找出变量引用值的类型， ts 猜 type

两个功能对 variables, functions, objects 表现不同

一般情况都用推断。

需要注释的情况：

- 声明变量，初始化变量在另一行语句。推断在声明变量且初始化的时候才生效，
- 函数返回 any，需要明确类型。 `json.parse()` 返回 any
- 变量的类型不能被推断的时候

## tuple

混合多种类型的类数组，元素顺序是固定的。

```js
// tuple
const pepsi: [string, number, boolean] = ['213', 321, false];
// array
const pepsi: (string | number | boolean)[] = ['213', 321, false];
```

## interface

定义一个新 type，用来描述 object 中属性名和值的 type

## clases

修饰符，

- public，
- private 只能在当前 class 里被调用
- protected 当前 class 或子 class 里被调用

子类 constructor 中的 super 相当于父类的 constructor。

自己构造的 class，可以将在 class 中 new 的实例设置为 private，以便限制使用的范围。

```ts
class AA {
  // 相当于先在外面声明 val:string，再在constructor 内部赋值this.val = val
  constructor(public val: number) {}
  someMethods() {}
}

class BB {
  // BB 的实例将不会访问到instAA，也就不会调用AA 的someMethods，更安全。
  private instAA;
  constructor() {
    this.instAA = new AA();
  }
}
```

```ts

interface I1 {
  name: string;
  age: number;
}
interface I2 {
  name: string;
  count: number;
}

function temp(value: I1 | I2): void {
  // value 只能拥有I1 I2 共同的方法name
  console.log(value.name);
}
// 更好的做法是标记为只有name的类型

interface IName {
  name: string;
}

function temp(value: IName): void {...}

temp({name: '', age: ''}) // 也满足IName类型
// 一个值可以满足多种类型。

// 抽象类
abstract class ClassName {
  abstract getName(): string
}

class User extends ClassName implements I1, I2{
  // 内部必须实现所有的interface，和抽象类的方法。
  name: string = '';
  age: number = 0;
  count: number = 0;
  constructor(){
    super(); // 有继承，constructor 内部必须要super
  };
  getName = () => this.name;
}


```

## 主动推断函数的类型

fn 是 async 函数。

retryFn 的返回类型是 promise，也就是 fn 的返回类型。

```ts
async function retryFn<T>(
  fn: (...args: any) => Promise<T>,
  tryTimes: number
): Promise<T> {
  try {
    return fn();
  } catch (err) {
    if (tryTimes > 1) {
      return retryFn(fn, tryTimes - 1);
    } else {
      throw err;
    }
  }
}
function getPosts(): Promise<string[]> {}
const aa = retryFn(getPosts, 3);
// ts 可以直接推断出aa 的类型 Promise<string[]>
```
