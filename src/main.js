import Vue from 'vue'
import 'core-js'
import App from './App.vue'
import router from './router'
import '@/router/permission'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset-element.scss'
import '@/styles/reset.scss'
import '@/styles/index.scss'
// import myCharts from 'echarts'
// 全局组件导入
import NodataView from '@/components/widget/NodataView'
import TreeView from '@/components/OcpTree'
// 全局指令导入
import '@/directives/click-control'
import  VueResource  from 'vue-resource'

Vue.use(VueResource)

Vue.filter('emptyRes', function (value) {
  if (value === '' || value === null) {
    return '--'
  } else {
    return value
  }
})
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(myCharts)
// 全局组件注册
Vue.component('ocp-nodata', NodataView)
Vue.component('ocp-tree', TreeView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
