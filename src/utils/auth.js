import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenTypeKey = 'Admin-Token-Type'

export function getToken() {
  return Cookies.get(TokenKey)
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

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeTokenType() {
  return Cookies.remove(TokenTypeKey)
}
