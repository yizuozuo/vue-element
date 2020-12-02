import request from '@/utils/request'
import { isArray } from '@/utils'
const ajax = request({
  module: 'store'
})

/**
 * 创建网点
 * @param {object}} data
 */
export function addStore(data) {
  return ajax({
    url: '/store/add',
    method: 'post',
    data
  })
}

/**
 * 网点查询
 * @param {Object} data 查询参数
 */
export function searchStore(data = {}) {
  return ajax({
    url: '/store/query',
    method: 'post',
    data
  })
}

/**
 * 网点明细
 * @param {Number} id 网点ID
 */
export function getStoreById(id) {
  return ajax({
    url: `/store/${id}/detail`,
    method: 'get'
  })
}

/**
 * 停用
 * @param {Number} id 网点ID
 */
export function stopStore(id) {
  return ajax({
    url: `/store/${id}/stop`,
    method: 'put'
  })
}

/**
 * 启用
 * @param {Number} id 网点ID
 */
export function activeStore(id) {
  return ajax({
    url: `/store/${id}/active`,
    method: 'put'
  })
}

/**
 * 修改保存
 * @param {Number} id   网点ID
 * @param {Object} data 网点信息
 */
export function updateStore(id, data) {
  return ajax({
    url: `/store/${id}/update`,
    method: 'put',
    data
  })
}

/**
 * 根据品牌ID获取门店列表
 */
export function searchBrandStore() {
  return ajax({
    url: '/store/brand/store/list',
    method: 'get',
  })
}

/**
 * 获取品牌网点所在的城市
 */
export function searchBrandCity() {
  return ajax({
    url: '/store/brand/city/store',
    method: 'get',
  })
}

/**
 * 品牌明细
 */
export function getBrandDetail() {
  return ajax({
    url: '/store/brand/detail',
    method: 'get'
  })
}

/**
 * 修改保存(品牌)
 * @param {Object} data 网点信息
 */
export function updateBrand(data) {
  return ajax({
    url: '/store/brand/confirm',
    method: 'put',
    data
  })
}

/**
 * 查看微信授权信息
 * @param { Number } authType （1:公众号  2:小程序）
 */
export function getWxAuth(authType){
  return ajax({
    url: `/store/wx/${authType}`,
    method: 'get'
  })
}

/**
 * 微信授权回调
 * @param { Number } authType （1:公众号  2:小程序）
 */
export function callBackWx(authType,auth_code,expires_in ){
  return ajax({
    url: `/store/wx/${authType}/callBack`,
    method: 'get',
    params:{
      auth_code,
      expires_in
    }
  })
}

/**
 * 创建权益
 * @param {Object} data 权益数据
 */
export function addRights(data) {
  return ajax({
    url: '/store/rights/create',
    method: 'post',
    data
  })
}

/**
 * 权益分页数据
 * @param {Object} data 权益数据
 */
export function searchRights(data) {
  return ajax({
    url: '/store/rights/page',
    method: 'post',
    data
  })
}

/**
 * 权益有效数据分页数据
 * @param {Object} data 权益数据
 */
export function searchOnRights(data) {
  return ajax({
    url: '/store/rights/page/on',
    method: 'post',
    data
  })
}

/**
 * 删除权益
 * @param {Number} id 权益id
 */
export function deleteRights(id) {
  return ajax({
    url: `/store/rights/${id}/delete`,
    method: 'put'
  })
}

/**
 * 权益详情
 * @param {Number} rightId 权益id
 */
export function getRightsById(rightId) {
  return ajax({
    url: `/store/rights/${rightId}/detail`,
    method: 'get'
  })
}

/**
 * 禁用权益
 * @param {Number} id 权益id
 */
export function stopRights(id) {
  return ajax({
    url: `/store/rights/${id}/disable`,
    method: 'put'
  })
}

/**
 * 启用权益
 * @param {Number} id 权益id
 */
export function activeRights(id) {
  return ajax({
    url: `/store/rights/${id}/enable`,
    method: 'put'
  })
}

/**
 * 更新修改权益
 * @param {Number} id 权益id
 */
export function updateRights(id, data) {
  return ajax({
    url: `/store/rights/${id}/modify`,
    method: 'put',
    data
  })
}

/**
 * 获取权益图标
 */
export function getRightsIcon() {
  return ajax({
    url: '/store/rights/icons',
    method: 'get'
  })
}

/**
 * 根据门店id获取数据，当门店id为null时获去品牌下的所有门店id
 */
export function searchStoreById(storeId) {
  return ajax({
    url: `/store/brand/store/list/${storeId}`,
    method: 'get',
  })
}

/**
 * 查询全部门店数据（包括启用禁用的门店）
 */
export function searchAllStore() {
  return ajax({
    url: '/store/brand/stores/all',
    method: 'get',
  })
}

/**s
 * 根据多网点id查询网点信息
 * @param {Array<Number>} ids
 */
export function searchStoreByIds(ids = [-1]) {
  if (isArray(ids) && ids.length > 0) {
    return ajax({
      url: '/store/brand/stores/ids',
      method: 'post',
      data: {
        storeIds: ids
      }
    })
  } else {
    return Promise.reject(new Error('参数错误'))
  }
}

/**
 * 查询门店分页列表(页面设置)
 * @param {Object} data 查询参数（省市区，名称等）
 */
export function searchFitStores(data) {
  return ajax({
    url: '/store/web/fit/stores',
    method: 'post',
    data
  })
}

/**
 * 首页品牌设置进度相关数据
 */
export function getCheck() {
  return ajax({
    url: '/store/index/check',
    method: 'get'
  })
}

/**
 * 广告内链模版
 */
export function getAdInnerTemplates() {
  return ajax({
    url: '/adv/sys/template',
    method: 'get'
  })
}

/**
 * 广告分页
 */
export function getAdvPage(data) {
  return ajax({
    url: '/adv/condition/page',
    method: 'post',
    data
  })
}

/**
 * 广告删除
 */
export function advDelete(id) {
  return ajax({
    url: `/adv/${id}/delete`,
    method: 'put',
  })
}

/**
 * 广告启用/禁用
 */
export function advEnable(data) {
  return ajax({
    url: '/adv/status/change',
    method: 'put',
    data
  })
}

/**
 * 广告类型
 */
export function advTypes() {
  return ajax({
    url: '/adv/sys/template/type',
    method: 'get'
  })
}

/**
 * 广告新增
 */
export function advAdd(data) {
  return ajax({
    url: '/adv/add',
    method: 'post',
    data
  })
}

/**
 * 广告修改
 */
export function advModify(id, data) {
  return ajax({
    url: `/adv/${id}/modify`,
    method: 'put',
    data
  })
}

/**
 * 查询基础权益数据
 * @param {Object} data 权益数据
 */
export function searchBaseRights(data) {
  return ajax({
    url: '/store/rights/base/list',
    method: 'post',
    data
  })
}

/**
 * 查询自建权益数据
 * @param {Object} data 权益数据
 */
export function searchBuildRights(data) {
  return ajax({
    url: '/store/rights/build/list',
    method: 'post',
    data
  })
}

/**
 * 创建自建权益
 * @param {Object} data
 */
export function addBuildRights(data) {
  return ajax({
    url: '/store/rights/create',
    method: 'post',
    data
  })
}

/**
 * 基础权益详情
 * @param { Number } rightId 权益ID
 */
export function detailBaseRights(rightId) {
  return ajax({
    url: `/store/rights/${rightId}/base/detail`,
    method: 'get'
  })
}

/**
 * 自建权益详情
 * @param { Number } rightId 权益ID
 */
export function detailBuildRights(rightId) {
  return ajax({
    url: `/store/rights/${rightId}/build/detail`,
    method: 'get'
  })
}

/**
 * 修改基础权益
 * @param { Object } data
 */
export function updateBaseRights(data) {
  return ajax({
    url: '/store/rights/base/modify',
    method: 'put',
    data
  })
}

/**
 * 修改自建权益
 * @param { Number } id 权益ID
 * @param { Object } data
 */
export function updateBuildRights(id, data) {
  return ajax({
    url: `/store/rights/${id}/modify`,
    method: 'put',
    data
  })
}

/**
 * 获取第三方品牌列表, 不包含当前品牌
 */
export function getThreeBrand(data) {
  return ajax({
    url: '/store/brand/others/list',
    method: 'post',
    data
  })
}

/**
 * 获取品牌创建网点时的可选服务项
 */
export function getBrandServices() {
  return ajax({
    url: '/store/brand/subscribe/configs',
    method: 'get'
  })
}