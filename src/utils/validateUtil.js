

/*
* 验证器工具类
* 对输入参数进行校验
* */


/**
 * 邮箱地址输入验证器
 * @return {function(*, *=, *): (*)}
 */
export function emailValidator(){
    return (rule,value,callback) => {
        const emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (value === ''){
            return callback(new Error('请输入登录邮箱'))
        }else if (!emailReg.test(value)){
            return callback(new Error('请输入有效的邮箱地址'))
        }else {
            return callback()
        }
    }
}

/**
 * 邮箱地址正则验证
 * @param email         邮箱地址
 * @return {boolean}
 */
export function validateEmail(email){
    const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return emailReg.test(email)
}

/**
 * 手机号码正则验证
 * @param phoneNum      手机号码
 * @return {boolean}
 */
export function validatePhoneNum(phoneNum){
    const phoneNumReg = /^1[3456789]\d{9}$/;
    return phoneNumReg.test(phoneNum)
}
