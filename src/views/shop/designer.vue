<template>
  <div class="designer-body">
    <app-sidebar v-if="currentPageKey === 'index'" />
    <div class="app-main">
      <app-toolbar
        v-if="confirmTabbars.length > 0"
        :tabbars="confirmTabbars"
        @showPageSet="showPageSet"
        @savePageSet="savePageSet"
        @showPreview="showPreview"
        @switchPage="switchPage"
      />
      <div class="scroll-y" ref="appPhone">

        <!-- 直通车 -->

        <div
          v-if="currentPageKey === 'car'"
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <div class="app-phone-header">
            <div class="app-phone-status-bar">
              <span>9:00</span>
              <div>
                <img class="status-bar-icon" src="@/assets/signal.png">
                <img class="status-bar-icon" src="@/assets/wifi.png">
                <img class="status-bar-icon" src="@/assets/battery.png">
              </div>
            </div>
            <div class="app-phone-title-bar">
              <span>{{ pageTitle }}</span>
            </div>
          </div>

          <div class="page-container" style="background-color:#fff;padding-top:0">
            <div class="shop-info">
              <img class="shoplogo" :src="currentPageOptions.brandInfo.logo || shopLogoHolder">
              <div style="margin-left:10px">
                <h4 style="margin: 5px 0;">{{currentPageOptions.brandInfo.brandName || '请输入品牌名称'}}</h4>
                <p style="margin: 5px 0;font-size:11px;color:#a1a1a1">{{currentPageOptions.brandInfo.brandDesc || '请输入品牌描述' }}</p>
              </div>
            </div>
            <div class="goods-list">
              <div class="goods-item" v-for="good in currentPageOptions.goodsList" :key="good.id">
                <good :data="good" />
              </div>
            </div>
          </div>

          <!-- 底部导航 -->
          <div class="app-phone-tabbar">
            <div
              v-for="tabbar in confirmTabbars"
              :key="tabbar.key"
              class="app-phone-tabbar-item"
            >
              <img class="tabbar-item-icon" :src="currentPageKey === tabbar.key ? tabbar.activeIcon : tabbar.icon">
              <span class="tabbar-item-name" :class="currentPageKey === tabbar.key ? 'active' : ''">{{ tabbar.title }}</span>
            </div>
          </div>
        </div>

        <!-- 直通车 END -->

        <!-- 好物分享 START -->

        <div
          v-else-if="currentPageKey === 'goods'"
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <div class="app-phone-header">
            <div class="app-phone-status-bar">
              <span>9:00</span>
              <div>
                <img class="status-bar-icon" src="@/assets/signal.png">
                <img class="status-bar-icon" src="@/assets/wifi.png">
                <img class="status-bar-icon" src="@/assets/battery.png">
              </div>
            </div>
            <div class="app-phone-title-bar">
              <span>{{ pageTitle }}</span>
            </div>
          </div>

          <div class="page-container" style="background-color:#fff;padding-top:0">
            <div class="search-info" v-show="currentPageOptions.searchDisplay === 1">
              <el-input readonly :placeholder="currentPageOptions.searchHolder" />
            </div>
            <div class="goods-list">
              <div class="goods-item" v-for="good in currentPageOptions.goodsList" :key="good.id">
                <haowu-good :data="good" />
              </div>
            </div>
          </div>

          <!-- 底部导航 -->
          <div class="app-phone-tabbar">
            <div
              v-for="tabbar in confirmTabbars"
              :key="tabbar.key"
              class="app-phone-tabbar-item"
            >
              <img class="tabbar-item-icon" :src="currentPageKey === tabbar.key ? tabbar.activeIcon : tabbar.icon">
              <span class="tabbar-item-name" :class="currentPageKey === tabbar.key ? 'active' : ''">{{ tabbar.title }}</span>
            </div>
          </div>
        </div>

        <!-- 好物分享 END -->


        <!-- 消息 START -->

        <div
          v-else-if="currentPageKey === 'message'"
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <div class="app-phone-header">
            <div class="app-phone-status-bar">
              <span>9:00</span>
              <div>
                <img class="status-bar-icon" src="@/assets/signal.png">
                <img class="status-bar-icon" src="@/assets/wifi.png">
                <img class="status-bar-icon" src="@/assets/battery.png">
              </div>
            </div>
            <div class="app-phone-title-bar">
              <span>{{ pageTitle }}</span>
            </div>
          </div>

          <div class="page-container">
            <div class="message-item" v-for="message in messageList" :key="message.id">
              <message :data="message"></message>
            </div>
          </div>

          <!-- 底部导航 -->
          <div class="app-phone-tabbar">
            <div
              v-for="tabbar in confirmTabbars"
              :key="tabbar.key"
              class="app-phone-tabbar-item"
            >
              <img class="tabbar-item-icon" :src="currentPageKey === tabbar.key ? tabbar.activeIcon : tabbar.icon">
              <span class="tabbar-item-name" :class="currentPageKey === tabbar.key ? 'active' : ''">{{ tabbar.title }}</span>
            </div>
          </div>
        </div>

        <!-- 消息 END -->

        <!-- 个人中心 START -->

        <div
          v-else-if="currentPageKey === 'me'"
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <div class="app-phone-header">
            <div class="app-phone-status-bar">
              <span>9:00</span>
              <div>
                <img class="status-bar-icon" src="@/assets/signal.png">
                <img class="status-bar-icon" src="@/assets/wifi.png">
                <img class="status-bar-icon" src="@/assets/battery.png">
              </div>
            </div>
            <div class="app-phone-title-bar">
              <span>{{ pageTitle }}</span>
            </div>
          </div>

          <div class="person-info">
            <div>
              <p class="user-name">可可豆</p>
              <div class="edit-user-info">
                <i class="el-icon-edit"></i> 编辑个人资料
              </div>
            </div>
            <div class="">
              <img class="person-avatar" src="@/assets/avatar-holder.png">
            </div>
          </div>

          <!-- 个人数据统计 -->

          <div class="data-panel">
            <div class="panel-item">
              <span class="count">1</span>
              <span class="item-name">订单</span>
            </div>
            <div class="panel-item">
              <span class="count">7</span>
              <span class="item-name">优惠券</span>
            </div>
            <div class="panel-item">
              <span class="count">0</span>
              <span class="item-name">收藏</span>
            </div>
            <!-- <div class="panel-item">
              <span class="count">9</span>
              <span class="item-name">关注</span>
            </div> -->
          </div>

          <!-- 分享 -->
          <div class="item-list">
            <div class="item" >
              <div class="title">
                <img class="icon" style="width:16px;height:16px" src="@/assets/hot.png"/>推广中心
              </div>
              <div class="red-pack">
                <span v-if="currentPageOptions.inviteBonus.display === 1">{{currentPageOptions.inviteBonus.words}}</span>
                <img src="@/assets/right.png">
              </div>
            </div>
          </div>

          <!-- 菜单 -->
          <div :class="currentPageOptions.items.layoutType === 1 ? 'item-list' : 'item-grid'">
            <div class="item" v-if="currentPageOptions.items.menu.includes('money')">
              <div class="title">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 2" style="width:46px;height:46px" src="@/assets/wallet-row.png">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 1" style="width:16px;height:16px" src="@/assets/wallet.png">我的账户
              </div>
              <div class="arrow">
                <img src="@/assets/right.png">
              </div>
            </div>
            <div class="item" v-if="currentPageOptions.items.menu.includes('asset')">
              <div class="title">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 2" style="width:46px;height:46px" src="@/assets/prize-row.png">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 1" style="width:18px;height:18px" src="@/assets/prize.png">赠送记录
              </div>
              <div class="arrow">
                <img src="@/assets/right.png">
              </div>
            </div>
            <div class="item" v-if="currentPageOptions.items.menu.includes('rank')">
              <div class="title">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 2" style="width:46px;height:46px" src="@/assets/favorite-row.png">
                <img class="icon" v-if="currentPageOptions.items.layoutType === 1" style="width:18px;height:18px" src="@/assets/favorite.png">我的收藏
              </div>
              <div class="arrow">
                <img src="@/assets/right.png">
              </div>
            </div>
            <!-- <div class="item" v-if="currentPageOptions.items.menu.includes('opinion')">
              <div class="title">
                <img class="icon" src="@/assets/edit.png">意见反馈
              </div>
              <div class="arrow">
                <img src="@/assets/right.png">
              </div>
            </div> -->
          </div>

          <!-- 底部导航 -->
          <div class="app-phone-tabbar">
            <div
              v-for="tabbar in confirmTabbars"
              :key="tabbar.key"
              class="app-phone-tabbar-item"
            >
              <img class="tabbar-item-icon" :src="currentPageKey === tabbar.key ? tabbar.activeIcon : tabbar.icon">
              <span class="tabbar-item-name" :class="currentPageKey === tabbar.key ? 'active' : ''">{{ tabbar.title }}</span>
            </div>
          </div>
        </div>

        <!-- 个人中心 END -->

        <!-- 可编辑页面 -->

        <div
          v-else
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <div class="show-templates">
            <el-button @click="showTemplates = true">模版中心</el-button>
          </div>
          <div class="app-phone-header">
            <div class="app-phone-status-bar">
              <span>9:00</span>
              <div>
                <img class="status-bar-icon" src="@/assets/signal.png">
                <img class="status-bar-icon" src="@/assets/wifi.png">
                <img class="status-bar-icon" src="@/assets/battery.png">
              </div>
            </div>
            <div class="app-phone-title-bar">
              <span>{{ pageTitle }}</span>
            </div>
          </div>
          <template v-for="(comp, idx) in compList">
            <!--占位提示控件-->
            <div
              v-if="comp.type === 'placeholder'"
              :key="comp.domId"
              :data-index="idx"
              class="place-holder"
              :class="{ active: compList.length === 1 && comp.type === 'placeholder' }"
              @dragover.stop="dragover"
              @drop.stop="drop"
              @dragover.prevent
            >放在这里</div>

            <div
              v-else
              :key="comp.domId"
              :data-index="idx"
              :class="['tpl-container', comp.active ? 'current' : '']"
              @click.capture="clickComp"
              @dragover.stop="dragover"
              @dragleave.stop="dragleave"
              @drop.stop="drop"
              @dragover.prevent
            >
              <!--文本控件-->
              <base-text v-if="comp.type === 'text'" :component="comp" />
              <!--图片控件-->
              <base-image v-if="comp.type === 'img'" :component="comp" />
              <!--表单控件-->
              <base-form v-if="comp.type === 'form'" :component="comp" />
              <!--轮播图控件-->
              <swiper-banner v-if="comp.type === 'swiper-banner'" :component="comp" />
              <!--楼层导航控件-->
              <floor-menu v-if="comp.type === 'floor-menu'" :component="comp" />
              <!--横向滚动控件-->
              <scroll-left v-if="comp.type === 'scroll-left'" :component="comp" />
              <!--倒计时控件-->
              <timeout v-if="comp.type === 'timeout'" :component="comp" />
              <!--滚动新闻控件-->
              <news-marquee v-if="comp.type === 'news-marquee'" :component="comp" />
              <!--金刚位控件-->
              <grid-menu v-if="comp.type === 'grid-menu'" :component="comp" />
              <!--页面标题-->
              <page-title v-if="comp.type === 'page-title'" :component="comp" />
              <!--页面段落-->
              <page-paragraph v-if="comp.type === 'page-paragraph'" :component="comp" />
              <!--页面引言-->
              <page-intro v-if="comp.type === 'page-intro'" :component="comp" />
              <!--页面FAQ-->
              <page-faq v-if="comp.type === 'page-faq'" :component="comp" />
              <!--横向列表-->
              <horizontal-list v-if="comp.type === 'horizontal-list'" :component="comp" />
              <!--分类组件-->
              <fen-lei v-if="comp.type === 'fenlei'" :component="comp" />
              <!--纵向列表-->
              <vertical-list v-if="comp.type === 'vertical-list'" :component="comp" />
              <!--富文本-->
              <richtext v-if="comp.type === 'richtext'" :component="comp" />

              <!--控件操作-->
              <div class="comp-menu">
                <a
                  href="javascript:void(0)"
                  :class="[idx == 1 ? 'disabled' : '']"
                  @click="upComp(idx)"
                >
                  <span class="tips">上移</span>
                  <i class="fa fa-arrow-circle-up" />
                </a>
                <a
                  href="javascript:void(0)"
                  :class="[idx == compList.length - 2 ? 'disabled' : '']"
                  @click="downComp(idx)"
                >
                  <span class="tips">下移</span>
                  <i class="fa fa-arrow-circle-down" />
                </a>
                <a href="javascript:void(0)" @click="delComp(idx)">
                  <span class="tips">删除</span>
                  <i class="fa fa-trash" />
                </a>
              </div>
            </div>
          </template>
          <!-- 底部导航 -->
          <div class="app-phone-tabbar">
            <div
              v-for="tabbar in confirmTabbars"
              :key="tabbar.key"
              class="app-phone-tabbar-item"
            >
              <img class="tabbar-item-icon" :src="currentPageKey === tabbar.key ? tabbar.activeIcon : tabbar.icon">
              <span class="tabbar-item-name" :class="currentPageKey === tabbar.key ? 'active' : ''">{{ tabbar.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <preview-dialog :show.sync="previewShow" />
    <app-opt v-if="currentConfig" :option="currentConfig" :pageOption="currentPageOptions" />
    <app-page-opt v-else :option="currentPageOptions" :pageKey="currentPageKey" />
    <click-config
      :show.sync="clickShow"
      :option="currentConfig"
      :comps="compList"
      :index="click.index"
      :tabs="click.tabs"
    />
    <el-dialog width="1300px" title="店铺导航管理" :visible.sync="showBottomManage">
      <div class="tabbar-content">
        <el-row>
          <el-col :span="12" style="display:relative">
            <div class="dialog-phone-container">
              <div class="dialog-phone-wrapper">
              
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-tabbar-controls">
              <div class="d-t-controls-panel">
                <div class="d-t-controls-tips">
                  <p style="font-weight:900">添加导航</p>
                  <p style="font-size:12px;color:#a1a1a1">导航默认最多5个，最少3个，首页、好物分享和个人中心无法删除</p>
                </div>
                <div class="dialog-tabbar-items">
                  <div v-for="(tabbar, index) in confirmTabbars" :key="tabbar.key" class="dialog-tabbar-item">
                    <div class="dti-title">
                      <span>{{ tabbar.title }}</span>
                    </div>
                    <div class="dti-form">
                      <div class="dti-info">
                        <div class="d-i-title">
                          标题：<el-input v-model="tabbar.title" style="width:140px;" />
                        </div>
                        <div class="d-i-jump">
                          跳转连接：<span>{{ tabbar.title }}</span>
                        </div>
                      </div>
                      <div class="dti-icons">
                        <div class="dti-icon">
                          <el-upload
                            class="avatar-uploader"
                            :action="Host + '/api/goods/upImgFile'"
                            :show-file-list="false"
                            :on-success="(res) => handleInactiveIconSuccess(res, tabbar)"
                            :headers="{
                              Authorization: token
                            }"
                          >
                            <img v-if="tabbar.icon" :src="tabbar.icon" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                          </el-upload>
                          <p>默认图标</p>
                        </div>
                        <div class="dti-icon">
                          <el-upload
                            class="avatar-uploader"
                            :action="Host + '/api/goods/upImgFile'"
                            :show-file-list="false"
                            :on-success="(res) => handleActiveIconSuccess(res, tabbar)"
                            :headers="{
                              Authorization: token
                            }"
                          >
                            <img v-if="tabbar.activeIcon" :src="tabbar.activeIcon" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                          </el-upload>
                          <p>选中图标</p>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="dti-remove">
                      <el-button :disabled="['index', 'goods', 'me'].includes(tabbar.key) ? true : false" type="text" icon="el-icon-delete" @click="removeTabbar(index)" />
                    </div> -->
                  </div>
                  <div v-if="tabbars.length < 5" style="padding:10px 66px">
                    <el-button type="primary" plain icon="el-icon-plus" @click="addTabItem">添加导航</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="controller">
        <el-button style="width:120px" @click="cancelTabbar">取消</el-button>
        <el-button style="width:120px" type="primary" @click="confirmTabbar">确定</el-button>
      </div>
    </el-dialog>
    <subject ref="subject"/>
    <templates v-show="showTemplates" @selected="selectTemplate" @close="showTemplates = false"></templates>
  </div>
</template>

<script>
import util from '@/utils/util.js'
import appSidebar from '@/views/layout/sidebar.vue'
import appToolbar from '@/views/layout/toolbar.vue'
import appOpt from '@/views/layout/option.vue'
import appPageOpt from '@/views/layout/pageOption.vue'
import clickConfig from '@/common/click.vue'
import previewDialog from '@/common/preview.vue'
import Message from '@/views/shop/components/message'
import Subject from '@/views/shop/components/subject'
// 页面默认配置
import pageOption from '@/config/page.config.js'
// 组件默认配置
import compConfig from '@/config/comp.config.js'
import Home from '@/assets/home.png'
import HomeActive from '@/assets/home-active.png'
import Haowu from '@/assets/haowu.png'
import HaowuActive from '@/assets/haowu-active.png'
import Geren from '@/assets/geren.png'
import GerenActive from '@/assets/geren-active.png'
import Templates from '@/views/shop/components/templates'
import Good from '@/views/shop/components/good'
import HaowuGood from '@/views/shop/components/haowu'
import { saveShopDesign, getShopDesign } from '@/api/shop'
import shopLogoHolder from '@/assets/shop-holder.png'
import { Host } from '@/config'
import Cookies from 'js-cookie'
import { getToken, getTokenType } from '@/utils/auth'

const jumpPages = {
  gs1: '/otherPage/pages/productInfo', // 图文详情
  gs2: '/otherPage/pages/videoInfo', // 视频详情
  gs3: '/otherPage/pages/musicInfo' // 音频详情
}

const classifySubDisplayTypes = {
  ct1: 'list',
  ct2: 'large',
  ct3: 'small'
}

export default {
  name: 'AppMain',
  props: {
    shopInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Good,
    HaowuGood,
    Subject,
    Message,
    Templates,
    appSidebar,
    appToolbar,
    appOpt,
    appPageOpt,
    clickConfig,
    previewDialog
  },
  data() {
    return {
      Host,
      token: getTokenType() + ' ' + getToken(),
      shopLogoHolder: shopLogoHolder,
      currentPageKey: 'index',
      showBottomManage: false,
      showTemplates: false,
      clickShow: false,
      previewShow: false,
      click: {
        index: 0,
        tabs: []
      },
      messageList: [
        {
          id: 1,
          title: '推广员系统消息',
          content: '恭喜您成为【xxx】的推广员，推广成功可赚 取佣金，推广越多，赚钱越多；快去推广吧！',
          time: '2020-07-31',
          btnText: '去赚钱'
        },
        {
          id: 2,
          title: '推广员系统消息',
          content: '您已提交申请成为推广员，商家审核通过后，您即可 成为推广员。',
          time: '2020-07-31',
          btnText: '去赚钱'
        },
        {
          id: 3,
          title: '订单信息',
          content: '您已成功购买【xxx】，请前往我的订单查看。',
          time: '2020-07-31',
          btnText: '查看'
        }
      ],
      pageCompList: {
        'index': [
          {
            type: 'placeholder'
          }
        ],
        'car': [],
        'goods': [],
        'message': [],
        'me': []
      },
      compList: [
        {
          type: 'placeholder'
        }
      ],
      currentHolder: null,
      pageTitle: '',
      bottomMenu: null,
      pageConfig: util.copyObj(pageOption),
      currentPageOptions: null,
      currentIndex: -1,
      currentConfig: null,
      shopOptionIndex: 1,
      confirmTabbars: [],
      tabbars: [
        {
          key: 'index',
          title: '首页',
          icon: 'http://eccs.com.cn/services/sres/nav/SYwxz.png',
          activeIcon: 'http://eccs.com.cn/services/sres/nav/SYxz.png'
        },
        {
          key: 'car',
          title: '直通车',
          icon: 'http://eccs.com.cn/services/sres/nav/ZTCwxz.png',
          activeIcon: 'http://eccs.com.cn/services/sres/nav/ZTCxz.png'
        },
        {
          key: 'goods',
          title: '好物分享',
          icon: 'http://eccs.com.cn/services/sres/nav/hwfx.png',
          activeIcon: 'http://eccs.com.cn/services/sres/nav/hwfx.png'
        },
        {
          key: 'message',
          title: '消息',
          icon: 'http://eccs.com.cn/services/sres/nav/XXwxz.png',
          activeIcon: 'http://eccs.com.cn/services/sres/nav/XXxz.png'
        },
        {
          key: 'me',
          title: '个人',
          icon: 'http://eccs.com.cn/services/sres/nav/WDwxz.png',
          activeIcon: 'http://eccs.com.cn/services/sres/nav/WDxz.png'
        }
      ]
    }
  },
  watch: {
    compList: {
      handler(val) {
        if (val && val.length > 1) {
          localStorage.setItem(
            'pageDateSet',
            JSON.stringify({
              time: Date.now(),
              menu: this.bottomMenu,
              config: val
            })
          )
        }
      },
      deep: true
    },
    bottomMenu: {
      handler(val) {
        localStorage.setItem(
          'pageDateSet',
          JSON.stringify({
            time: Date.now(),
            menu: val,
            config: this.compList
          })
        )
      }
    }
  },
  created() {
    this.$bus.$off('savepageconfig')
    this.$bus.$on('savepageconfig', this.savePageSet)
    this.$bus.$off('shopinfosync')
    this.$bus.$on('shopinfosync', this.getShopPageConfig)
    this.initTabbar()
  },
  mounted() {
    this.$bus.$on('click:show', (idx, tabs) => {
      this.click.index = idx
      if (Array.isArray(tabs) && tabs.length) this.click.tabs = tabs
      else this.click.tabs = ['outside', 'page', 'tel']
      this.clickShow = true
    })
    this.$bus.$on('showManageShopNav', () => {
      this.showBottomManage = true
    })
    this.$bus.$on('showManageSubject', () => {
      this.$refs.subject.show()
    })
    this.$bus.$on('click:submit', (idx, config) => {
      if (idx > -1 && config) {
        if (this.currentIndex >= 0) {
          this.compList[this.currentIndex].action.config[idx].click = config
        } else if (this.currentIndex === -2) {
          // 底部导航栏点击配置
          this.bottomMenu.action.config[idx].click = config
        }
      }
    })
    this.currentHolder = document.getElementsByClassName('place-holder')[0]
    this.readLocalData()
    this.showPageSet()    
  },
  methods: {
    scrollPhone(evt) {
      console.log(evt)
    },
    selectTemplate({ conf: { comp } }) {
      console.log(comp)
      this.compList = comp
      this.pageCompList.index = comp
    },
    async initTabbar() {
      try {
        const tabbarQuery = { shopId: Cookies.get('shopid'), partType: 'tabbar' }
        const { success, data } = await getShopDesign(tabbarQuery)
        console.log(data, 'tabbars')
        if (success) {
          this.confirmTabbars = JSON.parse(data.context)
        } else {
          this.tabbars.forEach(tabbar => this.confirmTabbars.push(tabbar))
        }
        this.pageTitle = this.confirmTabbars[0].title
      } catch (error) {
        this.tabbars.forEach(tabbar => this.confirmTabbars.push(tabbar))
      }
    },
    async getShopPageConfig() {
      try {
        const indexQuery = { shopId: this.shopInfo.id, partType: this.currentPageKey }
        const { data } = await getShopDesign(indexQuery)
        const preOptions = JSON.parse(data.context)
        this.pageCompList.index = this.compList = preOptions.comp
        this.currentPageOptions = preOptions.page
      } catch (error) {
        console.log(error)
      }
    },
    switchPage(key) {
      this.pageCompList[this.currentPageKey] = this.compList
      this.currentPageKey = key
      this.pageTitle = this.confirmTabbars.find(tabbar => tabbar.key === key).title
      this.compList = this.pageCompList[key]
      this.currentConfig = null
      this.currentPageOptions = this.pageConfig[key]
      this.getShopPageConfig()
    },
    cancelTabbar() {
      this.tabbars = JSON.parse(JSON.stringify(this.confirmTabbars))
      this.showBottomManage = false
    },
    async confirmTabbar() {
      const options = {
        shopId: this.shopInfo.id,
        partType: 'tabbar',
        context: JSON.stringify(this.confirmTabbars)
      }
      const tabbarArray = [options]
      try {
        const { success, message } = await saveShopDesign(tabbarArray)
        if (success) {
          this.$message({ type: 'success', message: '导航保存成功！' })
          this.showBottomManage = false
        } else {
          this.$message({ type: 'error', message })
        }
      } catch (error) {
        this.$message({ type: 'error', message: '保存导航失败！' })
      }
    },
    removeTabbar(index) {
      const tabbars = this.tabbars
      this.$confirm(`确认删除 ${tabbars[index].title} ?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        tabbars.splice(index, 1)
      })
    },
    handleActiveIconSuccess(res, tabbar) {
      tabbar.activeIcon = Host + res.data.url
    },
    handleInactiveIconSuccess(res, tabbar) {
      tabbar.icon = Host + res.data.url
    },
    addTabItem() {
      const item = {
        key: new Date().getTime().toString(),
        title: '新导航',
        icon: '',
        activeIcon: ''
      }
      if (this.tabbars[1].key === 'goods') {
        this.tabbars.splice(1, 0, item)
        return
      }
      if (this.tabbars[3].key === 'me') {
        this.tabbars.splice(3, 0, item)
        return
      }
    },
    switchShopOption(index) {
      this.shopOptionIndex = index
    },
    showPageSet() {
      this.resetCompUnchecked()
      this.currentIndex = -1
      this.currentConfig = null
    },
    /**
     * 转译页面配置内容
     */
    translateOptions(compList) {
      const options = []
      compList.filter(comp => comp.type !== 'placeholder').forEach((comp, index) => {
        const newOption = { sort: index + 1 }
        const config = comp.action ? (comp.action.config || {}) : {}
        switch(comp.type) {
          case 'page-paragraph': //优惠券
            // swiperSub
            newOption.subname = 'couponSub'
            newOption.isShow = comp.action.hideUsed
            newOption.fetchMode = comp.action.fetchMode
            newOption.couponArr = []
            config.forEach(conf => {
              newOption.couponArr.push(conf)
            })
            break 
          case 'swiper-banner': // 轮播图
            // swiperSub
            newOption.subname = 'swiperSub'
            newOption.imgArr = []
            config.forEach(conf => {
              newOption.imgArr.push({
                img: conf.val,
                link: conf.link
              })
            })
            break
          case 'grid-menu': // 图文导航
            // navSub
            newOption.subname = 'navSub'
            newOption.num = config.length
            newOption.navArr = []
            config.forEach(conf => {
              newOption.navArr.push({
                img: conf.val,
                title: conf.title,
                link: conf.link,
                groups: conf.groups
              })
            })
            break
          case 'fenlei': // 分类组件
            // classifySub
            newOption.subname = 'classifySub'
            newOption.type = comp.action.display
            newOption.classifyNameArr = []
            config.forEach(conf => {
              newOption.classifyNameArr.push(conf.label)
              const key = `classifyArr${conf.key}`
              newOption[key] = []
              conf.children.forEach(itm => {
                newOption[key].push({
                  img: Host + '/res/' + itm.cover,   //列表图片
                  title: itm.title,   //列表标题
                  productInfo: itm
                })
              })
            })
            break
          case 'img': // 图片广告
            // advertiseSub
            newOption.subname = 'advertiseSub'
            newOption.num = 2
            newOption.type = 'space'
            newOption.advertisementArr = []
            config.forEach(conf => {
              newOption.advertisementArr.push({
                img: conf.val,   //广告图片
                title: conf.title,   //导航标题
                link: conf.link// link:''   //跳转页面链接
              })
            })
            break
          case 'text': // 搜索
            // searchSub
            newOption.subname = 'searchSub'
            break
          case 'horizontal-list': // 直播
            // 
            break
          case 'richtext': // 富文本
            // richSub
            newOption.subname = 'richSub'
            newOption.detail = config
            break
        }
        options.push(newOption)
      })
      console.log(options, compList)
      return options
    },
    /**
     * 保存页面配置
     */
    async savePageSet() {
      const compOptions = this.translateOptions(this.compList)
      try {
        const query = {
          shopId: this.shopInfo.id,
          partType: this.currentPageKey,
          context: JSON.stringify({ 
            front: compOptions, 
            comp: this.compList, 
            page: this.currentPageOptions 
          })
        }

        const upData = []
        for(let key in this.pageCompList) {
          const cmpOption = this.pageCompList[key]
          const transOptions = this.translateOptions(cmpOption)
          const saveOptions = { 
            front: transOptions, 
            comp: cmpOption, 
            page: this.pageConfig[key]
          } 
          console.log(saveOptions, key)
          upData.push({
            shopId: this.shopInfo.id,
            partType: key,
            context: JSON.stringify(saveOptions)
          })
        }
        // console.log(this.pageCompList, 'pageComp')
        // this.pageCompList.forEach(cmp => {
        //   upData.push({
        //     shopId: this.shopInfo.id,
        //     partType: this.currentPageKey,
        //     context: JSON.stringify({ 
        //       front: compOptions, 
        //       comp: this.compList, 
        //       page: this.currentPageOptions 
        //     })
        //   })
        // })
        // tabbar
        upData.push({
          shopId: this.shopInfo.id,
          partType: 'tabbar',
          context: JSON.stringify(this.confirmTabbars)
        })
        // style
        // upData.push({
        //   shopId: this.shopInfo.id,
        //   partType: 'style',
        //   context: JSON.stringify(this.confirmTabbars)
        // })

        const { success } = await saveShopDesign(upData)
        if (success) {
          this.$message({
            type: 'success',
            message: '保存成功！'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    showPreview() {
      localStorage.setItem('pageConfig', JSON.stringify(this.pageConfig))
      this.previewShow = true
    },
    readLocalData() {
      const tmp = localStorage.getItem('pageDateSet')
      if (tmp) {
        const localData = JSON.parse(tmp)
        // const t = util.parseTime(localData.time)
        localStorage.setItem('pageDateSet', '')
        // this.$confirm(
        //   '您有一份【' + t + '】未保存的编辑内容, 是否恢复到当前编辑界面？',
        //   '提示',
        //   {
        //     confirmButtonText: '载入',
        //     cancelButtonText: '丢弃',
        //     type: 'warning',
        //     center: true
        //   }
        // )
        //   .then(() => {
        //     this.compList = localData.config
        //     this.bottomMenu = localData.menu
        //     this.resetCompUnchecked()
        //   })
        //   .catch(() => {
        //     localStorage.setItem('pageDateSet', '')
        //   })
      }
    },
    resetCompUnchecked() {
      if (this.bottomMenu) this.bottomMenu.active = false
      this.compList.forEach(val => {
        if (val.active) {
          val.active = false
        }
      })
    },
    replacePlaceholderWithComp(index, key) {
      const comp = util.copyObj(compConfig[key])
      const config = {
        type: key,
        active: true,
        domId: key + '-' + util.createDomID()
      }
      Object.assign(comp, config)
      this.compList.splice(index + 1, 0, comp)
      // 再插入一个占位控件
      this.compList.splice(index + 2, 0, {
        type: 'placeholder'
      })
      // 显示配置项
      this.currentIndex = index + 1
      this.currentConfig = comp
    },
    addBottomMenu() {
      const comp = util.copyObj(compConfig['bottom-menu'])
      const config = {
        type: 'bottom-menu',
        active: true,
        domId: 'bottom-menu-' + util.createDomID()
      }
      Object.assign(comp, config)
      this.bottomMenu = comp
      // 显示配置项
      this.currentIndex = -1
      this.currentConfig = comp
    },
    clickComp(e) {
      if (this.bottomMenu) this.bottomMenu.active = false
      const idx = parseInt(e.currentTarget.dataset.index)
      console.log(idx)
      this.currentConfig = null
      this.compList.forEach((val, index) => {
        if (index === idx) {
          val.active = true
          this.currentIndex = index
          this.currentConfig = val
          console.log(val, 'comp-config')
        } else {
          val.active = false
        }
      })
    },
    clickBtmMenu(e) {
      this.resetCompUnchecked()
      if (this.bottomMenu) this.bottomMenu.active = true
      this.currentIndex = -2
      this.currentConfig = this.bottomMenu
    },
    delBtmMenu() {
      this.bottomMenu = null
      // 显示页面配置参数
      this.showPageSet()
    },
    upComp(idx) {
      if (idx < 2) {
        return false
      }
      // 复制当前控件
      const tmp = util.copyObj(this.compList[idx])
      // 再删除控件+占位坑
      this.compList.splice(idx, 2)
      // 再插入控件
      this.compList.splice(idx - 2, 0, tmp)
      // 最后插入一个占位控件
      this.compList.splice(idx - 1, 0, {
        type: 'placeholder'
      })
      // 显示当前组件配置
      this.currentIndex = idx - 2
      this.currentConfig = this.compList[idx - 2]
    },
    downComp(idx) {
      if (idx === this.compList.length - 2) {
        return false
      }
      // 复制当前控件
      const tmp = util.copyObj(this.compList[idx])
      // 再删除控件+占位坑
      this.compList.splice(idx, 2)
      // 再插入控件
      this.compList.splice(idx + 2, 0, tmp)
      // 最后插入一个占位控件
      this.compList.splice(idx + 3, 0, {
        type: 'placeholder',
        active: false
      })
      // 显示当前组件配置
      this.currentIndex = idx + 2
      this.currentConfig = this.compList[idx + 2]
    },
    delComp(idx) {
      // 删除控件
      this.compList.splice(idx, 2)
      // 显示页面配置参数
      this.showPageSet()
    },
    dragover(e) {
      const target = this.findParent(e.target)
      if (!target) {
        return
      }
      const rate = (e.clientY - target.offsetTop - 200 + this.$refs.appPhone.scrollTop)/target.offsetHeight
      if (rate < 0.5) {
        target.nextSibling.classList.remove('active')
        target.nextSibling.classList.add('inactive')
        target.previousSibling.classList.remove('inactive')
        target.previousSibling.classList.add('active')
        this.currentHolder = target.previousSibling
      } else {
        target.previousSibling.classList.remove('active')
        target.previousSibling.classList.add('inactive')
        target.nextSibling.classList.remove('inactive')
        target.nextSibling.classList.add('active')
        this.currentHolder = target.nextSibling
      }
    },
    findParent(node) {
      if (!node) {
        return null
      }
      if (node.classList.contains('place-holder')) {
        return null
      }
      if (node.classList.contains('tpl-container')) {
        return node
      } else {
        return this.findParent(node.parentNode)
      }
    },
    drop(e) {
      console.log(this.currentHolder, 'currentTarget')
      if (!this.currentHolder) {
        return
      }
      const target = this.currentHolder
      target.classList.remove('active')
      const key = e.dataTransfer.getData('cmp-type')
      if (key === 'bottom-menu') return
      const idx = parseInt(target.dataset.index)
      if (compConfig[key]) {
        this.resetCompUnchecked()
        this.replacePlaceholderWithComp(idx, key)
        this.pageCompList[this.currentPageKey] = this.compList
      } else {
        this.$message.warning('没有查询到该组件的配置信息。。。')
      }
    },
    dragleave(e) {
      // this.currentHolder.classList.remove('active')
      // this.currentHolder.classList.add('inactive')
      // if (this.compList.length > 1)
      //   this.currentHolder = null
    },
    dragPhoneOver(evt) {
      // const target = document.querySelectorAll('.place-holder:last-child')
      // if (target && !target.classList.contains('active')) {
      //   target.classList.add('active')
      // }
      const target = document.querySelectorAll('.place-holder')
      const currentTarget = target[target.length - 1]
      currentTarget.classList.add('active')
    },
    dropPhone(e) {
      const target = document.querySelectorAll('.place-holder')
      this.currentHolder = target[target.length - 1]
      this.drop(e)
      // if (target) {
      //   target.classList.remove('active')
      //   const key = e.dataTransfer.getData('cmp-type')
      //   const idx = parseInt(target.dataset.index)
      //   if (compConfig[key]) {
      //     if (key === 'bottom-menu') {
      //       if (this.bottomMenu) {
      //         this.$message.info('已经存在一个底部导航组件了，请勿重复添加！')
      //       } else {
      //         this.addBottomMenu()
      //       }
      //     } else {
      //       this.resetCompUnchecked()
      //       this.replacePlaceholderWithComp(idx, key)
      //     }
      //   } else {
      //     this.$message.warning('没有查询到该组件的配置信息。。。')
      //   }
      // }
    },
    dragPhoneLeave() {
      const target = document.querySelector('.place-holder:last-child')
      target && target.classList.remove('active')
      console.log(this.currentHolder, 'HOLDER')
      if (this.compList.length > 1) {
        this.currentHolder.classList.remove('active')
        this.currentHolder.classList.add('inactive')
        this.currentHolder = null
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~@/styles/color.scss';
@import '~@/styles/tabbarfont/iconfont.css';

.designer-body {
  display: flex;
  flex-direction: row;
  width: calc(100% - 110px);
  .app-main {
    position: relative;
    flex: 1;
    min-width: 377px;
    background-color: #F0F2F5;

    .scroll-y {
      position: absolute;
      top: 80px;
      bottom: 0;
      width: 100%;
      padding-top: 40px;
      padding-bottom: 30px;
      overflow-y: auto;
    }

    .app-phone {
      position: relative;
      box-sizing: border-box;
      width: 377px;
      min-height: 667px;
      padding-bottom: 200px;
      margin: 0 auto;
      background-color: #f0f0f0;
      transform: translateX(-20px);
      .show-templates {
        position: absolute;
        right: -130px;
        top: 0;
        .el-button {
          color: $themeBlue;
          border-color: $themeBlue;
        }
      }
      .app-phone-header {
        height: 88px;
        background-color: #fff;
        .app-phone-status-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 44px;
          .status-bar-icon {
            height: 16px;
            margin-left: 6px;
          }
        }
        .app-phone-title-bar {
          height: 44px;
          font-weight: 900;
          font-size: 16px;
          color: #333;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;
          .mini-icon {

          }
        }
      }
      .page-container {
        padding: 15px;
        .message-item {
          margin-bottom: 20px;
        }
        .goods-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          .goods-item {
            margin-bottom: 20px;
          }
        }
        .search-info {
          padding-bottom: 15px;
          .el-input {
            .el-input__inner {
              border-radius: 50px;
              background-color: #f3f5f7;
            }
          }
        }
        .shop-info {
          height: 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .shoplogo {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            background-color: #f3f5f7;
          }
        }
      }
      .share {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        height: 54px;
        background-color: #fff;
        margin-top: 10px;
        color: #333333;
      }
      .item-grid {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 10px 0;
        .item:nth-child(3n) {
          border-right: 0 !important;
        }
        .item {
          width: 33.3%;
          height: 90px;
          box-sizing: border-box;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 5px 0 15px;
          .title {
            color: #666;
            font-weight: 900;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            .icon {
              height: 24px;
              width: 24px;
              margin-bottom: 15px;
            }
          }
          .arrow {
            display: none;
            img {
              width: 24px;
            }
          }
        }
      }
      .item-list {
        margin-top: 10px;
        .item {
          height: 64px;
          background-color: #fff;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 5px 0 15px;
          border-bottom: 0.5px solid #e1e1e1;
          .title {
            color: #333333;
            display: flex;
            flex-direction: row;
            align-items: center;
            .icon {
              height: 24px;
              width: 24px;
              margin-right: 7px;
            }
          }
          .arrow {
            img {
              width: 18px;
            }
          }
          .red-pack {
            color: #F13F35;
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
              width: 18px;
              margin-left: 6px;
            }
          }
        }
        
      }
      .person-info {
        height: 90px;
        border-top: 0.5px solid #F2F2F2;
        background-color: #FFF;
        padding: 0 16px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        .person-avatar {
          width: 60px;
          height: 60px;
          background-color: #f3f5f7;
          border-radius: 30px;
        }
        .user-name {
          font-size: 22px;
          font-weight: 900;
          margin: 0;
        }
        .edit-user-info {
          font-size: 12px;
          color: #999999;
          line-height: 36px;
        }
      }
      .data-panel {
        height: 72px;
        background-color: #FFF;
        border-top: 0.5px solid #F2F2F2;
        display: flex;
        flex-direction: row;
        .panel-item {
          flex: 1;
          height: 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-weight: 900;
            font-size: 16px;
            color: #333;
          }
          .item-name {
            color: #999;
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }
      .app-phone-tabbar {
        height: 56px;
        border-top: .5px solid #F2F2F2;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 50px;
        .app-phone-tabbar-item {
          height: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .tabbar-item-icon {
            width: 22px;
            height: 22px;
            // background-color: #f3f5f7;
          }
          .tabbar-item-name {
            margin-top: 7px;
            font-size: 11px;
            color: #dbdbdb;
          }
          .active {
            color: #F5A90F;
          }
        }
      }
      .place-holder {
        position: relative;
        display: block;
        height: 0px;
        text-align: center;
        font-size: 0;
        background: #fff;
        // background-image: linear-gradient(#fff 2px, transparent 0),
        //   linear-gradient(90deg, #999 1px, transparent 0);
        // background-size: 3px 3px, 3px 3px;

        &.active {
          height: 56px;
          line-height: 56px;
          border: 1px dashed $themeBlue;
          background-color: #fff;
          background-image: none;
          color: $themeBlue;
          font-size: 14px;
          margin: 0;
          animation: mymove .5s ease;
        }
        &.inactive {
          animation: revertmove .5s ease;
        }
      }

      .tpl-container {
        position: relative;
        width: 100%;
        background-color: transparent;
        position: relative;
        border: 1px solid #f2f3f4;
        transition: opacity 0.1s ease-out;
        user-select: none;
        box-sizing: border-box;
        z-index: auto;
        opacity: 1;
        cursor: pointer;

        &.current {
          border: 1px solid #2aa7ff;

          .comp-menu {
            display: block;
          }
        }

        .comp-content {
          position: relative;
        }
      }
    }

    .comp-menu {
      position: absolute;
      display: none;
      top: 0;
      right: -38px;
      width: 32px;

      > a {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 36px;
        margin-bottom: 2px;
        text-align: center;
        color: #666;
        background: #fff;
        font-size: 18px;
        line-height: 36px;

        &.disabled {
          color: #e4e4e4;
        }

        &:hover {
          &.disabled {
            color: #e4e4e4;
          }
          color: #333;
          .tips {
            display: block;
          }
        }

        .tips {
          font-size: 12px;
          position: absolute;
          left: 120%;
          background-color: #111;
          height: 18px;
          padding: 0 5px;
          line-height: 19px;
          border-radius: 2px;
          white-space: nowrap;
          display: none;
          color: #eee;
          top: 5px;

          &::before {
            content: " ";
            display: block;
            position: absolute;
            left: -5px;
            top: 4.5px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 6px 5px 0;
            border-color: transparent #111 transparent transparent;
          }
        }
      }
    }

    .absolute-tpl {
      width: 377px;
      margin: 0 auto;
      transform: translateX(-20px);
      border-top: 1px solid #e8e8e8;

      &.current {
        border: 1px solid #2aa7ff;

        .comp-menu {
          display: block;
        }
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      margin-top: 8vh !important;
      .el-dialog__body {
        padding: 10px 0 !important;
        .tabbar-content {
          height: 850px;
          background-color: #f3f5f7;
          .el-row {
            height: 100%;
            .el-col {
              height: 100%;
              position: relative;
              .dialog-phone-container {
                display: absolute;
                top: 0;
                left: 0;
                height: 100%;
                right: 0;
                .dialog-phone-wrapper {
                  position: absolute;
                  margin: auto;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  width: 377px;
                  height: 667px;
                  background-color: #FFFFFF;
                  background-image: url('../../assets/empty-phone.png');
                  background-position: center center;
                  background-size: 100% 100%;
                }
              }
              .dialog-tabbar-controls {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                right: 0;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                .d-t-controls-panel {
                  width: 500px;
                  .d-t-controls-tips {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-end;
                  }
                  .dialog-tabbar-items {
                    width: 500px;
                    height: 715px;
                    background-color: #FFF;
                    padding: 20px 0px;
                    box-sizing: border-box;
                    .dialog-tabbar-item {
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      margin-bottom: 30px;
                      .dti-title {
                        width: 66px;
                        font-size: 12px;
                        font-weight: 900;
                        text-align: center;
                      }
                      .dti-form {
                        width: 400px;
                        height: 100px;
                        background-color: #f3f5f7;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .dti-info {
                          padding: 0 20px;
                          width: 240px;
                          box-sizing: border-box;
                          .d-i-title {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                          }
                          .d-i-jump {
                            height: 42px;
                            line-height: 48px;
                          }
                        }
                        .dti-icons {
                          display: flex;
                          flex-direction: row;
                          width: 160px;
                          .dti-icon {
                            text-align: center;
                            width: 80px;
                            p {
                              margin: 3px 0;
                              font-size: 12px;
                            }
                            .avatar-uploader .el-upload {
                              border: 1px dashed #d9d9d9;
                              border-radius: 6px;
                              cursor: pointer;
                              position: relative;
                              overflow: hidden;
                            }
                            .avatar-uploader .el-upload:hover {
                              border-color: #409EFF;
                            }
                            .avatar-uploader-icon {
                              font-size: 28px;
                              color: #8c939d;
                              width: 54px;
                              height: 54px;
                              line-height: 54px;
                              text-align: center;
                            }
                            .avatar {
                              width: 54px;
                              height: 54px;
                              display: block;
                            }
                            .tab-icon {
                              width: 54px;
                              height: 54px;
                              background-color: #c3c5c7;
                            }
                          }
                        }
                      }
                      .dti-remove {
                        width: 40px;
                        text-align: center;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .controller {
          height: 90px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

@keyframes mymove {
  from {
    height: 0px;
  }
  to {
    height: 56px;
  }
}
@keyframes revertmove {
  from {
    border: 1px dashed $themeBlue;
    height: 56px;
  }
  to {
    border: 1px dashed #fff;
    height: 0px;
  } 
}
</style>
