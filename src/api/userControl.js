import service from '@/utils/request'

// 获取实名认证审核列表方法
export function getrealNameUserList (params) {
  return service({
    url: '/osg-ocp-user0001/personAuthHandle/getEnterpriseAuthList',
    method: 'get',
    params
  })
}

// 获取用户列表方法
export function getUserList (params) {
  return service({
    url: '/osg-ocp-user0001/usermanage/devusers',
    method: 'get',
    params
  })
}

// 获取用户详情方法
export function getUserDetail (params, id) {
  return service({
    url: '/osg-ocp-user0001/usermanage/findUserDetailsById/' + id,
    method: 'get',
    params
  })
}

// 获取实名认证详情方法
export function getrealNameDetail (params, id) {
  return service({
    url: '/osg-ocp-user0001/personAuthHandle/getEnterpriseAuthInfoById/' + id,
    method: 'get',
    params
  })
}

// 获取实名认证详情审核列表方法
export function getrealNameDetailCheckArr (params, id) {
  return service({
    url: '/osg-ocp-user0001/personAuthHandle/getEnterAuditRecordById/' + id,
    method: 'get',
    params
  })
}

// 获取用户详情审核列表方法
export function getUserDetailCheckArr (params, id) {
  return service({
    url: '/osg-ocp-user0001/personAuthHandle/getEnterAuditRecordById/' + id,
    method: 'get',
    params
  })
}

// 审核提交方法方法
export function updataCheckStatus (params) {
  return service({
    url: '/osg-ocp-user0001/personAuthHandle/enterPriseAuditPassOrReject',
    method: 'post',
    params
  })
}

// 更新密码方法
export function updataPassword (params) {
  return service({
    url: '/osg-ocp-user0001/usermanage/updatePassword',
    method: 'post',
    params
  })
}

// 锁定解锁用户方法
export function lockUser (params) {
  return service({
    url: '/osg-ocp-user0001/usermanage/lockOrUnlockUserState',
    method: 'post',
    params
  })
}

// 添加用户方法
export function userUpdate (params) {
  return service({
    url: '/osg-ocp-user0001/usermanage/saveOrUpdate',
    method: 'post',
    params
  })
}
// 管理平台实名认证方法
export function saveAuthInfo (params) {
  return service({
    url: 'osg-ocp-user0001/enterpriseinfo/saveAuthInfo',
    method: 'post',
    params
  })
}
