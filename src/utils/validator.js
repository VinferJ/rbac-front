

/*
* 验证器工具类
* 对输入参数进行校验
* */

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

export function validateEmail(email){
    const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return emailReg.test(email)
}

export function validatePhoneNum(phoneNum){
    const phoneNumReg = /^1[3456789]\d{9}$/;
    return phoneNumReg.test(phoneNum)
}