<template>
  <div class="edit-pass-box">
      <div class="header-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/personCenter/secSetting' }">安全设置</el-breadcrumb-item>
          <el-breadcrumb-item>密码修改</el-breadcrumb-item>
          </el-breadcrumb>
          <backButton/>
      </div>
        <div class="edit-pass-header">
            <p class="edit-pass-title">修改密码</p>
            <secProgess :now='progessNow' :isphone='isphone'></secProgess>
        </div>
        <div class="edit-pass-body">
            <div class="edit-pass-sure" v-if="progessNow == '0'">
                <p>手机验证码验证，账户 {{user}} 为确认你本人操作，请完成以下验证</p>
                <secMain :type='type' @new-phone="curenntPhone" @new-user="nowUser" ref="mainSef"></secMain>
                <p class="edit-sign">
                    没有收到短信验证码？<br>
                    1.网络通讯异常可能造成短信丢失，请重新获取或者稍后再试。<br>
                    2.请核实手机是否已经欠费停机，或者屏蔽了系统短信。<br>
                    3.您也可以尝试将SIM卡移动到另一部手机，然后重试。<br>
                    4.如果手机已丢失或者停用，请选择其他验证方式。
                </p>
            </div>
            <!-- 修改密码 -->
            <div class="edit-pass-edit" v-if="progessNow == '1'">
                <el-form ref="editPassForm" :model="editPassForm" :rules="rules1" label-width="90px">
                  <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="editPassForm.newPassword" placeholder="6至12位登录密码" type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码确认" prop="repeatNewPassword">
                  <el-input v-model="editPassForm.repeatNewPassword" placeholder="请再次输入密码" type="password"></el-input>
                  </el-form-item>
                  <div class="go-back-box">
                  <el-button type="primary"
                                  @click="goEditPass('editPassForm')" class="go-back-button">下一步</el-button>
                                  </div>
                </el-form>
            </div>
            <!-- 修改成功 -->
            <div class="edit-psaa-success" v-if="progessNow == '2'">
                <img src="@/assets/ico_success.png" alt="">
                <p class="success-word">密码修改成功</p>
                <p>下次请使用新密码登录</p>
                <div class="go-back-box success-back-box">
                    <el-button type="primary"
                            @click="goSetPage()" class="go-back-button">返回安全设置页</el-button>
                </div>

            </div>
        </div>
  </div>
</template>

<script>
import secProgess from '@/components/editSec/editSecProgess.vue'
import secMain from '@/components/editSec/editSecMain.vue'
import backButton from '@/components/homePageCommon/backButton.vue'
import { saveNewPass } from '@/api/userInfo.js'
export default {
  name: 'edit-pass',
  components: { secProgess, secMain, backButton },
  data () {
    const validatenewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    const validaterepeatNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editPassForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules1: {
        newPassword: [
          { validator: validatenewPassword, trigger: 'blur' }
        ],
        repeatNewPassword: [
          { validator: validaterepeatNewPassword, trigger: 'blur' }
        ]
      },
      type: '30',
      editPassForm: {
        newPassword: '',
        repeatNewPassword: '',
        phone: ''
      },
      progessNow: '0',
      isphone: '0',
      user: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.user = this.$refs.mainSef.userName
    },

    // 新密码修改
    goEditPass (editPassForm) {
      this.$refs[editPassForm].validate((valid) => {
        if (valid) {
          saveNewPass(this.editPassForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.progessNow = '2'
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
    nowUser (data) {
      this.user = data
    },
    curenntPhone (data) {
      this.editPassForm.phone = data
      this.progessNow = '1'
    },
    // 返回安全设置页面
    goSetPage () {
      this.$router.push('/personCenter/secSetting')
    }
  }
}
</script>

<style lang='scss' scoped>
p{
    margin: 0;
    padding: 0;
}
.edit-pass-box{
    font-size: 14px;
    color: #595959;
    padding: 0 20px 20px 20px;
    height: calc(100% - 20px);
    width: calc(100% - 40px);
    .edit-pass-header{
        margin: 10px 0 0 0;
        background-color: #F8F9FB;
        padding: 20px;
        border-radius: 4px;
    }
    .edit-pass-title{
        font-weight: 600;
    }
    .edit-pass-body{
        margin: 10px 0 0 0;
        background-color: #F8F9FB;
        border-radius: 4px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc( 100% - 192px);
        .edit-pass-sure,.edit-pass-edit,.edit-psaa-success{
            width: 440px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .el-form{
                width: 100%;
            }
            .go-back-box{
                display: flex;
                justify-content: center;
                align-items: center;
                .go-back-button{
                    width: 170px;
                }
            }
        }
        .edit-pass-sure{
            >p:nth-child(1){
                font-weight: 600;
                color: #64A998;
                margin-bottom: 40px;
            }
            .edit-sign{
                font-size: 12px;
                margin: 20px 0 0 0;
                padding: 0 0 0 40px;
                color: #979797;
            }
        }
        .edit-psaa-success {
            p{
                color: #8C8C8C;
            }
            .success-word{
                color: #64A998;
                font-size: 16px;
                font-weight: 600;
                margin: 20px 0 10px 0;
            }
            .success-back-box{
                margin: 20px 0 0 0;
            }
        }
    }
}
</style>
