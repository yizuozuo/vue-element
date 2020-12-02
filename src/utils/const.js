const isSecure = () => window.location.href.indexOf('https://') === 0
export const Y = 'Y'
export const N = 'N'
export const NUM_Y = 1
export const NUM_N = 0
export const S = 1
export const F = 2
export const SKIN_MP = 1 // 小程序
export const SKIN_WX = 2 // 公众号
export const DEFAULT_SKIN_CODE = '001'
export const EDITOR_MODE_ADD = 'add'
export const EDITOR_MODE_EDIT = 'edit'
export const LINK_TYPE_INNER = 1 // 内链
export const LINK_TYPE_OUTER = 2 // 外链
export const AREA_TYPE_BANNER = 1 // 广告区
export const AREA_TYPE_ICON = 2 // 功能区
export const AREA_TYPE_COUPON = 3 // 券区
export const AREA_TYPE_GIFT = 4 // 橱窗区
export const AREA_TYPE_ACTIVITY = 5 // 活动区
export const ONE_DAY_TIME = 24 * 60 * 60 * 1000
export const ROLE_BRAND = '1000' // 品牌管理员
export const ROLE_STORE = '2000' // 网点管理员
export const ROLE_STUFF = '2001' // 网点小员工
export const IS_MOCK = process.env.NODE_MOCK === 'mock'
export const CHANNEL_CODE = '1002'
export const DEFAULT_MODULE = 'store'
export const SUCCESS_STATUS_CODE = 20000 // 请求成功
export const INTERNAL_ERROR_STATUS_CODE = 50000 // 内部错误
export const UNLOGIN_STATUS_CODE = 501005 // 未登陆
export const VERIFICATION_CODE = 10020035 // 验证码错误
export const onePixelImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export const FORMAT_NETWORK = [{value: '1', label: '餐饮'}, {value:'2', label: '服装'}, {value:'3', label:'生活精品'}, { value:'4', label:'社区零售'}, {value:'5', label:'亲子教育'}, {value:'6', label:'保健医疗'}, {value:'7', label: '美容美发美甲'}, {value:'8', label: '汽车服务'}, {value:'9', label:'运动健身'}, {value:'10', label:'其他'} ] //网点业态
export const BUSINESS_TYPE = [{value: 1, label: '直营'}, {value: 2, label:'代理'}, {value: 3, label:'加盟'}, {value: 4, label:'经销'}, {value: 5, label:'其他'}] //经营性质
export const COUPON_TYPE = [{value: 2, label:'立减券'}, {value: 3, label:'折扣券'}] //优惠券类型
export const UPLOAD_FOR_IMG = `${process.env.URLS.common}/image/3/upload`
export const UPLOAD_FOR_WX = `${process.env.URLS.common}/image/2/upload`
export const UPLOAD_FOR_LOGIN = `${process.env.URLS.common}/image/qnUpload`
export const UPLOAD_FOR_EXCEL = `${process.env.URLS.member}/member/excel/import`
export const UPLOAD_COUPON_EXCEL = `${process.env.URLS.voucher}/coupons/detail/excel/import`
export const IMG_BASE_URL = (() => {
  const a = process.env.IMG_SERVER_URLS.split(',') || []
  const i = Math.random() < 0.5 ? 0 : 1
  return a[i]
})()
export const TASK_STATUS_TYPE = [{value: 1, label: '生效'}, {value: 2, label: '停用'}, {value: -2, label: '已结束'}] //状态类型
export const WIN_TYPE = [{value: 1, label: '积分'}, {value: 2, label: '经验值'}, {value: 3, label: '奖品'}, {value: 4, label: '优惠券'}] //奖项类型
export const CHINA_NUMS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
export const SEX_MALE_COLOR = 'rgba(24, 144, 255, 0.8)'//男性颜色
export const SEX_FEMALE_COLOR = 'rgba( 229, 36, 97, 0.8)' //女性颜色
export const SEX_UNKNOW_COLOR = 'rgba(39, 194, 193, 0.8)' //未知颜色
export const COLOR_LIST = ['rgba(24, 144, 255, 0.85)','rgba(46, 194, 91, 0.85)','rgba(39, 194, 193, 0.85)','rgba(133, 67, 224, 0.85)','rgba(241, 72, 100, 0.85)','rgba(199, 119, 52, 0.85)','rgba(72, 241, 194, 0.85)','rgba(165, 199, 52, 0.85)','rgba(206, 72, 241, 0.85)','rgba(250, 204, 20, 0.85)','rgba(34, 50, 115, 0.85)','rgba(52, 54, 199, 0.85)',] //年龄颜色
export const COUPON_ITEM_STATUS = [
  {value: 1, label: '待兑换'},
  {value: 2, label: '已停止'},
  {value: -2, label: '过期'},
  {value: 3, label: '待核销'},
  {value: 4, label: '已核销'},
  {value: 5, label: '已冻结'},
  {value: 8, label: '待查收'}
]
export const COUPON_MODE_ONE = 'voucher' //优惠券（立减券，折扣券）
export const COUPON_MODE_TWO = 'coupon' //折扣券
export const COUPON_CARD_STATUS = [
  {value: 1, label: '上架'},
  {value: -2, label: '过期'},
  {value: 3, label: '下架'}
]
export const CARD_TYPES = [ // 卡类型
  {value: 236, label: '次卡'},
  {value: 237, label: '年卡'},
  {value: 238, label: '月卡'},
  {value: 239, label: '体验卡'},
  {value: 240, label: '服务卡'}
]
export const CARD_CATEGORY_ID = 27 // 服务卡类目
export const PRODUCT_TYPE_CARD = 2 // 服务卡
export const MEMBER_TEMPLATE_DOWNLOAD_LINK = '/static/template.xlsx'
export const COUPON_TYPES = [ // 优惠券状态
  {value: 1, label: '正常发放'},
  {value: 2, label: '停止发放'},
  {value: -2, label: '已过期'},
  {value: 3, label: '待发放'},
]
