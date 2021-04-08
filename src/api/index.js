import service from '@/utils/request'

export function index (params) {
  return service({
    url: '',
    method: 'post',
    params
  })
}
