<template>
  <div class="sec-set-box">
    <div class="sec-set-main">
      <div class="sec-set-title">安全设置</div>
      <div class="sec-set-header">
        <div class="sec-set-user">
          <img :src="imgurl"
               alt="">
          <span>{{secInfo.nickName}}</span>
        </div>
        <div class="sec-user-info">
          <p>登录账号：<span>{{secInfo.userName}}</span> </p>
          <p>绑定手机：<span>{{secInfo.phone}}</span></p>
          <p>注册时间：<span>{{secInfo.createTimeStr}}</span></p>
        </div>
      </div>
      <div class="sec-catagary-box">
        <div>
          <div>
            <div>登录密码<span>已设置</span></div>
            <div class="sec-catagrry-body">
              <p>安全性好的密码可使账号更安全。</p>
              <p>建议您定期更换密码，设置6至12位登录密码，包含字母/数字/标点符号（除空格）至少包含2种</p>
            </div>
          </div>
          <p @click="goEditPAss(30)">修改</p>
        </div>
        <div>
          <div>
            <div>手机绑定<span>已设置</span></div>
            <div class="sec-catagrry-body">
              <p>您已绑定了手机号{{secInfo.phone}}</p>
            </div>
          </div>
          <p @click="goEditPhone(20)">修改</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defulImg from '../../assets/ico_moren.png'
import { getUserName, downloadFile } from '@/api/userInfo.js'
export default {
  name: 'sec-set',
  data () {
    return {
      imgurl: '',
      defulImg: defulImg,
      secInfo: {
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      // this.getBaseInfo()
    },
    // 获取基本信息
    getBaseInfo () {
      getUserName().then((res) => {
        this.secInfo = res.data
        if (this.$store.getters.myPhoto) {
          downloadFile({ filename: this.$store.getters.myPhoto }).then((res) => {
            let str = res.replace(/\. +/g, '')
            str = str.replace(/[\r\n]/g, '')
            this.imgurl = 'data:image/png;base64,' + str
          })
        } else {
          this.imgurl = this.defulImg
        }
      }).catch(() => {

      })
    },
    // 跳转密码修改页面
    goEditPAss (param) {
      this.$router.push('/personCenter/secSetingPass')
    },
    // 跳转手机号修改页面
    goEditPhone (parma) {
      this.$router.push('secSetingPhone')
    }
  }
}
</script>

<style lang='scss' scoped>
.sec-set-box {
  padding: 0 20px 20px 20px;
  height: calc(100% - 20px);
  width: calc(100% - 40px);
  color: #595959;
  p {
    margin: 0;
  }
  font-size: 14px;
  .sec-set-main {
    height: calc(100% - 40px);
    background-color: #f8f9fb;
    border-radius: 4px;
    padding: 20px;
    .sec-set-title {
      font-weight: 600;
    }
    .sec-set-header {
      margin: 20px 0 0 0;
      display: flex;
      justify-content: flex-start;
      .sec-set-user {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          -o-object-fit: fill;
          object-fit: fill;
        }
        img[src=""],
        img:not([src]) {
          opacity: 0;
        }
        span {
          font-weight: 600;
          margin: 10px 0 0 0;
        }
      }
      .sec-user-info {
        margin: 0 0 0 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .sec-catagary-box {
      margin: 10px 0 0 0;
      > div {
        border: 1px solid rgba(0, 0, 0, 0);
        margin: 10px 0 0 0;
        background-color: #f2f3f7;
        padding: 20px 60px 20px 20px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          display: flex;
          flex-direction: column;
          div:nth-child(1) {
            font-weight: 600;
            display: flex;
            align-items: center;
            span {
              font-weight: 500;
              color: white;
              font-size: 12px;
              margin: 0 0 0 20px;
              background-color: #64a998;
              border-radius: 4px;
              padding: 2px 5px;
            }
          }
          .sec-catagrry-body {
            display: flex;
            flex-direction: column;
            padding: 0 0 0 20px;
            margin: 10px 0 0 0;
            p {
              line-height: 26px;
            }
          }
        }
        > p {
          width: 100px;
          height: 30px;
          border-radius: 30px;
          color: #64a998;
          border: 1px solid #64a998;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
      > div:hover {
        border: 1px solid #64a998;
      }
    }
  }
}
</style>
