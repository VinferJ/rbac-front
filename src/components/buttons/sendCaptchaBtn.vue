<template>
  <div>
    <el-card shadow="hover" :body-style="{padding:'0',}"
             @click.native="sendCaptcha(sendTo)"
             id="send-captcha-btn" :style="cardStyle">{{sendBtnText}}</el-card>
  </div>
</template>

<script>
import {validateEmail, validatePhoneNum} from "@/utils/validateUtil";
import {sendEmailCaptcha, sendPhoneCaptcha} from "@/services/CaptchaService";

export default {
  name: "sendCaptchaBtn",
  props: {
    /*
    * 发送对象，可以是邮箱，也可以是手机
    * 可以通过captcha指定，类型必须和输入框键入的类型一致
    * 目前只支持这两种形式发送
    * */
    sendTo:{
      type:String,
      default:''
    },
    captchaType:{
      type:String,
      default:'email'
    },
    fontcolor: {
      type:String,
      default: '#409EFF'
    },
    btnText:{
      type:String,
      default:'发送验证码'
    },
    originCountdown:{
      type:Number,
      default:60
    }
  },
  data() {
    return {
      cardStyle:{
        color:this.fontcolor
      },
      sendClickable: true,
      sendBtnText: this.btnText,
      countdown:this.originCountdown,
    }
  },
  created() {
    const type = this.captchaType
    if (type !== 'email' && type !== 'phone'){
      console.error('Unsupported captcha sendTo type，only support phone and email now! ')
    }
  },
  methods:{
    sendCaptcha(sendTarget){
      /*可点击时才触发逻辑*/
      if (this.sendClickable){
        if (this.captchaType === 'email' && validateEmail(sendTarget)){
          this.$message.success('已成功发送验证码')
          /*TODO 如果是邮箱，发送邮箱验证码*/
          sendEmailCaptcha(sendTarget)
          this.freezeSendBtn()
        }else if (this.captchaType === 'phone' && validatePhoneNum(sendTarget)){
          this.$message.success('已成功发送验证码')
          /*TODO 如果是手机号码，那么使用发送手机短信的方法发送验证码*/
          sendPhoneCaptcha(sendTarget)
          this.freezeSendBtn()
        } else {
          this.$message.error('未通过输入验证')
        }
      }
    },
    freezeSendBtn(){
      this.sendClickable = false
      this.sendBtnText = this.countdown + 's后再发送'
      const countdown = this.countdown
      let clock = window.setInterval(() => {
        this.countdown--;
        this.sendBtnText = this.countdown + 's后再发送';
        if (this.countdown < 0) {
          window.clearInterval(clock);
          this.sendBtnText = '重新发送验证码';
          //增大间隔，每次*2
          this.countdown = countdown * 2;
          //结束倒计时后允许点击按钮
          this.sendClickable = true
        }
      },1000)
    }

  }
}
</script>

<style scoped>

#send-captcha-btn{
  height: 50px;line-height: 50px;cursor: pointer
}

</style>