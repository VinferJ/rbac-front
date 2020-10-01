<template>
<div>
  <el-form :model="resetPassForm" :rules="resetPassRules"
           ref="resetPassForm" style="text-align: center">
    <el-form-item prop="email">
      <el-card shadow="hover" :body-style="{padding:'0',}" >
        <el-input v-model="resetPassForm.email" placeholder="你的注册邮箱">
          <span slot="prefix">
            <i class="el-icon-message" style="margin-top:16px;font-size: 18px;color: #409EFF;"></i>
          </span>
        </el-input>
      </el-card>
    </el-form-item>
    <el-form-item prop="newPass">
      <el-card shadow="hover" :body-style="{padding:'0',}" >
        <el-input v-model="resetPassForm.newPass" placeholder="新的登录密码" type="password" showPassword>
          <span slot="prefix">
            <i class="el-icon-key" style="margin-top:16px;font-size: 18px;color: #409EFF;"></i>
          </span>
        </el-input>
      </el-card>
    </el-form-item>
    <el-form-item prop="captcha">
      <div style="display: flex;width: 100%;height: 50px;">
        <div style="width: 65%">
          <el-card shadow="hover" :body-style="{padding:'0',}" >
            <el-input v-model="resetPassForm.captcha" placeholder="邮箱验证码">
              <span slot="prefix">
                <i class="el-icon-chat-line-round" style="margin-top:16px;font-size: 18px;color: #409EFF;"></i>
              </span>
            </el-input>
          </el-card>
        </div>
        <div style="width: 30%;margin-left: 5%">
          <send-captcha-btn :send-to="resetPassForm.email" />
        </div>
      </div>
    </el-form-item>
    <el-card shadow="hover" class="reset-pass-submit-btn" @click.native="submitResetPassForm('resetPassForm')">
      <span>提 交</span>
    </el-card>
  </el-form>
</div>
</template>

<script>
import SendCaptchaBtn from "@/components/buttons/sendCaptchaBtn";
import {emailValidator} from "@/utils/validator";


export default {
  name: "PasswordReset",
  components: {SendCaptchaBtn},
  data(){
    return{
      resetPassForm:{
        email:'',
        newPass:'',
        captcha:''
      },
      resetPassRules:{
        email:[{validator: emailValidator(), trigger: 'blur'}],
        newPass: [
          {required: true, message: '请设置您的登录密码',trigger: 'blur'},
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

    /**
     * 允许父组件调用该方法进行表单清除
     */
    clearForm(){
      this.$refs['resetPassForm'].resetFields();
    },

    submitResetPassForm(formName){
      this.$refs[formName].validate( (valid) => {
        if (valid){
          //开启加载
          this.$fsloading.startLoading('提交修改...')
          /*TODO  密码更改提交*/
          setTimeout( () => {
            this.$fsloading.endLoading()
            /*通知父组件关闭对话框*/
            this.$emit('close-dialog')
            this.$message.success('已成功修改密码')
            /*
            * TODO  密码修改成功后，如果是已登录的状态，需要用户重新登录
            * */
          },2000)
        }else {
          return false
        }
      } )
    }

  }
}
</script>

<style scoped>

/deep/.el-input__inner {
  background-color: transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 2px;
  border-radius: 0;
  height: 50px;
}

.reset-pass-submit-btn{
  border: 0;color: #ffffff;
  margin-top:8%;  background: #409EFF;cursor: pointer
}

.reset-pass-submit-btn:hover{
  box-shadow:0 1px 7px rgba(0,0,0,0.3),0 0 8px rgba(0,0,0,0.1);
}

</style>