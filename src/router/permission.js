import router from './index'
import {validateToken} from "@/utils/tokenUtil";




const loginPath = '/rbac/login'
const registerPath = '/rbac/register'
const pathWhiteList = [loginPath,registerPath]


router.beforeEach( (to,from,next) => {
    if (validateToken()){
        if (to.path === loginPath){
            next('/')
        }else {
            /*
            * TODO  结合store模块做路由权限验证
            *       如果已登录或登录过，那么本地有用户信息缓存
            *       进行store同步，如果信息过期，那么需要重新登录
            *
            * TODO  刷新页面后，store中缓存会被清空，此时通过本地缓存同步
            *       如果本地也被清空，那么需要用户重新登录
            * */
            next()
        }
    }else {
        if (pathWhiteList.indexOf(to.path) !== -1){
            next()
        }else {
            next(loginPath)
        }
    }
})