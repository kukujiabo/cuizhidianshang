<template>
  <div class="shop-container">
    <el-card>
      <div class="inner-container">
        <h2>我的店铺</h2>
        <div class="shop-list">
          <el-row :gutter="20">
            <el-col v-for="shop in shopList" :key="shop.id" :xl="4" :lg="8" :md="12">
              <shop-card :shop="shop" @selectshop="switchShop(shop)"></shop-card>
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
    </el-card>
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
            </el-form-item>
              <div class="option-btns">
                <el-button :plain="newShopForm.busType === 1" :type="newShopForm.busType === 1 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 1">我是装饰公司</el-button>
                <el-button :plain="newShopForm.busType === 2" :type="newShopForm.busType === 2 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 2">我是代理商</el-button>
                <el-button :plain="newShopForm.busType === 3" :type="newShopForm.busType === 3 ? 'primary' : ''" class="option-btn" @click="newShopForm.busType = 3">我是品牌厂商</el-button>
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
        <el-button v-loading="loading" style="width:100px" type="primary" @click="createShop">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  .shop-container {
    padding: 40px;
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
    .el-dialog__body {
      padding: 0;
    }
    .inner-container {
      padding: 0 20px;
      .shop-list {
        padding: 20px 0;
        .shop-card-active {
          border-radius: 15px;
          margin-bottom: 30px;
          .el-card__body {
            border-top: 8px solid #1890ff;
            box-sizing: border-box;
          }
        }
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
      }
    }
  }
</style>
<script>
import { createShop, getAllShop, enableShop, disableShop } from '@/api/shop'
import { setAppId, setShopId, setShopName } from '@/utils/auth'
import ShopCard from '@/components/shopCard/shopCard'
export default {
  components: {
    ShopCard
  },
  data() {
    return {
      loading: false,
      showAddShop: false,
      newShopForm: {
        busType: 1,
        name: ''
      },
      shopList: [],
      busTypes: ['家装', '材料'],
      ranks: ['旗舰版', '高级版', '旗舰版']
    }
  },
  created() {
    this.getAllShop()
  },
  methods: {
    // 显示新增店铺对话框
    addNewShop() {
      this.showAddShop = true
    },
    // 取消新建店铺并关闭对话框
    cancelCreate() {
      this.$refs.shopForm.resetFields()
      setTimeout(_ => {
        this.showAddShop = false
      }, 0)
    },
    // 新增店铺
    async createShop() {
      if (!this.newShopForm.name) {
        this.$message({ type: 'error', message: '店铺名称必须填写！' })
        return
      }
      try {
        this.loading = true
        const { success, message } = await createShop(this.newShopForm)
        this.loading = false
        if (success) {
          this.$message({ type: 'success', message: '添加成功！' })
          this.$refs.shopForm.resetFields()
          setTimeout(_ => {
            this.showAddShop = false
            this.getAllShop()
          }, 0)
        } else {
          this.$message({ type: 'error', message })
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        // this.$message({ type: 'error', message: '添加错误，请联系管理员！' })
      }
    },
    // 进入店铺装修
    switchShop(shop) {
      // this.$router.push({ path: `/decoration/${shop.id}` })
      setAppId(shop.appId)
      setShopId(shop.id)
      setShopName(shop.name)
      this.$message({ type: 'success', message: '已切换到店铺：' + shop.name})
      this.$router.push({ path: '/' })
    },
    // 查询所有店铺
    async getAllShop() {
      try {
        const { data } = await getAllShop({})
        this.shopList = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
