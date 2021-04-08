<template>
  <div @click="backHistroy" class="back-button"><i class="el-icon-arrow-left"></i>返回</div>
</template>

<script>
export default {
  name: 'back-button',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    backHistroy () {
      if (this.url === '' || this.url === null) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.url)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.back-button{
    cursor: pointer;
}
</style>
