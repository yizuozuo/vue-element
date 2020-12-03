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
    common: '"/api/common"'
  },
  IMG_SERVER_URLS: '"https://img01.minhui.info,https://img02.minhui.info"'
})
