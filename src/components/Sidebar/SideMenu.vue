<template>
  <div>
    <el-menu :collapse="isCollapse"
             :unique-opened='opened'
             ref='menu'
             :default-active='onOpenMenuIndex'>
      <template v-for="(item,index) in menuArr">
        <el-menu-item :key="index"
                      :index="index.toString()"
                      v-if='item.children === undefined || item.children.length === 0'
                      @click="handleChangePath(item.path,item,index)">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-menu-item :key="index"
                      :index="index.toString()"
                      v-else-if='item.path ==="/"'
                      @click="handleChangePath('/'+item.children[0].path,item,index)">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-menu-item :key="index"
                      :index="index.toString()"
                      v-else-if='item.children.length == 1'
                      @click="handleChangePath(item.path+'/'+item.children[0].path,item,index)">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu :key="index"
                    :index="index.toString()"
                    v-else>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <template v-for="(i,iindex) in item.children">
          <el-menu-item :index="index.toString()+'-'+iindex.toString()"
                        :key="iindex"
                        v-if='i.show!==false'
                        @click="handleChangePath(item.path+'/'+i.path,i,index.toString()+'-'+iindex.toString())">{{i.meta.title}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'sideMenu',
  data () {
    return {
      opened: true,
      onOpenMenuIndex: null,
      menuArr: []
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.hiddenMenu
    }
  },
  watch: {
    '$store.state.menuStore': {
      handler () {
        this.menuArr = this.$router.options.routes.filter(i => {
          return i.show !== false
        })
      },
      immediate: true
    },
    '$store.state.onOpenMenuIndex': {
      handler () {
        this.onOpenMenuIndex = this.$store.state.onOpenMenuIndex
      },
      immediate: true
    },
    $route: {
      handler: function (val, oldVal) {
        console.log(val)
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted () {
    // 数组来源在动态菜单之后也要优化
    this.onOpenMenuIndex = localStorage.getItem('onOpenMenuIndex')
    this.menuArr = this.$router.options.routes.filter(i => {
      return i.show !== false
    })
  },
  methods: {
    handleChangePath (path, item, index) {
      item.resetPath = path
      isNaN(index) ? item.index = index : item.index = index.toString()
      this.$store.commit('ADDMENUTAB', item)
    }
  }
}
</script>
