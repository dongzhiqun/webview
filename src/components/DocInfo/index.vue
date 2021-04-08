<template>
  <div class="docInfo">
    <h2>{{info.title}}</h2>
    <el-row>
      <el-col>
        <span v-if="info.version!==undefined&&info.version!==null">版本号：</span>
        <span class="versionSpan">{{info.version}}</span>
        <span v-if="info.updateTime!==undefined&&info.updateTime!==null">更新时间：</span>
        <span>{{info.updateTime}}</span>
      </el-col>
    </el-row>
    <div class="ql-snow">
      <div class="ql-editor">
        <div v-html="info.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'DocumentInfo',
  watch: {
    '$props.info': {
      handler (nVal, oVal) {
        if (this.isBase64(nVal.content)) {
          this.info.content = decodeURI(window.atob(nVal.content))
        }
      },
      immediate: true
    }
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    useInfo: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    isBase64 (str) {
      if (str === '') {
        return false
      }
      try {
        return btoa(encodeURI(decodeURI(atob(str)))) === str
      } catch (err) {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.docInfo {
  box-sizing: border-box;
  border: 1px solid #979797;
  border-radius: 4px;
  padding: 0 20px 20px;
  h2 {
    margin-left: 20px;
    margin-bottom: 5px;
  }
  .el-row {
    margin-left: 20px;
    font-size: 14px;
  }
}
.versionSpan {
  display: inline-block;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
