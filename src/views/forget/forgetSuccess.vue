<template>
  <div class="forget-pass-success" >
     <div class="reg-success-box">
        <div class="reg-success-main">
            <div class="reg-success-img"><img src="@/assets/ico_success.png" alt=""></div>
            <p class="reg-success-title">密码重置成功！</p>
            <p>下次请使用新密码进行登录</p>
            <el-button type="primary"
                        @click="goLogin"
                        class="reg-success-button"
                        >返回登录页</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resert-success',
  mounted () {
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
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
