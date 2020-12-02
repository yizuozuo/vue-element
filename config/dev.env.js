'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prd.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"dev"',
  URLS: {
    store: '"//api.html.info/store"',
    sys: '"//api.html.info/sys"',
    common: '"//api.html.info/common"',
  },
  IMG_SERVER_URLS: '"https://img01.html.info,https://img02.html.info"'
})