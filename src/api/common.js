import request from '@/utils/request'
const ajax = request({
  module: 'common'
})

/**
 * 图片上传
 */
export function uploadImg(type) {
  return ajax({
    url: `/image/${type}/upload`,
    method: 'post',
  })
}

export function qnUploadImg() {
  return ajax({
    url: '/image/qnUpload',
    method: 'post',
  })
}

/**
 * 获取皮肤列表
 * @param {Number} pageNo 当前页数
 * @param {Number} pageSize 页面大小
 */
export function getSkinList(pageNo = 1, pageSize = 10) {
  return ajax({
    url: '/common/skin/skins',
    method: 'POST',
    data: {
      pageNo,
      pageSize
    }
  })
}

/**
 * 获取默认会员等级
 */
export function getDefaultVipLevels() {
  return ajax({
    url: '/vip/level/sys/levels',
    method: 'GET'
  })
}

/**
 * 获取省级数据
 * @param {Number} country 国家代码
 */
export function getProvinceList(country = 1) {
  return ajax({
    url: `/geography/${country}/province`,
    method: 'GET'
  })
}

/**
 * 获取市级数据
 * @param {Number} province 省级代码
 */
export function getCityList(province) {
  return ajax({
    url: `/geography/${province}/city`,
    method: 'GET'
  })
}

/**
 * 获取县级数据
 * @param {Number} city 城市代码
 */
export function getDistrictList(city) {
  return ajax({
    url: `/geography/${city}/district`,
    method: 'GET'
  })
}

/**
 * 基础配置模板获取
 * @param {Number} areaType 1=首页banner,2=功能区域,3=优惠卷区域,4=橱窗区域,5=会员卡入口设置
 */
export function getDefaultAreaConfig(areaType) {
  return ajax({
    url: `/common/skin/area/config/${areaType}/templates`,
    method: 'GET'
  })
}

/**
 * 获取教育枚举
 */
export function getEducation() {
  return ajax({
    url: '/common/configure/edu',
    method: 'POST'
  })
}
