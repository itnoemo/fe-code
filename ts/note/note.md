# 数组
- 只读数组
  - 定义
    - readonly: 声明只读数组, 不允许修改组内成员
    ```typescript
    const arr = [0, 1] as const;
    arr[0] = [2]; // 报错
    ```
    - 只读数组还有一种声明方法，就是使用“const 断言”
    ```typescript
    const arr = [0, 1] as const;
    arr[0] = [2]; // 报错
    ```
  - 特点
    - 将readonly number[]与number[]视为两种不一样的类型，后者是前者的子类型
    ```typescript
    let a1: number[] = [0, 1];
    let a2: readonly number[] = a1; // 正确
    a1 = a2; // 报错
    ```
- 多维数组
  - 定义
    - 使用T[][]的形式，表示二维数组，T是最底层数组成员的类型
    ```typescript
    var multi: number[][] = [
      [1, 2, 3],
      [23, 24, 25],
    ];
    ```
- 扩展运算符（...）
  - 扩展运算符（...）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。
  ```typescript
  const arr = [1, 2];
  function add(x: number, y: number) {
    // ...
  }
  add(...arr); // 报错
  ```
关键字 Array<数据类型>

数据类型[]

```typescript
let arr: (number | string)[];

let arr1: number[] = [1, 2, 3]
let arrStr: string[] = ['a', 'b']

// 泛型表示的数组
let arr2: Array<string> = ['a', 'b']

console.log(arr1, arrStr, arr2)
// [ 1, 2, 3 ] [ 'a', 'b' ] [ 'a', 'b' ]
```

# 元组
- 定义
  - 没有关键字，只有定义方式 [数据类型,数据类型，...数据类型]
  - Readonly<[number, string]>, 规则如数组

```typescript
let tuple: [string, number, boolean] = ['a', 1, false]

console.log(tuple)
// [ 'a', 1, false ]
```



# 枚举

关键字 enum

```typescript
enum Play {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play.UP, Play.DOWN)

enum Play1 {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play1.UP, Play1.DOWN)


console.log(Play1.UP === 0)

// 可以比较的
console.log(Play1.UP === Play1.UP)

// 错误示例
// console.log(Play1.UP === Play.UP)

```



# 任意数据类型

关键字 any

```typescript
let a: any = 1
console.log(a)
a = 'a'
console.log(a)

// 1
// a
```



# 空返回类型

关键字void

```typescript
function say(): void {
  console.log('我啥也不返回')
}
say()
```



# 空

null & undefined

```typescript
// 默认值是 undefined
let str: string = null
console.log(str)
```






****
# any 类型

- 概念
  - 表示没有任何限制，该类型的变量可以赋予任意类型的值
  - 变量类型一旦设为any，TypeScript 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错
  ```typescript
  let x: any = "hello";
  x(1); // 不报错
  x.foo = 100; // 不报错
  ```
- 场景
  - 出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为any
  - 为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为any
****
# unknown 类型
- 概念
  - 它与any含义相同，表示类型不确定，可能是任意类型
  - 与any不同的是，不像any那样自由，可以视为严格版的any
  - 一般来说，凡是需要设为any类型的地方，通常都应该优先考虑设为unknown类型
  - 在集合论上unknown也可以视为所有其他类型（除了any）的全集, 属于 TypeScript 的顶层类型
- 规则
  - unknown类型的变量，不能直接赋值给非any类型和unknown类型的变量
    ```typescript
    let v1: unknown = v;
    let v2: any = v;
    let v3: number = v;
    ```
  - 不能直接调用unknown类型变量的方法和属性
    ```typescript
    let c1: unknown = { c: 1 };
    c1.c; // 报错

    let c2: unknown = "hello";
    c2.trim(); // 报错

    let c3: unknown = (c = 0) => c + 1;
    c3(); // 报错
    ```
  - unknown类型变量能够进行的运算是有限的, 只能进行比较运算（运算符==、===、!=、!==、||、&&、?）、取反运算（运算符!）、typeof运算符和instanceof运算符这几种，其他运算都会报错
  ```typescript
    let c: unknown = 1;
    c + 1; // 报错
    c === 1; // 正确
  ```
- 使用
  - 只有经过“类型缩小”(即将一个不确定的类型缩小为更明确的类型)，unknown类型变量才可以使用
  ```typescript
  // 变量c经过typeof运算以后，能够确定实际类型是number，就能用于加法运算了
  let c: unknown = 1;
  if (typeof c === "number") {
    let a = c + 10; // 正确
  }
  ```
****
# never
- 概念
  - 不存在任何属于“空类型”的值，即不可能有这样的值
- 特点
  - 可以赋值给任意其他类型,原因是
  - ts规定空集是任何集合的子集，任何类型都包含never的类型
  - 是ts的底层类型
  ```typescript
  function c(): never {
    throw new Error("Error");
  }

  let c1: number = c(); // 不报错
  let c2: string = c(); // 不报错
  let c3: boolean = c(); // 不报错
  ```
****
# undefined 和 null 的特殊性
- 概念
  - undefined和null既是值，又是类型。
  - 作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为undefined或null。
  ```typescript
  let age: number = 24;

  age = null; // 正确
  age = undefined; // 正确
  ```
  - 如果没有声明类型的变量，被赋值为undefined或null，它们的类型会被推断为any。
  ```ts
  let a = undefined; // any
  const b = undefined; // any

  let c = null; // any
  const d = null; // any
  ```
  - 希望避免这种情况，则需要打开编译选项strictNullChecks
  ```ts
  // 打开编译设置 strictNullChecks
  let a = undefined; // undefined
  const b = undefined; // undefined

  let c = null; // null
  const d = null; // null
  ```


- 弊端
  - 由于 变量如果等于undefined就表示还没有赋值，如果等于null就表示值为空，故此下面
  ```typescript
  const obj: object = undefined;
  obj.toString(); // 编译不报错，运行就报错
  ```
****
# Object 类型与 object 类型
## Object
- 大写的Object类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值
- 除了undefined和null这两个值不能转为对象，其他任何值都可以赋值给Object类型
```ts
let obj: Object;
obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;

obj = undefined; // 报错
obj = null; // 报错
```
## object
- 代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值
```ts
let obj: object;

obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
obj = true; // 报错
obj = "hi"; // 报错
obj = 1; // 报错
```

**无论是大写的Object类型，还是小写的object类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中**

****

# 值类型
- 概念
  - 单个值也是一种类型
  ```typescript
  // 变量x的类型是字符串hello，导致它只能赋值为这个字符串，赋值为其他字符串就会报错
  let x: "hello";
  x = "hello"; // 正确
  x = "world"; // 报错

  // 同理
  const x: string = "hello";
  ```
- 奇怪现象
  ```typescript
  // 等号左侧的类型是数值2，等号右侧1 + 1的类型，TypeScript 推测为number
  // 由于2是number的子类型，number是2的父类型，父类型不能赋值给子类型，所以报错了
  const x: 2 = 1 + 1; // 报错

  // 通过 as 类型断言不报错
  const x:2 = (1+1) as 2; // 正确

  // 但子类型可以赋值给父类型
  let a: 2 = 2;
  let b: number = 1 + 1;
  a = b; // 报错
  b = a; // 正确
  ```
****
# const
- 若赋值的类型为基本类型，则推断该变量类型为 值 类型
```ts
// x 的类型是 "https"
const x = "https";
// y 的类型是 string
const y: string = "https";
```
- const命令声明的变量，如果赋值为对象，并不会推断为值类型
```ts
// x 的类型是 { foo: number }
const x = { foo: 1 };
```
****
# 联合类型
- 概念
  - 多个类型组成的一个新类型，使用符号|表示
  - A|B表示，任何一个类型只要属于A或B，就属于联合类型A|B
  ```typescript
  let a: string | number;
  a = 123; // 正确
  a = "abc"; // 正确 
  ```
  - 联合类型可以与值类型相结合，表示一个变量的值有若干种可能
  ```typescript
  let a: true | false;
  let gender: "male" | "female";
  let color: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";
  ```
- 注意
  - “类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理
  - 实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”
  - 如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”
  ```typescript
  function printId(id: number | string) {
    console.log(id.toUpperCase()); // 报错
  }
  // 正确， 只有先类型缩小后再去操作
  function printId(id: number | string) {
    if (typeof id === "string") {
      console.log(id.toUpperCase());
    } else {
      console.log(id);
    }
  }
  // 正确
  function getPort(scheme: "http" | "https") {
    switch (scheme) {
      case "http":
        return 80;
      case "https":
        return 443;
    }
  }
  ```

# 交叉类型
- 概念
  - 指的多个类型组成的一个新类型，使用符号&表示
  - 交叉类型A&B表示，任何一个类型必须同时属于A和B，才属于交叉类型A&B，即交叉类型同时满足A和B的特征
  - 若A和B类型一个样，则为A或B类型，若A是B的子集，那么交叉后的类型为A， 否则取它们共同的子集nerver
  ```typescript
  // 不太可能，只能是nerver类型
  let a: number & string;
  ```
- 作用
  - 表示对象的合成
    ```typescript
    // 主要用途是表示对象的合成
    let person: { name: string } & { age: number };
    obj = {
      name: "张三",
      age: 20,
    };
    ```
  - 为对象类型添加新属性
    ```typescript
    type A = { age: number };
    type B = A & { name: number };
    let person: B
    ```
- 特性


# type
- 概念
  - 命令用来定义一个类型的别名
  - type命令属于类型相关的代码，编译成js的时候会被全部删除
  ```typescript
  type Age = number;
  let age: Age = 20;
  ```
- 特点
  - 别名的作用域是块级作用域
    ```typescript
    type Color = "red";
    if (Math.random() < 0.5) {
      type Color = "blue";
    }
    ```
  - 别名不允许重名
   ```typescript
    type Color = "red";
    type Color = "yellow"; // 报错
    ```
  - 别名支持使用表达式
   ```typescript
    type World = "world";
    type Greeting = `hello ${World}`;
    ```
# typeof 运算符
- 概念
  - 一个一元运算符，返回一个字符串，代表操作数的类型
  - 这时 typeof 的操作数是一个值
- js中表象
  ```javascript
  typeof undefined; // "undefined"
  typeof true; // "boolean"
  typeof 1; // "number"
  typeof "a"; // "string"
  typeof {}; // "object"
  typeof parseInt; // "function"
  typeof Symbol(); // "symbol"
  typeof 127n; // "bigint"
  ```
- 特点
  - ts 将typeof运算符移植到了类型运算
  - 返回的不是字符串，而是该值的 TypeScript 类型
  ```typescript
  const a = { x: 0 };
  type T0 = typeof a; // { x: number }
  type T1 = typeof a.x; // number
  ```
  - typeof既可以类型运算，又可以值运算
  ```typescript
  let a = 1;
  let b: typeof a;
  if (typeof a === "number") {
    b = a;
  }
  ```
  - typeof 的参数只能是标识符，不能是需要运算的表达式
  ```typescript
  // typeof 的参数只能是标识符，不能是需要运算的表达式
  type T = typeof Date(); // 报错
  ```
  - 参数不能是类型
  ```typescript
  // 参数不能是类型
  type Age = number;
  type MyAge = typeof Age; // 报错
  ```
# symbol
- 由于变量a和b是两个类型，就不能把一个赋值给另一个。
```typescript
const a: unique symbol = Symbol();
const b: unique symbol = a; // 报错
```
- unique symbol
  - unique symbol表示单个值，所以这个类型的变量是不能修改值的，只能用const命令声明，不能用let声明
  ```typescript
  // 正确
  const x: unique symbol = Symbol();
  // 报错
  let y: unique symbol = Symbol();
  ```


# 对象类型
- 属性名的索引类型
  ```typescript
  // 索引值为字符串类型
  type MyObj = {
    [property: string]: string;
  };
  const obj: MyObj = {
    foo: "a",
    bar: "b",
    baz: "c",
  };

  // 索引值为数字类型
  type MyArr = {
    [n: number]: number;
  };
  const arr: MyArr = [1, 2, 3];
  // 或者
  const arr: MyArr = {
    0: 1,
    1: 2,
    2: 3,
  };
  ```
- 空对象
  - 访问空对象的非继承属性会报错，因为TypeScript 会推断变量obj的类型为空对象, 实际执行的是 const obj: {} = {}
  ```typescript
  // ;
  const obj = {};
  obj.prop = 123; // 报错
  obj.toString(); // 正确，原型上的方法
  ```

# interface
- 概念
  - interface 是对象的模板，可以看作是一种类型约定
- 5种形式
  - 对象属性
    ```typescript
    interface Point {
      x: number;
      y: number;
    }
    ```
  - 对象的属性索引
    - 属性索引共有string、number和symbol三种类型
    - 一个接口中，最多只能定义一个字符串索引
      ```typescript
      // 字符串索引会约束该类型中所有名字为字符串的属性
      interface MyObj {
        [prop: string]: number;
        a: boolean; // 编译错误
      }
      ```
    - 一个 interface 同时定义了字符串索引和数值索引，那么数值索性必须服从于字符串索引
      ```typescript
      interface A {
        [prop: string]: number;
        [prop: number]: string; // 报错
      }

      interface B {
        [prop: string]: number;
        [prop: number]: number; // 正确
      }
      ```
  - 对象的方法
    - 常见写法
      ```typescript
      // 写法一
      interface A {
        f(x: boolean): string;
      }
      // 写法二
      interface B {
        f: (x: boolean) => string;
      }
      // 写法三
      interface C {
        f: { (x: boolean): string };
      }
      ```
    - 属性名可以采用表达式
      ```typescript
      const f = "f";
      interface A {
        [f](x: boolean): string;
      }
      ```
    - 类型方法可以重载
      ```typescript
      interface A {
        f(): number;
        f(x: boolean): boolean;
        f(x: string, y: string): string;
      }
      ```
  - 函数
    - interface 也可以用来声明独立的函数
    ```typescript
    interface Add {
      (x: number, y: number): number;
    }
    const myAdd: Add = (x, y) => x + y;
    ```
  - 构造函数
    - 内部可以使用new关键字，表示构造函数
    ```typescript
    interface ErrorConstructor {
      new (message?: string): Error;
    }
    ```
- 继承
  - interface 继承 interface
    ```typescript
    interface Shape {
      name: string;
    }

    interface Circle extends Shape {
      radius: number;
    }
    ```
  - 允许多重继承, 
    - 实际上相当于多个父接口的合并
      ```typescript
      interface Style {
        color: string;
      }
      interface Shape {
        name: string;
      }
      interface Circle extends Style, Shape {
        radius: number;
      }
      ```
    - 相同属性名类型要一样
      ```typescript
      interface Foo {
        id: string;
      }
      interface Bar extends Foo {
        id: number; // 报错
      }

      // ---------------------------
      interface Foo {
        id: string;
      }
      interface Bar {
        id: number;
      }
      // 报错
      interface Baz extends Foo, Bar {
        type: string;
      }
      ```
  - 继承 type
    - ** 如果type命令定义的类型不是对象，interface 就无法继承 **
    ```typescript
      type Country = {
        name: string;
        capital: string;
      };
      interface CountryWithPop extends Country {
        population: number;
      }
    ```
  - 继承 class
    - 即继承该类的所有成员
      ```typescript
      class A {
        x: string = "";
        y(): boolean {
          return true;
        }
      }
      interface B extends A {
        z: number;
      }
      ```
    - 某些类拥有私有成员和保护成员，interface 可以继承这样的类，但是意义不大
      ```typescript
      class A {
        private x: string = "";
        protected y: string = "";
      }
      interface B extends A {
        z: number;
      }
      // 报错
      const b: B = {
        /* ... */
      };

      // 报错
      class C implements B {
        // ...
      }
      ```
  - 接口合并
    - 多个同名接口会合并成一个接口。
      ```typescript
      interface Box {
        height: number;
        width: number;
      }
      interface Box {
        length: number;
      }
      ```
- 与type区别
  - 定义上
    - type能够表示非对象类型，而interface只能表示对象类型（包括数组、函数等）。
    - interface可以继承其他类型，type不支持继承
    - 同名interface会自动合并，同名type则会报错
    - interface不能包含属性映射（mapping），type可以
      ```typescript
      interface Point {
        x: number;
        y: number;
      }

      // 正确
      type PointCopy1 = {
        [Key in keyof Point]: Point[Key];
      };

      // 报错
      interface PointCopy2 {
        [Key in keyof Point]: Point[Key];
      };
      ```
    - this关键字只能用于interface
      ```typescript
      // 正确
      interface Foo {
        add(num: number): this;
      }
      // 报错
      type Foo = {
        add(num: number): this;
      };
      ```
    - type 可以扩展原始数据类型，interface 不行
      ```typescript
      // 正确
      type MyStr = string & {
        type: "new";
      };
      // 报错
      interface MyStr extends string {
        type: "new";
      }
      ```
    
  - 写法上
    - 实现继承， interface用extends, type用&
    - interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以
      ```typescript
      type A = {
        /* ... */
      };
      type B = {
        /* ... */
      };
      type AorB = A | B;
      type AorBwithName = AorB & {
        name: string;
      };
      ```

# 类
- 定义
  - 构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象
   ```typescript
    class B {
      constructor(): object {
        // 报错
        // ...
      }
    }
   ```
  - 存取器方法
    - 存取器（accessor）是特殊的类方法，包括取值器（getter）和存值器（setter）两种方法
    ```typescript
    class C {
      _name = "";
      get name() {
        return this._name;
      }
      set name(value) {
        this._name = value;
      }
    }
    ```
    - 规则
      - 如果某个属性只有get方法，没有set方法，那么该属性自动成为只读属性
      - set方法的参数类型，必须兼容get方法的返回值类型，否则报错
      - get方法与set方法的可访问性必须一致，要么都为公开方法，要么都为私有方法
- 继承
  - implements，类可以实现多个接口（其实是接受多重限制），每个接口之间使用逗号分隔
  - extends, 类只能继承一个类
- 规则
  - 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类
- 继承
  - 子类可以覆盖基类的同名方法, 但子类的同名方法不能与基类的类型定义相冲突。
    ```typescript
    class A {
      greet() {
        console.log("Hello, world!");
      }
    }

    class B extends A {
      // 报错
      greet(name: string) {
        console.log(`Hello, ${name}`);
      }
    }
    ```
  - 基类包括保护成员（protected修饰符），子类可以将该成员的可访问性设置为公开（public修饰符），也可以保持保护成员不变，但是不能改用私有成员（private修饰符）
    ```typescript
    class A {
      protected x: string = "";
      protected y: string = "";
      protected z: string = "";
    }

    class B extends A {
      // 正确
      public x: string = "";

      // 正确
      protected y: string = "";

      // 报错
      private z: string = "";
    }
    ```
  - extends关键字后面不一定是类名，可以是一个表达式，只要它的类型是构造函数就可以了
    ```typescript
    // 例一
    class MyArray extends Array<number> {}

    // 例二
    class MyError extends Error {}

    // 例三
    class A {
      greeting() {
        return "Hello from A";
      }
    }
    class B {
      greeting() {
        return "Hello from B";
      }
    }

    interface Greeter {
      greeting(): string;
    }

    interface GreeterConstructor {
      new (): Greeter;
    }

    function getGreeterBase(): GreeterConstructor {
      return Math.random() >= 0.5 ? A : B;
    }

    class Test extends getGreeterBase() {
      sayHello() {
        console.log(this.greeting());
      }
    }
    ```
  - 构造方法也可以是私有的，这就直接防止了使用new命令生成实例对象，只能在类的内部创建实例对象，单例模式
- 抽象类
  - 允许在类的定义前面，加上关键字abstract，表示该类不能被实例化，只能当作其他类的模板
  - 抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类
  - 抽象成员
    - 如果抽象类的属性前面加上abstract，就表明子类必须给出该方法的实现
    - 抽象成员只能存在于抽象类，不能存在于普通类。
    - 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加abstract关键字。
    - 抽象成员前也不能有private修饰符，否则无法在子类中实现该成员。
    - 一个子类最多只能继承一个抽象类。

# 泛型
- 特点就是带有“类型参数”
- 主要用在四个场合：函数、接口、类和别名
  ```typescript
  // 接口写法1
  interface Box<Type> {
    contents: Type;
  }
  let box: Box<string>;
  // 接口-写法2
  interface Fn {
    <Type>(arg: Type): Type;
  }
  function id<Type>(arg: Type): Type {
    return arg;
  }
  let myId: Fn = id;
  // ------ 类, 带有默认值的参数类型 ------
  class Pair<K = string, V> {
    key: K;
    value: V;
  }
  const a = new Pair<string,string>();
  ```
- 一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。
  ```typescript
  <T = boolean, U> // 错误
  <T, U = boolean> // 正确
  ```
- 注意点
  - 尽量少用泛型, 阅读性差
  - 类型参数越少越好， 降低复杂度
  - 类型参数需要出现两次，如果只出现一次那大概率是没有必要的
  - 泛型可以嵌套
    ```typescript
    type OrNull<Type> = Type | null;
    type OneOrMany<Type> = Type | Type[];
    type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
    ```
# Enum
- 新增的一种数据结构和类型
  ```typescript
  // 编译前
  enum Color {
    Red, // 0
    Green, // 1
    Blue, // 2
  }
  // 编译后
  let Color = {
    Red: 0,
    Green: 1,
    Blue: 2,
  };
  ```
- Enum 结构本身也是一种类型
  ```typescript
  let c: Color = Color.Green; // 正确
  let c: number = Color.Green; // 正确
  ```
- 由于 Enum 结构编译后是一个对象，所以不能有与它同名的变量（包括对象、函数、类等）
  ```typescript
  enum Color {
    Red,
    Green,
    Blue,
  }
  // Enum 结构与变量同名，导致报错
  const Color = "red"; // 报错
  ```
- Enum 结构可以被对象的as const断言替代, 作用就是使得它的属性无法修改
  ```typescript
  enum Foo {
    A,
    B,
    C,
  }
  // Foo和Bar的行为就很类似了，前者完全可以用后者替代，而且后者还是 JavaScript 的原生数据结构
  const Bar = {
    A: 0,
    B: 1,
    C: 2,
  } as const;

  if （x === Foo.A）{}
  // 等同于
  if (x === Bar.A) {}
  ```
- 成员的值可以是任意数值，但不能是大整数（Bigint）
  ```typescript
  enum Color {
    Red = 90,
    Green = 0.5,
    Blue = 7n, // 报错
  }
  ```
- 同名 Enum 的合并
  ```typescript
  enum Foo {
    A,
  }

  enum Foo {
    B = 1,
  }

  enum Foo {
    C = 2,
  }

  // 等同于
  enum Foo {
    A,
    B = 1，
    C = 2
  }
  ```
- keyof 运算符可以取出 Enum 结构的所有成员名，作为联合类型返回。
  ```typescript
  enum MyEnum {
    A = "a",
    B = "b",
  }

  // 'A'|'B'
  type Foo = keyof typeof MyEnum;
  ```

# 类型断言
- 一大用处是，指定 unknown 类型的变量的具体类型
  ```typescript
  const value: unknown = "Hello World";
  const s1: string = value; // 报错
  const s2: string = value as string; // 正确
  ```

# namespace 命名空间
- namespace 用来建立一个容器，内部的所有变量和函数，都必须在这个容器里面使用。
  ```typescript
    namespace Utils {
      function isString(value: any) {
        return typeof value === "string";
      }

      // 正确
      isString("yes");

      export function log(msg: string) {
        sole.log(msg);
      }
    }
    Utils.isString("no"); // 报错
    Utils.log("hello"); // 正确
  ```
- namespace 内部还可以使用import命令输入外部成员，相当于为外部成员起别名。当外部成员的名字比较长时，别名能够简化代码
  ```typescript
    namespace Utils {
      export function isString(value: any) {
        return typeof value === "string";
      }
    }

    namespace App {
      import isString = Utils.isString;

      isString("yes");
      // 等同于
      Utils.isString("yes");
    }
  ```
- import命令也可以在 namespace 外部，指定别名
  ```typescript
  namespace Shapes {
    export namespace Polygons {
      export class Triangle {}
      export class Square {}
    }
  }

  import polygons = Shapes.Polygons;

  // 等同于 new Shapes.Polygons.Square()
  let sq = new polygons.Square();
  ```
- namespace 本身也可以使用export命令输出，供其他文件使用
  ```typescript
  // shapes.ts
  export namespace Shapes {
    export class Triangle {
      // ...
    }
    export class Square {
      // ...
    }
  }

  // 写法一
  import { Shapes } from "./shapes";
  let t = new Shapes.Triangle();
  // 写法二
  import * as shapes from "./shapes";
  let t = new shapes.Shapes.Triangle();
  ```
- 多个同名的 namespace 会自动合并，这一点跟 interface 一样

# declare
- declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。
- 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用declare关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。
- 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构
- 所有 declare 语句都不会出现在编译后的文件里面
- declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值
  ```typescript
  // 报错
  declare let x: number = 1;

  // 正确
  declare let x1: number;
  x1 = 1;
  ```
- 单独写函数的类型声明就会报错
  ```typescript
  // 报错
  function sayHello(name: string): void;
  function sayHello(name) {
    return "你好，" + name;
  }
  ```
- declare global
  - 要为 JavaScript 引擎的原生对象添加属性和方法，可以使用declare global {}语法
    ```typescript
    export {};
    declare global {
      interface String {
        toSmallString(): string;
      }
    }
    String.prototype.toSmallString = (): string => {
      // 具体实现
      return "";
    };
    ```
  - 只能扩充现有对象的类型描述，不能增加新的顶层类型
    ```typescript
    export {};
    declare global {
      interface window {
        myAppConfig: object;
      }
    }
    const config = window.myAppConfig;
    ```

- declare 关键字可以描述以下类型。
  - 变量（const、let、var 命令声明）
  - type 或者 interface 命令声明的类型
  - class
  - enum
  - 函数（function）
  - 模块（module）
  - 命名空间（namespace）

# 运算符
## keyof 
  - 单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型
    ```typescript
    type MyObj = {
      foo: number;
      bar: string;
    };
    type Keys = keyof MyObj; // 'foo'|'bar'
    ```
## in
  - 运算符用来确定对象是否包含某个属性名
    ```typescript

    const obj = { a: 123 };
    if ("a" in obj) console.log("found a");

    // 用来取出（遍历）联合类型的每一个成员类型
    type U = "a" | "b" | "c";
    type Foo = {
      [Prop in U]: number;
    };
    // 等同于
    type Foo = {
      a: number;
      b: number;
      c: number;
    };
    ```
## 方括号运算符 []
  - 用于取出对象的键值类型, 比如T[K]会返回对象T的属性K的类型
    ```typescript
    type Person = {
      age: number;
      name: string;
      alive: boolean;
    };

    // Age 的类型是 number
    type Age = Person["age"];
    ```
  - 方括号的参数如果是联合类型，那么返回的也是联合类型。
    ```typescript
    type Person = {
      age: number;
      name: string;
      alive: boolean;
    };

    // number|string
    type T = Person["age" | "name"];

    // number|string|boolean
    type A = Person[keyof Person];
    ```
  - 访问不存在的属性，会报错
## extends...?: 条件运算符
  - 可以根据当前类型是否符合某种条件，返回不同的类型
    ```typescript
    // 基本用法
    T extends U ? X : Y

    // true
    type T = 1 extends number ? true : false;
    ```
## is 运算符
  - 函数返回布尔值的时候，可以使用is运算符，限定返回值与参数之间的关系
    ```typescript
    function isFish(pet: Fish | Bird): pet is Fish {
      return (pet as Fish).swim !== undefined;
    }
    ```
****
# 模板字符串
- 概念
  - 允许使用模板字符串，构建类型
  - 最大的特点就是 就是内部可以引用其他类型
  ```ts
  type World = "world";

  // "hello world"
  type Greeting = `hello ${World}`;
  ```
  - 模板字符串可以引用的类型一共 6 种，分别是 string、number、bigint、boolean、null、undefined。引用这 6 种以外的类型会报错
  ```ts
  type Num = 123;
  type Obj = { n: 123 };

  type T1 = `${Num} received`; // 正确
  type T2 = `${Obj} received`; // 报错
  ```
  - 如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型
  ```ts
  type T = "A" | "B";

  // "A_id"|"B_id"
  type U = `${T}_id`;


  type T1 = "A" | "B";
  type U1 = "1" | "2";
  // 'A1'|'A2'|'B1'|'B2'
  type V1 = `${T1}${U1}`;
  ```