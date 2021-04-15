import service from '@/utils/request'
// import applation from '@/store/applation'
import applation from '@/store'
// 获取已创建应用列表 sand
export function getApplationList (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? '/api-developer0001/sandbox/clients/dev-user-client/list' : '/api-developer0001/clients/dev-user-client/list',
    method: 'post',
    params
  })
}

// 获取新密钥 sand
export function getNewSecret (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? '/api-developer0001/sandbox/clients/getNewSecret/' + params : '/api-developer0001/clients/getNewSecret/' + params,
    method: 'get'
    // params
  })
}

// 更新密钥密钥 sand
export function configNewSecret (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? '/api-developer0001/sandbox/clients/updateSecret/' + params : '/api-developer0001/clients/updateSecret/' + params,
    method: 'get'
    // params
  })
}

// 获取分类树
export function getTreeCate (params) {
  return service({
    url: '/api-developer0001/apptypes/findApptypeAlls',
    method: 'get'
    // params
  })
}

// 保存应用接口 sand
export function saveApplation (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? '/api-developer0001/sandbox/clients/saveOrUpdate' : '/api-developer0001/clients/saveOrUpdate',
    method: 'post',
    params
  })
}

// 应用修改接口 sand
export function editApplation (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? 'osg-ocp-developer0001/sandbox/clients/getByClientId/' + params : 'osg-ocp-developer0001/clients/getByClientId/' + params,
    method: 'get'
  })
}

// 获取选择框树
export function getCheckTree (params) {
  return service({
    url: 'osg-ocp-developer0001/capCatalog/tree',
    method: 'post'
  })
}

// 获取能力列表
export function getAblityList (params) {
  return service({
    url: 'osg-ocp-developer0001/capInfo/list',
    method: 'post',
    params
  })
}

// 应用详情接口 sand
export function getApplationDetail (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? 'osg-ocp-developer0001/sandbox/clients/getByClient' : 'osg-ocp-developer0001/clients/getByClient',
    method: 'post',
    params
  })
}

// 能力详情接口
export function getAblityDetail (params) {
  return service({
    url: 'osg-ocp-developer0001/capInfo/detail/' + params,
    method: 'get'
  })
}

// 保存能力接口
export function saveAblityList (params) {
  return service({
    url: 'osg-ocp-developer0001/clientinfo/clientSaveInfo',
    method: 'post',
    params
  })
}

// 订阅结果列表接口 sand
export function getStateList (params) {
  return service({
    url: applation.getters.sandBoxState === '1' ? 'osg-ocp-developer0001/sandbox/clients/clientCapInfoAuditStatus' : 'osg-ocp-developer0001/clients/clientCapInfoAuditStatus',
    method: 'post',
    params
  })
}

// 数据概览获取所有数据
export function getViewModel (params) {
  return service({
    url: 'osg-ocp-developer0001/statistics/getOverviewData',
    method: 'post',
    params
  })
}

// 是否实名认证接口
export function isRealName () {
  return service({
    url: applation.getters.sandBoxState === '1' ? 'osg-ocp-developer0001/sandbox/clients/getUserAuth' : 'osg-ocp-developer0001/clients/getUserAuth',
    method: 'get'
  })
}
