import service from '@/utils/request'

// 能力订阅审核列表
export function getCapsSubList (params) {
  return service({
    url: '/osg-ocp-user0001/accSubInfo/getCapsSubList',
    method: 'get',
    params
  })
}

// 能力订阅审核应用信息
export function getClientDetailsByClientId (params) {
  return service({
    url: '/osg-ocp-user0001/accSubInfo/getClientDetailsByClientId',
    method: 'get',
    params
  })
}

// 能力订阅审核应用列表
export function getSubscribeDetailsList (params) {
  return service({
    url: '/osg-ocp-user0001/accSubInfo/getSubscribeDetailsList',
    method: 'get',
    params
  })
}

// 订阅审核接口
export function subscribeRequestPassOrReject (params) {
  return service({
    url: '/osg-ocp-user0001/accSubInfo/subscribeRequestPassOrReject',
    method: 'post',
    params
  })
}

// 订阅人信息接口
export function getSubInfoByUserName (params) {
  return service({
    url: '/osg-ocp-user0001/accSubInfo/getSubInfoByUserName',
    method: 'get',
    params
  })
}
