import Mock from 'mockjs'
const r = Mock.Random

const skins = [
  'rs/theme/001/overview.png',
  'rs/theme/002/overview.png',
  'rs/theme/003/overview.png',
  'rs/theme/004/overview.png',
  'rs/theme/005/overview.png',
  'rs/theme/006/overview.png',
  'rs/theme/007/overview.png',
  'rs/theme/008/overview.png',
  'rs/theme/009/overview.png',
  'rs/theme/010/overview.png'
]

const icons = [
  'i-1.png',
  'i-2.png',
  'i-3.png',
  'i-4.png',
  'i-5.png',
  'i-6.png',
  'i-7.png',
  'i-8.png'
]

const imgs = [
  'https://img13.360buyimg.com/n1/jfs/t20920/169/506470705/144232/9ff0b2c6/5b0f9d0fN44d935f9.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t20161/53/1761196340/142282/90412c40/5b3481aeNb835cfb6.jpg',
  'https://img12.360buyimg.com/mobilecms/s100x100_jfs/t3700/102/1246725028/488785/298dbe63/58213688Ne6be373a.jpg',
  'https://img11.360buyimg.com/babel/s130x130_jfs/t3298/290/6814316242/159274/459ba277/58abf752Nf4e7e811.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t7447/356/4184422946/94012/aff04eb/59ffbad0N666f7575.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t1/259/22/10882/182432/5bcb5fc6E28b82984/fa2982e5dff4361a.jpg',
  'https://img12.360buyimg.com/babel/s130x130_jfs/t21520/21/991196653/158823/83e616a1/5b1de2a0N4dad6264.jpg',
  'https://img20.360buyimg.com/babel/s130x130_jfs/t16615/237/1109430581/352850/1df7b686/5abdce95N79ec6714.jpg'
]

export default {
  booleanRes: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  uploadImg: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        are: 'http://localhost:9527/api',
        fileId: 'rs/theme/006/i-1.png',
        path: () => r.pick([
          'https://avatars0.githubusercontent.com/u/17719',
          'https://avatars0.githubusercontent.com/u/713766',
          'https://avatars0.githubusercontent.com/u/499550'
        ]),
        sourceName: () => r.cname()
      }
    })
  },

  qnUploadImg: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        are: 'http://localhost:9527/api',
        fileId: 'rs/theme/006/i-1.png',
        path: () => r.pick([
          'https://avatars0.githubusercontent.com/u/17719',
          'https://avatars0.githubusercontent.com/u/713766',
          'https://avatars0.githubusercontent.com/u/499550'
        ]),
        sourceName: () => r.cname()
      }
    })
  },

  getSkinList: config => {
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
        'result|30': [{
          'id|+1': baseId + 1,
          isDefault: () => baseId === 0 ? 1 : 2,
          name: () => r.pick(['圣诞', '新年', '中秋', '六一']),
          pic: () => r.pick(skins),
          remark: () => r.cword(10, 20),
          skinCode: () => r.pick(['001', '002', '003', '004', '005', '006', '007', '008', '009', '010']),
          skinSubList: []
        }]
      }
    })
  },

  getDefaultMemberLevels: () => {
    let levels = []
    let max = 0
    let min = 0
    let names = ['小农民', '穷秀才', '大官人', '武举人', '探花哥', '进士第', '状元狼', '小皇帝']
    for (let i = 0; i < 8; i++) {
      range = r.pick([500, 1000, 2000, 3000, 4000, 5000])
      min = max
      max = i === 8 ? null : min + range
      levels.push({
        levelCode: i,
        levelName: names[i],
        minCount: min,
        maxCount: max
      })
    }

    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      entity: levels
    })
  },

  getProvinceList: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      entity: [{
        id: 1,
        name: '江苏'
      }]
    })
  },

  getCityList: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      'entity|2': [{
        'id|+1': 1,
        'name|+1': ['南京市', '苏州市']
      }]
    })
  },

  getDistrictList: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      'entity|10': [{
        'id|+1': 1,
        'name|+1': ['鼓楼区', '玄武区', '江宁区', '建邺区', '秦淮区', '姑苏区', '虎丘区', '吴江区', '吴中区', '昆山市']
      }]
    })
  },

  getDefaultAreaConfig () {
    const linkType = r.pick([1, 2])
    const areaType = 2 // r.pick([1, 2, 3, 4, 5])
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      'entity|10': [{
        areaType: areaType,
        'id|+1': 1,
        innerLink: linkType,
        linkUrl: () => {
          if (linkType === 1) {
            return r.pick([
              '/pages/coupon/center',
              '/pages/coupon/mine'
            ])
          } else {
            return r.pick([
              'https://www.baidu.com',
              'https://www.sogou.com',
              'https://taobao.com',
              'https://www.jd.com',
            ])
          }
        },
        pic: () => {
          if (areaType === 2) {
            return r.pick(icons)
          } else {
            return r.pick(skins)
          }
        },
        'srotNo|+1': 0,
        status: 1,
        attr1: () => r.ctitle(3, 10),
        title: () => r.ctitle(5)
      }]
    })
  },

  getEducation: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: 1541557003583,
      entity: ['大专以下', '大专', '本科', '硕士', '博士', '其它']
    })
  }
}
