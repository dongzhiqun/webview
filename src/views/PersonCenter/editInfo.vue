<template>
  <div class="edit-info-box">
    <div class="header-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/personCenter/userInfo' }">基本信息</el-breadcrumb-item>
        <el-breadcrumb-item>基本资料</el-breadcrumb-item>
        </el-breadcrumb>
        <backButton/>
    </div>
        <div class="edit-info-main">
            <div class="edit-info-header">基本资料</div>
            <p>请完善以下信息，方便我们更好的为您服务！</p>
            <div class="edit-info-body">
                <el-row :gutter="20" type="flex">
                    <el-col :span="12" class="edit-form-left">
                        <div class="form-left-box">
                            <div class="form-left-header">基本信息</div>
                            <el-form :model="infoForm" ref="infoForm" :rules="rules" label-width="100px" >
                                <el-form-item label="会员身份:">
                                <el-radio-group v-model="infoForm.identification">
                                    <el-radio label="20">企业、其他组织</el-radio>
                                    <el-radio label="10" disabled>个人</el-radio>
                                </el-radio-group>
                                </el-form-item>
                                <el-form-item label="企业名称:" prop="enterpriseName">
                                    <el-input v-model="infoForm.enterpriseName"></el-input>
                                </el-form-item>
                                <el-form-item label="联系人:" prop="contactsName">
                                    <el-input v-model="infoForm.contactsName"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名称:" prop="nickName">
                                    <el-input v-model="infoForm.nickName"></el-input>
                                </el-form-item>
                             </el-form>
                        </div>
                    </el-col>
                    <el-col :span="12" class="edit-form-right">
                        <div class="form-right-box">
                            <div class="form-right-header">业务信息</div>
                            <el-form :model="infoForm"  ref="infoForm" :rules="rules" label-width="100px">
                                <el-form-item label="主要行业应用:" prop="businessScope">
                                    <el-select placeholder="请选择" v-model="infoForm.businessScope" style="width:100%">
                                        <el-option
                                            v-for="item in busList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="主营业务:" prop="enterpriseDesc">
                                    <el-input v-model="infoForm.enterpriseDesc" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="网址:">
                                    <el-input v-model="infoForm.website" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="地址:" prop="censusLand" class="edit-address">
                                  <el-cascader
                                  v-if="isBack"
                                  v-model="myAddress"
                                  :options="options"
                                  :props="cateListProps"
                                  @active-item-change="handleItemChange"
                                   @change="changefn"
                                   clearable
                                   ref="cascader"
                                   style="width:100%"
                                   ></el-cascader>
                                </el-form-item>
                                <el-form-item label="" prop="censusLand" class="edit-address">
                                  <el-input v-model="infoForm.enterpriseAddress" style="width:100%" placeholder="请输入街道"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话:" prop="enterprisePhone">
                                    <el-input v-model="infoForm.enterprisePhone" placeholder="请输入"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
                <div class="edit-button">
                    <el-button
                        type="info"
                        size="medium"
                        @click="removeEdit()">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="editInfoButton('infoForm')">
                        保存
                    </el-button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { getSubDict } from '@/api/common.js'
import backButton from '@/components/homePageCommon/backButton.vue'
import { baseInfoDetail, getProvice, saveEditInfo, getCity } from '@/api/userInfo.js'
import { getUserInfo } from '@/api/user'
// const id = 0
export default {
  name: 'edit-info',
  components: { backButton },
  data () {
    const validateEnterpriseName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入企业名称'))
      } else {
        callback()
      }
    }
    const validateContactsName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人'))
      } else {
        callback()
      }
    }
    const validateNickName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else {
        callback()
      }
    }
    const validateBusinessScope = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择行业类型'))
      } else {
        callback()
      }
    }
    const validateEnterpriseDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再输入主营业务'))
      } else {
        callback()
      }
    }
    const validateEnterprisePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再输入联系电话'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        enterpriseName: [
          { validator: validateEnterpriseName, trigger: 'blur' }
        ],
        contactsName: [
          { validator: validateContactsName, trigger: 'blur' }
        ],
        nickName: [
          { validator: validateNickName, trigger: 'blur' }
        ],
        businessScope: [
          { validator: validateBusinessScope, trigger: 'blur' }
        ],
        enterpriseDesc: [
          { validator: validateEnterpriseDesc, trigger: 'blur' }
        ],
        enterprisePhone: [
          { validator: validateEnterprisePhone, trigger: 'blur' }
        ]
      },
      myAddress: [],
      infoForm: {
        resource: '企业、其他组织',
        enterpriseName: '',
        contactsName: '',
        nickName: '',
        businessScope: '',
        enterpriseDesc: '',
        website: '',
        province: '210000',
        city: '210100',
        county: '210103',
        enterpriseAddress: '',
        enterprisePhone: ''
      },
      options: [],
      provice: '',
      cateListProps: {
        value: 'value',                 // 匹配响应数据中的id
        label: 'label',               // 匹配响应数据中的name
        children: 'children'         // 匹配响应数据中的children
      },
      busList: {},
      isBack: false
    }
  },
  activated () {
  },
  mounted () {
    this.getZoning()
    this.init()
  },
  methods: {
    init () {
      this.getBus()
      this.getBaseInfo()
    },
    changefn (val) {
      this.infoForm.province = val[0]
      this.infoForm.city = val[1]
      this.infoForm.county = val[2]
      // this.myAddress = '你大爷'
    },
    /** 初始化 省份获取* */
    getZoning (val, type) {
      const self = this
      getProvice().then((res) => {
        self.options = res.data
        self.options.map((item, index) => {
          item.label = item.name
          item.children = []
          item.value = item.id
        })
      }).catch(() => {

      })
    },
    // 二级三级地址获取
    handleItemChange (val) {
      const that = this
      let idArea = ''
      if (val.length === 1) {
        idArea = val[0]
      } else if (val.length === 2) {
        idArea = val[1]
      }
      return new Promise((resolve) => {
        getCity({ parentCode: idArea }).then((res) => {
          if (val.length === 1) {
            that.options.map((value, i) => {
              if (value.id === val[0]) {
                value.children = res.data
                value.children.map((item, index) => {
                  item.label = item.name
                  item.children = []
                  item.value = item.id
                })
              }
            })
            that.options = that.options.slice(0)
          } else if (val.length === 2) {
            that.options.map((value, i) => {
              value.children.map((item, index) => {
                if (item.id === val[1]) {
                  item.children = res.data
                  item.children.map((item, index) => {
                    item.label = item.name
                    item.value = item.id
                  })
                }
              })
            })
            that.options = that.options.slice(0)
          }
          this.$nextTick(() => {
            resolve(res)
          })
        })
      })
    },
    // 获取主要行业应用j
    getBus () {
      getSubDict({ code: 'businessScope' }).then((res) => {
        if (res.code === 0) {
          this.busList = res.data
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
    // 获取回显信息
    getBaseInfo () {
      const that = this

      baseInfoDetail().then((res) => {
        if (res.code === 0) {
          res.data.identification = '20'
          this.infoForm = res.data
          if (res.data.province !== '') {
            this.handleItemChange([res.data.province]).then((res1) => {
              this.handleItemChange([res.data.province, res.data.city]).then(res2 => {
                that.myAddress = []
                that.isBack = false
                const myAddress = []
                myAddress.push(res.data.province)
                myAddress.push(res.data.city)
                myAddress.push(res.data.county)
                that.options = that.options.slice(0)

                that.myAddress = [].concat(myAddress)
                that.isBack = true
              })
            })
          } else {
            this.handleItemChange(['110000']).then((res1) => {
              this.handleItemChange(['110000', '110100']).then(res2 => {
                that.isBack = true
              })
            })
          }
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
    // 获取省
    async getProvice () {
      getProvice().then((res) => {
      }).catch(() => {

      })
    },
    // 保存编辑信息
    editInfoButton (infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          saveEditInfo(this.infoForm).then((res) => {
            if (res.code === 0) {
              const params = {
                access_token: localStorage.getItem('token').access_token
              }
              getUserInfo(params).then((res) => {
                if (res.code === '0') {
                  this.$store.commit('SET_MY_USER', res.user.nickname)
                  localStorage.setItem('userInfo', JSON.stringify(res.user))
                }
              })
              this.$message({
                message: '修改成功',
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
    // 取消按钮点击事件
    removeEdit () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.edit-address{
  .el-form-item__content{
    display: flex;
}
}
.edit-info-box{
    padding: 0 20px 20px;
    font-size: 14px;
    height: calc(100% - 20px);
    .edit-info-main{
        height: calc(100% - 44px);
        background-color: #F8F9FB;
        margin: 10px 0 0 0;
        padding: 20px;
        .edit-button{
            display: flex;
            justify-content: center;
            margin: 40px 0 0 0;
        }
        .edit-form-left{
            display: flex;
            width: 100%;
            .form-left-box{
                padding: 20px;
                background-color: #F2F3F7;
                width: 100%;
                .form-left-header{
                    font-weight: 600;
                }
            }
        }
        .edit-form-right{
            display: flex;
            width: 100%;
            .form-right-box{
                background-color: #F2F3F7;
                width: 100%;
                padding: 20px;
                .form-right-header{
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
