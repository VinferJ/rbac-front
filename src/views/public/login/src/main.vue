<template>
  <div style="width: 100%;height: 100%;">
    <!--两个底层背景色框-->
    <div style="display: flex;width: 100%;height: 100%;z-index: -100;position:absolute;">
      <div style="width: 50%;height: 100%;background: #F5AEB2"></div>
      <div style="width: 50%;height: 100%;background: #2F2B6C "></div>
    </div>
    <div style="z-index:100;width:100%;height:100%;position: fixed">
      <!--登录窗的主体div-->
      <div class="content-card">
        <div style="width: 100%;height: 100%;display: flex">
          <!--第二层左侧框-->
          <div style="width: 40%;height: 100%;">
            <el-card shadow="none" :body-style="{padding:'0px'}"
                     style="width: 80%;height: 90%;margin-left: 10%;margin-top: 5%;border: 0;text-align: center">
              <div><h1 style="color: #F5AEB2">Welcome Back</h1></div>
              <div style="font-size: 5px;color: #A6A7AD;display: flex;width: 100%;margin-top: 50px">
                <div style="width: 25%;height: 15px;"><div style="height: 1px;background: #D4D4DA ;margin-top: 5px"></div></div>
                <div style="width: 50%;height: 15px"><span>LOG IN WITH YOUR EMAIL</span></div>
                <div style="width: 25%;height: 15px"><div style="height: 1px;background: #D4D4DA ;margin-top: 5px"></div></div>
              </div>
              <div style="margin-top: 30px;">
                <el-form :model="loginForm" status-icon ref="loginForm" label-position="right" :rules="loginRules">
                  <el-form-item prop="email">
                    <el-card shadow="hover" :body-style="{padding:'0'}">
                      <el-input placeholder="登录邮箱" type="text" v-model="loginForm.email">
                      <span slot="prefix">
                        <i class="el-icon-user" style="margin-top:16px;font-size: 18px;color: #F5AEB2"></i>
                      </span>
                      </el-input>
                    </el-card>
                  </el-form-item>
                  <el-form-item prop="password" >
                    <el-card shadow="hover" :body-style="{padding:'0'}" >
                      <el-input v-model="loginForm.password" placeholder="登录密码"  type="password"
                                show-password @keyup.enter.native="submitLoginForm('loginForm')">
                        <span slot="prefix">
                            <i class="el-icon-lock" style="margin-top:16px;font-size: 18px;color: #F5AEB2"></i>
                        </span>
                      </el-input>
                    </el-card>
                  </el-form-item>
                  <div style="width: 100%;height: 30px;display: flex;">
                    <div style="text-align: left;line-height: 30px;width: 50%;">
                      <el-checkbox v-model="rememberMe"
                                   style="font-size: 10px;color: #A6A7AD;">记住密码</el-checkbox>
                    </div>
                    <div style="text-align: right;font-size:14px;width: 50%;line-height: 30px;color: #A6A7AD;">
                      <span class="forget-pass-btn" @click="toResetPass">忘记密码</span>
                    </div>
                  </div>
                  <el-card shadow="hover" class="submit-btn" @click.native="submitLoginForm('loginForm')">
                    <span>LOG IN <i class="el-icon-right"></i></span>
                  </el-card>
                  <div style="width: 100%;height: 1px;background: #D4D4DA ;margin-top:7%"></div>
                  <div style="width: 100%;height: 30px;line-height: 30px;color: #A6A7AD;font-size: 14px;margin-top: 10px">
                    还没有账号？<span class="to-register-btn" @click="jumpToRegisterPage">注册</span>
                  </div>
                </el-form>
              </div>
            </el-card>
          </div>
          <!--第二层右侧背景框-->
          <div :style="imgBkDivStyle" class="right-img-content"></div>
        </div>
      </div>
    </div>
    <!--密码更改对话框-->
    <el-dialog title="重置密码" :visible.sync="showResetPassDialog"
               :before-close="clearPassResetForm"
               width="500px" center top="5vh" :close-on-click-modal=false>
      <!--
        子组件设置引用名称，为父组件调用子组件中的方法提供支持
      -->
      <PasswordReset ref="passReset" @close-dialog="closeDialog" />
    </el-dialog>
    <fullscreen-loading-spinner loading-text="登录验证..." :spinner-size=60 :visible="loading"/>

  </div>
</template>

<script>

import PasswordReset from "@/components/pages/passwordReset";
import {emailValidator} from "@/utils/validateUtil";
import FullscreenLoadingSpinner from "@/components/spinners/fullscreenLoadingSpinner";
import {saveUserInfo} from "@/utils/localStorageUtil";
import {saveToken} from "@/utils/tokenUtil";
import {login} from "@/services/UserService";
import {generateRouterTable} from "@/router/routerGenerator";


export default {

  name: "LoginPage",
  components:{FullscreenLoadingSpinner, PasswordReset},
  data(){

    return{
      loginForm:{
        email:'',
        password:''
      },
      loginRules:{
        email: [{validator: emailValidator(), trigger: 'blur'}],
        password: [
          {required: true,message: '请输入登录密码',trigger: 'blur'},
          {min: 6,max: 32,message: '请输入正确的长度',trigger: 'blur'}
        ]
      },
      rememberMe:false,
      imgBkDivStyle:{
        backgroundImage:'url(' + require('@/assets/images/bk1.jpg') +')',
        width:'60%',
        height:'100%',
        display:'block',
        borderTopRightRadius:'20px',
        borderBottomRightRadius:'20PX',
      },
      showResetPassDialog:false,
      loading:false,
    }
  },
  methods:{

    jumpToRegisterPage(){
      this.$router.push('/rbac/register')
    },

    toResetPass(){
      this.showResetPassDialog = true;
    },

    submitLoginForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid){
          this.loading = true
          setTimeout(() => {
            this.loading = false
            /*
            * 登录认证后会返回jwt令牌，保存在本地的token中
            * 还会返回用户信息（id+用户名+角色权限集合），也需要保存
            * */
            const loginUser = login(this.loginForm.email,this.loginForm.password)
            if (loginUser !== null){
              const token = 'userToken.playload_part.setting_part'
              this.storeLoginUser(loginUser,token)
              /*动态生成用户路由*/
              const menuList = loginUser.menuList
              generateRouterTable(menuList)

              this.$router.push('/rbac/home')
            }else {
              this.$message.error('邮箱地址或登录密码不正确')
            }
          },2000)
        }else {
          return false;
        }
      })

    },

    storeLoginUser(loginUser,token){
      /*TODO  引入store模块，保存用户信息*/
      saveUserInfo(loginUser)
      saveToken(token,null)
    },

    clearPassResetForm(){
      /*通过引用调用子组件的表单清除功能*/
      this.$refs['passReset'].clearForm()
      //关闭对话框
      this.showResetPassDialog = false
    },

    closeDialog(){
      this.clearPassResetForm()
    }


  }


}
</script>

<style scoped>

/*.main-left-bk{
  width: 50%;
  height: 100%;
  background: no-repeat left;
  background-size: cover;
}*/

.content-card{
  width: 80%;height: 80%;margin-left: 10%;margin-top:5%;border-radius: 20px;
  background: #fff;
  /*阴影效果*/
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

.forget-pass-btn:hover{
  color: #F5AEB2;
  text-decoration: underline;
  cursor: pointer;
}

.submit-btn{
  border: 0;color: #ffffff;
  margin-top:10%;  background: #F5AEB2;cursor: pointer
}

.submit-btn:hover{
  box-shadow:0 1px 7px rgba(0,0,0,0.3),0 0 8px rgba(0,0,0,0.1);
}

.right-img-content{
  background: no-repeat center right;
  background-size: cover;
}

.to-register-btn{
  color: #F5AEB2;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

</style>