<template>
  <div class="login-page">
    <el-row style="background-color: #348c66;"
            type="flex"
            justify="center">
      <el-col class="title-main">
        聚星塔-网上国网开放平台
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset='5'
              :span='5'>
        <el-row class="loginFormWrap">
          <el-col>
            <el-row>
              <el-col class="loginTitle">
                开发者中心登录
              </el-col>
            </el-row>
            <el-form label-position="right"
                     :rules="rules"
                     ref="loginForm"
                     label-width="80px"
                     :model="loginForm">
              <el-form-item prop="name">
                <span slot="label">
                  <i class="el-icon-user-solid"></i>
                </span>
                <el-input type="text"
                          placeholder="请输入账号"
                          v-model="loginForm.name"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <span slot="label">
                  <i class="el-icon-s-promotion"></i>
                </span>
                <el-input type="password"
                          placeholder="请输入密码"
                          v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item prop="validCode">
                <span slot="label">
                  <i class="el-icon-coordinate"></i>
                </span>
                <el-input type="text"
                          style="width:50%;"
                          placeholder="请输入验证码"
                          @keyup.native.enter="login('loginForm')"
                          v-model="loginForm.validCode"></el-input>
                <img :src='codeSrc'
                     class="verifyCode"
                     @click="handleGetCode">
              </el-form-item>
            </el-form>
            <el-button type="primary"
                       @click="login('loginForm')"
                       style="width:calc(100% - 55px);margin:10px 0 0 55px ">提交</el-button>
            <el-row class="pass-word-handle">
              <el-col :span="12"
                      class="pass-word-forget">
                <div @click="goForgetPass()">忘记密码?</div>
              </el-col>
              <el-col :span="12"
                      class="pass-word-new">
                <div @click="regUser()">注册</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import '@/utils/Math.uuid.js'
// import commonUrl from '@/utils/commonUrl.js'
// import { login, getUserMenu } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        validCode: [
          { validator: validCode, trigger: 'blur' }
        ]
      },
      codeSrc: '',
      deviceId: '',
      loginForm: {
        name: '',
        password: '',
        validCode: ''
      }
    }
  },
  mounted () {
    // if (localStorage.getItem('baseUrl') === '' || localStorage.getItem('baseUrl') === null) {
    //   localStorage.setItem('baseUrl', commonUrl)
    // }
    localStorage.removeItem('token')
    const canGo = localStorage.getItem('canGo')
    if (canGo !== 'true') {
      localStorage.setItem('canGo', 'true')
      location.reload()
    } else {
      this.handleGetCode()
    }
  },
  methods: {
    // 获取验证码方法
    handleGetCode () {
      // if (localStorage.getItem('baseUrl') === '' || localStorage.getItem('baseUrl') === null) {
      //   localStorage.setItem('baseUrl', commonUrl)
      // }
      this.deviceId = Math.uuid()
      this.codeSrc = localStorage.getItem('baseUrl') + '/osg-ocp-developer0001/validata/code/' + this.deviceId
    },
    // 登录方法
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // const params = {
          //   password: this.loginForm.password,
          //   username: this.loginForm.name,
          //   validCode: this.loginForm.validCode,
          //   deviceId: this.deviceId,
          //   grant_type: 'password',
          //   client_id: 'devApp',
          //   client_secret: 'devApp',
          //   scope: 'app'
          // }
          // login(params).then((res) => {
          //   this.$store.dispatch('saveUserTokenInfo', res).then(() => {
          //     const params = {
          //       access_token: localStorage.getItem('token')
          //     }
          //     getUserMenu(params).then((res) => {
          //       // 登录成功后，清除localStorage里面所有的数据
          //       localStorage.removeItem('tabList')
          //       localStorage.removeItem('onOpenTabId')
          //       localStorage.removeItem('onOpenMenuIndex')
          //       this.$store.dispatch('saveDictionaryInfo')
          this.$router.push('/viewModel/viewModel')
          //     })
          //   })
          // }).catch(() => {
          //   this.handleGetCode()
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册跳转
    regUser () {
      this.$router.push({ name: 'regUser' })
    },
    // 忘记密码跳转
    goForgetPass () {
      this.$store.dispatch('getProgessNum', 'one')
      this.$router.push({ name: 'forgetPass' })
    }
  }
}
</script>
<style lang="scss" scoped>
.title-main {
  color: #ffffff;
  width: 1100px;
  margin: 0 auto;
  text-align: left;
  line-height: 32px;
  font-size: 15px;
}
.loginFormWrap {
  display: block;
  width: 380px;
  height: 360px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 54px 50px 1px;
  border-radius: 5px;
  position: fixed;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  .loginTitle {
    display: flex;
    justify-content: center;
    margin-left: 35px;
    height: 50px;
    line-height: 50px;
    border: none;
    color: #348c66;
    font-weight: 700;
    font-size: 15px;
  }
  .verifyCode {
    width: 48%;
    vertical-align: bottom;
    cursor: pointer;
    margin-left: 2%;
  }
  .pass-word-handle {
    font-size: 14px;
    color: #88cdaf;
    padding: 10px 0 0 0;
    cursor: pointer;
    .pass-word-forget {
      text-align: left;
      padding-left: 55px;
    }
    .pass-word-new {
      text-align: right;
    }
  }
}
</style>
