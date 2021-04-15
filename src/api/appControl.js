import service from '@/utils/request'
// 应用管理

// 获取应用列表方法
export function getAppList (params) {
  return service({
    url: '/osg-ocp-auth0001/clients/list',
    method: 'get',
    params
  })
}

// 获取应用详情方法
export function getAppDetail (params) {
  return service({
    url: '/api/usermanage/devusers',
    method: 'get',
    params
  })
}

// 获取应用订阅列表方法
export function getAppSubscribeList (params) {
  return service({
    url: '/api/accSubInfo/getAppSubscribeDetails',
    method: 'get',
    params
  })
}

// 获取应用订阅统计方法
export function getAppSubscribeCount (params) {
  return service({
    url: '/api/accSubInfo/getAppSubscribeDetailsCount',
    method: 'get',
    params
  })
}

// 更新应用状态
export function updateAppStatus (params) {
  return service({
    url: '/osg-ocp-auth0001/clients/updateEnabled',
    method: 'put',
    params
  })
}

// 获取能力详情方法
export function getCapInfo (params, capCode) {
  return service({
    url: '/api/capacities/getCapacityByCapCode/' + capCode,
    method: 'get',
    params
  })
}

// 获取应用分类方法
export function getAppType (params) {
  return service({
    url: '/api/appType/findAllListAppType',
    method: 'get',
    params
  })
}

export function findAllListAppType () {
  return service({
    url: '/api/appType/findAllListAppType',
    method: 'get'
  })
}

export function findListAppType (params) {
  return service({
    url: '/api/appType/findListAppType',
    method: 'get',
    params
  })
}

export function insertAppType (params) {
  return service({
    url: '/api/appType/insertAppType',
    method: 'post',
    params
  })
}

export function updateAppTypeById (params) {
  return service({
    url: '/api/appType/updateAppTypeById',
    method: 'post',
    params
  })
}

export function deleteAppTypeById (params) {
  return service({
    url: `/api/appType/deleteAppTypeById/${params.id}/${params.appTypeCode}`,
    method: 'delete'
  })
}
