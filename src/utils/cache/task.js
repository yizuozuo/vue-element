import Cache from '../cache'
const TempCodeKey = 'task-temp-code'

export function getTempCode() {
  return Cache.get(TempCodeKey) || ''
}

export function setTempCode(t = '') {
  return Cache.set(TempCodeKey, t)
}