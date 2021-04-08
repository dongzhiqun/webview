<template>
  <div class="user-info-main">
    <!-- 基本信息 -->
    <div class="user-info-mation">
      <div class="info-mation-header">基本信息</div>
      <el-row class="info-mation-box"
              type="flex">
        <el-col :span="4"
                class="info-mation-person">
          <el-upload class="avatar-uploader"
                     :action="actionsUrl"
                     :headers="myHeaders"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img :src="imageUrl"
                 class="avatar">
            <div class="avBac">
              <span>更换</span>
            </div>
          </el-upload>
          <p>{{userInfo.nickName}}</p>
          <span @click="goEditInfo()">编辑</span>
        </el-col>
        <el-col :span="20"
                class="info-mation-list">
          <el-row>
            <el-col :span="8">
              <div>登录账号:<span>{{userInfo.userName | emptyRes}}</span></div>
              <div>联系人:<span>{{userInfo.contactsName | emptyRes}}</span></div>
              <div>企业名称:<span>{{userInfo.enterpriseName | emptyRes}}</span></div>
            </el-col>
            <el-col :span="8">
              <div>联系电话:<span>{{userInfo.enterprisePhone | emptyRes}}</span></div>
              <div>联系地址:<span>{{userInfo.addrStr | emptyRes}}</span></div>
              <div>注册时间:<span>{{userInfo.createTimeStr | emptyRes}}</span></div>
            </el-col>
            <el-col :span="8">
              <div>用户身份:<span>{{userInfo.identificationStr | emptyRes}}</span>
                <p v-if="auditInfo.auditStatus == '' || auditInfo.auditStatus == null"
                   class="no-audit">未认证</p>
                <p v-else-if="auditInfo.auditStatus == '10'"
                   class="now-audit">认证中</p>
                <p v-else-if="auditInfo.auditStatus == '20'"
                   class="fail-audit">认证失败</p>
                <p v-else-if="auditInfo.auditStatus == '30'"
                   class="yo-audit">认证通过</p>
              </div>
              <div>主营业务:<span>{{userInfo.enterpriseDesc | emptyRes}}</span></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 实名认证 -->
    <div class="audit-info-box">
      <el-row :gutter="10"
              type="flex">
        <el-col :span="16"
                class="flex-height-auto">
          <div class="auth-info-company">
            <div class="info-company-header">实名认证</div>
            <p class="info-company-tip"
               v-if="auditInfo.auditStatus == '' || auditInfo.auditStatus == null || auditInfo.auditStatus == '20'">您还未进行实名认证（为了您的账号安全，我们建议您尽快进行实名认证）</p>
            <div class="info-commpany-tab">
              <el-row :gutter="10">
                <el-col :span="12">
                  <div class="info-company-box"
                       v-if="auditInfo.auditStatus == '' || auditInfo.auditStatus == null"
                       @click="goAuth()"
                       style="cursor: pointer;">
                    <img src="@/assets/ico_shiminrenzheng.png"
                         alt="">
                    <div>
                      <p>企业实名认证</p>
                      <p>需要进行人工审核,审核工期1-3个工作日</p>
                    </div>
                    <div class="auth-company-tag no-audit">未认证</div>
                  </div>
                  <div class="info-company-box info-company-now"
                       v-else-if="auditInfo.auditStatus == '10'">
                    <img src="@/assets/ico_renzhengzhong01.png"
                         alt="">
                    <div class="company-now-datile">
                      <p>处于企业认证过程中，请耐心等待…</p>
                      <p @click="goAuth()">查看详情</p>
                    </div>
                    <div class="auth-company-tag now-audit">认证中</div>
                  </div>
                  <div class="info-company-box info-company-now"
                       v-else-if="auditInfo.auditStatus == '20'">
                    <div class="company-fail-box">
                      <img src="@/assets/ico_fail01.png"
                           alt="">
                      <span @click="goAuth()">重新认证</span>
                    </div>
                    <div>
                      <p style="">{{auditInfo.refuseReasonStr}}</p>
                    </div>
                    <div class="auth-company-tag fail-audit">认证失败</div>
                  </div>
                  <div class="info-company-box info-company-now"
                       v-else-if="auditInfo.auditStatus == '30'">
                    <img src="@/assets/ico_success01.png"
                         alt="">
                    <div>
                      <p>企业名称: <span>{{auditInfo.enterpriseName}}</span> </p>
                      <p>营业执照注册号: <span>{{auditInfo.businessLicense}}</span> </p>
                    </div>
                    <div class="auth-company-tag yo-audit">认证通过</div>
                  </div>

                </el-col>
                <el-col :span="12">
                  <div class="info-person-box">
                    <img src="@/assets/ico_geren.png"
                         alt="">
                    <div>
                      <p>个人实名认证</p>
                      <p>需要进行人工审核,审核工期1-3个工作日</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8"
                class="flex-height-auto">
          <div class="set-safe-box">
            <div class="set-safe-header">安全设置 <span @click="goSetSafe()">设置</span> </div>
            <div class="set-safe-body">
              <div>
                <p>手机绑定: <span>{{userInfo.phone}}</span></p>
              </div>
              <div>
                <p>登录密码: <span>已设置</span></p>
              </div>
              <div>
                <p>邮箱绑定: <span>--</span></p>
              </div>
              <div>
                <p>登录保护: <span>--</span></p>
              </div>
              <div>
                <p>账号安全等级: <span>--</span></p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 支付认证 -->
    <div class="pay-auth-box">
      <div class="pay-auth-herader">支付认证</div>
      <div class="pay-suth-body">
        <img src="@/assets/none_list.png"
             alt="">
        <span>暂未开通此业务</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import defulImg from '../../assets/ico_moren.png'
import { getUserName, getAuditInfo, saveHeaderFile, downloadFile } from '@/api/userInfo.js'
export default {
  name: 'user-info',
  data () {
    return {
      imageUrl: '',
      defulImg: defulImg,
      actionsUrl: process.env.NODE_ENV === 'production' ? localStorage.getItem('baseUrl') + '/osg-ocp-developer0001/commonFile/uploadFile' : process.env.VUE_APP_BASE_URL + '/osg-ocp-developer0001/commonFile/uploadFile',
      myHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      userInfo: {},
      auditInfo: {},
      authTabInfo: {
        isAuth: '未认证'
      }
    }
  },
  computed: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.getUserInfo()
      // this.getAuditInfo()
    },
    // 获取用户信息
    getUserInfo () {
      getUserName().then((res) => {
        if (res.code === 0) {
          this.userInfo = res.data
          if (res.data.headImgUrl) {
            downloadFile({ filename: res.data.headImgUrl }).then((res) => {
              let str = res.replace(/\. +/g, '')
              str = str.replace(/[\r\n]/g, '')
              this.imageUrl = 'data:image/png;base64,' + str
            })
          } else {
            this.imageUrl = this.defulImg
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
          return false
        }
      }).catch(() => {
        this.$message({
          message: '网络错误,请重试',
          type: 'warning'
        })
        return false
      })
    },
    // 获取审核状态
    getAuditInfo () {
      getAuditInfo().then((res) => {
        if (res.code === 0) {
          this.auditInfo = res.data
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
          return false
        }
      }).catch(() => {

      })
    },
    handleAvatarSuccess (res, file) {
      Loading.service({
        lock: true,
        text: '上传……',
        background: '#ffffff80'
      }).close()
      this.imageUrl = URL.createObjectURL(file.raw)
      saveHeaderFile({ headImgUrl: res.fileList[0].fileNameOrUrl }).then((data) => {
        this.$store.commit('SET_MY_PHOTO', res.fileList[0].fileNameOrUrl)
      })
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
    // 跳转编辑页面
    goEditInfo () {
      this.$router.push('/personCenter/editInfo')
    },
    // 跳转认证页面
    goAuth () {
      this.$router.push('/personCenter/realeName')
    },
    // 跳转安全设置页面
    goSetSafe () {
      this.$router.push('/personCenter/secSetting')
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
  height: auto;
  max-width: 70px;
  max-height: 79px;
  vertical-align: bottom;
  bottom: 0;
  -o-object-fit: fill;
  object-fit: fill;
}
p {
  margin: 0;
}
.headerTopBox {
  box-shadow: none;
}
/deep/.el-upload--text {
  position: relative;
}
.avBac {
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(89, 89, 89, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  span {
    color: white !important;
    font-size: 12px;
  }
}
.el-upload:hover .avBac {
  display: flex;
}
.user-info-main {
  font-size: 14px;
  color: #595959;
  padding: 0 20px 20px 20px;
  height: calc(100% - 20px);
  width: calc(100% - 40px);
  .user-info-mation {
    width: calc(100% - 40px);
    background: #f8f9fb;
    padding: 20px;
    border-radius: 4px;
    .info-mation-header {
      font-weight: 600;
    }
    .info-mation-box {
      margin: 20px 0 0 0;
    }
  }
  .info-mation-person {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 40px);
    p {
      font-weight: 600;
      padding: 10px 0 5px 0;
    }
    span {
      color: #64a998;
      cursor: pointer;
    }
    img {
      width: 70px;
      height: 70px;
      -o-object-fit: fill;
      object-fit: fill;
      border-radius: 50%;
      position: relative;
    }
    img[src=""],
    img:not([src]) {
      opacity: 0;
    }
  }
  .info-mation-list {
    div {
      line-height: 35px;
      span {
        padding: 0 0 0 5px;
      }
      p {
        display: inline-block;
        font-size: 12px;
        border-radius: 4px;
        padding: 2px 5px;
        line-height: initial;
        color: white;
        margin: 0 0 0 10px;
      }
      .no-audit {
        background-color: #e39d74;
      }
      .now-audit {
        background-color: #55b9ff;
      }
      .fail-audit {
        background-color: #e37474;
      }
      .yo-audit {
        background-color: #64a998;
      }
    }
  }
}
.audit-info-box {
  margin: 10px 0 0 0;
  border-radius: 4px;
  background-color: white;
  .flex-height-auto {
    display: flex;
  }
  .el-col {
    .auth-info-company {
      width: 100%;
      background-color: #f8f9fb;
      border-radius: 4px;
      padding: 20px;
      .info-company-header {
        font-weight: 600;
      }
      .info-company-tip {
        margin: 10px 0 0 0;
      }
      .info-commpany-tab {
        .info-company-box,
        .info-person-box {
          border-radius: 4px;
          background-color: #f2f3f7;
          padding: 10px 0 10px 10px;
          display: flex;
          justify-content: flex-start;
          position: relative;
          align-items: center;
          margin: 20px 0 0 0;
          height: 60px;
          img {
            width: 60px;
            height: 60px;
          }
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 0 0 10px;
            p {
              line-height: 30px;
            }
          }
          .auth-company-tag {
            position: absolute;
            right: 0;
            top: 0;
            color: white;
            padding: 2px 6px 3px;
            font-size: 12px;
            border-radius: 17px 0 0 17px;
          }
          .no-audit {
            background-color: #e39d74;
          }
          .now-audit {
            background-color: #55b9ff;
          }
          .fail-audit {
            background-color: #e37474;
          }
          .yo-audit {
            background-color: #64a998;
          }
        }
        .info-company-now {
          img {
            width: 32px;
            height: 32px;
          }
          .company-fail-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              font-size: 12px;
              margin: 10px 0 0 0;
              color: #64a998;
              cursor: pointer;
            }
          }
          .company-now-datile {
            p:nth-child(2) {
              color: #64a998;
              cursor: pointer;
            }
          }
        }
      }
    }
    .set-safe-box {
      background-color: #f8f9fb;
      border-radius: 4px;
      padding: 20px;
      width: 100%;
      .set-safe-header {
        font-weight: 600;
        span {
          font-size: 12px;
          font-weight: 500;
          color: #64a998;
          cursor: pointer;
        }
      }
      .set-safe-body {
        margin: 5px 0 0 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        line-height: 35px;
        div {
          width: 50%;
        }
      }
    }
  }
}
.pay-auth-box {
  margin: 10px 0 0 0;
  border-radius: 4px;
  background-color: #f8f9fb;
  padding: 20px;
  .pay-auth-herader {
    font-weight: 600;
  }
  .pay-suth-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 300px;
    }
    span {
      margin: 10px 0 0 0;
      color: #bfbfbf;
    }
  }
}
</style>
