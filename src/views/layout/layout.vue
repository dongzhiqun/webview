<template>
  <div style="width:100%;height:100%"
       :class="hiddenMenu?'hiddenMenu':''">
    <SideBar class="sideBox" />
    <div class="appBox">
      <HeaderTop />
      <transition name='fade'
                  mode='out-in'>
        <div class="app-main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive === 'true'">
            </router-view>
          </keep-alive>
          <router-view v-if="$route.meta.keepAlive === undefined ||$route.meta.keepAlive === null||$route.meta.keepAlive === 'false'">
          </router-view>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import SideBar from '@/components/Sidebar/SideBar.vue'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
export default {
  name: 'Layout',
  components: { SideBar, HeaderTop },
  data () {
    return {
      hiddenMenu: false
    }
  },
  watch: {
    $route () {
      // console.log(this.$route.meta.keepAlive)
    },
    '$store.state.hiddenMenu' () {
      this.hiddenMenu = this.$store.state.hiddenMenu
    }
  }
}
</script>
