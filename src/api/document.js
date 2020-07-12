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
