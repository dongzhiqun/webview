import Layout from '@/views/layout/layout'

// 后台管理路由对象
const applation = {
  path: '/applation',
  name: 'applation',
  meta: { title: '应用管理', icon: 'el-icon-files' },
  component: Layout,
  children: [
    {
      path: 'applationList',
      name: 'applationList',
      show: true,
      component: () => import('@/views/applation/applation.vue'),
      meta: {
        title: '应用列表', icon: ''
      }
    },
    {
      path: 'creatApplation',
      name: 'creatApplation',
      show: false,
      component: () => import('@/views/applation/creatApplation.vue'),
      meta: {
        title: '应用创建', icon: ''
      }
    },
    {
      path: 'ablitySub',
      name: 'ablitySub',
      show: false,
      component: () => import('@/views/applation/ablitySub.vue'),
      meta: {
        title: '订阅列表', icon: ''
      }
    },
    {
      path: 'ablitySubAdd',
      name: 'ablitySubAdd',
      show: false,
      component: () => import('@/views/applation/ablitySubAdd.vue'),
      meta: {
        title: '添加能力', icon: ''
      }
    },
    {
      path: 'applationDetail',
      name: 'applationDetail',
      show: false,
      component: () => import('@/views/applation/applationDetail.vue'),
      meta: {
        title: '应用详情', icon: ''
      }
    },
    {
      path: 'ablityDetail',
      name: 'ablityDetail',
      show: false,
      component: () => import('@/views/applation/ablityDetail.vue'),
      meta: {
        title: '能力详情', icon: ''
      }
    },
    {
      path: 'statusApplation',
      name: 'statusApplation',
      show: false,
      component: () => import('@/views/applation/statusApplation.vue'),
      meta: {
        title: '能力订阅结果列表', icon: ''
      }
    }
  ]
}

export default applation
