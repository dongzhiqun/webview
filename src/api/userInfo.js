import service from '@/utils/request'
// import qs from 'qs'

// 获取用户资料
export function getUserName (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/getBaseInfo',
    method: 'post',
    params
  })
}

// 获取审核状态
export function getAuditInfo (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/getAuditInfo',
    method: 'post',
    params
  })
}

// 基本信息编辑回显
export function baseInfoDetail (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/baseInfoDetail',
    method: 'post',
    params
  })
}

// 获取省份
export function getProvice (params) {
  return service({
    url: '/api-developer0001/addressInfo/firstLevel',
    method: 'post',
    params
  })
}

// 获取市 区
export function getCity (params) {
  return service({
    url: '/api-developer0001/addressInfo/childList',
    method: 'post',
    params
  })
}

// 保存修改信息
export function saveEditInfo (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/saveBaseInfo',
    method: 'post',
    params
  })
}

// 获取之前审核信息
export function getRealNameDetil (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/authDetail',
    method: 'post',
    params
  })
}

// 审核接口
export function saveRealName (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/saveAuthInfo',
    method: 'post',
    params
  })
}

// 修改密码 验证接口
export function valdatePass (params) {
  let url = ''
  if (params.type === '20') {
    url = '/api-developer0001/updatePhoneFirstSetp'
  } else {
    url = '/api-developer0001/updatePasswordFirstSetp'
  }
  return service({
    url: url,
    method: 'post',
    params
  })
}

// 修改新密码接口
export function saveNewPass (params) {
  return service({
    url: '/api-developer0001/updatePasswordSecSetp',
    method: 'post',
    params
  })
}

// 修改手机号接口
export function saveNewPhone (params) {
  return service({
    url: '/api-developer0001/updatePhoneSecSetp',
    method: 'post',
    params
  })
}

// 图片下载
export function downloadFile (params) {
  return service({
    url: '/api-developer0001/commonFile/downloadFile',
    method: 'get',
    // responseType: 'arraybuffer',
    params
  })
}

// 头像保存接口
export function saveHeaderFile (params) {
  return service({
    url: '/api-developer0001/enterpriseinfo/saveHeadImgUrl',
    method: 'post',
    params
  })
}
