<template>
  <div class="app-home-header" >
      <div class="home-header-main">
        <div class="home-herder-logo">
          <img src="@/assets/JxtLogo.png" alt="">
          <span>聚星塔-网上国网开放平台</span>
        </div>
        <el-menu :background-color="'#ffffff'"
                 :text-color="'#595959'"
                 :active-text-color="'#88CDAF'"
         class="home-header-menue" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">网站首页</el-menu-item>
          <el-menu-item index="2" disabled>联系我们</el-menu-item>
          <el-menu-item index="3" disabled>最新活动</el-menu-item>
          <el-menu-item index="4" disabled><a href="javascript:void(0);" target="_blank">产品分离</a></el-menu-item>
        </el-menu>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'home-header',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        axios.get('/address/getCenterWebAddr').then(res => {
          window.open(res.data)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-home-header{
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .home-header-main{
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .home-herder-logo{
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: auto;
      }
    }
    .home-header-menue{
      border: none;
      font-weight: 600;
      a{
          text-decoration:none;
      }
      .el-menu-item:hover {
        background-color: #ffffff !important;
        color: #88CDAF !important;
      }
    }
  }
}
</style>
