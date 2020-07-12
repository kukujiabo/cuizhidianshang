import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 新增分组
 * @param {*} data 
 */
export async function addNewGroup(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/addcls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询分组
 * @param {*} data 
 */
export async function queryGoodsGroup(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/querycls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
  * 查询分组
  * @param {*} data 
  */
export async function removeGroup(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/removecls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 编辑分组
 * @param {*} data 
 */
export async function editGroup(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/goods/upcls`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}
