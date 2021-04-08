<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'applation-list',
  data () {
    return {

    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.$store.state.onOpenTabId = val.path
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-tooltip__popper {
  max-width: 60% !important;
}
</style>
