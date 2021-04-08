<template>
  <div>
    <applation/>
  </div>
</template>

<script>
import applation from '@/views/applation/applation.vue'
export default {
  name: 'sand-box',
  components: { applation },
  mounted () {
    // this.$store.dispatch('getSandBox', 1)
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === '应用详情') {
      to.meta.isUseCache = false
    }
    next()
  }
}
</script>

<style>

</style>
