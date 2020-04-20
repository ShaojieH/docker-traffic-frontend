import request from '@/utils/my_request'

export function getList() {
  return request({
    url: '/config',
    method: 'get'
  })
}

export function getConfig(filename) {
  return request({
    url: `/config/${filename}`,
    method: 'get'
  })
}
