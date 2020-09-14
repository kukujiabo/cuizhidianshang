<template>
  <div class="navbar">
    <div class="version">
      当前版本： &nbsp;<el-button type="primary" plain style="background-color:#FFF;border:1px solid #1f71ff;color:#1f71ff">旗舰版</el-button>
    </div>
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />
        <div class="right-menu-item">
          <svg-icon class-name="icon-bell" icon-class="bell" @click.stop="click" />
        </div>
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/useradmin.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>账号设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
import Cookies from 'js-cookie'
import { removeToken, removeTokenType, removeAppId } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('shop/setCurrentShop', {})
      await this.$store.dispatch('shop/setAllShop', [])
      this.$store.dispatch('user/logout')
      // Cookies.remove('appid')
      removeAppId()
      removeToken()
      removeTokenType()
      this.$message({ type: 'success', message: '您已退出成功！' })
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.navbar {
  height: 100px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid #efefef;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .version {
    position: absolute;
    top: 0;
    left: 30px;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    font-weight: 800;
    color: #333;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    @extend .flex;
    @extend .flex-row;
    @extend .flex-align-center;
    @extend .flex-justify-end;
    height: 100%;
    line-height: 100px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      .icon-bell {
        margin-right: 20px;
        font-size: 20px;
        color: #ccc;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 40px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 48px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
