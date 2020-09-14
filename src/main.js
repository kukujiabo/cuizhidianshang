import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'
import * as filters from './filters' // global filters
import Components from './components'

Vue.use(Components)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

const eventBus = {
  install(Vue) {
    Vue.prototype.$bus = new Vue()
  }
}

Vue.use(eventBus)
Vue.use(Element, {
  size: 'medium' // Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// lee 动态加载模板的必要的依赖 start
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'
var requireComponent
// 动态加载模板的必要的依赖 end
// 默认获取leeui里的所有组件 start
// import './components/leeui/leeui.css';
requireComponent = require.context(
  // 其组件目录的相对路径
  './components/lee',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js|css)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  var componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  var componentName = fileName.replace(/.*\/(\w+)\.\w+$/, '$1')
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
// lee 默认获取leeui里的所有组件 end

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
