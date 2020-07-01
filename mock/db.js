// db.js
var Mock = require("mockjs");

// 通过使用mock.js，来避免手写数据
module.exports = {
  getComment: Mock.mock({
    error: 0,
    message: "success",
    "result|40": [
      {
        author: "@name",
        comment: "@cparagraph",
        date: "@datetime"
      }
    ]
  })
};
