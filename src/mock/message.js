import Mock from 'mockjs'
const r = Mock.Random

export default {
  getSmsCode: () => {
    return Mock.mock({
      status: 20000,
      message: '调用成功',
      success: true,
      timestamp: () => r.now(),
      entity: true
    })
  }
}

