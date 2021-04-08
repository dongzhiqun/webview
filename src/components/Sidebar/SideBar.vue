<template>
  <div>
    <div class="logoBox">
        <img src="@/assets/JxtLogo.png" alt="">
        <span>网上国网开放平台</span>
    </div>
    <sideMenu />
    <div class="log-out" @click="logOut">
      <i class="el-icon-switch-button"></i>
      <span>退出</span>
    </div>
  </div>
</template>
<script>
import sideMenu from './SideMenu'
export default {
  name: 'SideBar',
  components: { sideMenu },
  methods: {
    logOut () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style lang="scss" scoped>
.logoBox{
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  align-items: center;
  img{
    width: 36px;
    height: 36px;
  }
  span{
    margin-left: 5px;
  }
}
.log-out{
  cursor: pointer;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #565656;
  i{
    font-size: 30px;
  }
  span{
      margin: 0 0 0 5px;
    }
}
</style>
