import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 启用店铺
 * @param {*} data 
 */
export async function enableShop(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/enable`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 停用店铺
 * @param {} data 
 */
export async function disableShop(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/stop`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 创建店铺
 * @param {*} data 
 */
export async function createShop(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/add`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询所有店铺
 * 
 */
export async function getAllShop(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/all`,
    method: 'get',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询单个店铺
 */
export async function getShop(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/get`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 编辑名称
 * @param {*} data 
 */
export async function editName(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/upName`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

// 保存店铺设计
export async function saveShopDesign(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/saveDesign`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

// 查询店铺设计
export async function getShopDesign(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/getDesign`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

// 查询店铺认证
export async function getCertify(data1) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/getCertify`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data:{
		  "shopId":data1
	  }
  })
}
// 修改店铺认证
export async function alterstore(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
const formdata = {
  'Content-type': 'multipart/form-data'
}
  return request({
    url: `${host}/shop/upCertify`,
    method: 'post',
    headers: { ...headers, ...formdata},
    data
  })
}
//店铺认证验证码
export async function dxyzm(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/shop/sendUpCertifyCode`,
    method: 'post',
    headers: { ...headers, ...postHeader},
    data
  })
}




