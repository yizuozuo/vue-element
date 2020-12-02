import Cache from '../cache'
const TokenKey = 'token'
const UserIdKey = 'uid'
const NickNameKey = 'nickname'
const RulesKey = 'rules'
const AvatarKey = 'avatar'
const UserNameKey = 'username'
const RealNameKey = 'realname'
const UserRoleKey = 'userrole'
const StoreIdKey = 'sid'
const BrandNameKey = 'brandname'
const BrandLogoKey = 'brandlogo'
const LoginNameKey = 'loginname'

export function getToken() {
  return Cache.get(TokenKey) || ''
}

export function setToken(t = '') {
  return Cache.set(TokenKey, t)
}

export function removeToken() {
  return Cache.remove(TokenKey)
}

export function getUserId() {
  return Cache.get(UserIdKey) || ''
}

export function setStoreId(sid = '') {
  return Cache.set(StoreIdKey,  sid)
}

export function getStoreId() {
  return Cache.get(StoreIdKey) || ''
}

export function setUserId(uid = '') {
  return Cache.set(UserIdKey,  uid)
}

export function removeUserId() {
  return Cache.set(UserIdKey, '')
}

export function getRules() {
  return Cache.get(RulesKey) || []
}

export function setRules(rules = []) {
  return Cache.set(RulesKey, rules)
}

export function removeRules() {
  return Cache.remove(RulesKey)
}

export function getAvatar() {
  return Cache.get(AvatarKey)
}

export function setAvatar(avatar) {
  return Cache.set(AvatarKey, avatar)
}

export function getNickName() {
  return Cache.get(NickNameKey)
}

export function setNickName(name = '') {
  return Cache.set(NickNameKey, name)
}

export function getUserName() {
  return Cache.get(UserNameKey)
}

export function setUserName(name = '') {
  return Cache.set(UserNameKey, name)
}

export function getUserRole() {
  return Cache.get(UserRoleKey)
}

export function setUserRole(role = '') {
  return Cache.set(UserRoleKey, role)
}

export function getRealName() {
  return Cache.get(RealNameKey)
}

export function setRealName(name = '') {
  return Cache.set(RealNameKey, name)
}

export function getBrandName() {
  return Cache.get(BrandNameKey)
}

export function setBrandName(name = '') {
  return Cache.set(BrandNameKey, name)
}

export function getBrandLogo() {
  return Cache.get(BrandLogoKey)
}

export function setBrandLogo(logo = '') {
  return Cache.set(BrandLogoKey, logo)
}

export function clearAll() {
  Cache.clearAll()
}
