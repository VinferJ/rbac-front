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
import Layout from "@/layout"
import UserPage from "@/views/user/UserPage";
import AdminPage from "@/views/admin/AdminPage";
//import DevelopingPage from "@/components/pages/developingPage";


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
        redirect: '/rbac'
    },
    {
        path: '/rbac/login',
        meta: {title:'用户登录'},
        component: () => import('@/views/public/login')
    },
    {
        path: '/rbac/register',
        meta: {title:'用户注册'},
        component: () => import('@/views/public/register')
    },

    {
        path: '/rbac/user',
        name: 'user',
        meta: {title:'用户页', icon: 'el-icon-menu'},
        component: UserPage
    },
    {
        path: '/rbac/admin',
        name: 'admin',
        meta: {title:'管理员页', icon: 'el-icon-menu'},
        component: AdminPage
    },
    {
        path: '/p1',
        name: 'p1',
        meta: {title: 'page1', icon: 'el-icon-menu'},
        component: Page1
    },
    {
        path: '/p2',
        name: 'p2',
        meta: {title: 'page2', icon: 'el-icon-menu'},
        component: Page2
    },
    {
        path: '/p3',
        name: 'p3',
        meta: {title: 'page3', icon: 'el-icon-menu'},
        component: Page3
    },
    {
        path: '/p4',
        name: 'p4',
        meta: {title: 'page4', icon: 'el-icon-menu'},
        component: Page4
    },
    {
        path: '/p6',
        name: 'p6',
        meta: {title: 'page6', icon: 'el-icon-menu'},
        component: Page6
    },
    {
        path: '/p18',
        name: 'p18',
        meta: {title: 'page18', icon: 'el-icon-menu'},
        component: Page18
    },
]

//页面布局组件，是菜单生成的基本父组件
const layout = Layout

/*
* 默认页面组件，当用户添加或创建新的view-resource时，会使用
* 该默认页面作为component，页面开发完成时可以手动替换
* */
//const developing = DevelopingPage

/**
 * 根据传入的权限菜单动态生成路由表
 * @param menuList      权限访问菜单
 * @return {[]}
 */
export function generateRouterTable(menuList){
    let userRouterTable = []
    let useDefault = false
    /*
    * 根据权限菜单列表，设置用户对应的路由表
    * */
    allPermissionRouterTable.forEach( (router) => {
        if (menuList !== null && menuList.length > 0){
            menuList.forEach( item => {
                if (item.path === router.path){
                    /*
                    * 添加路由所需要的属性
                    * */
                    item.meta = router.meta
                    item.name = router.name
                    item.component = router.component
                    userRouterTable.push(buildRouter(item))
                }
            })
        }else {
            console.log('Menu list is null or empty! Generated router map with public router map')
            useDefaultRouterMap(userRouterTable)
            useDefault = true
        }
    })
    console.log(userRouterTable)
    setCurrentRouterTable(userRouterTable)
    /*真正意义的动态路由生成和设置*/
    if (!useDefault){
        router.addRoutes(userRouterTable)
    }
    return userRouterTable
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
    recursiveBuildRouter(originalTable)
    router.addRoutes(originalTable)
}

function buildRouter(route){
    /*
    * children长度为0，说明只有1级路由
    * 需要为其封装一层layout作为组件的父路由
    * */
    if (route.children.length === 0){
        return addParentLayout(route)
    }else {
        recursiveBuildRouter(route.children,route.path)
        route = generateCompleteComponent(route)
        return route
    }
}

function recursiveBuildRouter(originalTable,parentPath){
    allPermissionRouterTable.forEach((router) => {
        for (let i = 0; i < originalTable.length; i++) {
            /*
            * 根据path匹配，匹配成功，那么给table动态
            * 添加component、meta属性
            * */
            if (originalTable[i].path === router.path){
                originalTable[i].component = router.component
                originalTable[i].name = router.name
                originalTable[i].meta = router.meta
                originalTable[i].path = parentPath + originalTable[i].path
                if (originalTable[i].children.length === 0){
                    delete originalTable[i].children
                }
            }
            if (originalTable[i].children !== undefined && originalTable[i].children.length > 0){
                recursiveBuildRouter(originalTable[i].children,parentPath+originalTable[i].path)
            }
        }
    })

}

function addParentLayout(route){
    let parent = {
        path: '/parent' + route.path,
        levelOneMenu:true,
        meta: route.meta,
        component: layout,
        children: []
    }
    /*
    * 这里需要删除当前路由的空的children属性，
    * 因为生成渲染sidebar-item时需要根据该属性判断
    * 空的children会影响判断结果
    * */
    delete route.children
    parent.children.push(route)
    return parent
}

function generateCompleteComponent(route){
    return {
        path: route.path,
        name: route.name,
        meta: route.meta,
        component: layout,
        children: route.children
    }
}

