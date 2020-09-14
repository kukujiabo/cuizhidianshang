module.exports = {
  title: '页面配置',
  base: [
    {
      type: 'text',
      label: '页面名称',
      attr: 'page-name',
      placeholder: '例：双十一专题主页',
      val: '',
      isNecessary: true
    }, {
      type: 'radio',
      label: '回到顶部',
      attr: 'gotop',
      val: true,
      options: [
        {
          name: '显示',
          val: true
        }, {
          name: '不显示',
          val: false
        }
      ],
      isNecessary: false
    }, {
      type: 'text',
      label: '文件名称',
      attr: 'page-name',
      rules: {
        regex: '^[0-9a-zA-Z_]{1,}$',
        tips: '只能输入字母、数字或者下划线'
      },
      placeholder: '生成的html文件名称',
      val: '',
      isNecessary: true
    }
  ],
  style: [
    {
      type: 'color-picker',
      label: '背景颜色',
      attr: 'background-color',
      val: '#ffffff'
    }, {
      type: 'upload',
      label: '背景图片',
      attr: 'background-image',
      val: ''
    }, {
      type: 'select',
      label: '背景效果',
      attr: 'background-repeat',
      val: '',
      options: [
        {
          name: '无',
          val: 'no-repeat'
        }, {
          name: '水平重复',
          val: 'repeat-x'
        }, {
          name: '垂直重复',
          val: 'repeat-y'
        }, {
          name: '水平+垂直重复',
          val: 'repeat'
        }
      ]
    }
  ],
  weixin: [
    {
      type: 'text',
      label: 'jssdk api',
      attr: 'page-share-api',
      placeholder: '微信分享接口地址',
      val: '',
      isNecessary: true
    }, {
      type: 'text',
      label: '跳转地址',
      attr: 'page-share-url',
      placeholder: '跳转地址，不填则代表当前页',
      val: '',
      isNecessary: false
    }, {
      type: 'text',
      label: '分享标题',
      attr: 'page-share-title',
      placeholder: '微信分享的标题',
      val: '',
      isNecessary: true
    }, {
      type: 'textarea',
      label: '分享描述',
      attr: 'page-share-desc',
      placeholder: '微信分享的描述文字',
      val: '',
      isNecessary: true
    }, {
      type: 'upload',
      label: '分享图标',
      attr: 'page-share-icon',
      val: '',
      isNecessary: true
    }, {
      type: 'desc',
      label: '使用说明',
      val: `获取微信签名的接口请使用get(application/json)方式，跨域需接口支持，返回格式如下：<br/>
           {
              data: {
                appId: 'appId',
                timestamp: 15888888,
                nonceStr: 'nonceStr',
                signature: 'signature',
              },
              msg: '不为空则提示该消息'
           }`
    }
  ],
  index: {
    key: 'index',
    pageName: '首页'
  },
  car: {
    key: 'car',
    pageName: '直通车',
    brandInfo: {
      logo: '',
      brandName: '',
      brandDesc: ''
    },
    goodsList: []
  },
  goods: {
    key: 'goods',
    searchHolder: '搜索相关关键词',
    searchDisplay: 1,
    pageName: '好物分享',
    displayType: 1,
    goodsList: []
  },
  message: {
    key: 'message',
    pageName: '消息中心'
  },
  me: {
    key: 'me',
    pageName: '个人中心',
    inviteBonus: {
      type: 1,
      display: 1,
      words: '赚高额佣金'
    },
    items: {
      layoutType: 1,
      menu: ['money', 'asset', 'rank', 'opinion'],
      menus: [
        {
          key: 'money',
          title: '快速赚钱',
          display: 1
        }, {
          key: 'asset',
          title: '我的资产',
          display: 1
        }, {
          key: 'rank',
          title: '我的等级',
          display: 1
        }, {
          key: 'opinion',
          title: '意见反馈',
          display: 1
        }
      ]
    }
  }
}
