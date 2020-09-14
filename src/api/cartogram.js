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
export async function getVisitorLogsCount(data1) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/account/getVisitorLogsCount`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data:{
		"appid":data1
		}
  })
}