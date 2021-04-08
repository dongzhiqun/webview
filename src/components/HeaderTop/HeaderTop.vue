<template>
  <div class="headerTopBox">
    <div class="headerFunc">
      <i class="el-icon-s-fold showHiddenIcon"
         @click="showHiddenSilder"></i>
      <span class="userFuncBox">
        <img :src="imageUrl?imageUrl:defulImg" alt="">{{this.$store.getters.myUser}}</span>
    </div>
    <tabCom class="tabCom" />
  </div>
</template>
<script>
import defulImg from '../../assets/ico_moren.png'
import { downloadFile } from '@/api/userInfo.js'
import tabCom from '../TabCom/TabCom'
export default {
  name: 'HeaderTop',
  components: { tabCom },
  data () {
    return {
      nickName: '',
      imageUrl: '',
      defulImg: defulImg
    }
  },
  watch: {
    '$store.getters.myPhoto': {
      handler () {
        if (this.$store.getters.myPhoto) {
          downloadFile({ filename: this.$store.getters.myPhoto }).then((res) => {
            let str = res.replace(/\. +/g, '')
            str = str.replace(/[\r\n]/g, '')
            this.imageUrl = 'data:image/png;base64,' + str
          })
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.nickName = JSON.parse(localStorage.getItem('userInfo')).nickname
    // if (this.$store.getters.myPhoto) {
    //   downloadFile({ filename: this.$store.getters.myPhoto }).then((res) => {
    //     let str = res.replace(/\. +/g, '')
    //     str = str.replace(/[\r\n]/g, '')
    //     this.imageUrl = 'data:image/png;base64,' + str
    //   })
    // }
  },
  methods: {
    handleClick (command) {
      if (command === 'logout') {
        this.handleLogout()
      }
    },
    // 登出方法
    handleLogout () {
      this.$store.dispatch('logout')
    },
    // 显示缩小菜单栏
    showHiddenSilder () {
      this.$store.commit('TOGGLEHIDDENMENU')
    }
  }
}
</script>
<style lang='scss' scoped>
.userNameBox {
  font-size: 16px;
}
.headerFunc {
  line-height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 20px;
}
.userFuncBox{
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
}
.userFuncBox img{
  margin: 0 10px 0 0;
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  bottom: 0;
  -o-object-fit: fill;
  object-fit: fill;
  border-radius: 50%;
}
.tabCom {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  display: none;
}
</style>
