<template>
  <div class="shop-container">
    <el-card>
      <div class="inner-container">
        <h2>我的店铺</h2>
        <div class="shop-list">
          <el-row :gutter="20">
            <el-col :xl="4" :lg="6" :md="8">
              <el-card>
                <div style="cursor:pointer" @click="toDecoration">
                  <div class="block">
                    <div class="title">
                      <span class="shop-name">欧派家装城</span>
                      <span class="shop-version">基础版</span>
                    </div>
                  </div>
                  <div class="decoration-type">
                    家装类型
                  </div>
                  <div class="date">
                    <span>创建日期：2020-07-11</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8">
              <el-card>
                <div class="block new-shop" style="height:120px">
                  <el-button class="add-new-shop" type="primary" plain @click="addNewShop">+ 新建店铺</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-dialog width="500px" title="新建店铺" :visible.sync="showAddShop">
      <div class="form-container">
        <el-form
          ref="classForm"
          label-width="100px"
          prop="pId"
          :model="newShopForm"
        >
          <el-form-item prop="shopType" label="店铺类型">
            <el-select style="width:300px" v-model="newShopForm.shopType">

            </el-select>
          </el-form-item>
          <el-form-item required prop="shopName" label="店铺名称">
            <el-input
              v-model="newShopForm.shopName"
              style="width:300px"
              placeholder="请输入分类名称"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center;padding:20px;">
        <el-button style="width:100px" type="cancel" @click="cancelAddClass">取消</el-button>
        <el-button style="width:100px" type="primary" @click="addNewClass">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  .shop-container {
    padding: 40px;
    .el-dialog__body {
      padding: 0;
    }
    .inner-container {
      padding: 0 20px;
      .shop-list {
        padding: 20px 0;
        .date {
          font-size: 12px;
          color: #a1a1a1;
          height: 42px;
          line-height: 66px;
        }
        .block {
          width: 100%;
          .title {
            height: 36px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            .shop-name {
              color: #1890ff;
              font-size: 18px;
              font-weight: 900;
            }
            .shop-version {
              color: #999;
              font-size: 14px;
            }
          }
        }
        .decoration-type {
          height: 42px;
          line-height: 42px;
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
    .form-container {
      box-sizing: border-box;
      height: 240px;
      padding: 40px 0;
      background-color: #F3F5F7;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      showAddShop: false,
      newShopForm: {
        shopType: 1,
        shopName: ''
      }
    }
  },
  methods: {
    addNewShop() {
      this.showAddShop = true
    },
    toDecoration() {
      this.$router.push({ path: '/decoration' })
    }
  }
}
</script>
