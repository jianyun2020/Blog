---
Date: 2022-02-23 16:49:08
LastEditTime: 2022-02-23 17:22:50
image: ./Images/default.jpg
title: JS面试  
type: JavaScript|面试
---

# 数据类型

## 基本的数据类型介绍，及值类型和引用类型的理解

JS中的8种基础类型：
- 7种原始类型：`Undefined`, `Null`, `Boolean`, `Number`, `String`, `Symbol`, `BigInt`
- 1中引用类型：`Object`

其中`Symbol`和`BigInt`是ES6新增的数据类型：
- Symbol代表独一无二的值，最大的用法是用来定义对象的唯一属性名
- BigInt可以表示任意大小的整数

**值类型的复制变动过程如下：**

```js
let a = 100;
let b = a;
a = 200;

console.log(b); // 200
```

![](Images/2022-02-23-17-07-39.png)

值类型是直接存储在**栈（stack）**中的简单数据段，占据空间小、大小固定，属于被频繁使用的数据，所以放入栈中存储。

**引用类型的赋值变动过程如下：**

```js
let a = {
  age: 20
}
let b = a;
b.age = 300;

console.log(a.age); // 30
```

![](Images/2022-02-23-17-10-38.png)

引用类型存储在**堆（heap）**中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能。

## 数据类型的判断

- typeof: 能判断所有**值类型**， **函数**。不可对**null、对象、数组**进行精确判断，因为都返回`object`

```js
console.log(typeof undefined); // undefined
console.log(typeof 2); // number;
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.loG(typeof 1111n); // bigint
console.log(typeof function() {}); // function

// 不能判断
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```

- 