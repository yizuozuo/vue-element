import Mock from 'mockjs'
import { normalize } from 'uri-js';
const r = Mock.Random

const pics = [
  'https://img13.360buyimg.com/n1/jfs/t20920/169/506470705/144232/9ff0b2c6/5b0f9d0fN44d935f9.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t20161/53/1761196340/142282/90412c40/5b3481aeNb835cfb6.jpg',
  'https://img12.360buyimg.com/mobilecms/s100x100_jfs/t3700/102/1246725028/488785/298dbe63/58213688Ne6be373a.jpg',
  'https://img11.360buyimg.com/babel/s130x130_jfs/t3298/290/6814316242/159274/459ba277/58abf752Nf4e7e811.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t7447/356/4184422946/94012/aff04eb/59ffbad0N666f7575.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t1/259/22/10882/182432/5bcb5fc6E28b82984/fa2982e5dff4361a.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t21520/21/991196653/158823/83e616a1/5b1de2a0N4dad6264.jpg',
  'https://img20.360buyimg.com/babel/s130x130_jfs/t16615/237/1109430581/352850/1df7b686/5abdce95N79ec6714.jpg'
]

const icon = [
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1969934853,684704989&fm=200&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=576324395,1770998026&fm=200&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=172676125,3542759869&fm=15&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2270942935,2042557183&fm=15&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2522637171,1261279167&fm=15&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1669985496,619611068&fm=15&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2045983050,837436553&fm=15&gp=0.jpg'
]

const rightsCodes = ['1001', '1002', '1003', '1004', '1005', '1006', '1007']

export default {
  addStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  searchStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page: {
        order: 'ASC',
        orderBy: 'id',
        pageNo: 1,
        pageSize: 10,
        totalNum: () => r.integer(100, 1000),
        timestamp: () => r.now(),
        'result|10': [{
          address: '16楼J-L室',
          adminLinkedPhone: () => r.pick([
            '13066528188',
            '18647286432',
            '13589700372',
            '15789350278'
          ]),
          adminRealName: () => r.cname(),
          area: () => '浦东新区',
          businessPropertyType: () => r.pick([1, 2, 3, 4]),
          city: () => r.city(),
          distance: () => r.integer(100, 2000000),
          form: () => r.pick(['1', '2', '3', '4', '5', '6', '7', '8', '9']),
          fullName: () => r.ctitle(),
          'id|+1': 1,
          linkedPhone: () => r.pick([
            '13266528168',
            '18627866432',
            '13589710572',
            '17702785615'
          ]),
          province: () => r.province(),
          status: () => r.pick([1, 2]),
          shortName: () => r.ctitle(5),
          isVisual: () => r.pick(0, 1),
        }]
      }
    })
  },

  getStoreById: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        address: '山西路10号',
        province: '1',
        city: '1',
        area: '1',
        businessTime: '周一~周五 9:00~18:00 中午12:00~13:00休息',
        businessLicense: () => r.pick(pics),
        businessPropertyType: () => r.pick([1, 2, 3, 4]),
        latitude: '31.221866',
        longitude: '121.529268',
        fullName: () => r.ctitle(10),
        'id|+1': 1,
        linkedName: () => r.cname(),
        linkedPhone: () => r.pick([
          '021-1234567',
          '021-8652339',
          '021-8655639',
          '021-2155639',
        ]),
        logo: () => r.pick(pics),
        qualification: () => r.pick([1, 2]),
        isVisual: () => r.pick(0, 1),
        phone: () => r.pick([
          '13266528168',
          '18627866432',
          '13589710572',
          '17702785615'
        ]),
        serverTypeNoList: ['1', '3', '5'],
        summary: '<p>嗯，一切都是最好的安排！</p>'
      }
    })
  },

  getAdInnerTemplates () {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|3': [{
        areaType: () => r.pick([1, 2, 3, 4]),
        attr1: () => r.ctitle(15, 30),
        attr2: () => r.integer(1, 10),
        attr3: () => r.pick([3, 4, 7]),
        'id|+1': 1,
        innerLink: 1,
        isDefault: () => r.pick([0, 1]),
        'linkUrl|+1': ['/pages/coupon/detail', '/pages/gift/detail', '/pages/task/detail'],
        pic: () => r.pick(pics),
        'sortNo|+1': 1,
        status: () => r.pick([1, 2]),
        subTitle: () => r.ctitle(5, 10),
        title: () => r.ctitle(5, 10)
      }]
    })
  },

  stopStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  activeStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  updateStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  searchBrandStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|20': [{
        'id|+1': 1,
        name: () => r.ctitle(4, 6)
      }]
    })
  },

  searchBrandCity: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|20': [{
        'cityCode|+1': 1,
        cityName: () => r.city()
      }]
    })
  },

  getBrandDetail: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        description: () => r.csentence(10, 60),
        email: () => r.email(),
        enName: () => r.pick(['nike', 'addidas', 'alibaba', 'alimama cha']),
        'id|+1': 1,
        license: () => r.pick(pics),
        logo: () => r.pick(pics),
        shortName: () => r.pick(['耐克', '英宝火锅', '阿迪达斯', '李宁', '阿里巴巴', '阿里妈妈奶茶']),
        zhName: () => r.pick(['耐克', '英宝火锅', '阿迪达斯', '李宁', '阿里巴巴', '阿里妈妈奶茶']),
      }
    })
  },

  updateBrand: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  getWxAuth: () => {
    const authType = r.pick([1, 2])

    return Mock.mock({
      status: 20000,
      essage: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        authType: authType,
        'id|+1': 1,
        isAuth: 0, // () => r.pick([0, 1]),
        url: () => {
          let url
          if (authType === 2) {
            url = 'http://localhost:9527/static/html/gzh.html'
          } else {
            url = 'http://localhost:9527/static/html/mp.html'
          }
          return url
        },

        resDTO: {
          appId: 'wx123456',
          head: () => r.pick([
            'https://avatars0.githubusercontent.com/u/17719',
            'https://avatars0.githubusercontent.com/u/713766',
            'https://avatars0.githubusercontent.com/u/499550'
          ]),
          name: () => r.cname(),
          serviceTypeInfo: '小程序',
          status: () => r.pick([1, -1]),
          verifyTypeInfo: '小程序类型',
          'funcList|6': [{
            'id|+1': 1,
            isAuth: () => r.pick([0, 1]),
            name: () => r.cname()
          }]
        }
      }
    })
  },

  callBackWx: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: false
    })
  },

  addRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  searchRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page: {
        order: 'ASC',
        orderBy: 'id',
        pageNo: 1,
        pageSize: 10,
        totalNum: () => r.integer(100, 1000),
        timestamp: () => r.now(),
        'result|6': [{
          content: () => r.csentence(6, 30),
          icon: () => r.pick(icon),
          'id|+1': 1,
          status: () => r.pick([1, 2]),
          title: () => r.ctitle(2, 8)
        }]
      }
    })
  },

  deleteRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  getRightsById: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        appType: 1,
        content: () => r.csentence(6, 30),
        icon: () => r.pick(icon),
        'id|+1': 1,
        title: () => r.ctitle(2, 8)
      }
    })
  },

  stopRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  activeRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  updateRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  getRightsIcon: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1969934853,684704989&fm=200&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=576324395,1770998026&fm=200&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=172676125,3542759869&fm=15&gp=0.jpg',
        'https://img12.360buyimg.com/babel/s130x130_jfs/t21520/21/991196653/158823/83e616a1/5b1de2a0N4dad6264.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2522637171,1261279167&fm=15&gp=0.jpg',
      ]
    })
  },

  searchStoreById: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: [{
        id: 1,
        name: () => r.cname(4, 8)
      }]
    })
  },

  searchAllStore: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|20': [{
        'id|+1': 1,
        name: () => r.ctitle(2, 6)
      }]
    })
  },

  searchStoreByIds: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|20': [{
        'id|+1': 1,
        name: () => `${r.city()}店`
      }]
    })
  },

  searchFitStores: config => {
    const { pageNo = 1, pageSize = 10 } = JSON.parse(config.body)

    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page: {
        order: 'ASC',
        orderBy: 'id',
        pageNo,
        pageSize,
        totalNum: () => r.integer(100, 1000),
        timestamp: () => r.now(),
        'result|10': [{
          'id|+1': (pageNo - 1) * pageSize + 1,
          provinceName: () => r.province(),
          cityName: () => r.city(),
          areaName: () => r.county(),
          fullName: () => r.cword(8, 15),
          managerName: () => r.cname(),
          propertyTypeName: () => r.cword(8, 15)
        }]
      }
    })
  },
  getCheck: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        "gzhAuthorization|1-2": true,
        "integralRule|1-2": true,
        "memberLevel|1-2": true,
        "memberRight|1-2": true,
        "mpAuthorization|1-2": true,
        "pageSetting|1-2": true,
        "vipCardSetting|1-2": true,
      }
    })
  },
  getAdvPage: config => {
    const { pageNo = 1, pageSize = 30 } = JSON.parse(config.body)
    const baseId = (pageNo - 1) * pageSize

    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page: {
        order: 'ASC',
        orderBy: 'id',
        pageNo,
        pageSize,
        totalNum: 1000,
        timestamp: () => r.now(),
        'result|12': [{
          addressUrl: () => r.csentence(6, 30),
          areaCode: () => r.pick([1, 2, 3, 4, 5]),
          'id|+1': baseId + 1,
          status: () => r.pick([1, 2]),
          innerLink: () => r.pick([1, 2]),
          isOutadvertisement: () => r.pick([0, 1]),
          pic: () => r.pick(pics),
          sortNo: () => r.integer(0, 100),
          title: () => r.ctitle(2, 8),
          startTime: () => r.now(),
          endTime: () => r.now(),
          variableValue: () => r.ctitle(2, 8)
        }]
      }
    })
  },
  advEnable: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },
  advDelete: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },
  advTypes: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|3': [{
        areaCode: () => r.integer(0, 100),
        remark: () => r.ctitle(2, 8),
        single: true
      }]
    })
  },
  advAdd: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },
  advModify: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },
  searchBaseRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|2': [{
        icon: () => r.pick(icon),
        'id|+1': 1,
        'code|+1': 1001,
        status: () => r.pick([1, 2, -2]),
        title: () => r.ctitle(2, 8)
      }]

    })
  },
  searchBuildRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page: {
        order: 'ASC',
        orderBy: 'id',
        pageNo: 1,
        pageSize: 10,
        totalNum: () => r.integer(100, 1000),
        timestamp: () => r.now(),
        'result|3': [{
          icon: () => r.pick(icon),
          'id|+1': 1,
          status: () => r.pick([1, 2, -2]),
          title: () => r.ctitle(2, 8)
        }]
      }
    })
  },

  addBuildRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  detailBaseRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        appType: 1,
        content: () => r.csentence(),
        daySendMessage: () => r.integer(1, 31),
        endTime: '2019-09-09',
        icon: () => r.pick(icon),
        'id|+1': 1,
        level: () => r.pick([1, 2, 3, 4, 5, 6, 7, 8]),
        multiple: () => r.integer(2, 10),
        orderNumber: () => r.integer(2, 100),
        singleOrderAmout: () => r.integer(1, 100),
        integralNum: () => r.integer(1, 100),
        experienceNum: () => r.integer(1, 100),
        couponsId: () => r.pick([1, 4, 8, 10, 20, 39]),
        startTime: '2018-09-09',
        timeInterval: () => r.pick(1, 2),
        title: () => r.ctitle(2, 8),
        type: () => r.pick([1, 2, 4]),
        storeList: [10, 12],
        code: () => r.pick(rightsCodes),
        totalFee: () => r.integer(1, 100)
      }
    })
  },

  detailBuildRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        appType: 1,
        content: () => r.csentence(),
        endTime: '2019-09-09',
        icon: () => r.pick(icon),
        'id|+1': 1,
        level: () => r.pick([1, 2, 3, 4, 5, 6, 7, 8]),
        startTime: '2018-09-09',
        title: () => r.ctitle(2, 8),
        storeList: [10, 12]
      }
    })
  },

  updateBaseRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  updateBuildRights: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  getThreeBrand: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|10': [{
        'brandId|+1': 1,
        name: () => r.ctitle(1, 5)
      }]
    })
  },

  getBrandServices: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|5': [{
        name: () => r.city(),
        'serverTypeNo|+1': ['1', '2', '3', '4', '5']
      }]
    })
  }
}
