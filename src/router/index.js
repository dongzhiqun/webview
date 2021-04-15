import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout'
// import personCenter from '@/router/routers/personCenter'
// import applation from '@/router/routers/applation'
// import sandBox from '@/router/routers/sandBox'

// push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(VueRouter)

// show:判断是否展示在菜单栏
const routes = [
  {
    path: '/',
    name: 'Home',
    show: false,
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页', icon: ''
    },
    children: [
      {
        path: 'index',
        name: '首页',
        meta: {
          title: '首页', icon: ''
        },
        component: () => import('@/views/viewModel/viewModel.vue')
      }
    ]
  },
  {
    path: '/com',
    meta: {
      title: '组件', icon: ''
    },
    show: true,
    component: Layout,
    redirect: '/com/table',
    children: [
      {
        path: 'table',
        name: 'table表格',
        meta: {
          title: 'table表格', icon: ''
        },
        component: () => import('@/views/Table/index.vue')
      },
      {
        path: 'form',
        name: 'form表单',
        meta: {
          title: 'form表单', icon: ''
        },
        component: () => import('@/views/Form/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    show: false,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/regUser',
    name: 'regUser',
    show: false,
    component: () => import('@/views/reg/regUser')
  },
  {
    path: '/regSuccess',
    name: 'regSuccess',
    show: false,
    component: () => import('@/views/reg/regSuccess')
  },
  {
    path: '/forgetPass',
    name: 'forgetPass',
    show: false,
    component: () => import('@/views/forget/forgetPass'),
    redirect: '/forgetPass/forgetPassOne',
    children: [
      {
        path: 'forgetPassOne',
        component: () => import('@/views/forget/forgetPassOne'),
        name: 'forgetPassOne',
        meta: {
          title: '填写账户名'
        }
      },
      {
        path: 'forgetPassTwo',
        component: () => import('@/views/forget/forgetPassTwo'),
        name: 'forgetPassTwo',
        meta: {
          title: '验证身份'
        }
      },
      {
        path: 'resertPass',
        component: () => import('@/views/forget/resertPass'),
        name: 'resertPass',
        meta: {
          title: '密码重置'
        }
      },
      {
        path: 'resertSuccess',
        component: () => import('@/views/forget/forgetSuccess'),
        name: 'resertSuccess',
        meta: {
          title: '密码重置成功'
        }
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
