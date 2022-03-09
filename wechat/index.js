const express = require("express");
const app = express();
const path = require("path");
const weChat = require(path.resolve(__dirname, "./router/weChat"));
const xmlparser = require("express-xml-bodyparser"); // 解析 xml
app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

app.use(weChat);

app.listen(3000, () => {
  console.log("Server start");
});
