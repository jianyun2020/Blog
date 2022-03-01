---
Date: 2022-03-01 09:28:57
LastEditTime: 2022-03-01 09:34:16
image: ./Images/default.jpg
title: Web 存储
type: Storage|面试
---

# cookie

1. 本身用于浏览器和server通讯
2. 被“借用”到本地存储
3. 可用`document.cookie = ""`来修改

**缺点：**

- 存储大小限制为4KB
- http请求时需要发送到服务器端，增加请求数量
- 只能用`document.cookie = ""`来修改

# localStorage 和 sessionStorage

1. HTML5专门为存储来设计的，最大可存储5M
2. API简单易用`setItem()、getItem()`
3. 不会随着http请求被发送到服务器端

**区别：**

- `localStorage`数据会永久存储，除非代码删除或手动删除
- `sessionStorage`数据只存在于当前会话，浏览器关闭则清空
- 一般用`localStorage`会多一些