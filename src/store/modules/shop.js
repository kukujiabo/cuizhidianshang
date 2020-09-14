const state = {
  currentShop: {},
  shopList: []
}

const mutations = {
  SET_CURRENT_SHOP: (state, shop) => {
    state.currentShop = shop
  },
  SET_ALL_SHOP: (state, shopList) => {
    state.shopList = shopList
  }
}

const actions = {
  setCurrentShop({ commit }, data) {
    commit('SET_CURRENT_SHOP', data)
  },
  setAllShop({ commit }, data) {
    commit('SET_ALL_SHOP', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

