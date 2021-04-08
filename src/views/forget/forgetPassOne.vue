<template>
  <div class="forget-pass-read" >
     <el-form ref="forgetForm" :model="forgetForm" :rules="rules" label-width="26px">
        <el-form-item prop="namePhone">
            <span slot="label">
                <i class="el-icon-user-solid"></i>
            </span>
            <el-input v-model="forgetForm.namePhone" placeholder="用户账号/手机号"></el-input>
        </el-form-item>
        <el-form-item prop="validCode">
            <span slot="label">
                <i class="el-icon-coordinate"></i>
            </span>
            <el-input v-model="forgetForm.validCode" placeholder="请输入验证码" class="forget-code"></el-input>
            <imgCode
            class="forget-img-code"
            ref="forgetImgCode"
            />
        </el-form-item>
        <el-button type="primary"
                    @click="validateUser('forgetForm')"
                    style="width:calc(100% - 55px);margin:0 0 0 25px">下一步</el-button>
    </el-form>
  </div>
</template>
<script>
import imgCode from '@/components/imgCode/imgCode.vue'
import { validateUser } from '@/api/user.js'
// import sendCode from '@/components/sendCode/sendCode.vue'
export default {
  name: 'forget-pass-one',
  components: { imgCode },
  data () {
    const validateNamePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号或者手机号'))
      } else {
        callback()
      }
    }
    const validateValidCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        namePhone: [
          { validator: validateNamePhone, trigger: 'blur' }
        ],
        validCode: [
          { validator: validateValidCode, trigger: 'blur' }
        ]
      },
      forgetForm: {
        namePhone: '',
        validCode: '',
        deviceId: ''
      }
    }
  },
  mounted () {
    console.log(this.$refs.forgetImgCode.imgurl)
  },
  methods: {
    // 填写账户
    validateUser (forgetForm) {
      this.forgetForm.deviceId = this.$refs.forgetImgCode.deviceId
      this.$refs[forgetForm].validate((valid) => {
        if (valid) {
          validateUser(this.forgetForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '验证成功',
                type: 'success'
              })
              this.$store.dispatch('getProgessNum', 'two')
              this.$store.dispatch('getProgessInfo', res.data)
              this.$router.push('/forgetPass/forgetPassTwo')
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
              this.$refs.forgetImgCode.getImgCode()
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
