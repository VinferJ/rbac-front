import Router from 'vue-router'
import Vue from 'vue'


Vue.use(Router)

/*
* 公共路由表
* 默认的路由表中，只设置公共的路由
*
* 所有路由都必须写完整的绝对路径！！！
* */
const publicRouterTable = [
    {
        path: '/',
        redirect: '/rbac',
        name: 'default-jump',
        hidden: true
    },
    {
        path: '/rbac/login',
        name: 'login',
        meta: {title:'用户登录'},
        component:() => import('@/views/public/login'),
        hidden: true
    },
    {
        path: '/rbac/register',
        name: 'register',
        meta:{title:'用户注册'},
        component:() => import('@/views/public/register'),
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
        path: '/rbac',
        name: 'rbac',
        levelOneMenu:true,
        redirect: '/rbac/home',
        meta: {title: 'rbac', icon: 'el-icon-house'},
        component: () => import('@/layout'),
        children: [
            {
                path: '/rbac/home',
                name: 'home',
                meta: {title:'主页', icon: 'el-icon-house'},
                component: () => import('@/views/user/home')
            },
        ]
    },
    {
        path: '/p1',
        name: 'page1',
        meta: {title: '页面1', icon: 'el-icon-menu'},
        component: () => import('@/layout'),
        children: [
            {
                path: '/p1/p4',
                name: 'page4',
                meta: {title: '页面4', icon: 'el-icon-menu'},
                component: () => import('@/pages/Page4'),
                children:[
                    {
                        path: '/p1/p4/p6',
                        name: 'page6',
                        meta: {title: 'page6', icon: 'el-icon-menu'},
                        component: () => import('@/pages/Page6'),
                        children:[
                            {
                                path: '/p1/p4/p6/p18',
                                name: 'page18',
                                meta: {title: 'page18', icon: 'el-icon-menu'},
                                component: () => import('@/pages/Page18'),
                            },
                            {
                                path: '/p1/p4/p6/p3',
                                name: 'page3',
                                meta: {title: 'page3', icon: 'el-icon-menu'},
                                component: () => import('@/pages/Page3'),

                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: '/rbac/default',
        levelOneMenu:true,
        name: 'default',
        redirect: '/rbac/default/developing',
        meta: {title: '开发页面', icon: 'el-icon-menu'},
        component: () => import('@/layout'),
        children: [
            {
                path: '/rbac/default/developing',
                name: 'developing',
                meta: {title: '开发中', icon: 'el-icon-menu'},
                component: () => import('@/components/pages/developingPage'),
            },
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