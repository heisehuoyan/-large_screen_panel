import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import './assets/styles/index.scss' // global css
import utils from '@/libs/index'
import App from './App'
import router from './router'
import store from './store'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import echarts from 'echarts'
import '@/icons' // icon
import request from '@/sevice/index'
import 'animate.css/animate.min.css'
import $ from 'jquery'
window.$ = $
Vue.use(ElementUI, {
    locale
})
Vue.use(VueAwesomeSwiper)
Vue.prototype.$utils = utils
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.prototype.$get = request.httpGet
Vue.prototype.$post = request.httpPost
Vue.prototype.content = (item) => {
    // 目前在正则表达式匹配里只可用$&或$1代替被匹配到的内容
    item = item.replace(/([+\-]?[0-9]+(\.[0-9]+)?)/g, '<span style="color:#298DD7;">$1</span>')
    return item
}
router.beforeEach((to, from, next) => {
   if(!sessionStorage.Token||sessionStorage.Token ==='undefined' || sessionStorage.Token ===''){
    sessionStorage.Token = to.query.token
    }else{
        document.cookie= sessionStorage.Token
    }
    if (sessionStorage.Token) {
        if (to.path === '/') {
            return false
        } else {
            next()
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
