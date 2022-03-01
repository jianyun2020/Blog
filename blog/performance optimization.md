---
Date: 2022-03-01 11:17:13
LastEditTime: 2022-03-01 13:38:07
image: ./Images/default.jpg
title: 性能优化
type: 性能优化|面试
---

# 代码层面

- 防抖和节流（resize， scroll， input）
- 减少回流（重排）和重绘
- 事件委托
- 减少DOM操作
- 按需加载，比如`React`中使用`React.lazy`和`React.Suspense`，通常需要与webpack中的`splitChunks`配合

# 构建方面

- 压缩代码文件，在webpack中使用`terser-webpack-plugin`压缩JavaScript代码；使用`css-minimizer-webpack-plugin`压缩CSS代码；使用`html-webpack-plugin`压缩html代码。
- 开启gzip压缩，webpack中使用`compression-webpack-plugin`， node作为服务器也要开启，使用`compression`
- 常用的第三方库使用CDN服务，在webpack中要配置externals，将比如React、Vue这种包不大到最终生成的文件中。而是采用CDN服务

# 其它

- 使用 http2。因为解析速度快，头部压缩，多路复用，服务器推送静态资源。
- 使用服务端渲染。
- 图片压缩。
- 使用 http 缓存，比如服务端的响应中添加 Cache-Control / Expires 。