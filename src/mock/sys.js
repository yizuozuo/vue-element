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

}

