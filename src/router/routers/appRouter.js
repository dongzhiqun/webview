import Layout from '@/views/layout/layout'

// 能力资源管理路由对象
const appRouter = {
  path: '/appManage',
  name: 'appManage',
  meta: { title: 'ISV应用管理11111' },
  component: Layout,
  children: [
    {
      path: 'appManageMain',
      name: 'appManageMain',
      component: () => import('@/views/AppManage/appManageMain.vue'),
      meta: {
        title: '应用管理', icon: ''
      }
    },
    {
      path: 'abilityCheck',
      name: 'abilityCheck',
      component: () => import('@/views/AppManage/abilityCheck/abilityCheck.vue'),
      meta: {
        title: '能力订阅审核', icon: ''
      }
    }
  ]
}

export default appRouter
