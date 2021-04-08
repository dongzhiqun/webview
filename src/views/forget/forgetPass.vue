<template>
  <div class="app-reg-success" >
      <homeHeader />
      <div class="forget-pass-box">
          <span @click="goBack()"><i class="el-icon-arrow-left"></i>返回</span>
          <p>忘记密码</p>
          <ul>
            <li class="forget-porgess-one forget-porgess-active">
              <span>01</span>
              <span>填写账户名</span>
            </li>
            <li :class="[this.$store.getters.progessNum == 'two' || this.$store.getters.progessNum == 'three' || this.$store.getters.progessNum == 'foure'?'forget-porgess-active':'','forget-porgess-two']">
              <span>02</span>
              <span>验证身份</span>
            </li>
             <li :class="[this.$store.getters.progessNum == 'three' || this.$store.getters.progessNum == 'foure'?'forget-porgess-active':'','forget-porgess-three']">
              <span>03</span>
              <span>设置新密码</span>
            </li>
             <li :class="[this.$store.getters.progessNum == 'foure'?'forget-porgess-active':'','forget-porgess-foure']">
              <span>04</span>
              <span>完成</span>
            </li>
          </ul>
          <router-view></router-view>
      </div>
      <homeFooter class="forget-footer" />
  </div>
</template>
<script>
import homeHeader from '@/components/homePageCommon/homeHeader.vue'
import homeFooter from '@/components/homePageCommon/homeFooter.vue'
export default {
  name: 'forget-pass',
  components: { homeHeader, homeFooter },
  mounted () {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
.app-reg-success{
  height: 100%;
}
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
.forget-pass-box{
    width: 1200px;
    height: calc(100% - 235px);
    margin: 40px auto 0;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    span{
      float: right;
      font-size: 12px;
      cursor: pointer;
    }
    p{
      font-size: 16px;
      font-weight: 600;
    }
    ul,li{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul{
      width: 800px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 40px auto 50px;
      li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        span:nth-child(1){
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #BFBFBF;
          color: #BFBFBF;
        }
        span:nth-child(2){
          margin: 10px 0 0 0;
        }
      }
      .forget-porgess-one span:nth-child(1)::after{
          content: '';
          width: 92px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: 62px;
          top: 30px;
      }
      .forget-porgess-two span:nth-child(1)::before{
          content: '';
          width: 92px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: -92px;
          top: 30px;
      }
      .forget-porgess-two span:nth-child(1)::after{
          content: '';
          width: 93px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: 62px;
          top: 30px;
      }
      .forget-porgess-three span:nth-child(1)::before{
          content: '';
          width: 92px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: -92px;
          top: 30px;
      }
      .forget-porgess-three span:nth-child(1)::after{
          content: '';
          width: 92px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: 62px;
          top: 30px;
      }
      .forget-porgess-foure span:nth-child(1)::before{
          content: '';
          width: 92px;
          height: 1px;
          background: #BFBFBF;
          position: absolute;
          left: -92px;
          top: 30px;
      }
      .forget-porgess-active span:nth-child(1){
          background-color: #64A998;
          color: white;
          border-color: #64A998;
      }
      .forget-porgess-active span:nth-child(2){
          color: #64A998;
      }
      .forget-porgess-active span:nth-child(1)::after,.forget-porgess-active span:nth-child(1)::before{
          background-color: #64A998;
      }
    }
}
.forget-footer{
  color: #595959;
}
</style>
