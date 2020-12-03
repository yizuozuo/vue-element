'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prd.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"dev"',
  URLS: {
    store: '"//api.minhui.info/store"',
    sys: '"//api.minhui.info/sys"',
    common: '"//api.minhui.info/common"',
  },
  IMG_SERVER_URLS: '"https://img01.minhui.info,https://img02.minhui.info"'
})