/**
 * 公用配置文件
 */
const config = {
  mode: "test",
  hosts: {
    api: {
      dev: `http://${window.location.hostname}:5052`, // 开发环境域名
      prod: "https://kn-admin.cardniu.com" // 上产环境域名
    }
  }
};

if (process.env.NODE_ENV === "production") {
  config.mode = "prod";
} else {
  config.mode = "dev";
}

export default config;
