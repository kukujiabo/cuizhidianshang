<template>
  <div class="board-container">
    <div class="board-header">
      <img class="yuyan" src="@/assets/logo.png">
      <div>
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
    <div v-show="tab === 1">
      <div class="board-info">
        <div class="account-info">
          <div class="avatar-info">
            <img v-if="getUserIcon" class="avatar" :src="getUserIcon">
            <img v-else class="avatar" src="@/assets/header.png">
            <div>
              <p style="color:#fff;font-weight:900;font-size:18px;margin-top:7px">{{getUserPhone}}</p>
              <div>
                <el-button class="btn-setting" type="primary" plain @click="toSetting">设置</el-button>
              </div>
            </div>
          </div>
          <!-- <div>
            <el-button type="primary" icon="el-icon-plus" @click="tab = 2">新建店铺</el-button>
          </div> -->
        </div>
      </div>
      <div class="shop-list">
        <h3>我的店铺</h3>
        <div class="list">
          <el-row :gutter="20">
            <el-col v-for="shop in getShopList" :key="shop.id" :xl="4" :lg="8" :md="12">
              <shop-card :shop="shop" @selectshop="selectShop"></shop-card>
            </el-col>
            <el-col :xl="4" :lg="8" :md="12">
              <el-card class="shop-card-active">
                <div class="block new-shop" style="height:120px">
                  <el-button class="add-new-shop" type="primary" plain @click="addNewShop">+ 新建店铺</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-show="tab === 2">
      <div class='new-shop'>
        <h2>店铺类型</h2>
        <div class="shop-types">
          <el-row :gutter="80">
            <el-col :xl="5" :lg="5" :md="6">
              <el-card>
                <div class="card-container" @click="selectedType = 1">
                  <img v-if="selectedType === 1" class="select-icon" src="@/assets/unselected.png">
                  <img v-else class="select-icon" src="@/assets/selected.png">
                  <h1>我是品牌商</h1>
                  <p style="color:#999">适合一系列家装品牌/装修品牌经营公司</p>
                </div>
              </el-card>
            </el-col>
            <el-col :xl="5" :lg="5" :md="6">
              <el-card>
                <div class="card-container" @click="selectedType = 2">
                  <img v-if="selectedType === 2" class="select-icon" src="@/assets/unselected.png">
                  <img v-else class="select-icon" src="@/assets/selected.png">
                  <h1>我是家装公司</h1>
                  <p style="color:#999">适合一系列家装装修公司/家装电商公司</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div style="height:100px;"></div>
        <h2>店铺名称</h2>
        <div>
          <el-input class="new-shop-name" placeholder="请输入新店铺名称" v-model="newShopName" />
        </div>
        <div class="submit">
          <el-button @click="cancelNewShop">取消</el-button>
          <el-button v-loading="loading" type="primary" @click="submitShop">保存</el-button>
        </div>
      </div>
    </div>
    <el-dialog class="new-shop-box" width="500px" title="新建店铺" :visible.sync="showAddShop">
      <div class="form-container">
        <div class="form-inner-container">
          <el-form
            ref="shopForm"
            label-width="80px"
            prop="pId"
            :model="newShopForm"
          >
            <el-form-item prop="busType" required label="店铺类型">
              <!-- <el-select v-model="newShopForm.busType" style="width:300px">
                <el-option :value="1" label="家装" />
                <el-option :value="2" label="材料" />
              </el-select> -->
            </el-form-item>
              <div class="option-btns">
                <el-button :plain="newShopForm.busType === 1" :type="newShopForm.busType === 1 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 1">我是装饰公司</el-button>
                <el-button :plain="newShopForm.busType === 2" :type="newShopForm.busType === 3 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 2">我是代理商</el-button>
                <el-button :plain="newShopForm.busType === 3" :type="newShopForm.busType === 4 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 3">我是品牌厂商</el-button>
              </div>
            <el-form-item required prop="name" label="店铺名称" />
            <div class="option-input">
              <el-input
                v-model="newShopForm.name"
                style="width:300px;height:42px;"
                placeholder="请输入店铺名称"
              />
            </div>
          </el-form>
        </div>
      </div>
      <div style="text-align:center;padding:20px;">
        <el-button style="width:100px" type="cancel" @click="cancelCreate">取消</el-button>
        <el-button v-loading="loading" style="width:100px" type="primary" @click="submitShop">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createShop, getAllShop, enableShop, disableShop } from '@/api/shop'
import ShopCard from '@/components/shopCard/shopCard'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  components: {
    ShopCard 
  },
  computed: {
    ...mapGetters(['getShopList', 'getUserPhone', 'getUserIcon'])
  },
  data() {
    return {
      tab: 1,
      loading: false,
      showAddShop: false,
      selectedType: 1,
      newShopName: '',
      busTypes: ['家装', '材料'],
      ranks: ['旗舰版', '高级版', '基础版'],
      newShopForm: {
        busType: 1,
        name: ''
      }
    }
  },
  created() {
    this.getAllShops()
  },
  methods: {
    cancelCreate() {
      this.newShopForm.busType = 1
      this.newShopForm.name = ''
      setTimeout(_ => {
        this.showAddShop = false
      }, 0)
    },
    // 显示新增店铺对话框
    addNewShop() {
      this.showAddShop = true
    },
    // 进入设置
    toSetting() {
      this.$router.push({ path: '/hsetting' })
    },
    // 取消新建
    cancelNewShop() {
      this.tab = 1
      this.newShopName = ''
    },
    async submitShop() {
      if (!this.newShopForm.name) {
        this.$message({
          type: 'error',
          message: '店铺名称必须填写！'
        })
        return
      }
      try {
        this.loading = true
        const { success } = await createShop({ busType: this.newShopForm.busType, name: this.newShopForm.name })
        this.loading = false
        if (success) {
          this.$message({ type: 'success', message: '新增成功！' })
          this.newShopForm.name = ''
          this.newShopForm.busType = 1
          this.getAllShops()
          this.showAddShop = false
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async getAllShops() {
      try {
        const { data } = await getAllShop({})
        this.$store.dispatch('shop/setAllShop', data)
      } catch (error) {
        console.log(error)
      }
    },
    selectShop(shop) {
      Cookies.set('appid', shop.appId)
      Cookies.set('shopid', shop.id)
      Cookies.set('shopName', shop.name)
      this.$store.dispatch('shop/setCurrentShop', shop)
      this.$router.push({ path: '/' })
    },
    async logout() {
      await this.$store.dispatch('shop/setCurrentShop', {})
      await this.$store.dispatch('shop/setShopList', [])
      await this.$store.dispatch('user/logout')
      this.$message({ type: 'success', message: '您已退出成功！' })
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.board-container {
  .new-shop-box {
    .el-dialog {
      .el-dialog__body {
        padding: 0;
        .form-container {
          padding: 10px 20px;
          background-color: #F6F8FB;
          .form-inner-container {
            background: #fff;
            padding: 20px;
            .option-input {
              .el-input__inner {
                height: 42px;
                margin-left: 10px;
                background-color: #f3f5f7;
              }
            }
            .el-form-item--medium {
              margin-bottom: 5px;
            }
            .option-btns {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              margin-left: 10px;
              margin-bottom: 30px;
              .option-btn {
                width: 140px;
                border-radius: 50px;
                height: 45px;
                line-height: 25px;
                margin: 15px 20px 10px 20px;
              }
              .option-btn:nth-child(1) {
                margin-left: 0;
              }
              .option-btn:nth-child(3) {
                margin-left: 0;
              }
            }
          }
        }
      }
    }
  }
  .new-shop {
    padding: 60px;
    .el-input--medium {
      width: 300px;
      .el-input__inner {
        height: 50px;
        line-height: 50px;
        background-color: #f3f5f7;
      }
    }
    .submit {
      margin-top: 120px;
      .el-button {
        width: 120px;
      }
    }
  }
  .board-header {
    height: 100px;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0.5px solid #e1e1e1;
    justify-content: space-between;
    .yuyan {
      width: 90px;
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
          top: 8px;
          font-size: 12px;
        }
      }
    }
  }
  .board-info {
    padding: 40px 60px;
    .account-info {
      height: 150px;
      background-color: #f3f5f7;
      border-radius: 6px;
      padding: 0 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-image: url('~@/assets/bbg.png');
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      .avatar-info {
        display: flex;
        flex-direction: row;
        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 45px;
          margin-right: 20px;
          background-color: #999;
        }
        .btn-setting {
          width: 120px;
          height: 32px;
          line-height: 11px;
          border-radius: 16px;
          background: #fff;
        }
        .btn-setting:hover {
          color: #1890ff;
        }
      }
    }
  }
  .shop-list {
    padding: 0px 60px;
    .list {
      padding: 40px 0;
      .new-shop {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .add-new-shop {
          width: 72%;
          height: 42px;
          line-height: 21px;
        }
      }
      .shop-card-active {
        border-radius: 15px;
        margin-bottom: 30px;
        .el-card__body {
          border-top: 8px solid #1890ff;
          box-sizing: border-box;
        }
      }
    }
  }
  .new-shop {
    .shop-types {
      .card-container {
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        .select-icon {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 0;
          top: 0;
        }
        h1 {
          margin-top: 0;
        }
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
