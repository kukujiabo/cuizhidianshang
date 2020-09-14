/*
 * @Author: lee
 * @Date: 2020-07-11 22:52:06
 * @LastEditors: lee
 * @LastEditTime: 2020-07-19 00:17:26
 * @Description: file content
 */
import { getTokenType, getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import host from '../api/host'

const reqform = (api, data) => {
  var formData = new FormData()
  for (var n in data) {
    if (data[n]) {
      if (data[n] instanceof Blob || data[n] instanceof File) {
        formData.append(n, data[n])
      } else if (data[n] instanceof Array) {
        for (let index = 0; index < data[n].length; index++) {
          formData.append(n + '[' + index + ']', data[n][index])
        }
      } else {
        var value = typeof data[n] === 'string' ? data[n] : (data[n]['value'] ? data[n]['value'] : JSON.stringify(data[n]))
        formData.append(n, value)
      }
    }
  }

  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('POST', host + '/' + api)
    xhr.setRequestHeader('Authorization', getTokenType() + ' ' + getToken())
    xhr.setRequestHeader('appid', Cookies.get('appid'))
    xhr.onerror = () => {
      reject(new Error(xhr.responseText))
    }
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(new Error(xhr.responseText))
      } else {
        resolve(JSON.parse(xhr.responseText))
      }
    }
    xhr.send(formData)
  })
}
export default reqform
