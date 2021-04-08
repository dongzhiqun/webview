<template>
  <div class="mainTabCom">
    <el-tabs v-model='tabsOnValue'
             closable
             @tab-click="handleChangeTab"
             @tab-remove='removeTab'>
      <el-tab-pane v-for="(item) in tabsValue"
                   :key='item.resetPath'
                   :label="item.meta.title"
                   :name='item.resetPath'>
        {{item.meta.title}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'tabCom',
  data () {
    return {
      tabsOnValue: '/index',
      tabsValue: []
    }
  },
  watch: {
    '$store.state.onOpenTabId': {
      handler () {
        this.tabsOnValue = this.$store.state.onOpenTabId
        this.$router.push(this.$store.state.onOpenTabId)
      },
      immediate: true
    },
    '$store.state.menuTabStore': {
      handler () {
        if (this.$store.state.menuTabStore.length === 0) {
          this.tabsValue = JSON.parse(localStorage.getItem('tabList'))
        } else {
          this.tabsValue = this.$store.state.menuTabStore
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.tabsOnValue = localStorage.getItem('onOpenTabId')
  },
  methods: {
    // 切换tab方法
    handleChangeTab (tab, event) {
      this.$store.commit('CHANGEMENUTAB', tab.name)
      this.$router.push(tab.name)
    },
    // 移除tab方法
    removeTab (tab) {
      this.$store.commit('REMOVEMENUTAB', tab)
    }
  }
}
</script>
