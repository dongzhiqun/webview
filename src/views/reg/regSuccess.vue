<template>
  <div class="app-reg-success" >
      <homeHeader />
      <div class="reg-success-box">
        <div class="reg-success-main">
            <div class="reg-success-img"><img src="@/assets/ico_success.png" alt=""></div>
            <p class="reg-success-title">恭喜注册成功</p>
            <p>请妥善保管您的账户</p>
            <p><span class="down-time">{{time}}</span> S后自动跳转至登录页</p>
            <el-button type="primary"
                        @click="goLogin"
                        class="reg-success-button"
                        >返回登录页</el-button>
        </div>
      </div>
      <homeFooter />
  </div>
</template>
<script>
import homeHeader from '@/components/homePageCommon/homeHeader.vue'
import homeFooter from '@/components/homePageCommon/homeFooter.vue'
export default {
  name: 'reg-success',
  components: { homeHeader, homeFooter },
  data () {
    return {
      time: 5
    }
  },
  mounted () {
    this.cunDown()
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    cunDown () {
      const that = this
      setInterval(function () {
        that.time--
        if (that.time === 0) {
          that.$router.push('/login')
        }
      }, 1000)
    }
  }
}
</script>
<style lang='scss' scoped>
.app-reg-success{
    height: 100%;
    .app-home-footer{
        color: #595959;
    }
}
.reg-success-box{
    width: 1200px;
    margin: 0 auto;
    height: calc(100% - 190px);
    background-color: #fff;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .reg-success-main{
        display: flex;
        flex-direction: column;
        align-items: center;
        div{
            img{
                width: 125px;
            }
        }
        p{
            color: #8C8C8C;
            margin: 0;
            font-size: 14px;
        }
        .reg-success-title{
            color: #64A998;
            font-size: 16px;
            font-weight: 600;
            margin: 20px 0;
        }
        .reg-success-button{
            margin: 20px 0 0 0;
        }
    }
}
</style>
