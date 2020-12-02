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
 * @param {String} brand 品牌服务码
 */
export function findPass (phone, token, pass, brand) {
  return ajax({
    url: '/login/find',
    method: 'POST',
    data: {
      linkedPhone: phone,
      token: token,
      userPassword: pass,
      brandServiceNo: brand
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

/**
 * 申请入驻
 * @param {Object} data 申请信息
 */
export function enterApply (data) {
  return ajax({
    url: '/login/entry',
    method: 'POST',
    data
  })
}

/**
 * 创建职工
 * @param {Object} data 
 */
export function addStaff (data) {
  return ajax({
    url: '/sys/emp/create',
    method: 'post',
    data
  })
}

/**
 * 删除职工
 * @param {Array} id 职工ID
 */

export function deleteStaff (id) {
  return ajax({
    url: `/sys/emp/${id}/delete`,
    method: 'put'
  })
}

/**
 * 查询职工（获取职工列表）
 * @param {Object} data 查询条件
 */
export function searchStaff (data) {
  return ajax({
    url: '/sys/emp/page',
    method: 'post',
    data
  })
}

/**
 * 禁用职员
 * @param {Number} id 职工ID
 */
export function stopStaff (id) {
  return ajax({
    url: `/sys/emp/${id}/disable`,
    method: 'put'
  })
}

/**
 * 启用职员
 * @param {Number} id 职员ID
 */
export function activeStaff (id) {
  return ajax({
    url: `/sys/emp/${id}/enable`,
    method: 'put'
  })
}

/**
 * 职员明细
 * @param {Number} id 职员ID
 */
export function getStaffById (id) {
  return ajax({
    url: `/sys/emp/${id}/detail`,
    method: 'get'
  })
}

/**
 * 修改职工
 * @param {Number} id 职员ID
 * @param {Object} data 职员信息
 */
export function updateStaff (id, data) {
  return ajax({
    url: `/sys/emp/${id}/modify`,
    method: 'put',
    data
  })
}

/**
 * 获取职员角色列表
 */
export function getStaffRoles () {
  return ajax({
    url: '/sys/emp/roleSelect',
    method: 'get'
  })
}
