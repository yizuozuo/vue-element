import request from '@/utils/request'
const ajax = request({
  module: 'sys'
})

/**
 * 登陆
 * @param {String} user 账号
 * @param {String} pass 密码
 */
export function loginIn (user, pass) {
  return ajax({
    url: '/login/login',
    method: 'POST',
    data: {
      userName: user,
      userPassword: pass
    }
  })
}

/**
 * 退出登陆
 */
export function loginOut () {
  return ajax({
    url: '/login/quit',
    method: 'PUT'
  })
}

/**
 * 
 * @param {String} phone 手机
 * @param {String} token token
 * @param {String} pass 密码
 */
export function findPass (phone, token, pass) {
  return ajax({
    url: '/login/find',
    method: 'POST',
    data: {
      linkedPhone: phone,
      token: token,
      userPassword: pass
    }
  })
}

/**
 * 修改密码
 * @param {String} newPass 新密码
 * @param {String} oldPass 旧密码
 */
export function updatePass (newPass, oldPass) {
  return ajax({
    url: '/login/modify/pw',
    method: 'PUT',
    data: {
      newPassword: newPass,
      oldPassword: oldPass
    }
  })
}

/**
 * 个人信息明细
 */
export function getUserInfo () {
  return ajax({
    url: '/login/detail',
    method: 'GET'
  })
}

/**
 * 修改个人信息
 * @param {Object} data 个人信息
 */
export function updateUserInfo (data) {
  return ajax({
    url: '/login/confirm',
    method: 'PUT',
    data
  })
}