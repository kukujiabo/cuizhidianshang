<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="true" />
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
            <span class="create-shop">共有 {{total}} 个店铺</span>
          </div>
          <div class="arrow-right">
            <img src="@/assets/arrow-right.png">
          </div>
        </div>
      </div>
      <div class="shop-decoration" @click="toDecoration">
        <i class="el-icon-s-shop" style="font-size:18px"></i>
        <span style="margin-left:12px">店铺装修</span>
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
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
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
  .shop-decoration {
    margin-top: 30px;
    height: 50px;
    color: #1f71ff;
    font-size: 15px;
    line-height: 50px;
    padding: 0 20px;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #132456;
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
import Cookies from 'js-cookie'
import { getAllShop, createShop } from '@/api/shop'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      total: 0,
      headImage: ''
    }
  },
  created() {
    this.getAllShop()
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'getUserIcon',
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
    async getAllShop() {
      try {
        const { data } = await getAllShop({})
        this.total = data.length
      } catch (error) {
        console.log(error)
      }
    },
    toMyShop() {
      this.$router.push({ path: '/shop/index' })
    },
    toDecoration() {
      const id = Cookies.get('shopid')
      this.$router.push({ path: '/decoration/' + id })
    }
  }
}
</script>
