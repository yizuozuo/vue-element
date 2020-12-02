const merge = require('webpack-merge')
const prodEnv = require('./prd.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"uat"',
  URLS: {
    store: '"https://api.html.info/store"',
    sys: '"https://api.html.info/sys"',
    common: '"https://api.html.info/common"'
  },
  IMG_SERVER_URLS: '"https://img01.html.info,https://img02.html.info"'
})
