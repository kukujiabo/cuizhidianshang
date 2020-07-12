import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 修改手机号
 * @param {*} data 
 */
export async function updatePhone(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/upPhone`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 更新密码
 * @param {} data 
 */
export async function updatePassword(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/upPwd`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 发送修改手机号验证码
 * @param {*} data 
 */
export async function sendUpdatePhoneCode(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/sendUpPhoneCode`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 发送忘记密码短信
 * @param {*} data 
 */
export async function sendForgetPasswordCode(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/sendForgetPwdCode`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 忘记密码修改
 * @param {*} data 
 */
export async function updateForgetPassword(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/upForgetPwd`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 密码登录
 * @param {*} data 
 */
export function pwdlogin(data) {
  return request({
    url: `${host}/account/tokenOfPwd`,
    method: 'post',
    data
  })
}

/**
 * 验证码登录
 * @param {*} data 
 */
export function login(data) {
  return request({
    url: `${host}/account/token`,
    method: 'post',
    data
  })
}

/**
 * 发送注册验证码
 * @param {*} data 
 */
export async function sendRegisterVerifyCode(data) {
  return await request({
    url: `${host}/account/sendRegisterCode`,
    method: 'post',
    headers: postHeader,
    data
  })
}

/**
 * 发送登录验证码
 * @param {*} data 
 */
export async function sendLoginVerifyCode(data) {
  return await request({
    url: `${host}/account/sendLoginCode`,
    method: 'post',
    headers: postHeader,
    data
  })
}

export async function register(data) {
  return await request({
    url: `${host}/account/register`,
    method: 'post',
    headers: postHeader,
    data
  })
}

/**
 * 查询登录用户信息
 * @param {} token 
 */
export function getInfo() {
  return request({
    url: `${host}/account`,
    method: 'get',
    headers: {
      Authorization: getTokenType() + ' ' + getToken()
    }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
