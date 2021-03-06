const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  getPhone: state => state.user.phone,
  getUserName: state => state.user.userName,
  getUserCode: state => state.user.userCode,
  getUserIcon: state => state.user.icon,
  getUserPhone: state => state.user.phone,
  getCurrentShop: state => state.shop.currentShop,
  getShopList: state => state.shop.shopList,
  getWxNo: state => state.user.wxno
}
export default getters
