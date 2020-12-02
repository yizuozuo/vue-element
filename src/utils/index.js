import { ONE_DAY_TIME, IMG_BASE_URL, DEFAULT_SKIN_CODE, CHINA_NUMS} from './const'

export function hasOwn(val, k) {
  return Object.prototype.hasOwnProperty.call(val, k)
}

export function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export function isEmpty(val) {
  return val === undefined || val === null || (typeof val === 'string' && val.length === 0) || (isArray(val) && val.length === 0) || (typeof val === 'number' && isNaN(val)) || (isObject(val) && Object.keys(val) === 0)
}

export function isNotEmpty(val) {
  return !isEmpty(val)
}

export function isAllEmpty(...args) {
  for (let i = 0; i < args.length; i++) {
    if (!isEmpty(args[i])) {
      return false
    }
  }
  return true
}

export function isAllFalse(...args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i]) {
      return false
    }
  }
  return true
}

export function isAllTrue(...args) {
  for (let i = 0; i < args.length; i++) {
    if (!args[i]) {
      return false
    }
  }
  return true
}

export function isAllNotEmpty(...args) {
  for (let i = 0; i < args.length; i++) {
    if (isEmpty(args[i])) {
      return false
    }
  }
  return true
}

export function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}

export function isNumber(val) {
  return Object.prototype.toString.call(val) === '[object Number]'
}

export function isUndefined(val) {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

export function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]'
}

export function isFunction(val) {
  return Object.prototype.toString.call(val) === '[object Function]'
}

export function isRegExp(val) {
  return Object.prototype.toString.call(val) === '[object RegExp]'
}

export function isFullUrl(url = '') {
  url = url.toLowerCase()
  return isNotEmpty(url) && (url.indexOf('https://') === 0 || url.indexOf('http://') === 0 || url.indexOf('//') === 0)
}

export function isSameDay(d1, d2) {
  if (arguments.length < 2) {
    return false
  }

  let date1, date2

  if (isDate(d1)) {
    date1 = d1
  } else if (isNumber(d1)) {
    if ((String(d1)).length === 10) d1 = parseInt(d1) * 1000
    date1 = new Date(d1)
  } else {
    date1 = new Date(d1)
  }

  if (isDate(d2)) {
    date2 = d2
  } else if (isNumber(d2)) {
    if ((String(d2)).length === 10) d2 = parseInt(d2) * 1000
    date2 = new Date(d2)
  } else {
    date2 = new Date(d2)
  }

  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}

export function isToday(d){
  if (arguments.length === 0) {
    return false
  }

  return isSameDay(Date.now(), d)
}

export function isFuture(d) {
  if (arguments.length === 0) {
    return false
  }

  let t1 = 0

  if (isDate(d)) {
    t1 = d.getTime()
  } else if (isNumber(d)) {
    if (d.length === 10) {
      d = parseInt(d) * 1000
    }
    t1 = new Date(d).getTime()
  } else {
    t1 = new Date(d)
  }

  const t2 = new Date().getTime()
  return t1 > t2
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || isEmpty(time)) {
    return null
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (isDate(time)) {
    date = time
  } else if (isNumber(time)) {
    if ((String(time)).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  } else {
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return time_str
}

export function getTodayEndTime() {
  const t1 = new Date().getTime()
  const d1 = parseTime(t1, '{y}-{m}-{d}')
  const d2 = `${d1} 23:59:59`
  return new Date(d2).getTime()
}

export function getNextDayZoreTime() {
  const t1 = new Date().getTime()
  const t2 = t1 + ONE_DAY_TIME
  const d1 = parseTime(t2, '{y}-{m}-{d}')
  const d2 = `${d1} 00:00:00`
  return new Date(d2).getTime()
}

export function calcDaySpan(t1, t2) {
  if (!isAllNotEmpty(t1, t2)) {
    return 0
  }

  const d1 = new Date(t1).getTime()
  const d2 = new Date(t2).getTime()
  const d3 = Math.abs(d1 - d2)
  return Math.ceil(d3/ONE_DAY_TIME)
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function addClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
    element.className = classString
  }
}

export function removeClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex !== -1) {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    element.className = classString
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function formatImgUrl(url = '') {
  if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
    return url
  } else {
    if (url.indexOf('/') === 0) {
      return `${IMG_BASE_URL}${url}`
    } else {
      return `${IMG_BASE_URL}/${url}`
    }
  }
}

export function formatIconUrl(url = '', skin = DEFAULT_SKIN_CODE) {
  return `rs/theme/${skin}/${url}`
}

// 获取url参数
export function getUrlQuery (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
