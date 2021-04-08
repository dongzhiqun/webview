import service from '@/utils/request'

// 能力目录查询
export function getCapCatalogList (params) {
  return service({
    url: '/osg-ocp-user0001/catalog/findAllListCapCatalog',
    method: 'get',
    params
  })
}

// 能力列表查询
export function getCapList (params, query) {
  return service({
    url: '/osg-ocp-user0001/capacities' + query,
    method: 'get',
    params
  })
}

// 能力详情查询
export function getCapDetail (params, id) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + id,
    method: 'get',
    params
  })
}

// 能力审核记录查询
export function getCapAuditDetail (params, capCode) {
  return service({
    url: 'osg-ocp-user0001/capacities/' + capCode + '/cap-audit-records',
    method: 'get',
    params
  })
}

// 能力列表数据操作（发布）
export function publishCap (params, abilityId) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + abilityId + '/publish',
    method: 'patch',
    params
  })
}

// 能力列表数据操作（撤回）
export function recallCap (params, id) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + id + '/withdraw',
    method: 'patch',
    params
  })
}

// 能力列表数据操作（是否可用）
export function availableFlagCap (params, value) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + value + '/availability',
    method: 'patch',
    params
  })
}

// 能力审核通过、驳回
export function auditCap (params, capCode) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + capCode + '/cap-audit-records',
    method: 'post',
    params
  })
}

// 能力创建（保存、提交）
export function updateCap (params, selectedCapId) {
  return service({
    url: '/osg-ocp-user0001/capacities/' + selectedCapId,
    method: selectedCapId.length > 0 ? 'put' : 'post',
    params
  })
}

// 能力列表数据操作（提交 or 删除）
export function colSubmitOrDelCap (params, btnName, id) {
  if (btnName === '提交') {
    return service({
      url: '/osg-ocp-user0001/capacities/' + id + '/submit',
      method: 'patch',
      params
    })
  } else {
    return service({
      url: '/osg-ocp-user0001/capacities/' + id,
      method: 'delete',
      params
    })
  }
}

export function findListCapCatalog (params) {
  return service({
    url: '/osg-ocp-user0001/catalog/findListCapCatalog',
    method: 'get',
    params
  })
}

export function insertCatalog (params) {
  return service({
    url: '/osg-ocp-user0001/catalog/insertCatalog',
    method: 'post',
    params
  })
}

export function updateCatalogById (params) {
  return service({
    url: '/osg-ocp-user0001/catalog/updateCatalogById',
    method: 'post',
    params
  })
}

export function deleteCatalogById (params) {
  return service({
    url: `/osg-ocp-user0001/catalog/deleteCatalogById/${params.id}/${params.capCatalogCode}`,
    method: 'delete'
  })
}
