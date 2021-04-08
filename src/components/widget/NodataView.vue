<template>
  <div class="nodata-wrap">
    <el-row type="flex" justify="center" style="height: 100%">
      <el-image ref="image" :src="url" fit="contain"/>
    </el-row>
    <span :style="style">{{ text }}</span>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'NodataView',
  props: {
    text: {
      type: String,
      required: false,
      default: '当前查询条件下无数据'
    }
  },
  computed: {
    style () {
      return {
        position: 'relative',
        top: '-' + ((this.imageHeight / 2) - 160) + 'px'
      }
    }
  },
  data: () => {
    return {
      url: require('@/assets/ico_wumulu.png'),
      imageHeight: 0
    }
  },
  methods: {
    setImageHeight: _.debounce(function () {
      this.imageHeight = this.$refs?.image.$el.offsetHeight
    }, 500),
    windowResizeListener () {
      // noinspection JSValidateTypes
      this.setImageHeight()
    }
  },
  async mounted () {
    this.imageHeight = this.$refs?.image.$el.offsetHeight
    window.addEventListener('resize', this.windowResizeListener)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeListener)
  }
}
</script>
<style lang="scss" scoped>
.nodata-wrap {
  height: calc(100vh - 240px);
  text-align: center;
}
</style>
