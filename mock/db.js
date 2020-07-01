// db.js
var Mock = require("mockjs");

// 通过使用mock.js，来避免手写数据
module.exports = {
  professionWarn: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      data: [
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" },
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" },
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" },
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" },
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" },
        { count: 1, departName: "贪吃蛇" },
        { count: 5, departName: "基础平台" }
      ]
    }
  }),
  realTimeTrend: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      charts: {
        total: 27,
        rate: 32,
        solved: 3,
        unsolved: 0,
        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        seriesData: [
          {
            name: "邮件营销",
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              888,
              444,
              2222,
              449494,
              200
            ]
          },
          {
            name: "联盟广告",
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              888,
              444,
              2222,
              449494,
              200
            ]
          }
        ]
      }
    }
  })
};
