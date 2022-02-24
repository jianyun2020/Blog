---
Date: 2022-02-23 16:49:08
LastEditTime: 2022-02-24 20:27:17
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

- instanceof：能判断**对象**类型，不能判断基本数据类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。

```js
class People {}
class Student extends People {}

const s1 = new Student();

console.log(s1 instanceof People); // true
console.log(s1 instanceof Student); // true
```

顺着**原型链**找，如果能找到对应的`xxx.prototype`即为`true`。比如这里的`s1`作为实例，顺着原型链能找到`Student.prototype`及`People.prototype`。

- Object.prototype.toString.call()：所有原始数据类型都能判断，还有**Error对象，Date对象**等。

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```

**在面试中有一个经常被问的问题就是：如何判断变量是否为数组？**

```js
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```

# 手写深拷贝

## 深拷贝和浅拷贝的定义

- 浅拷贝

创建一个新对象，这个对象有着原始对象属性的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

- 深拷贝

将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

## 乞丐版

在不使用第三方库的情况下，我们想要深拷贝一个对象，用的最多的就是下面这个方法。

```js
JSON.parse(JSON.stringify());
```

这种写法可以应对大部分的应用场景（如数组，对象），但是它也有缺陷，比如拷贝其它应用类型、拷贝函数、循环引用等情况。

## 基础版本

**浅拷贝版本**：

```js
function shallowCopy(target) {
  let copyTarget = {};
  for (const key in target) {
    copyTarget[key] = target[key];
  }

  return copyTarget;
};
```

创建一个新的对象，遍历需要拷贝的对象，将需要拷贝的对象的属性依次添加到新对象上，最后返回新的对象。

如果是深拷贝的话，考虑到我们要拷贝的对象是不知道有多少深度的，可以用递归来解决问题。稍微改写上面的代码：
- 如果是原始类型，无需继续拷贝，直接返回
- 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆的对象的属性执行**深拷贝后**依次添加到新对象上。

很容易理解，如果有更深层次的对象可以继续递归直到属性为原始类型，这样我们就完成了一个最简单的深拷贝：

```js
function deepCopy(target) {
  if (typeof target === "object") {
    let copyTarget = {};
    for (const key in target) {
      copyTarget[key] = deepCopy(target[key]);
    }

    return copyTarget;
  } else {
    return target;
  }
}
```

**测试用例：**

```js
const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
};

```

**测试结果：**

![](Images/2022-02-24-16-58-48.png)

*这是最基础版本的深拷贝，其中还有很多缺陷，比如没有考虑数组的情况*

## 考虑数组

```js
function deepCopy(target) {
  if (typeof target === "object") {
    let copyTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      copyTarget[key] = deepCopy(target[key]);
    }

    return copyTarget;
  } else {
    return target;
  }
};
```

**测试用例：**

```js
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};

```

**测试结果：**

![](Images/2022-02-24-17-24-45.png)


## 循环引用

我们执行下面这样一个测试用例：

```js
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
```

可以看到下面的结果：

![](Images/2022-02-24-17-26-07.png)

很明显，因为递归进入死循环导致栈内存溢出了。

原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况：

解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

这个存储空间，需要可以存储`key-value`形式的数据，且`key`可以是一个引用类型，我们可以选择`Map`这种数据结构：

- 检查`map`中有无拷贝过的对象
- 有-直接返回
- 没有-将当前对象作为`key`，拷贝对象作为`value`进行存储
- 继续拷贝

```js
function deepCopy(target, map = new Map()) {
  if (typeof target === "object") {
    let copyTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, copyTarget);
    for (const key in target) {
      copyTarget[key] = deepCopy(target[key], map);
    }
    return copyTarget;
  } else {
    return target;
  }
};
```

再次执行上面的测试用例：

![](Images/2022-02-24-18-01-05.png)

`target`属性变为了一个`Circular`类型，即循环引用的意思。

接下来，我们可以使用，`WeakMap`提代`Map`来使代码达到画龙点睛的作用。

> `WeakMap` 对象是一组键/值对的集合，其中的键是**弱引用**的。其**键必须是对象**，而值可以是任意的。在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

## 终版

```js
function deepCopy(target, map = new WeakMap()) {
    if (typeof obj === "object") {
      let copyTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, copyTarget);
      for (const key in target) {
        if (target.hasOwnProperty(key)) { // 保证key不是原型属性
          copyTarget[key] = deepCopy(target[key], map);
        }
      }

      return copyTarget;
    } else {
      return target;
    }
};
```

# 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等？

## JavaScript是怎么存储数字的————IEEE-754标准

JavaScript的数字是IEEE-754标准存储的双精度浮点数类型。双精度浮点数总共有64为（bit），第一位用于表示符号，接着十一位用于表示阶码，剩余的五十二位用于表示尾数。

![](Images/2022-02-24-20-21-18.png)

符号位很好理解，0表示正数，1表示负数。阶码和尾数表示什么呢？IEEE-754标准中，一个浮点数将被使用**二进制科学计数法**的方式存储。看下面的公式：

![](Images/2022-02-24-20-22-49.png)

**阶码（exponent）**

表示的是二的多少次方，范围是-1023~1024

阶码是使用**移码**表示法存储的，偏移值为+1023，也就是在阶码运算时需要在二进制运算的基础上，手动减去1023才是真正表达的值。

```js

```




# 参考链接

[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

[硬核基础二进制篇（一）0.1 + 0.2 != 0.3 和 IEEE-754 标准](https://juejin.cn/post/6940405970954616839)