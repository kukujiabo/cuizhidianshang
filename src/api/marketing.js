/*
 * @Author: lee
 * @Date: 2020-07-12 23:19:38
 * @LastEditors: lee
 * @LastEditTime: 2020-07-22 00:35:50
 * @Description: 营销工具
 */

// =================================== 优惠券

import request from '@/utils/request'
import reqform from '@/utils/request-form'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 新增优惠券
 * @param {*} data post参数
 */
export async function addCoupon(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/addCoupon`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询优惠券
 * @param {*} data post参数
 */
export async function queryCouponList(data) {
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

/**
 * 定向投放
 * @param {*} data post参数
 */
export async function setDistributeCoupon(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/setDistributeCoupon`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 获得单个优惠券
 * @param {*} data post参数
 */
export async function getCoupon(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/getCoupon`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 修改优惠券
 * @param {*} data post参数
 */
export async function upCoupon(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/upCoupon`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 更新优惠券状态
 * @param {*} data post参数
 */
export async function upCouponStatus(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/promote/upCouponStatus`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

// =================================== 裂变
/**
 * 新增裂变活动
 * @param {*} data post参数
 */
export async function addFission(data) {
  // data = qs.stringify(data)
  return reqform('market/addFission', data)
}

/**
 * 查询裂变活动列表
 * @param {*} data post参数
 */
export async function queryFission(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/market/queryFission`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 编辑裂变活动状态
 * @param {*} data post参数
 */
export async function upFissionStatus(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/market/upFissionStatus`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 删除裂变活动
 * @param {*} data post参数
 */
export async function removeFission(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/market/removeFission`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 获得单个裂变
 * @param {*} data get参数
 */
export async function getFission(id) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/market/getFission/${id}`,
    method: 'get',
    headers: { ...headers, ...postHeader },
    data: {}
  })
}

/**
 * 编辑裂变活动
 * @param {*} data post参数
 */
export async function upFission(data) {
  // data = qs.stringify(data)
  return reqform('market/upFission', data)
}
