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
  }),
  typeDistribution: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      data: [
        {
          departName: "贪吃蛇",
          typeStats: [
            { count: 1, name: "数据库" },
            { count: 1, name: "主机" },
            { count: 1, name: "数据库" },
            { count: 1, name: "主机" }
          ]
        },
        {
          departName: "贪吃蛇",
          typeStats: [{ count: 1, name: "主机" }, { count: 1, name: "主机" }]
        },
        {
          departName: "基础平台",
          typeStats: [{ count: 1, name: "业务" }, { count: 1, name: "数据库" }]
        },
        {
          departName: "春雷",
          typeStats: [{ count: 1, name: "指标" }, { count: 1, name: "主机" }]
        }
      ]
    }
  }),
  emergencyHook: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      data: {
        records: [
          {
            businessName: "shshshsh",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "uuuu哦哦美女",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "shshshsh",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          }
        ]
      }
    }
  }),
  directiveFlux: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      data: {
        records: [
          {
            businessName: "shshshsh",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "uuuu哦哦美女",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "shshshsh",
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          }
        ]
      }
    }
  }),
  totalOverview: Mock.mock({
    message: "成功",
    code: 1,
    data: {
      succ: true,
      data: {
        records: [
          {
            businessName: "lll",
            type: "kkk",
            level: 1,
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "uuuu哦哦美女",
            type: "kkk",
            level: 1,
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          },
          {
            businessName: "shshshsh",
            type: "kkk",
            level: 1,
            content: "s姐姐斤斤计较",
            time: "2020-3-3"
          }
        ]
      }
    }
  })
};
