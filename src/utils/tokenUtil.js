


import Cookies from "js-cookie";
import {decode, encode} from "@/utils/codecUtil";



const tokenKey = 'YXV0aGVudGljYXRpb25fdG9rZW4='

/**
 * token简单验证，这里只为了路由跳转做简单的验证限制
 * 真正的token合法以及权限验证在服务端做
 * @return {boolean}
 */
export function validateToken(){
    //由于是编码后保存，因此取出要进行解码
    let token = Cookies.get(tokenKey)
    if (token === '' || token === undefined || token === null){
        return false
    }else {
        token = decode(token)
        return token.split('.').length >= 3;
    }
}

export function saveToken(token,expire){
    //进行base64编码
    token = encode(token)
    if (expire !== undefined && expire !== null && isNaN(expire)){
        Cookies.set(tokenKey,token,{expires:expire})
    }else {
        if (expire !== null && !isNaN(expire)){
            console.error('token expire time must be number value')
        }
        Cookies.set(tokenKey,token,{expires:expire})
    }
}

export function getToken(){
    return decode(Cookies.get(tokenKey))
}

export function clearToken(){
    Cookies.remove(tokenKey)
}