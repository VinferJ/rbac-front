import Router from 'vue-router'
import Vue from 'vue'


Vue.use(Router)

export const routerMap=[

    {
        path: '/',
        redirect:'/rbac/login'
    },

    {
        path:'/rbac/login',
        meta:{title:'用户登录'},
        component:() => import('@/views/LoginPage')
    },
    {
        path:'/rbac/register',
        meta:{title:'用户注册'},
        component:() => import('@/views/RegisterPage')
    },
    {
        path:'/rbac/home',
        meta:{title:'主页'},
        component:() => import('@/views/HomePage')
    }

]

export default new Router({
    routes:routerMap
})