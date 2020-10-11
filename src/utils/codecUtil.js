

/**
 * base64加密
 * @param origin    原文
 * @return {string}
 */
export function encode(origin){
    /*借助encodeURI，将中文转换成btoa可加密的字符*/
    return window.btoa(encodeURI(origin))
}

/**
 * base64解密
 * @param cipher    密文
 * @return {string}
 */
export function decode(cipher){
    return decodeURI(window.atob(cipher))
}