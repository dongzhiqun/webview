<template>
  <div class="real-name-box">
    <div class="real-name-header">
      <p class="name-header-title">企业认证方式</p>
      <div class="real-now-box">
        <div class="real-now-num real-now-active">
          <div class="real-now-one">1</div>
          <p>认证信息填写</p>
        </div>
        <div class="real-now-num"
             :class="['real-now-num',authNow == '1' || authNow == '3'?'real-now-active':'']">
          <div class="real-now-one">2</div>
          <p>平台审核</p>
        </div>
        <div class="real-now-num"
             :class="['real-now-num',authNow == '3'?'real-now-active':'']">
          <div>3</div>
          <p>认证结果通知</p>
        </div>
      </div>
    </div>
    <div class="real-name-body"
         v-if="authNow == '0' || authNow == '2' || authNow == '3'">
      <el-row :gutter="10"
              type="flex"
              style="height:100%">
        <el-col :span="12"
                style="display:flex">
          <div class="name-body-left">
            <div class="body-left-title">企业信息</div>
            <el-form :model="realNameForm"
                     ref="realNameForm"
                     :rules="rules"
                     label-width="128px">
              <el-form-item label="组织类型:">
                <el-radio-group v-model="realNameForm.enterpriseType">
                  <el-radio label="20">企业</el-radio>
                  <el-radio label="10"
                            disabled>其他组织</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="企业名称:"
                            prop="enterpriseName">
                <el-input v-model="realNameForm.enterpriseName"
                          :disabled="authNow == '3'?true:false"></el-input>
              </el-form-item>
              <el-form-item label="营业执照注册号:"
                            prop="businessLicense">
                <el-input v-model="realNameForm.businessLicense"
                          :disabled="authNow == '3'?true:false"></el-input>
              </el-form-item>
              <el-form-item label="营业执照扫描件:">
                <el-upload :disabled="isDesable"
                           class="avatar-uploader"
                           :action="actionsUrl"
                           :headers="myHeaders"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                  <img :src="imageUrl"
                       class="avatar">
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                  <!-- <img v-else :src="imgBus" class="avatar"> -->
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12"
                style="display:flex">
          <div class="name-body-right">
            <div class="body-right-title">法定代表人/责任人信息</div>
            <el-form :model="realNameForm"
                     ref="realNameForm"
                     :rules="rules"
                     label-width="142px">
              <el-form-item label="法定代表人证件类型:"
                            prop="legalPersonCertType">
                <el-select placeholder="请选择"
                           v-model="realNameForm.legalPersonCertType"
                           :disabled="authNow == '3'?true:false">
                  <el-option label="身份证"
                             value="10"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证正面照:">
                <el-upload :disabled="isDesable"
                           class="avatar-uploader"
                           :action="actionsUrl"
                           :headers="myHeaders"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess1"
                           :before-upload="beforeAvatarUpload1">
                  <img :src="imageUrl1"
                       class="avatar">
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                  <!-- <img v-else :src="imgUp" class="avatar"> -->
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证背面照:">
                <el-upload :disabled="isDesable"
                           class="avatar-uploader"
                           :action="actionsUrl"
                           :headers="myHeaders"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess2"
                           :before-upload="beforeAvatarUpload2">
                  <img :src="imageUrl2"
                       class="avatar">
                  <!-- <img v-else :src="imgDown" class="avatar"> -->
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="real-name-button"
         v-if="authNow == '0' || authNow == '2'">
      <el-button type="info"
                 size="medium"
                 @click="removeRealName()">
        取消
      </el-button>
      <el-button type="primary"
                 size="medium"
                 @click="saveRealName('realNameForm')">
        提交审核
      </el-button>
    </div>
    <div class="real-name-auth"
         v-if="authNow == '1'">
      <div class="real-now-img"><img src="@/assets/ico_time.png"
             alt=""></div>
      <p class="real-now-word">认证中，请耐心等待…</p>
      <p class="real-now-time">您提交实名认证的时间：{{creatTime}}</p>
      <p class="real-now-sign">实名认证人工审核流程示意</p>
      <div class="real-sign-img"><img src="@/assets/ico_shiyi.png"
             alt=""></div>
      <p class="real-time-day">工作时间内提交认证，认证会在7天内完成；非工作时间提交，认证将顺延到工作日上午10点前完成。</p>
    </div>
  </div>
</template>

<script>
import imgBus from '../../assets/buseniss1.png'
import imgUp from '../../assets/carde1.png'
import imgDown from '../../assets/cardeRcode1.png'
import { Loading } from 'element-ui'
// import testImg from '../../assets/bg_login.png'
import { getAuditInfo, getRealNameDetil, saveRealName, downloadFile } from '@/api/userInfo.js'
export default {
  name: 'real-name',
  data () {
    const validateEnterpriseName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入企业名称'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        enterpriseName: [
          { validator: validateEnterpriseName, trigger: 'blur' }
        ]
      },
      actionsUrl: process.env.NODE_ENV === 'production' ? localStorage.getItem('baseUrl') + '/osg-ocp-developer0001/commonFile/uploadFile' : process.env.VUE_APP_BASE_URL + '/osg-ocp-developer0001/commonFile/uploadFile',
      imageUrl: '',
      imageUrl1: '',
      imageUrl2: '',
      imgBus: imgBus,
      imgUp: imgUp,
      imgDown: imgDown,
      isDesable: false,
      myHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      realNameForm: {
        enterpriseType: '',
        enterpriseName: '',
        businessLicense: '',
        legalPersonCertType: '',
        businessPhoto: '',
        businessLicenseImg: '',
        idcardImgUp: '',
        idcardImgRev: ''
      },
      creatTime: '',
      authNow: '0'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.getAuditInfo()
      // this.getRealNameDetil()
    },
    // 获取之前审核信息回显
    getRealNameDetil () {
      getRealNameDetil().then((res) => {
        res.data.enterpriseType = '20'
        this.realNameForm = res.data
        if (res.data.businessLicenseImg) {
          downloadFile({ filename: res.data.businessLicenseImg }).then((res) => {
            let str = res.replace(/\. +/g, '')
            str = str.replace(/[\r\n]/g, '')
            this.imageUrl = 'data:image/png;base64,' + str
          })
        } else {
          this.imageUrl = this.imgBus
        }
        if (res.data.idcardImgUp) {
          downloadFile({ filename: res.data.idcardImgUp }).then((res) => {
            let str = res.replace(/\. +/g, '')
            str = str.replace(/[\r\n]/g, '')
            this.imageUrl1 = 'data:image/png;base64,' + str
          })
        } else {
          this.imageUrl1 = this.imgUp
        }
        if (res.data.idcardImgRev) {
          downloadFile({ filename: res.data.idcardImgRev }).then((res) => {
            let str = res.replace(/\. +/g, '')
            str = str.replace(/[\r\n]/g, '')
            this.imageUrl2 = 'data:image/png;base64,' + str
          })
        } else {
          this.imageUrl2 = this.imgDown
        }
      }).catch(() => {

      })
    },
    // 查询审核状态
    getAuditInfo () {
      getAuditInfo().then((res) => {
        if (res.data.auditStatus === '' || res.data.auditStatus === null) {
          // 待认证
          this.authNow = '0'
        } else if (res.data.auditStatus === 10) {
          // 认证中
          this.authNow = '1'
          this.creatTime = res.data.createTimeStr
        } else if (res.data.auditStatus === 20) {
          // 审核拒绝
          this.authNow = '2'
        } else if (res.data.auditStatus === 30) {
          // 认证通过
          this.authNow = '3'
          this.isDesable = true
        }
      }).catch(() => {

      })
    },
    //
    // 取消
    removeRealName () {
      this.$router.go(-1)
    },
    // 去审核
    saveRealName (realNameForm) {
      this.$refs[realNameForm].validate((valid) => {
        if (valid) {
          saveRealName(this.realNameForm).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.push('/personCenter/userInfo')
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
    handleAvatarSuccess (res, file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      }).close()
      this.imageUrl = URL.createObjectURL(file.raw)
      this.realNameForm.businessLicenseImg = res.fileList[0].fileNameOrUrl
    },
    beforeAvatarUpload (file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      })
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess1 (res, file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      }).close()

      this.imageUrl1 = URL.createObjectURL(file.raw)
      this.realNameForm.idcardImgUp = res.fileList[0].fileNameOrUrl
    },
    beforeAvatarUpload1 (file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      })
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess2 (res, file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      }).close()
      this.imageUrl2 = URL.createObjectURL(file.raw)
      this.realNameForm.idcardImgRev = res.fileList[0].fileNameOrUrl
    },
    beforeAvatarUpload2 (file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      })
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        Loading.service({
          lock: true,
          text: '上传……',
          background: '#ffffff80'
        }).close()
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/.avatar-uploader .el-upload {
  // border: 0.5px dashed #3E505D;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  // background: url('../../assets/buseniss1.png') no-repeat;
  background-size: contain;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: rgba(9, 9, 9, 0);
  width: 170px;
  height: 129px;
  line-height: 129px;
  text-align: center;
}
.avatar {
  // width: 170px;
  // height: 129px;
  // display: block;
  // background-size: contain;
  height: auto;
  max-width: 170px;
  max-height: 129px;
  vertical-align: bottom;
  bottom: 0;
  -o-object-fit: fill;
  object-fit: fill;
}
.real-name-box {
  padding: 20px;
  font-size: 14px;
  height: calc(100% - 40px);
  p {
    margin: 0;
  }
  .real-name-header {
    padding: 20px;
    background-color: #f8f9fb;
    border-radius: 4px;
    .name-header-title {
      font-weight: 600;
    }
    .real-now-box {
      width: 800px;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
      .real-now-num {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        div {
          width: 40px;
          height: 40px;
          background: #c9ebe3;
          color: white;
          line-height: 40px;
          text-align: center;
          border-radius: 50%;
          position: relative;
        }
        p {
          color: #bfbfbf;
          margin-top: 10px;
        }
        .real-now-one::after {
          content: "";
          position: absolute;
          top: 20px;
          right: -310px;
          width: 300px;
          height: 1px;
          background: #979797;
        }
      }
      .real-now-active {
        div {
          background-color: #64a998;
        }
        p {
          color: #595959;
        }
      }
    }
  }
  .real-name-body {
    margin: 10px 0 0 0;
    height: calc(100% - 190px);
    .name-body-left {
      background-color: #f8f9fb;
      border-radius: 4px;
      width: 100%;
      padding: 20px;
      .body-left-title {
        font-weight: 600;
        margin: 0 0 10px 0;
      }
    }
    .name-body-right {
      width: 100%;
      background-color: #f8f9fb;
      border-radius: 4px;
      padding: 20px;
      .body-right-title {
        font-weight: 600;
        margin: 0 0 10px 0;
      }
    }
  }
  .real-name-button {
    display: flex;
    justify-content: center;
    margin: 20px 0 0 0;
  }
  .real-name-auth {
    background-color: #f8f9fb;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 20px 0 0 0;
    .real-now-img {
      width: 99px;
      height: 99px;
    }
    .real-now-word {
      font-weight: 600;
      color: #55b9ff;
      margin: 25px 0;
    }
    .real-sign-img {
      width: 480px;
      margin: 25px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
