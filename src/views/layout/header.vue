<template>
  <header class="app-header">
    <!-- <img class="header-logo" src="https://yangyuji.github.io/h5-factory/static/img/logo.png">h5-factory -->
    <div>
      <el-dropdown @command="selectDropdownMenu">
        <span class="el-dropdown-link">
          {{ shopInfo.name }} <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="shop in getShopList.filter(shop => shop.id !== shopInfo.id)"
            :key="shop.id"
            :command="shop.id"
          >{{ shop.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="btns">
      <el-popover
        placement="bottom"
        trigger="click"
      >
        <img style="width:120px;height:120px" :src="Host + '/api/shop/qrCode/' + shopInfo.appId ">
        <el-button slot="reference" style="margin-right:10px">查看二维码</el-button>
      </el-popover>
      <el-button type="primary" @click="savePageConfig">保存</el-button>
      <el-button class="return" plain @click="goback">退出店铺编辑</el-button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { Host } from '@/config'
import { setAppId, setShopName, setShopId } from '@/utils/auth'
export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters(['getShopList'])
  },
  props: {
    shopInfo: {
      type: Object,
      default: () => ({ })
    }
  },
  created() {
    console.log(this.getShopList)
  },
  data() {
    return {
      Host: Host
    }
  },
  methods: {
    goback() {
      window.location.href = '/'
    },
    selectDropdownMenu(evt) {
      const shop = this.getShopList.find(s => s.id = evt)
      this.$router.push({ path: `/decoration/${evt}` })
      this.$emit('changeshop', evt)
    },
    savePageConfig() {
      this.$bus.$emit('savepageconfig')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-header {
    position: relative;
    height: 80px;
    line-height: 80px;
    padding: 0 40px 0 20px;
    background: #111B37;
    font-size: 18px;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .el-dropdown-link {
      color: #fff;
      font-size: 22px;
      font-weight: 900;
    }
    .header-logo {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 15px;
    }
    .btns {
      .el-button {
        width: 120px;
        padding: 0;
        height: 36px;
        line-height: 34px;
      }
      .return {
        color: #FFF;
        background: transparent;
        border: 1px solid #FFF;
        box-sizing: border-box;
      }
    }
  }
</style>
