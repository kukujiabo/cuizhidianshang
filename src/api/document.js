import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 查询档案列表接口
 * @param {*} data 
 */
export async function queryDocuments(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/query`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询档案详情
 * @param {*} id 
 */
export async function getDocumentDetail(id) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/get/${id}`,
    method: 'get',
    headers: { ...headers, ...postHeader },
    data: {}
  })
}

/**
 * 编辑档案状态接口
 * @param {}} data 
 */
export async function editStatus(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/upGoodsStatus`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}


/**
 * 删除档案接口
 * @param {}} data 
 */
export async function removeGoods(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/removeGoods`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 档案移出分组
 * @param {*} data 
 */
export async function removeFromGroup(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/moveOut`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  }) 
}

export async function stopGoods(id, api) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/${api}`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data: { id, putMode: 1 }
  }) 
}

export async function moveGoodsInClass(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/moveIn`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data: data
  }) 
}