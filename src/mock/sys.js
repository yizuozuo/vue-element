import Mock from 'mockjs'
const r = Mock.Random

export default {
  loginIn: () => {
    const code = '1000' // r.pick(['1000', '2000', '2001'])
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      path: 'xxx',
      timestamp: () => r.now(),
      entity: {
        id: 1,
        brandId: () => r.id(),
        headImg: () => r.pick([
          'https://avatars0.githubusercontent.com/u/17719',
          'https://avatars0.githubusercontent.com/u/713766',
          'https://avatars0.githubusercontent.com/u/499550'
        ]),
        linkedMail: 'xxx@xxx.com',
        linkedPhone: '13625253636',
        nickName: () => r.pick(['狗子', '公羊', '老炮', '表哥']),
        realName: () => r.cname(),
        token: () => r.id(),
        code: code,
        storeId: () => {
          return code === 1000 ? null : r.integer(1, 10)
        },
        userName: () => r.name(),
        'sysMenuList|10': [{
          code: () => r.name(),
          'menuId|+1': 1,
          name: () => r.name(),
          parentId: 0,
          type: 1,
          url: '',
          sysMenuList: []
        }]
      }
    })
  },

  loginOut: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      path: 'xxx',
      timestamp: () => r.now(),
      entity: true
    })
  },

  findPass: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      path: 'xxx',
      timestamp: () => r.now(),
      entity: true
    })
  },

  getUserInfo: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      path: 'xxx',
      timestamp: () => r.now(),
      entity: {
        id: 1,
        linkedMail: () => r.email(),
        linkedPhone: '13523256235',
        userName: () => r.cname(),
        verificationCode: ''
      }
    })
  },

  updateUserInfo: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  addStaff: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  deleteStaff: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  searchStaff: config => {
    const { pageNo = 1, pageSize = 10 } = JSON.parse(config.body)

    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      page:{
        order: 'ASC',
        orderBy: 'id',
        pageNo,
        pageSize,
        totalNum: () => r.integer(100, 1000),
        timestamp: () => r.now(),
        'result|10': [{
          'id|+1': 1,
          linkedPhone: () => r.pick([
            '13266528168',
            '18627866432',
            '13589710572',
            '17702785615'
          ]),
          position: () => r.ctitle(2, 6),
          realName: () => r.cname(),
          sex: () => r.pick([1, 2]),
          status: () => r.pick([1, -1]),
          roleCode: () => r.pick([1, 2, 3])
        }]
      }
    })
  },

  getStaffById: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: {
        'brandId|+1': 1,
        'storeId|+1': 1,
        'id|+1': 1,
        storeName: () => r.cname(3, 6),
        linkedPhone: () => r.pick([
          '13266528168',
          '18627866432',
          '13589710572',
          '17702785615'
        ]),
        position: () => r.ctitle(2, 6),
        realName: () => r.cname(),
        sex: () => r.pick([1, 2]),
        roleCode: () => r.pick([ '2000', '2001'])
      }
    })
  },

  updateStaff: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  stopStaff: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  activeStaff: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  },

  getStaffRoles: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      'entity|3': [{
        'id|+1': 1,
        'name|+1': [
          '品牌管理员',
          '门店管理员',
          '门店职员'
        ],
        'code|+1': [
          '1000',
          '2000',
          '2001'
        ],
        status: () => r.pick([1, -1])
      }]
    })
  }
}

