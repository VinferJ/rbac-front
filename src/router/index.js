import Router from 'vue-router'
import Vue from 'vue'


Vue.use(Router)

/*
* 公共路由表
* 默认的路由表中，只设置公共的路由
* */
const publicRouterTable = [
    {
        path: '/',
        redirect: '/rbac/home',
        name: 'default',
        hidden: true
    },
    {
        path: '/rbac/login',
        name: 'login',
        meta: {title:'用户登录'},
        component:() => import('@/views/public/login/src/main'),
        hidden: true
    },
    {
        path: '/rbac/register',
        name: 'register',
        meta:{title:'用户注册'},
        component:() => import('@/views/public/register/src/main'),
        hidden: true
    },
    {
        path: '*',
        name: 'error',
        redirect: '/error/404',
        hidden: true
    },
    {
        path: '/error/404',
        name: '404',
        meta: {title: '404 Not Found'},
        component: () => import('@/views/error/4xx/404'),
        hidden: true
        /*children: [
            {
                path: '404', meta: {title: '404 Not Found'},
                component: () => import('@/views/error/4xx/404')
            }
        ]*/
    },
    {
        path: '/p1',
        name: 'page1',
        meta: {title: '页面1', icon: 'el-icon-menu'},
        component: () => import('@/pages/Page1'),
        children: [
            {
                path: 'p6',
                name: 'page6',
                meta: {title: 'page6'},
                component: () => import('@/pages/Page6')
            },
            {
                path: 'p4',
                name: 'page4',
                meta: {title: 'page4'},
                component: () => import('@/pages/Page4')
            },
        ]
    },
    {
        path: '/p2',
        name: 'page2',
        meta: {title: '页面2', icon: 'el-icon-menu'},
        component: () => import('@/pages/Page2'),
        children: [
            {
                path: 'p18',
                name: 'page18',
                meta: {title: 'page18'},
                component: () => import('@/pages/Page18')
            }
        ]
    },
]

/*
* 保存当前路由表
* */
let currentRouterTable = publicRouterTable

export function setCurrentRouterTable(routerMap){
    routerMap.forEach((router) => {
        currentRouterTable.push(router)
    })
}

export function getCurrentRouterTable(){
    return currentRouterTable
}

export function getPublicRouterTable(){
    return publicRouterTable
}


export default new Router({
    routes:publicRouterTable
})