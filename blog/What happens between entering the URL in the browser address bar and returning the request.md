---
Date: 2022-02-12 05:58:15
LastEditTime: 2022-02-12 20:35:06
image: ./Images/default.jpg
type: 面试
---

# 第一部分 输入网址并解析
## URL的组成

URL（Uniform Resource Locator），统一资源定位符，用于定位互联网上的资源，俗称网址。

![](Images/2022-02-12-06-26-33.png)

```
scheme：协议，常见的有http、https、ftp、file
host：主机（域名），是资源所在的网站名或服务器的名字
port：端口，同一个域名下面可能同时包括多个网站，它们之间通过端口（port）区分，默认端口为80
path：定义服务器上的路径，如果省略，则访问网站的根目录（若后面未跟具体的文件名，通常返回该目录下的index.html）
filename：定义文档/资源的名称
query：查询参数（parameter）是提供给服务器的额外信息。参数跟在路径后面，用?分隔，以键值对（key=value）形式，参数可以有多组，用&连接
ancher：锚点（anchor）是网页内部的定位点，使用#加上锚点名称，放在网址的最后
```

## 解析URL

输入URL后，浏览器会解析出协议、主机、端口、路径等信息，并构造一个HTTP请求。

1. 浏览器发送请求前，根据请求头的`expires`和`cache-control`判断是否命中（包括是否过期）强缓存策略，如果命中，直接从缓存获取资源，并不会发送请求。如果没有命中，则进入下一步。
2. 没有命中强缓存规则，浏览器会发送请求，根据请求头的`If-Modified-Since`和`If-None-Match`判断是否命中协商缓存，如果命中，直接从缓存获取资源。如果没有命中，则进入下一步。
3. 如果前两步都没有命中，则直接从服务端获取资源。

## HSTS（HTTP Strict Transport Security）

由于安全隐患，会使用HSTS强制客户端使用HTTPS访问页面。

> 原理：
> - 在服务器响应头中添加`Strict-Transport-Security`，可以设置`max-age`
> - 用户访问时，服务器种下这个头
> - 下次如果使用http访问，只要max-age未过期，客户端会进行内部跳转，可以看到307 Redirect Internel的响应码
> 变成https访问源服务器
> 
> 详见：[你所不知道的HSTS](https://www.barretlee.com/blog/2015/10/22/hsts-intro/)

当你的网站均采用HTTPS，并符合它的安全规范，就可以申请加入HSTS列表，之后用户不加HTTPS协议再去访问你的网站时，浏览器都会定向到HTTPS。无论匹配到没有，都要开始DNS查询工作了。

## 浏览器缓存

### 强缓存

强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。强缓存又分为两种`Expires`和`Cache-Control`










# 参考链接：

1. [从URL输入到页面展现到底发生什么？](https://juejin.cn/post/6844903784229896199)
2. [从输入URL开始建立前端知识体系](https://juejin.cn/post/6935232082482298911)
3. [阮一峰HTML语言教程](https://www.bookstack.cn/read/html-tutorial/spilt.2.docs-url.md#bqbmhb)