
/*
* 拥有全权限菜单的路由表
* */

import {getPublicRouterTable, setCurrentRouterTable} from "@/router/index";
import router from '@/router'
import {validateToken} from "@/utils/tokenUtil";
import {getCurrUid, loadUserInfo} from "@/utils/localStorageUtil";
import Page1 from "@/pages/Page1";
import Page2 from "@/pages/Page2";
import Page3 from "@/pages/Page3";
import Page18 from "@/pages/Page18";
import Page6 from "@/pages/Page6";
import Page4 from "@/pages/Page4";


/**
 * 所有权限访问的路由表
 * 该表可以设置成两个模式：
 *  1. 全量路由列举，每个路由的具体结构(是否有children)在路由表生成时构建
 *  2. 所有路由的结构固定不可变，路由生成只需要匹配即可
 *  使用模式1，需要复杂的路由表的生成算法支持，扩展性强
 *  使用模式2，路由表的生成非常简单，但是扩展性为零，并且不算严格意义上的动态
 *
 *  如果使用模式1，component属性必须要使用对象赋值，不可以是f() -> Promise 类型
 *  因为需要给路由表动态新增component属性，因此要使用对象赋值
 *  如果是Promise类型，会出现组件渲染的报错
 *  并且，顶级父路径是绝对路径，以 '/'开头
 *  子路径都不是 '/'开头的路径
 */
const allPermissionRouterTable = [
    {
        path: '/',
        redirect: '/rbac/home'
    },
    {
        path: '/rbac/login',
        meta: {title:'用户登录'},
        component: () => import('@/views/public/login/src/main')
    },
    {
        path: '/rbac/register',
        meta: {title:'用户注册'},
        component: () => import('@/views/public/register/src/main')
    },
    {
        path: '/rbac/home',
        name: 'home',
        meta: {title:'主页', icon: 'el-icon-house'},
        component: () => import('@/views/user/home')
    },
    {
        path: '/rbac/user',
        name: 'user',
        meta: {title:'用户页', icon: 'el-icon-menu'},
        component: () => import('@/views/user/UserPage')
    },
    {
        path: '/rbac/admin',
        name: 'admin',
        meta: {title:'管理员页', icon: 'el-icon-menu'},
        component: () => import('@/views/admin/AdminPage')
    },
    {
        path: '/p1',
        meta: {title: 'page1', icon: 'el-icon-menu'},
        component: Page1
    },
    {
        path: '/p2',
        meta: {title: 'page2', icon: 'el-icon-menu'},
        component: Page2
    },
    {
        path: 'p3',
        meta: {title: 'page3'},
        component: Page3
    },
    {
        path: 'p4',
        meta: {title: 'page4'},
        component: Page4
    },
    {
        path: 'p6',
        meta: {title: 'page6'},
        component: Page6
    },
    {
        path: 'p18',
        meta: {title: 'page18'},
        component: Page18
    },
]

/**
 * 根据传入的权限菜单动态生成路由表
 * @param menuList      权限访问菜单
 * @return {[]}
 */
export function generateRouterTable(menuList){
    let userRouterMap = []
    let useDefault = false
    /*
    * 根据权限菜单列表，设置用户对应的路由表
    * */
    allPermissionRouterTable.forEach( (router) => {
        if (menuList !== null && menuList.length > 0){
            if (menuList.indexOf(router.path) !== -1){
                userRouterMap.push(router)
            }
        }else {
            console.log('Menu list is null or empty! Generated router map with public router map')
            useDefaultRouterMap(userRouterMap)
            useDefault = true
        }
    })
    setCurrentRouterTable(userRouterMap)
    /*真正意义的动态路由生成和设置*/
    if (!useDefault){
        router.addRoutes(userRouterMap)
    }
    return userRouterMap
}

/**
 * 根据用户身份信息重新生成路由表
 */
export function regenerateRouterTable(){
    /*
    * 仅当用户在登录状态下才允许在页面刷新时重新加载路由表
    * 如果用户已退出登录，那么刷新页面不会重新加载
    * */
    if (validateToken()){
        /*根据保存的用户菜单列表更新路由表*/
        const user = loadUserInfo(getCurrUid())
        const menuList = user.menuList
        generateRouterTable(menuList)
    }
}

function useDefaultRouterMap(routerMap){
    /*
    * 设置公共页面
    * */
    const publicRouter = getPublicRouterTable()
    publicRouter.forEach((router) => {
        routerMap.push(router)
    })
}

export function dynamicGenerateRouterTable(originalTable){
    buildRouterTable(originalTable)
    router.addRoutes(originalTable)
}

function buildRouterTable(originalTable){
    allPermissionRouterTable.forEach((router) => {
        originalTable.forEach((table) => {
            /*
            * 根据path匹配，匹配成功，那么给table动态
            * 添加component、meta属性
            * */
            if (table.path === router.path){
                table.component = router.component
                table.meta = router.meta
            }
            if (table.children.length > 0){
                buildRouterTable(table.children)
            }
        })
    })
}

