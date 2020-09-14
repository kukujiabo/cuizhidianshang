import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenTypeKey = 'Admin-Token-Type'
const AppId = 'appid'
const ShopId = 'shopid'
const ShopName = 'shopName'

export function getShopName() {
  return Cookies.get(ShopName)
}

export function getShopId() {
  return Cookies.get(ShopId)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getAppId() {
  return Cookies.get(AppId)
}

export function getTokenType() {
  return Cookies.get(TokenTypeKey)
}

export function setTokenType(token) {
  return Cookies.set(TokenTypeKey, token)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setAppId(appid) {
  return Cookies.set(AppId, appid)
}

export function setShopId(shopid) {
  return Cookies.set(ShopId, shopid) 
}

export function setShopName(shopName) {
  return Cookies.set(ShopName, shopName)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeTokenType() {
  return Cookies.remove(TokenTypeKey)
}

export function removeAppId() {
  return Cookies.remove(AppId)
}

export function removeShopId() {
  return Cookies.remove(ShopId)
}

export function removeShopName() {
  return Cookies.remove(ShopName)
}