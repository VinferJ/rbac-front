import {decode, encode} from "@/utils/codecUtil";


const localStorage = window.localStorage
const tokenKey = 'YXV0aGVudGljYXRpb25fdG9rZW4='
const encodeUserKey = encode('user_info')
const encodeCurrUid = encode('currentLoginUserId')

let currentLoginUserId = 0

export function getTokenKey(){
    return tokenKey
}

function generateKey(userId){
    return encodeUserKey + '_' + encode(userId)
}

/**
 * 保存用户信息，用户登录成功时调用
 * @param user  用户信息
 */
export function saveUserInfo(user){
    const jsonUser = JSON.stringify(user)
    /*保存当前登录的用户id*/
    currentLoginUserId = user.id
    localStorage.setItem(encodeCurrUid,encode(user.id))
    localStorage.setItem(generateKey(user.id),encode(jsonUser))
}

export function getCurrUid(){
    if (currentLoginUserId === 0){
        /*如果当前数据缓存失效，那么从storage中加载，并且同步当前数据*/
        currentLoginUserId = loadCurrUidFromStorage()
        return currentLoginUserId
    }
    return currentLoginUserId
}

function loadCurrUidFromStorage(){
    return decode(localStorage.getItem(encodeCurrUid))
}

export function loadUserInfo(userId){
    const encodedInfo = localStorage.getItem(generateKey(userId))
    //转换成json对象后再返回
    return JSON.parse(decode(encodedInfo))
}



