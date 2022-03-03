---
Date: 2022-03-03 14:55:29
LastEditTime: 2022-03-03 15:11:08
image: ./Images/default.jpg
title: 前端模块化
type: 模块化|面试
---

# 模块化的好处

- 避免命名冲突（减少命名空间污染）
- 更好的分离，按需加载
- 更高复用性
- 高可维护性

# CommonJS

## 概述

Node应用由模块组成，采用CommonJS模块规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其它文件不可见。**在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理**

## 特点

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果，要想让模块再次运行，必须清理缓存
- 模块加载的顺序，按照其在代码中出现的顺序

## 基本语法

- 暴露模块：`module.exports = value` 或 `exports.xxx = value`
- 引入模块：`require(xxx)`，如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

**CommonJS暴露的模块到底是什么？**

CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。**加载某个模块，其实是加载该模块的`module.exports`属性**

```js
// example.js
const x = 5;
const addX = function (value) {
  return value + x;
}

module.exports.x = x;
module.exports.addX = addX;
```

上面代码通过`module.exports`输出变量`x`和函数`addX`

```js
const example = require('./example.js'); // 如果参数字符串以"./"开头，表示加载的是一个位于相对路径的文件
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

`require`命令用于加载模块文件。**require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错**

