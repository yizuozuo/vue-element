'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prd.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"local"',
  NODE_MOCK: '"mock"',
  URLS: {
    store: '"/api/store"',
    sys: '"/api/sys"',
    order: '"/api/order"',
    pay: '"/api/pay"',
    app: '"/api/app"',
    integral: '"/api/integral"',
    voucher: '"/api/voucher"',
    member: '"/api/member"',
    shop: '"/api/shop"',
    task: '"/api/task"',
    common: '"/api/common"',
    wx: '"/api/wx"',
    message: '"/api/message"',
    goods: '"/api/good"',
    log: '"/api/log"',
    inventory: '"/api/inventory"'
  },
  IMG_SERVER_URLS: '"https://img01.html.info,https://img02.html.info"'
})
