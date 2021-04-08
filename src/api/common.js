import service from '@/utils/request'
// import qs from 'qs'

// 数据字典接口
export function getSubDict (params) {
  return service({
    url: '/osg-ocp-developer0001/dictionary/getSubDictList',
    method: 'post',
    params: params
  })
}
