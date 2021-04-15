import service from '@/utils/request'

export function abilityInvokeStatistics (params) {
  return service({
    url: '/api-user0001/invokeLog/abilityInvokeStatistics',
    method: 'get',
    params
  })
}
