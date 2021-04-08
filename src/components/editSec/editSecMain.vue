<template>
  <div class="edit-code-box">
    <el-form ref="codeForm"
             :model="codeForm"
             :rules="rules"
             label-width="80px">
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="codeForm.phone"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="验证码"
                    prop="verificationCode">
        <el-input v-model="codeForm.verificationCode"
                  style="width:60%"></el-input>
        <sendCode ref="regSendCode"
                  :phone='codeForm.phone'
                  :countDownMethod="countDownMethod"
                  class="reg-send-code"
                  style="float:right;margin:5px 0 0 0" />
      </el-form-item>
      <div class="go-back-box">
        <el-button type="primary"
                   @click="goEdit('codeForm')"
                   class="go-back-button">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import sendCode from '@/components/sendCode/sendCode.vue'
import { getTokenCode } from '@/api/user.js'
import { valdatePass, getUserName } from '@/api/userInfo.js'
export default {
  name: 'edit-code',
  components: { sendCode },
  props: {
    // 发送验证码的手机号
    type: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    }
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
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
    return {
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        verificationCode: [
          { validator: verificationCode, trigger: 'blur' }
        ]
      },
      codeForm: {
        phone: '',
        verificationCode: ''
      },
      userName: ''
    }
  },
  mounted () {
    getUserName().then((res) => {
      this.codeForm.phone = res.data.phone
      this.$emit('new-user', res.data.userName)
    }).catch(() => {

    })
  },
  methods: {
    // 倒计时
    countDownMethod () {
      // 获取短信验证码
      const params = { phone: this.codeForm.phone, type: this.type }
      getTokenCode(params).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '已向您的手机号' + this.codeForm.phone + '发送验证码',
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
    // 验证手机号
    goEdit (codeForm) {
      this.codeForm.type = this.type
      this.$refs[codeForm].validate((valid) => {
        if (valid) {
          valdatePass(this.codeForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '验证成功',
                type: 'success'
              })
              this.$emit('new-phone', this.codeForm.phone)
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
    }
  }

}
</script>

<style lang='scss' scoped>
.go-back-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.go-back-button {
  width: 170px;
}
</style>
