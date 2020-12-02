export function isvalidUsername(str) {
  const reg = /^(13|14|15|16|17|18)[0-9]{9}$/
  return reg.test(str)
}

export function isValidPassword(password) {
  const reg = /^[a-zA-Z\d_]{6,12}$/
  return reg.test(password)
}

export function isChineseName(str) {
  const reg = /^[\u4E00-\u9FA5]+(·|•)[\u4E00-\u9FA5]+$|^[\u4E00-\u9FA5]{2,20}$/
  return reg.test(str)
}

export function isPhone(str) {
  const reg = /^(13|14|15|16|17|18)[0-9]{9}$/
  return reg.test(str)
}

/* 合法uri */
export function isURL(str) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(str)
}

/* 合法 https uri */
export function isHttpsUrl(str) {
  const reg = /^(https):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

/* 小写字母 */
export function isLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function isUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line no-useless-escape
  return re.test(email)
}

/* 是否为数字 */
export function isNumber(str) {
  const reg = /^[0-9]+.?[0-9]*$/
  return reg.test(str)
}

/* 是否为正整数 */
export function isNum(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}

/* 验证座机号码 */
export function isTelephone(str) {
  const reg = /^0\d{2,3}-?\d{7,8}$/
  return reg.test(str)
}
