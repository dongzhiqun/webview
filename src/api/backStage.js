import service from '@/utils/request'

// 获取操作员列表方法
export function getUserList (params) {
  return service({
    url: '/osg-ocp-user0001/users',
    method: 'get',
    params
  })
}

// 修改操作员状态方法
export function updateUserState (params) {
  return service({
    url: '/osg-ocp-user0001/users/updateEnabled',
    method: 'get',
    params
  })
}

// 获取角色列表方法
export function getRoleList (params) {
  return service({
    url: '/osg-ocp-user0001/roles',
    method: 'get',
    params
  })
}

// 获取菜单列表方法
export function getMenuList (params) {
  return service({
    url: '/osg-ocp-user0001/menus/findAlls',
    method: 'get',
    params
  })
}
// 修改菜单信息方法
export function saveOrUpdateMenu (params) {
  return service({
    url: '/osg-ocp-user0001/menus/saveOrUpdate',
    method: 'post',
    params
  })
}
// 删除菜单信息方法
export function deleteMenu (id) {
  return service({
    url: '/osg-ocp-user0001/menus/' + id,
    method: 'delete'
  })
}

// 修改权限方法方法
export function updatePermission (params) {
  return service({
    url: '/osg-ocp-user0001/permissions/granted',
    method: 'post',
    params
  })
}

// 获取权限列表方法
export function getPermissionList (params) {
  return service({
    url: '/osg-ocp-user0001/permissions',
    method: 'get',
    params
  })
}

// 获取数据字典列表方法
export function getDictionaryList (params) {
  return service({
    url: '/osg-ocp-user0001/dictionary/findList',
    method: 'get',
    params
  })
}

// 重置用户密码方法
export function resetUserPassword (params, id) {
  return service({
    url: '/osg-ocp-user0001/users/' + id + '/resetPassword',
    method: 'post',
    params
  })
}

// 当前角色对应的菜单列表方法
export function getRoleMenu (params, id) {
  return service({
    url: '/osg-ocp-user0001/menus/' + id + '/menus',
    method: 'get',
    params
  })
}

// 保存修改角色方法
export function roleSaveOrUpdate (params) {
  return service({
    url: '/osg-ocp-user0001/roles/saveOrUpdate',
    method: 'post',
    params
  })
}

// 删除角色方法
export function deleteRole (id) {
  return service({
    url: '/osg-ocp-user0001/roles/' + id,
    method: 'delete'
  })
}

// 修改角色菜单方法
export function updateRoleMenu (params) {
  return service({
    url: '/osg-ocp-user0001/menus/granted',
    method: 'post',
    params
  })
}

// 新增修改权限方法,权限管理用的
export function updatePermissionInfo (params) {
  return service({
    url: '/osg-ocp-user0001/permissions/saveOrUpdate',
    method: 'post',
    params
  })
}

// 获取决策权限菜单方法
export function getRolePermissionArr (params, id) {
  return service({
    url: '/osg-ocp-user0001/permissions/' + id + '/permissions',
    method: 'get',
    params
  })
}

// 删除权限方法方法，权限列表里面的
export function deletePermission (params, id) {
  return service({
    url: '/osg-ocp-user0001/permissions/' + id,
    method: 'delete',
    params
  })
}

// 删除字典
export function deleteDict (id) {
  return service({
    url: '/osg-ocp-user0001/dictionary/deleteDict/' + id,
    method: 'delete'
  })
}

// 添加保存字典方法
export function saveDict (params) {
  return service({
    url: '/osg-ocp-user0001/dictionary/saveDict',
    method: 'post',
    params
  })
}

// 修改保存字典方法
export function updateDict (params) {
  return service({
    url: '/osg-ocp-user0001/dictionary/updateDict',
    method: 'post',
    params
  })
}

// 修改操作员信息方法
export function updateUser (params) {
  return service({
    url: '/osg-ocp-user0001/users/saveOrUpdate',
    method: 'post',
    params
  })
}
