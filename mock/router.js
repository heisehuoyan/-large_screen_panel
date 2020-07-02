// routes.js
// 根据db.js中的key值，自动生成的路由便是/[key]，在route.js中的声明只是为了重定向
module.exports = {
  "/tech-ops/dashboard/warning/classify/stat": "/professionWarn",
  "/tech-ops/dashboard/warning/summary/stat": "/realTimeTrend",
  "/tech-ops/dashboard/warning/type/stat": "/typeDistribution",
  "/tech-ops/dashboard/warning/topRank?maxId=&append=true": "/emergencyHook",
  "/tech-ops/dashboard/warning/all?maxId=&append=true": "/totalOverview",
  "/tech-ops/dashboard/warning/metric?maxId=&append=true": "/directiveFlux"
};
