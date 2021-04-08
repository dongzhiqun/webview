import service from '@/utils/request'

export function abilityInvokeStatistics (params) {
  return service({
    url: '/osg-ocp-user0001/invokeLog/abilityInvokeStatistics',
    method: 'get',
    params
  })
}
