<template>
  <div class="forget-pass-resert" >
     <el-form ref="resertForm" :model="resertForm" :rules="rules" label-width="26px">
        <el-form-item prop="newPassword">
            <span slot="label">
                <i class="el-icon-lock"></i>
            </span>
            <el-input v-model="resertForm.newPassword" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repeatNewPassword">
            <span slot="label">
                <i class="el-icon-lock"></i>
            </span>
            <el-input v-model="resertForm.repeatNewPassword" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-button type="primary"
                    @click="resertPass('resertForm')"
                    style="width:calc(100% - 55px);margin:0 0 0 25px">下一步</el-button>
    </el-form>
  </div>
</template>
<script>
import { resertPass } from '@/api/user.js'
export default {
  name: 'forget-resert-pass',
  data () {
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateRepeatNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resertForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        repeatNewPassword: [
          { validator: validateRepeatNewPassword, trigger: 'blur' }
        ]
      },
      resertForm: {
        newPassword: '',
        repeatNewPassword: '',
        phone: ''
      }
    }
  },
  mounted () {
    const progessInfo = this.$store.getters.progessInfo
    this.resertForm.phone = progessInfo.phone
  },
  methods: {
    // 填写账户
    resertPass (resertForm) {
      this.$refs[resertForm].validate((valid) => {
        if (valid) {
          resertPass(this.resertForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '验证成功',
                type: 'success'
              })
              this.$store.dispatch('getProgessNum', 'foure')
              this.$router.push('/forgetPass/resertSuccess')
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
