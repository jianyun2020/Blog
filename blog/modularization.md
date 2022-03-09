---
Date: 2022-03-03 14:55:29
LastEditTime: 2022-03-04 11:29:23
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

## 模块的加载机制

**CommonJS模块的加载机制是，输入的是被输出的值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。**这点与ES6模块化有重大差异，例如：

```js
// lib.js
let counter = 3;
function incCounter() {
  counter++;
}

module.exports = {
  counter: counter,
  incCounter: incCounter,
}
```

上面代码输出内部变量`counter`和改写这个变量的内部方法`incCounter`

```js
// main.js
const counter = require("./lib").counter;
const incCounter = require("./lib").incCounter;

console.log(counter); // 3
incCounter();
console.log(counter); // 3
```

上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了，这是因为**counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。**

## 服务器端实现

1. 下载安装node.js
2. 创建项目结构

**注意：用`npm init`自动生成package.json时，package name（包名）不能有中文和大写**

```js
|-modules
  |-module1.js
  |-module2.js
  |-module3.js
|-app.js
|-package.json
  {
    "name": "commonJS-node",
    "version": "1.0.0"
  }
```
 
3. 下载第三方模块

`npm install uniq --save // 用于数组去重`

4. 定义模块代码

```js
// module1.js
module.exports = {
  msg: 'module1',
  foo() {
    console.log(this.msg)
  }
}
```

```js
// module2.js
module.exports = function() {
  console.log("module2")
}
```

```js
// module3.js
exports.foo = function() {
  console.log("foo() module")
}
exports.arr = [1, 2, 3, 3, 2]
```

```js
// app.js文件
// 引入第三方库，应该放置在最前面
const uniq = require('uniq');
const module1 = require('./modules/module1');
const module2 = require('./modules/module2');
const module3 = require('./modules/module3');

module1.foo() //module1
module2() //module2
module3.foo() //foo() module3
console.log(uniq(module3.arr)) //[ 1, 2, 3 ]
```

5. 通过node运行app.js

命令行输入`node app.js`，运行JS文件

6. 浏览器端实现（借助Browserify）

- 创建项目结构

```js
|-js
  |-dist //打包生成文件的目录
  |-src //源码所在的目录
    |-module1.js
    |-module2.js
    |-module3.js
    |-app.js //应用主源文件
|-index.html //运行于浏览器上
|-package.json
  {
    "name": "browserify-test",
    "version": "1.0.0"
  }

```

- 下载browserify

```js
// 全局
npm install -g browserify

// 局部
npm install browserify --save-dev
```

- 定义模块代码（同服务端）

*注意：index.html文件要运行在浏览器上，需要借助browserify将app.js文件打包编译，如果直接在index.html引入app.js就会报错！*

- 打包处理js

根目录下运行`browserify js/src/app.js -o js/dist/bundle.js`

- 页面使用引入

在index.html文件中引入`<script type="text/javascript" src="js/dist/bundle.js"></script>

# AMD

CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是**浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范**，此外AMD规范比CommonJS规范在浏览器端实现要早。

## AMD规范基本语法

- 定义暴露模块

```js
// 定义没有依赖的模块
define(function() {
  return module
})

// 定义有依赖的模块
define(['module1', 'module2'], function(m1, m2) {
  return module
})

```

- 引入使用模块

```js
require(['module1', 'module'], function(m1, m2) {
  // 使用m1/m2
})
```

## 未使用AMD规范与使用require.js

通过比较两者的实现方法，来说明使用AMD规范的好处

- 未使用AMD规范

```js
// dataService.js文件
(function (window) {
  let msg = 'www.baidu.com';
  function getMsg() {
    return msg.toUpperCase();
  }

  window.dataService = { getMsg }
})(window)


// alerter.js文件
(function (window, dataService) {
  let name = 'Tom';
  function showMsg() {
    alert(dataService.getMsg() + ',' + name);
  }

  window.alerter = { showMsg }
})(window, dataService)


// main.js文件
(function (alerter) {
  alerter.showMsg()
})(alerter)

// index.html文件
<div><h1>Modular Demo 1: 未使用AMD(require.js)</h1></div>
<script type="text/javascript" src="js/modules/dataService.js"></script>
<script type="text/javascript" src="js/modules/alerter.js"></script>
<script type="text/javascript" src="js/main.js"></script>

```

这种方式缺点很明显：首先会发送多个请求，其次**引入的js文件顺序不能搞错，否则会报错！**

## 使用require.js

RequireJS是一个工具库，主要用于客户端的模块管理。它的模块管理遵守AMD规范，RequireJS的基本思想是，通过`define`方法，将代码定义为模块；通过`require`方法，实现代码的模块加载。 接下来介绍AMD规范在浏览器实现的步骤：

1. 下载require.js, 并引入

官网: http://www.requirejs.cn/
github : https://github.com/requirejs/requirejs

然后将require.js导入项目: js/libs/require.js

2. 创建项目结构

```js
|-js
  |-libs
    |-require.js
  |-modules
    |-alerter.js
    |-dataService.js
  |-main.js
|-index.html

```

3. 定义require.js的模块代码

```js
// dataService.js
// 定义没有依赖的模块
define(function() {
  let msg = 'www.example.com';
  function getMsg() {
    return msg.toUpperCase();
  }
  return { getMsg } // 暴露模块
})

// alerter.js
// 定义有依赖的模块
define(['dataServics'], function (dataService) {
  let name = 'Tom';
  function showMsg() {
    alert(dataService.getMsg() + ',' + name)
  }

  return { showMsg } // 暴露模块
})

// main.js
(function() {
  require.config({
    baseUrl: 'js/', // 基本路径，出发点在根目录下
    paths: {
      // 映射:模块标识名：路径
      alerter: './modules/alerter', // 此处不能写成alerter.js，会报错
      dataService: './modules/dataService'
    }
  })
  require(['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()


// index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Modular Demo</title>
  </head>
  <body>
    <!-- 引入require.js并指定js主文件的入口 -->
    <script data-main="js/main" src="js/libs/require.js"></script>
  </body>
</html>
```

4. 页面引入require.js模块

在index.html引入`<script data-main="js/main" src="js/libs/require.js"></script>`

此外在项目中如何引入第三方库？只需在上面代码的基础稍作修改：

```js
// alerter.js文件
define(['dataService', 'jquery'], function(dataService, $) {
  let name = 'Tom'
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }
  $('body').css('background', 'green')
  // 暴露模块
  return { showMsg }
})

// main.js文件
(function() {
  require.config({
    baseUrl: 'js/', //基本路径 出发点在根目录下
    paths: {
      //自定义模块
      alerter: './modules/alerter', //此处不能写成alerter.js,会报错
      dataService: './modules/dataService',
      // 第三方库模块
      jquery: './libs/jquery-1.10.1' //注意：写成jQuery会报错
    }
  })
  require(['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()

```

上例是在alerter.js文件中引入jQuery第三方库，main.js文件也要有相应的路径配置。
小结：通过两者的比较，可以得出AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。

# CMD

CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。

## CMD规范基本语法

- 定义暴露模块

```js
// 定义没有依赖的模块
define(function(require, exports, module) {
  exports.xxx = value;
  module.exports = value;
})

// 定义有依赖的模块
define(function(require, exports, module) {
  // 引入依赖模块（同步）
  const module2 = require('./module2');
  // 引入依赖模块（异步）
  require.async('./module3', function(m3) {

  })

  // 暴露模块
  exports.xxx = value
})
```

- 引入使用模块

```js
define(function (require) {
  const m1 = require('./module1');
  const m4 = require('./module4');
  m1.show();
  m4.show();
})
```

## sea.js简单使用教程

1. 下载sea.js, 并引入

官网: seajs.org/
github : github.com/seajs/seajs
然后将sea.js导入项目: js/libs/sea.js

2. 创建项目结构

```js
|-js
  |-libs
    |-sea.js
  |-modules
    |-module1.js
    |-module2.js
    |-module3.js
    |-module4.js
    |-main.js
|-index.html
```

3. 定义sea.js的模块代码

```js
// module1.js
define(function(require, exports, module) {
  //内部变量数据
  var data = 'atguigu.com'
  //内部函数
  function show() {
    console.log('module1 show() ' + data)
  }
  //向外暴露
  exports.show = show
})


// module2.js
define(function(require, exports, module) {
  module.exports = {
    msg: 'module 2'
  }
})

// module3.js
define(function(require, exports, module) {
  const API_KEY = 'aaa'
  exports.API_KEY = API_KEY
})


// module4.js文件
define(function (require, exports, module) {
  //引入依赖模块(同步)
  var module2 = require('./module2')
  function show() {
    console.log('module4 show() ' + module2.msg)
  }
  exports.show = show
  //引入依赖模块(异步)
  require.async('./module3', function (m3) {
    console.log('异步引入依赖模块3  ' + m3.API_KEY)
  })
})

// main.js文件
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})

```

4. 在index.html中引入

```js
<script type="text/javascript" src="js/libs/sea.js"></script>
<script type="text/javascript">
  seajs.use('./js/modules/main')
</script>

```







# 参考链接

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768)