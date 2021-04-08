<template>
  <div class="app-reguser" >
    <homeHeader />
    <div class="reguser-box">
      <div class="reguser-box-form">
        <div class="reguser-box-header">
          <p>已有账号？<span @click="goLogin">立即登录</span></p>
          <div>新用户注册</div>
        </div>
        <el-form ref="regForm" :model="regForm" :rules="rules" label-width="26px">
          <el-form-item prop="userName">
             <span slot="label">
                  <i class="el-icon-user-solid"></i>
              </span>
            <el-input v-model="regForm.userName" placeholder="设置用户名称"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <span slot="label">
                  <i class="el-icon-mobile-phone"></i>
            </span>
            <el-input v-model="regForm.phone" placeholder="输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode" class="reg-code-sytle">
            <span slot="label">
                  <i class="el-icon-coordinate"></i>
            </span>
            <el-input v-model="regForm.verificationCode" placeholder="输入验证码" class="reg-code"></el-input>
            <sendCode
              ref="regSendCode"
              :phone='regForm.phone'
              :countDownMethod="countDownMethod"
              class="reg-send-code"
            ></sendCode>
          </el-form-item>
          <el-form-item prop="password">
            <span slot="label">
                  <i class="el-icon-lock"></i>
            </span>
            <el-input v-model="regForm.password" placeholder="设置6-20位字母数字结合登录密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword">
            <span slot="label">
                  <i class="el-icon-lock"></i>
            </span>
            <el-input v-model="regForm.repeatPassword" placeholder="请再次输入登录密码" type="password"></el-input>
          </el-form-item>
          <el-button type="primary"
                       @click="regUser('regForm')"
                       style="width:calc(100% - 55px);margin:0 0 0 25px">立即注册</el-button>
        </el-form>
      </div>
    </div>
    <homeFooter />
  </div>
</template>
<script>
import homeHeader from '@/components/homePageCommon/homeHeader.vue'
import homeFooter from '@/components/homePageCommon/homeFooter.vue'
import sendCode from '@/components/sendCode/sendCode.vue'
import { getCode, regUser } from '@/api/user.js'
export default {
  name: 'reg-user',
  components: { homeHeader, sendCode, homeFooter },
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    const verificationCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        userName: [
          { validator: validateUser, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        verificationCode: [
          { validator: verificationCode, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        repeatPassword: [
          { validator: validateRepeatPassword, trigger: 'blur' }
        ]
      },
      regForm: {
        userName: '',
        phone: '',
        verificationCode: '',
        password: '',
        repeatPassword: ''
      },
      codeSrc: ''

    }
  },
  mounted () {
  },
  methods: {
    regUser (regForm) {
      this.$refs[regForm].validate((valid) => {
        if (valid) {
          regUser(this.regForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.$router.push('/regSuccess')
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
              return false
            }
          }).catch(() => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 倒计时
    countDownMethod () {
      // 获取短信验证码
      const params = { phone: this.regForm.phone, type: '10' }
      getCode(params).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '已向您的手机号' + this.regForm.phone + '发送验证码',
            type: 'success'
          })
          this.$refs.regSendCode.countDown()
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(() => {
      })
    },
    // 跳转登录界面
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='scss' scoped>
.app-reguser{
  width: 100vw;
  height: 100vh;
  background: url('../../assets/forget_bg.png') center no-repeat;
  background-size: 100% 100%;
  .reguser-box{
    display: flex;
    align-items: center;
    height: calc( 100% - 60px );
    justify-content: flex-end;
    .reguser-box-form{
      padding: 20px;
      background: white;
      margin-right: 15%;
      border-radius: 4px;
      .reguser-box-header{
        display: flex;
        flex-direction: column;
        p{
          color: #595959;
          font-size: 12px;
          text-align: right;
          margin: 0;
          span{
            color: #88CDAF;
            cursor: pointer;
          }
        }
        div{
          font-weight: 600;
          margin: 20px 0;
        }
      }
      .reg-code{
        width: 50%;
        float: left;
      }
      .reg-send-code{
        float: right;
        margin: 5px 0 0 0;
      }
    }
  }
}
</style>
