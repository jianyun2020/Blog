const express = require("express");
const router = express.Router(); // 配置路由模块
const validateToken = require("../util/validateToken");

const template = require("../util/template");
// const { getTonken } = require("../util/tonkenConfig");
// 项目启动后自动执行获取tonken的方法
// setTonken().then(() => {
//   // tonken 获取成功后开始定时刷新tonken操作
//   timingSetTonken();
// });

// get请求验证tonken有效性
router.get("/", (req, res) => {
  // validateToken(req).then((t) => {
  //   res.send(t);
  // });

  res.send("index")
});

// post请求处理微信发送过来的消息
router.post("/", (req, res) => {
  let xml = req.body.xml;
  let msgtype = xml.msgtype[0];
  switch (msgtype) {
    case "text": // 封装要回复的消息参数
      let message = {
        FromUserName: xml.fromusername[0],
        ToUserName: xml.tousername[0],
        reply: "你好呀，我是通过代码回复你的",
      };
      res.send(template.textMessage(message));
      break;

    default:
      res.send(""); // 不是文本消息是默认响应一个空
      break;
  }
});

router.post("/api/getconfig", (req, res) => {
  console.log("我被请求了")
  const result = JSON.stringify({
    "name": "Bob",
    "age": 34
  })
  res.json(result)
})


// 导出 router
module.exports = router;
