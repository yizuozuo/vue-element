import Mock from 'mockjs'
import storeAPI from './store'
import sysAPI from './sys'
import messageAPI from './message'
import commonAPI from './common'

Mock.setup({
  timeout: '300-1000'
})

// 公共
Mock.mock(/\/api\/common\/common\/skin\/area\/config\/\d+\/templates/, 'get', commonAPI.getDefaultAreaConfig)
Mock.mock(/\/api\/common\/common\/skin\/skins/, 'post', commonAPI.getSkinList)
Mock.mock(/\/api\/common\/image\/\d+\/upload/, commonAPI.uploadImg)
Mock.mock(/\/api\/common\/geography\/\d+\/province/, commonAPI.getProvinceList)
Mock.mock(/\/api\/common\/geography\/\d+\/city/, commonAPI.getCityList)
Mock.mock(/\/api\/common\/geography\/\d+\/district/, commonAPI.getDistrictList)
Mock.mock(/\/api\/common\/image\/qnUpload/, 'post', commonAPI.qnUploadImg)
Mock.mock(/\/api\/common\/common\/configure\/edu/, 'post', commonAPI.getEducation)

// 网点
Mock.mock(/\/api\/store\/store\/wx\/\d+\/callBack/, 'get', storeAPI.callBackWx)
Mock.mock(/\/api\/store\/store\/wx\/\d+/, 'get', storeAPI.getWxAuth)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/delete/, 'put', storeAPI.deleteRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/detail/, 'get', storeAPI.getRightsById)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/disable/, 'put', storeAPI.stopRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/enable/, 'put', storeAPI.activeRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/modify/, 'put', storeAPI.updateRights)
Mock.mock(/\/api\/store\/store\/rights\/create/, 'post', storeAPI.addRights)
Mock.mock(/\/api\/store\/store\/rights\/page/, 'post', storeAPI.searchRights)
Mock.mock(/\/api\/store\/store\/rights\/icons/, 'get', storeAPI.getRightsIcon)
Mock.mock(/\/api\/store\/store\/web\/fit\/stores/, 'post', storeAPI.searchFitStores)
Mock.mock(/\/api\/store\/store\/brand\/city\/store/, 'get', storeAPI.searchBrandCity)
Mock.mock(/\/api\/store\/store\/brand\/store\/list\/\d+/, 'get', storeAPI.searchStoreById)
Mock.mock(/\/api\/store\/store\/brand\/store\/list/, 'get', storeAPI.searchBrandStore)
Mock.mock(/\/api\/store\/store\/brand\/stores\/all/, 'get', storeAPI.searchAllStore)
Mock.mock(/\/api\/store\/store\/brand\/stores\/ids/, 'post', storeAPI.searchStoreByIds)
Mock.mock(/\/api\/store\/store\/brand\/detail/, 'get', storeAPI.getBrandDetail)
Mock.mock(/\/api\/store\/store\/brand\/confirm/, 'put', storeAPI.updateBrand)
Mock.mock(/\/api\/store\/store\/\d+\/detail/, 'get', storeAPI.getStoreById)
Mock.mock(/\/api\/store\/store\/\d+\/stop/, 'put', storeAPI.stopStore)
Mock.mock(/\/api\/store\/store\/\d+\/active/, 'put', storeAPI.activeStore)
Mock.mock(/\/api\/store\/store\/\d+\/update/, 'put', storeAPI.updateStore)
Mock.mock(/\/api\/store\/store\/add/, 'post', storeAPI.addStore)
Mock.mock(/\/api\/store\/store\/query/, 'post', storeAPI.searchStore)
Mock.mock(/\/api\/store\/store\/index\/check/, 'get', storeAPI.getCheck)
Mock.mock(/\/api\/store\/adv\/sys\/template\/type/, 'get', storeAPI.advTypes)
Mock.mock(/\/api\/store\/adv\/sys\/template/, 'get', storeAPI.getAdInnerTemplates)
Mock.mock(/\/api\/store\/adv\/condition\/page/, 'post', storeAPI.getAdvPage)
Mock.mock(/\/api\/store\/adv\/status\/change/, 'put', storeAPI.advEnable)
Mock.mock(/\/api\/store\/adv\/\d+\/delete/, 'put', storeAPI.advDelete)
Mock.mock(/\/api\/store\/adv\/add/, 'post', storeAPI.advAdd)
Mock.mock(/\/api\/store\/adv\/\d+\/modify/, 'put', storeAPI.advModify)
Mock.mock(/\/api\/store\/store\/rights\/base\/list/, 'post', storeAPI.searchBaseRights)
Mock.mock(/\/api\/store\/store\/rights\/build\/list/, 'post', storeAPI.searchBuildRights)
Mock.mock(/\/api\/store\/store\/rights\/create/, 'post', storeAPI.addBuildRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/base\/detail/, 'get', storeAPI.detailBaseRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/build\/detail/, 'get', storeAPI.detailBuildRights)
Mock.mock(/\/api\/store\/store\/rights\/base\/modify/, 'put', storeAPI.updateBaseRights)
Mock.mock(/\/api\/store\/store\/rights\/\d+\/modify/, 'put', storeAPI.updateBuildRights)
Mock.mock(/\/api\/store\/store\/brand\/others\/list/, 'post', storeAPI.getThreeBrand)
Mock.mock(/\/api\/store\/store\/brand\/subscribe\/configs/, 'get', storeAPI.getBrandServices)
// 消息
Mock.mock(/\/api\/message\/sms\/send/, 'post', messageAPI.getSmsCode)
// 鉴权
Mock.mock(/\/api\/sys\/login\/login/, 'post', sysAPI.loginIn)
Mock.mock(/\/api\/sys\/login\/quit/, 'post', sysAPI.loginOut)
Mock.mock(/\/api\/sys\/login\/find/, 'post', sysAPI.findPass)
Mock.mock(/\/api\/sys\/login\/entry/, 'post', sysAPI.loginIn)
Mock.mock(/\/api\/sys\/login\/detail/, 'get', sysAPI.getUserInfo)
Mock.mock(/\/api\/sys\/login\/confirm/, 'put', sysAPI.updateUserInfo)
Mock.mock(/\/api\/sys\/login/, 'put', commonAPI.booleanRes)

export default Mock
