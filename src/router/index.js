import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [{
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
},
{
    path: '/profession',
    component: () => import('@/views/professional/index'),
    hidden: true
},
{
    path: '/warning',
    component: () => import('@/views/earlyWarning/index'),
    hidden: true
},
{
    path: '/hard',
    component: () => import('@/views/hardware/index'),
    hidden: true
}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
