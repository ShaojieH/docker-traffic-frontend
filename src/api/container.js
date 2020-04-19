import request from '@/utils/my_request'

export function getList() {
  return request({
    url: '/container',
    method: 'get'
  })
}

export function getGraph() {
  return request({
    url: '/container/graph',
    method: 'get'
  })
}
