import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/decoration/:id',
    component: () => import('@/views/shop/app'),
    hidden: true
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget-password'),
    hidden: true
  },
  {
    path: '/shopboard',
    component: () => import('@/views/shopboard/index'),
    hidden: true
  },
  {
    path: '/hsetting',
    component: () => import('@/views/shopboard/settings'),
    hidden: true
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // }, 
  {
    path: '/',
    name: '概况纵览',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '概况纵览', icon: 'dashboard', noCache: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '概况纵览', icon: 'dashboard' }
      }
    ]
  },
  // {
  //   path: '/decoration',
  //   name: '店铺装修',
  //   component: () => import('@/views/shopboard/index'),
  //   redirect: '/decoration',
  //   meta: { title: '店铺装修', icon: 'dashboard', noCache: true },
  //   children: [
  //     {
  //       path: '/decoration/:id',
  //       component: () => import('@/views/shopboard/index'),
  //       name: 'decoration',
  //       meta: { title: '店铺装修', icon: 'dashboard' }
  //     }
  //   ]
  // },
  {
    path: '/material',
    component: Layout,
    name: '素材中心',
    redirect: '/material/index',
    meta: { title: '素材管理', icon: 'directory', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/material/index'),
        name: '素材中心',
        meta: { title: '素材中心', noCache: true }
      }
    ]
  },
  {
    path: '/commodity',
    component: Layout,
    name: '商品管理',
    redirect: '/commodity/goods',
    meta: { title: '商品管理', icon: 'component', noCache: true },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/commodity/goods'),
        name: '商品档案',
        meta: { title: '商品档案', noCache: true }
      },
      {
        path: 'comments',
        component: () => import('@/views/commodity/comments'),
        name: '查看评论',
        hidden: true,
        meta: { title: '查看评论', noCache: true }
      },
      {
        path: 'category',
        component: () => import('@/views/commodity/category'),
        name: '商品分组',
        meta: { title: '商品分组', noCache: true }
      },
      {
        hidden: true,
        path: 'content',
        component: () => import('@/views/commodity/classGoodsManage'),
        name: '内容管理',
        meta: { title: '内容管理', noCache: true }
      },
      {
        hidden: true,
        path: 'addTextImage',
        component: () => import('@/views/commodity/addTextImage'),
        name: '新增图文',
        meta: { title: '新增图文', noCache: true }
      },
      {
        hidden: true,
        path: 'editTextImage',
        component: () => import('@/views/commodity/addTextImage'),
        name: '编辑图文',
        meta: { title: '编辑图文', noCache: true }
      },
      {
        hidden: true,
        path: 'addVideo',
        component: () => import('@/views/commodity/addVideo'),
        name: '新增视频',
        meta: { title: '新增视频', noCache: true }
      },
      {
        hidden: true,
        path: 'editVideo',
        component: () => import('@/views/commodity/addVideo'),
        name: '编辑视频',
        meta: { title: '编辑视频', noCache: true }
      },
      {
        hidden: true,
        path: 'addVoice',
        component: () => import('@/views/commodity/addVoice'),
        name: '新增音频',
        meta: { title: '新增音频', noCache: true }
      },
      {
        hidden: true,
        path: 'editVoice',
        component: () => import('@/views/commodity/addVoice'),
        name: '编辑音频',
        meta: { title: '编辑音频', noCache: true }
      },
      {
        hidden: true,
        path: 'onAir',
        component: () => import('@/views/commodity/onAir'),
        name: '新增直播',
        meta: { title: '新增直播', noCache: true }
      },
      {
        hidden: true,
        path: 'editOnAir',
        component: () => import('@/views/commodity/onAir'),
        name: '编辑直播',
        meta: { title: '编辑直播', noCache: true }
      }
    ]
  },
  {
    hidden: true,
    path: '/shop',
    component: Layout,
    name: '我的店铺',
    redirect: '/shop/index',
    meta: { title: '我的店铺', icon: 'user', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/shop/index'),
        name: '我的店铺',
        meta: { title: '我的店铺', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    name: '设置',
    redirect: '/profile/index',
    meta: { title: '设置', icon: 'user', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '账户设置',
        meta: { title: '账户设置', noCache: true }
      },
      {
        path: 'role',
        component: () => import('@/views/profile/role'),
        name: '角色管理',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: 'cur',
        component: () => import('@/views/profile/role'),
        name: '员工管理',
        meta: { title: '员工管理', noCache: true }
      },
      {
        hidden: true,
        path: 'cruDetail',
        component: () => import('@/views/profile/cruDetail'),
        name: '员工详情',
        meta: { title: '员工详情', noCache: true }
      },
      {
        hidden: true,
        path: 'roleDetail',
        component: () => import('@/views/profile/roleDetail'),
        name: '角色详情',
        meta: { title: '角色详情', noCache: true }
      },
      {
        path: 'auth',
        component: () => import('@/views/profile/role'),
        name: '权限管理',
        meta: { title: '权限管理', noCache: true }
      },
      {
        hidden: true,
        path: 'addRole',
        component: () => import('@/views/profile/addRole'),
        name: '新增角色',
        meta: { title: '新增角色', noCache: true }
      },
      {
        hidden: true,
        path: 'editRole',
        component: () => import('@/views/profile/addRole'),
        name: '编辑角色',
        meta: { title: '编辑角色', noCache: true }
      },
      {
        hidden: true,
        path: 'addCru',
        component: () => import('@/views/profile/addCru'),
        name: '新增员工',
        meta: { title: '新增员工', noCache: true }
      },
      {
        hidden: true,
        path: 'editCru',
        component: () => import('@/views/profile/addCru'),
        name: '编辑员工',
        meta: { title: '编辑员工', noCache: true }
      }
    ]
  },
  {
    path: '/attestation',
    component: () => import('@/views/shop/attestation'),
    hidden: true
  },
  {
    path: '/marketing',
    component: Layout,
    name: '营销管理',
    redirect: '/marketing/index',
    meta: { title: '营销管理', icon: 'directory', noCache: true },
    children: [
      {
        hidden: true,
        path: 'index',
        component: () => import('@/views/marketing/index'),
        name: '营销管理',
        meta: { title: '营销管理', noCache: true }
      },
      {
        hidden: true,
        path: 'promotionStaff',
        component: () => import('@/views/marketing/promotionStaff'),
        name: '推广达人',
        meta: { title: '推广达人', noCache: true }
      },
      {
        hidden: true,
        path: 'inviteCode',
        component: () => import('@/views/marketing/inviteCode'),
        name: '邀请码',
        meta: { title: '邀请码', noCache: true }
      },
      {
        hidden: true,
        path: 'coupon',
        component: () => import('@/views/marketing/coupon/list'),
        name: '优惠券',
        meta: { title: '优惠券', noCache: true }
      },
      {
        hidden: true,
        path: 'coupon/add',
        component: () => import('@/views/marketing/coupon/add'),
        name: '新增优惠券',
        meta: { title: '新增优惠券', noCache: true }
      },
      {
        hidden: true,
        path: 'coupon/edit',
        component: () => import('@/views/marketing/coupon/edit'),
        name: '修改优惠券',
        meta: { title: '修改优惠券', noCache: true }
      },
      {
        hidden: true,
        path: 'coupon/copy',
        component: () => import('@/views/marketing/coupon/copy'),
        name: '复制优惠券',
        meta: { title: '复制优惠券', noCache: true }
      },
      {
        hidden: true,
        path: 'coupon/effectData',
        component: () => import('@/views/marketing/coupon/effectData'),
        name: '效果数据',
        meta: { title: '效果数据', noCache: true }
      },
      {
        hidden: true,
        path: 'groupBuying',
        component: () => import('@/views/marketing/groupBuying'),
        name: '拼团',
        meta: { title: '拼团', noCache: true }
      },
      {
        hidden: true,
        path: 'addGrouping',
        component: () => import('@/views/marketing/addGrouping'),
        name: '创建拼团',
        meta: { title: '创建拼团', noCache: true }
      },
      {
        hidden: true,
        path: 'fission',
        component: () => import('@/views/marketing/fission/list'),
        name: '裂变',
        meta: { title: '裂变', noCache: true }
      },
      {
        hidden: true,
        path: 'fission/add',
        component: () => import('@/views/marketing/fission/add'),
        name: '创建裂变',
        meta: { title: '创建裂变', noCache: true }
      },
      {
        hidden: true,
        path: 'fission/edit',
        component: () => import('@/views/marketing/fission/edit'),
        name: '修改裂变',
        meta: { title: '修改裂变', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'el-icon-s-help' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
