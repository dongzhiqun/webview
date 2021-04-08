<template>
  <div class="forget-pass-vidate" >
     <el-form ref="vidateForm" :model="vidateForm" :rules="rules" label-width="26px">
        <el-form-item prop="username">
            <span slot="label">
                <i class="el-icon-user-solid"></i>
            </span>
            <el-input v-model="vidateForm.username" placeholder="用户账号" disabled></el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <span slot="label">
                <i class="el-icon-mobile-phone"></i>
            </span>
            <el-input v-model="vidateForm.phone" placeholder="手机号" disabled></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
            <span slot="label">
                <i class="el-icon-coordinate"></i>
            </span>
            <el-input v-model="vidateForm.verificationCode" placeholder="请输入验证码" class="forget-code"></el-input>
            <sendCode
              ref="regSendCode"
              :phone='vidateForm.phone'
              :countDownMethod="countDownMethod"
              class="forget-send-code"
            ></sendCode>
        </el-form-item>
        <el-button type="primary"
                    @click="validateUser('vidateForm')"
                    style="width:calc(100% - 55px);margin:0 0 0 25px">下一步</el-button>
    </el-form>
  </div>
</template>
<script>
import { validateUserPhone, getCode } from '@/api/user.js'
import sendCode from '@/components/sendCode/sendCode.vue'
export default {
  name: 'forget-pass-one',
  components: { sendCode },
  data () {
    const validateValidCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        verificationCode: [
          { validator: validateValidCode, trigger: 'blur' }
        ]
      },
      vidateForm: {
        username: '',
        phone: '',
        verificationCode: ''
      }
    }
  },
  mounted () {
    const progessInfo = this.$store.getters.progessInfo
    console.log(progessInfo)
    this.vidateForm.username = progessInfo.userName
    this.vidateForm.phone = progessInfo.phone
  },
  methods: {
    // 填写账户
    validateUser (vidateForm) {
      this.$refs[vidateForm].validate((valid) => {
        if (valid) {
          validateUserPhone(this.vidateForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '验证成功',
                type: 'success'
              })
              this.$store.dispatch('getProgessNum', 'three')
              this.$router.push('/forgetPass/resertPass')
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
      const params = { phone: this.vidateForm.phone, type: '40' }
      getCode(params).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '已向您的手机号' + this.vidateForm.phone + '发送验证码',
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
    }
  }
}
</script>
<style lang='scss' scoped>
.el-form{
  width: 360px;
  margin: 0 auto;
  .forget-code{
    float: left;
    width: 50%;
  }
  .forget-img-code{
    float: right;
  }
  .forget-send-code{
    float: right;
    margin: 5px 0 0 0;
  }
}
</style>
