// 回复文本消息
exports.textMessage = function (message) {
  var createTime = new Date().getTime();
  return `${createTime}`;
};
// 回复图片消息
exports.imageMessage = function (message) {
  var createTime = new Date().getTime();
  return `${createTime}`;
};
// 回复语音消息
exports.voiceMessage = function (message) {
  var createTime = new Date().getTime();
  return `${createTime}`;
};
// 回复视频消息
exports.videoMessage = function (message) {
  var createTime = new Date().getTime();
  return `${createTime}`;
};
// 回复图文消息
exports.articleMessage = function (message) {
  var createTime = new Date().getTime();
  return `${createTime}${message.articles.length}${message.articles
    .map((article) => ``)
    .join("")}`;
};
