import request from '@/utils/my_request'

export function applySimple(container, dst_ip, limit, prio) {
  return request({
    url: '/simple/apply',
    method: 'post',
    params: {
      container,
      dst_ip,
      limit,
      prio
    }
  })
}

export function resetSimple(container) {
  return request({
    url: '/simple/reset',
    method: 'post',
    params: {
      container
    }
  })
}
