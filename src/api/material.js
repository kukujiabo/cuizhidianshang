import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 新增分类
 * @param {*} data 
 */
export async function createMateiralClass(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/addcls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 获取素材列表
 * @param {*} data 
 */
export async function getMaterialList(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/queryRes`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询分类列表
 * @param {*} data 
 */
export async function getMaterialClass(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/querycls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 批量删除
 * @param {*} data 
 */
export async function batchRemoveMaterial(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/removeRes`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * get blob file
 */
export async function getBlobFile(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/download/${data}`,
    method: 'get',
    headers: { ...headers, ...postHeader },
    responseType: 'blob',
    data
  })
}

/**
 *  移动
 */
export async function moveMaterial(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/res/moveTo`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}
