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

## 类型注释 annotation / 推断 inference

注释：一段代码用来告诉 ts 变量引用的值的类型，我们告诉 ts type
推断：ts 自动找出变量引用值的类型， ts 猜 type

两个功能对 variables, functions, objects 表现不同

一般情况都用推断。

需要注释的情况：

- 声明变量，初始化变量的代码不在一行。推断在声明变量且初始化的时候才生效，
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

## 类型体操

类型体操就是类型编程，对类型参数做各种逻辑运算，以产生新的类型。

### 运算逻辑

- 条件 `T extends U ? X : Y`
- 约束 `T extends Length`
- 推导 `type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;`
- 联合 `1|2|3`
- 交叉 `{ a: number } & { c: boolean }`
- 索引 `keyof T`，获取所有键，返回联合类型
- 索引访问 `I[keyof I]`，获取所有值，返回联合类型
- 索引遍历 `[P in keyof typeof obj]`
- 重映射 `as`

```ts
// 通过索引查询 keyof，索引访问 t[k]，索引遍历 in，索引重映射 as，返回全新的 key、value 构成的新的映射类型
type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ];
};
// {
//     aaa: [1, 1, 1];
//     bbb: [2, 2, 2];
// }
type res3 = MapType<{ a: 1; b: 2 }>;
```

### 模式匹配做提取

extends 一个类型，需要提取的用 infer 声明

```ts
// 提取函数参数类型
type GetParams<F extends Function> = F extends (...args: infer A) => void
  ? A
  : never;
type ParamsResult = GetParams<(name: string, age: number) => string>;
```

### 重新构造做变换

要变化就要构造新的类型，在构造过程中可以对原类型做过滤和变换

```ts
type CapitalizeStr<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

type CapitalizeResult = CapitalizeStr<'typescript'>;
```

### 递归复用做循环

利用递归来进行循环

```ts
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : Arr;

type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>;
```

### 数组长度做计数

利用递归构造指定长度的数组，然后取数组的长度。

```ts
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]['length'];

type AddResult = Add<32, 25>;
```

### 例子

#### partial

```ts
type TPartial<T> = {
  [K in keyof T]?: T[K];
};
```

#### required

```ts
type TRequired<T> = {
  [K in keyof T]-?: T[K];
};
type RequiredRes = TRequired<{ name?: 'aa'; age?: 18 }>;
```

#### readonly

```ts
type TReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
type ReadonlyRes = TReadonly<{ name?: 'aa'; age?: 18 }>;
```

#### pick

```ts
type TPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PickRes = TPick<{ name?: 'aa'; age?: 18 }, 'name'>;
```

#### record

```ts
type TRecord<K extends keyof any, T> = {
  [P in K]: T;
};
type RecordRes = TRecord<'aa' | 'bb', string>;
```

#### exclude

```ts
type TExclude<T, U> = T extends U ? never : T;
type ExcludeRes = TExclude<'aa' | 'bb', 'aa'>;
```

#### extract

```ts
type TExtract<T, U> = T extends U ? T : never;
type ExtractRes = TExtract<'aa' | 'bb', 'aa'>;
```

#### omit

利用 pick 和 exclude

```ts
type TOmit<T, U> = TPick<T, TExclude<keyof T, U>>;
type OmitRes = TOmit<{ name: 'aa'; age: 18 }, 'name'>;
```

#### awaite

```ts
type TAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? TAwaited<V>
    : never
  : T;

type AwaitedRes = TAwaited<Promise<Promise<Promise<string>>>>;
```
