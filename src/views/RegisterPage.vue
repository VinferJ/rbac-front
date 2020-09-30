<template>
<div style="width: 100%;height: 100%;">
  <!--两个底层背景色框-->
  <div style="display: flex;width: 100%;height: 100%;z-index: -100;position:absolute;">
    <div style="width: 50%;height: 100%;background: #006EB0"></div>
    <div style="width: 50%;height: 100%;background: #9EABFA "></div>
  </div>
  <div style="display:block;width: 100%;height: 100%;position: fixed">
    <div class="reg-main-content-card">
      <div :style="leftImgBk" class="main-left-content">
        <div style="width: 30%;height: 60%;margin-left: 30%;margin-top: 100px;"></div>
      </div>
      <div class="main-right-content">
        <div style="width: 80%;margin-left: 10%;margin-top: 50px">
          <div class="main-right-content-text">
            <h1>Sign Up</h1>
          </div>
          <div style="margin-top: 50px">
            <el-form :model="registerForm" status-icon ref="registerForm"
                     label-position="right" :rules="registerRules">
              <el-form-item prop="username">
                <el-card shadow="hover" :body-style="{padding:'0'}">
                  <el-input placeholder="用户名" type="text" v-model="registerForm.username">
                      <span slot="prefix">
                        <i class="el-icon-user" style="margin-top:16px;font-size: 18px;color: #ABB3F3"></i>
                      </span>
                  </el-input>
                </el-card>
              </el-form-item>
              <el-form-item prop="email" >
                <el-card shadow="hover" :body-style="{padding:'0'}" >
                  <el-input v-model="registerForm.email" placeholder="注册邮箱">
                        <span slot="prefix">
                            <i class="el-icon-message" style="margin-top:16px;font-size: 18px;color: #ABB3F3"></i>
                        </span>
                  </el-input>
                </el-card>
              </el-form-item>
              <el-form-item prop="password" >
                <el-card shadow="hover" :body-style="{padding:'0'}" >
                  <el-input v-model="registerForm.password" placeholder="登录密码"  type="password"
                            show-password>
                        <span slot="prefix">
                            <i class="el-icon-key" style="margin-top:16px;font-size: 18px;color: #9EABFA"></i>
                        </span>
                  </el-input>
                </el-card>
              </el-form-item>
              <el-form-item prop="captcha" >
                <div style="display: flex;width: 100%;height: 50px">
                  <div style="width: 65%">
                    <el-card shadow="hover" :body-style="{padding:'0',}" >
                      <el-input v-model="registerForm.captcha" placeholder="邮箱验证码">
                        <span slot="prefix">
                            <i class="el-icon-chat-line-round" style="margin-top:16px;font-size: 18px;color:#9EABFA"></i>
                        </span>
                      </el-input>
                    </el-card>
                  </div>
                  <div style="width: 30%;margin-left: 5%;">
                    <send-captcha-btn :send-to="registerForm.email" fontcolor="#9EABFA" />
                  </div>
                </div>
              </el-form-item>
              <el-card shadow="hover" class="register-submit-btn" @click.native="submitRegisterForm('registerForm')">
                <span><i class="el-icon-back"></i> SIGN UP</span>
              </el-card>
              <div style="width: 100%;height: 1px;background: #D4D4DA ;margin-top:7%"></div>
              <div style="width: 100%;height: 30px;line-height: 30px;color: #A6A7AD;font-size: 14px;margin-top: 10px">
                已有账号？<span class="to-login-btn" @click="jumpToLoginPage">登录</span>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {emailValidator} from "@/utils/validator";
import SendCaptchaBtn from "@/components/buttons/sendCaptchaBtn";

export default {
  name: "RegisterPage",
  components: {SendCaptchaBtn},
  data(){

    return{
      leftImgBk:{
        backgroundImage:'url(' + require('@/assets/images/bk4.png') + ')'
      },
      registerForm:{
        username:'',
        email:'',
        password:'',
        captcha:''
      },
      registerRules:{
        username: [
          {required:true, message: '请输入用户名', trigger: 'blur'},
          {max:32, message: '用户名最长为32位字符', trigger: 'blur'}
        ],
        email: [{validator: emailValidator(),trigger: 'blur'}],
        password: [
          {required: true, message: '请输入登录密码',trigger: 'blur'},
          {min: 6,max: 32, message: '密码长度为6-32个字符',trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '验证码长度为6位字符',trigger: 'blur'}
        ]
      },
    }
  },
  methods:{
    jumpToLoginPage(){
      this.$router.push('/rbac/login')
    },

    submitRegisterForm(formName){
      this.$refs[formName].validate( (valid) => {
        if (valid){
          this.$message.success('GET READY TO LOG IN NOW')
        }else {
          return false
        }
      } )
    }

  }
}
</script>

<style scoped>

.reg-main-content-card{
  display:flex;width: 80%;height: 80%;margin-left: 10%;margin-top:5%;
  border-radius: 20px;
  box-shadow:0 1px 50px rgba(0,0,0,0.3),0 0 20px rgba(0,0,0,0.1)
}

/deep/.el-input__inner {
  background-color: transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
  border-radius: 0;
  height: 50px;
}

.register-submit-btn{
  border: 0;color: #ffffff;
  margin-top:10%;  background:#9EABFA;cursor: pointer
}

.register-submit-btn:hover{
  box-shadow:0 1px 7px rgba(0,0,0,0.3),0 0 8px rgba(0,0,0,0.1);
}

.main-left-content{
  width: 60%;
  height: 100%;
  background: #9EABFA;
  background-size: 100% 100%;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.main-right-content{
  width: 40%;height: 100%;background: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
}

.main-right-content-text{
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.to-login-btn{
  color: #9EABFA;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}


</style>