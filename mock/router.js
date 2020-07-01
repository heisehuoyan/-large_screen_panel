// routes.js
// 根据db.js中的key值，自动生成的路由便是/[key]，在route.js中的声明只是为了重定向
module.exports = {
  "/tech-ops/dashboard/warning/classify/stat": "/professionWarn",
  "/tech-ops/dashboard/warning/summary/stat": "/realTimeTrend"
};
