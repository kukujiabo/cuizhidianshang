import { login, logout, getInfo, pwdlogin, updatePhone, updatePassword, updateUserCode, updateUserName, updateUserWxNo } from '@/api/user'
import { getToken, setToken, removeToken, getTokenType, setTokenType, removeTokenType } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Host } from '@/config'

const state = {
  token: getToken(),
  tokenType: getTokenType(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  id: 0,
  wxno: '',
  phone: '',
  icon: '',
  userName: '',
  userCode: '',
  wxOpenId: '',
  registerDateTime: '',
  lastLoginDate: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKEN_TYPE: (state, tokenType) => {
    state.tokenType = tokenType
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ICON: (state, icon) => {
    state.icon = icon
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_WX_NO: (state, wxno) => {
    state.wxno = wxno
  },
  SET_USER_CODE: (state, userCode) => {
    state.userCode = userCode
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_WX_OPENID: (state, wxOpenId) => {
    state.wxOpenId = wxOpenId
  },
  SET_REGISTER_DATE_TIME: (state, registerDateTime) => {
    state.registerDateTime = registerDateTime
  },
  SET_LAST_LOGIN_DATE: (state, lastLoginDateTime) => {
    state.lastLoginDateTime = lastLoginDateTime
  }
}

const actions = {
  pwdlogin({ commit }, userInfo) {
    const { phone, pwd } = userInfo
    return new Promise((resolve, reject) => {
      pwdlogin({ phone, pwd }).then(response => {
        const { data: { access_token, token_type }} = response
        commit('SET_TOKEN', access_token)
        commit('SET_TOKEN_TYPE', token_type)
        setToken(access_token)
        setTokenType(token_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  login({ commit }, userInfo) {
    const { phone, verifyCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone, verifyCode }).then(response => {
        const { data: { access_token, token_type }} = response
        commit('SET_TOKEN', access_token)
        commit('SET_TOKEN_TYPE', token_type)
        setToken(access_token)
        setTokenType(token_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('登录失败，请重新登录！')
        }
        console.log(data, 'userinfo')
        const { Id, Phone, UserCode, Icon, UserName, WxOpenId, RegisterDateTime, LastLoginDate, WxNo } = data
        commit('SET_ROLES', ['admin'])
        if (Icon) {
          commit('SET_ICON', Host + '/res/' + Icon)
        } else {
          commit('SET_ICON', null)
        }
        commit('SET_ID', Id)
        commit('SET_PHONE', Phone)
        commit('SET_USER_CODE', UserCode)
        commit('SET_USER_NAME', UserName)
        commit('SET_WX_OPENID', WxOpenId)
        commit('SET_WX_NO', WxNo)
        commit('SET_REGISTER_DATE_TIME', RegisterDateTime)
        commit('SET_LAST_LOGIN_DATE', LastLoginDate)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePhone({ commit }, params) {
    return new Promise((resolve, reject) => {
      updatePhone({ ...params }).then(response => {
        commit('SET_PHONE', params.newPhone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserCode({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateUserCode({ ...params }).then(response => {
        commit('SET_USER_CODE', params.userCode)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserName({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateUserName({ ...params }).then(response => {
        commit('SET_USER_NAME', params.userName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserWxNo({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateUserWxNo({ ...params }).then(response => {
        commit('SET_WX_NO', params.newWxNo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  upPwd({ commit }, params) {
    return new Promise((resolve, reject) => {
      updatePassword({ ...params }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {

    //     removeToken()
    //     resetRouter()
    //     dispatch('tagsView/delAllViews', null, { root: true })
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      router.addRoutes(accessRoutes)
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
