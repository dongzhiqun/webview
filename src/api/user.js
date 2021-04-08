import service from '@/utils/request'
import qs from 'qs'

// 登录接口
export function login (params) {
  return service({
    url: '/osg-ocp-developer0001/oauth/token',
    method: 'post',
    params: qs.stringify(params)
  })
}

// 登出接口
export function logout (params) {
  return service({
    url: 'osg-ocp-auth0001/oauth/remove/token?' + params,
    method: 'post'
  })
}

// 获取用户信息接口
export function getUserInfo (params) {
  return service({
    url: '/osg-ocp-developer0001/userinfo',
    method: 'get',
    params
  })
}

// 获取用户路由接口
export function getUserMenu (params) {
  return service({
    url: '/osg-ocp-developer0001/menus/current',
    method: 'get',
    params
  })
}

// 获取短信验证码接口
export function getCode (params) {
  return service({
    url: '/osg-ocp-developer0001/getVerificationCode',
    method: 'post',
    params
  })
}

// 有token 获取短信验证码
export function getTokenCode (params) {
  return service({
    url: '/osg-ocp-developer0001/getOtherVerificationCode',
    method: 'post',
    params
  })
}

// 注册接口
export function regUser (params) {
  return service({
    url: '/osg-ocp-developer0001/devUserRegistered',
    method: 'post',
    params
  })
}

// 忘记密码，填写用户确定按钮
export function validateUser (params) {
  return service({
    url: '/osg-ocp-developer0001/findPasswordFirstSetp',
    method: 'post',
    params
  })
}

// 忘记密码，验证用户确定按钮
export function validateUserPhone (params) {
  return service({
    url: '/osg-ocp-developer0001/findPasswordSecSetp',
    method: 'post',
    params
  })
}

// 忘记密码，修改密码确定按钮
export function resertPass (params) {
  return service({
    url: '/osg-ocp-developer0001/findPasswordThirdSetp',
    method: 'post',
    params
  })
}
