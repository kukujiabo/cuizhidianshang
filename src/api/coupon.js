import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 查询优惠券列表接口
 * @param {*} data 
 */
export async function queryCoupon(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/queryCouponList`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}