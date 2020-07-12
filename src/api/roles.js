import request from '@/utils/request'
import host from './host'
import { getToken, getTokenType } from '@/utils/auth'

const postHeader = {
  'Content-Type': 'application/json'
}

/**
 * 添加角色
 * @param {*} data 
 */
export async function addNewRole(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/addRole`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询角色列表
 * @param {*} data 
 */
export async function getRoleList(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/queryRoles`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 查询全部菜单
 * @param {}} data 
 */
export async function getAllMenus() {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/getAllMenu`,
    method: 'get',
    headers: { ...headers, ...postHeader }
  })
}

/**
 * 查询角色菜单
 * @param {} data 
 */
export async function getAllRoleMenus(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/getRolePermission`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 删除角色
 * @param {*} data 
 */
export async function removeRole(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/delRole`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data: data
  })
}

/**
 * 添加员工
 * @param {} data 
 */
export async function addNewCru(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/addPerson`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 员工列表
 * @param {*} data 
 */
export async function getCruList(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/getPerson`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}

/**
 * 删除员工
 * @param {*} data 
 */
export async function removeCru(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/delPerson`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}
/**
 * 编辑角色
 * @param {*} data 
 */
export async function editRoleData(data) {
  const headers = {
    Authorization: getTokenType() + ' ' + getToken()
  }
  return request({
    url: `${host}/auth/editRole`,
    method: 'post',
    headers: { ...headers, ...postHeader },
    data
  })
}
