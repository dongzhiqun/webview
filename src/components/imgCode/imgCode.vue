<template>
  <div class="app-img-code" >
     <img :src="imgurl" alt="" @click="getImgCode()">
  </div>
</template>
<script>
import '@/utils/Math.uuid.js'
export default {
  name: 'img-code',
  data () {
    return {
      imgurl: 'www.baidu.com'
    }
  },
  mounted () {
    this.getImgCode()
  },
  methods: {
    getImgCode () {
      this.deviceId = Math.uuid()
      this.imgurl = localStorage.getItem('baseUrl') + '/osg-ocp-developer0001/validata/code/' + this.deviceId
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
