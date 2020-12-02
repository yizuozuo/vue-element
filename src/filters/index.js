import { CHINA_NUMS } from '@/utils/const'
import { isEmpty, isArray, isDate, isNumber } from '@/utils'

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function formatMoney (num) {
  if (isEmpty(num)) {
    return '0.00'
  } else {
    return num.toFixed(2)
  }
}

export function formatGender (gender) {
  let m
  if (gender === 1 || gender === '1') {
    m = '男'
  } else if (gender === 2 || gender === '2') {
    m = '女'
  } else {
    m = ''
  }
  return m
}

export function formatTime (time, fmt) {
  if (arguments.length === 0 || isEmpty(time)) {
    return null
  }

  const f = fmt || '{y}-{m}-{d} {h}:{i}:{s}'
  let d
  if (isDate(time)) {
    d = time
  } else if (isNumber(time)) {
    if ((String(time)).length === 10) {
      time = parseInt(time) * 1000
    }
    d = new Date(time)
  } else {
    d = new Date(time)
  }

  const o = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: d.getDay()
  }

  return f.replace(/{(y|m|d|h|i|s|a)+}/g, (r, key) => {
    let v = o[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][v - 1]
    }

    if (r.length > 0 && v < 10) {
      v = `0${v}`
    }
    return v || '0'
  })
}

export function formatDateRange (d1, d2, fmt = '{y}.{m}.{d}') {
  const t1 = formatTime(d1, fmt)
  const t2 = formatTime(d2, fmt)
  return `${t1} - ${t2}`
}

export function formatFloor (f) {
  let m = ''
  let i
  try {
    i = parseInt(f)
    if (isNaN(i)) {
      m = f
    } else {
      m = i < 0 ? `B${Math.abs(i)}` : `${i}F`
    }
  } catch (e) {
    m = f
  }
  return m || ''
}

export function formatNetwork (t) {
  let m
  switch (t) {
    case '1':
      m = '餐饮';
      break
    case '2':
      m = '服装';
      break
    case '3':
      m = '大型零售';
      break
    case '4':
      m = '大型体验';
      break
    case '5':
      m = '生活精品';
      break
    case '6':
      m = '亲子儿童';
      break
    case '7':
      m = '文教艺术';
      break
    case '8':
      m = '生活服务';
      break
    case '9':
      m = '其他';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatBusinessPropertyType (t) {
  let m
  switch (t) {
    case 1:
      m = '直营';
      break
    case 2:
      m = '代理';
      break
    case 3:
      m = '加盟';
      break
    case 4:
      m = '经销';
      break
    case 5:
      m = '其它';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatGoodStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '启用';
      break
    case 2:
      m = '仅展示';
      break
    case -1:
      m = '禁用';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatQualification (t) {
  let m
  switch (t) {
    case 1:
      m = '采用品牌资质';
      break
    case 2:
      m = '创建网点资质';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatNumber (t) {
  let m
  m = Number(t).toFixed(2)
  return m
}

export function formatType (t) {
  let m
  switch (t) {
    case 1:
      m = '消费金额赠送';
      break
    case 2:
      m = '过期';
      break
    case 3:
      m = '任务获取';
      break
    case 4:
      m = '会员权益';
      break
    case 5:
      m = '手动调整';
      break
    default:
      m = ''
      break
  }
  return m
}

export function formatGiftStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '上架';
      break
    case 2:
      m = '下架';
      break
    case 3:
      m = '待上架';
      break
    case -2:
      m = '过期';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatCouponType (t) {
  let m
  switch (t) {
    case 1:
      m = "满减券";
      break
    case 2:
      m = "立减券";
      break
    case 3:
      m = "折扣券";
      break
    default:
      m = "";
      break
  }
  return m
}

export function formatCouponStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '正常发放'
      break
    case -1:
      m = '删除'
      break
    case 2:
      m = '停止发放'
      break
    case -2:
      m = '过期'
      break
    case 3:
      m = '待发放'
      break
    default:
      m = ''
      break
  }
  return m
}

export function formatCouponItemStatus (t) {
  let m
  switch (t) {
    case -2:
      m = '已过期'
      break
    case 1:
      m = '待兑换'
      break
    case 2:
      m = '已停止'
      break
    case 3:
      m = '待核销'
      break
    case 4:
      m = '已核销'
      break
    case 5:
      m = '已冻结'
      break
    case 8:
      m = '待查收'
      break
    default:
      m = ''
      break
  }
  return m
}

export function formatCouponsType (t) {
  let m
  switch (t) {
    case 2:
      m = '立减券';
      break
    case 3:
      m = '折扣券';
      break
    case 1:
      m = '满减券';
      break;
    default:
      m = '';
      break
  }
  return m
}

export function formatWxStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '已授权';
      break
    case -1:
      m = '授权取消';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatBonusType (t) {
  let m
  switch (t) {
    case 1:
      m = '＋';
      break;
    case 2:
      m = '－';
      break;
    default:
      m = '';
      break
  }
  return m
}

export function formatOrderStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '待支付';
      break
    case 2:
      m = '支付成功';
      break
    case 3:
      m = '手动取消';
      break
    case 5:
      m = '支付失败';
      break
    default:
      m = ''
      break
  }
  return m
}

export function formatSourceType (t) {
  let m
  switch (t) {
    case 1:
      m = '微信支付';
      break
    case 2:
      m = '支付宝支付';
      break
    case 3:
      m = '银行卡支付';
      break
    default:
      m = ''
      break
  }
  return m
}

export function formatTaskStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '开启';
      break
    case 2:
      m = '关闭';
      break
    case -2:
      m = '结束';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatWinType (t) {
  let m
  switch (t) {
    case 1:
      m = '积分';
      break
    case 2:
      m = '经验值';
      break
    case 3:
      m = '礼品';
      break
    case 4:
      m = '优惠券';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatWinItem (v, t) {
  if (t === 3 || t === 4) {
    return v
  } else if (t === 1 || t === 2) {
    let m = formatWinType(t)
    return `${v}${m}`
  } else {
    return ''
  }
}

export function formatWinLevel (t, levels = []) {
  if (isEmpty(levels)) {
    levels = CHINA_NUMS
    if (isNumber(t) && t > 0 && t < 10) {
      return levels[t]
    } else {
      return ''
    }
  } else if (isArray(levels)) {
    let arr = levels.filter(x => t === x.code)
    if (arr.length > 0) {
      return arr[0].desc
    } else {
      return ''
    }
  } else {
    return ''
  }
}

export function formatRoleType (t) {
  let m
  switch (t) {
    case 1:
      m = '品牌管理员';
      break
    case 2:
      m = '网点管理员';
      break
    case 3:
      m = '网点职员';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatCardsStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '上架';
      break
    case -2:
      m = '过期';
      break
    case 3:
      m = '下架';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatPayMethod (t) {
  let m
  switch (t) {
    case 1:
      m = '微信支付';
      break
    case 2:
      m = '支付宝支付';
      break
    case 3:
      m = '银行卡支付';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatSupplierStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '正常';
      break
    case 2:
      m = '冻结';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatIsVisual (t) {
  let m
  switch (t) {
    case 1:
      m = '可见';
      break
    case 0:
      m = '不可见';
      break
    default:
      m = '不可见';
      break
  }
  return m
}
export function formatStatus (t) {
  let m
  switch (t) {
    case 1:
      m = '启用';
      break
    case 2:
      m = '禁用';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatPlatform (t) {
  let m
  switch (t) {
    case 1:
      m = '是';
      break
    case 0:
      m = '否';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatBuyMethod (t) {
  let m
  switch (t) {
    case 1:
      m = '积分兑换';
      break
    case 2:
      m = '现金购买';
      break
    case 3:
      m = '免费领取';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatIsCurrency (t) {
  let m
  switch (t) {
    case 1:
      m = '全场通用';
      break
    case 2:
      m = '部分门店可用';
      break
    default:
      m = '';
      break
  }
  return m
}

export function formatExpireMessageType (t) {
  let m
  switch (t) {
    case 1:
      m = '短信';
      break
    case 2:
      m = '公众号消息';
      break
    case 3:
      m = '公众号+短信';
      break
    default:
      m = '';
      break
  }
  return m
}