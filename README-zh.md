# 监控面板

> 监控面板。
访问方法：
https://kn-admin.cardniu.com/tech-ops/login?redirect=（http://172.22.213.37:9528/#/warnning：urlencode转换一下）
括号里为正式服/测试服/本地环境的地址经过urlencode转换



需要登入权限
[线上地址](https://kn-admin.cardniu.com/tech-ops/login?redirect=https%3a%2f%2fkn-admin.cardniu.com%2fyx-operational-system%2f%23%2fwarning
)
预警：warning
业务：profession
硬件：hard


## Build Setup

```bash
# Clone project
git clone git@git.sui.work:finance-jlc/feidee-operational-system.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build:test

# Build for production and view the bundle analyzer report
npm run build:prod

