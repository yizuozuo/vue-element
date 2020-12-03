import request from '@/utils/request'
const ajax = request({
  module: 'message'
})

/**
 * 获取短信验证码
 * @param {Object} data 
 */
export function getSmsCode(data) {
  return ajax({
    url: '/sms/send',
    method: 'POST',
    data
  })
}