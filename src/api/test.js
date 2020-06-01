import request from '@/utils/my_request'

export function applySimpleTest() {
  return request({
    url: '/test/simple/apply',
    method: 'post'
  })
}

export function resetSimpleTest() {
  return request({
    url: '/test/simple/reset',
    method: 'post'
  })
}
