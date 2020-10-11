

/**
* @description TODO 用户服务接口
* */


import {defaultMenu, userTable} from "@/tables/user_table";

let incrementUserId = 1000

/**
 * 登录认证
 * @param email     登录邮箱
 * @param password  登录密码
 */
export function login(email,password){
    let loginUser = null
    userTable.forEach( (user) => {
        if (user.email === email && user.password === password){
            loginUser = user
        }
    })
    return loginUser
}

export function userRegister(user){

    if (user !== null){
        let defaultUser = {
            id:incrementUserId,
            username: user.username,
            email: user.email,
            password: user.password,
            menuList: defaultMenu
        }
        userTable.push(defaultUser)
        incrementUserId++
    }
}
