<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="company-logo">
        <img src="@/assets/logo-wt.png">
      </div>
      <div class="my-shop">
        <div class="shop-info" @click="toMyShop">
          <img v-if="getUserIcon" :src="getUserIcon" class="shop-head">
          <img v-else src="@/assets/header.png" class="shop-head">
          <div class="shop-name">
            <span class="myshop">我的店铺</span>
            <span class="create-shop">立即创建店铺</span>
          </div>
          <div class="arrow-right">
            <img src="@/assets/arrow-right.png">
          </div>
        </div>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
  @import '~@/styles/index.scss';
  .company-logo {
    color: #FFFFFF;
    height: 84px;
    font-size: 15px;
    font-weight: 800;
    border-bottom: 0.5px solid #666;
    @extend .flex;
    @extend .flex-row;
    @extend .flex-justify-center;
    @extend .flex-align-center;
    img {
      width: 48;
      height: 42px;
      margin-right: 10px;
    }
  }
  .my-shop:hover {
    cursor: pointer;
  }
  .my-shop {
    box-sizing: border-box;
    padding: 30px 20px 10px 15px;
    .shop-info {
      width: 100%;
      height: 66px;
      border-radius: 8px;
      background-color: #4B609B;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      .shop-head {
        width: 42px;
        height: 42px;
        border: 0;
        border-radius: 8px;
        background-color: #f3f5f7;
      }
      .shop-name {
        padding-left:10px;
        color: #fff;
        width: 90px;
        height: 42px;
        line-height: 22px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
        .myshop {
          font-size: 13px;
          font-weight: 900;
        }
        .create-shop {
          font-size: 10px;
        }
      }
      .arrow-right {
        img {
          width: 18px;
        }
      }
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      headImage: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'getUserIcon'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toMyShop() {
      this.$router.push({ path: '/shop/index' })
    }
  }
}
</script>
