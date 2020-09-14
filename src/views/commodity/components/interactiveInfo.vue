<template>
  <div class="interactive-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">互动类设置</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form :model="form" label-width="110px">
          <el-form-item prop="includeGoods" label="直播带货配置：">
            <div class="el-form-item-inner">
              <div>
                <el-radio-group v-model="form.includeGoods" @change="changeGoodsSwitch">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </div>
              <p>添加直播间商品，提升直播间收益案例</p>
              <div>
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  :disabled="form.includeGoods === 0"
                  @click="showGoodsBox = true"
                >添加直播间商品</el-button>
              </div>
              <div style="margin-top:10px">
                <el-tag
                  v-for="(good, index) in selectedGoods"
                  :key="good.id"
                  closable
                  type="primary"
                  @close="closeTab(index)"
                >
                  {{ good.title }}
                </el-tag>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="includeCoupon" label="优惠券配置：">
            <div class="el-form-item-inner">
              <div>
                <el-radio-group v-model="form.includeCoupon">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </div>
              <p>直播间添加优惠券，刺激用户购买课程</p>
              <div>
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  :disabled="form.includeCoupon === 0"
                  @click="showCouponBox = true"
                >添加直播间优惠券
                </el-button>
              </div>
              <div style="margin-top:10px">
                <el-tag
                  v-for="(coupon, index) in couponList"
                  :key="coupon.id"
                  closable
                  type="primary"
                  @close="closeCouponTab(index)"
                >
                  {{ coupon.title }}
                </el-tag>
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item prop="recommendCard" label="推荐卡片配置：">
            <el-radio-group v-model="form.recommendCard">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item prop="tipping" label="打赏开关：">
            <div>
              <el-radio-group v-model="form.tipping">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </div>
            <p class="tips">关闭打赏后，直播间打赏入口将关闭，所有讲师不能获得打赏</p>
            <!-- <p class="tips">讲师个人打赏设置请在讲师管理模块进行设置</p> -->
          </el-form-item>
          <el-form-item label="打赏金额：">
            <div>
              <p style="margin-top:0">点击数字可修改打赏金额</p>
            </div>
            <div class="money">
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money1">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money2">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money3">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money4">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money5">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
              <el-input style="width:108px;padding:10px 0" type="number" v-model="form.money6">
                <el-button style="border:0" slot="append" size="mini">元</el-button>
              </el-input>
            </div>
            <p style="font-size:12px">直播带货配置</p>
            <div>
              <el-radio-group v-model="form.includeGoodsDisplay" label="打赏可见">
                <el-radio :label="1">对所有人可见</el-radio>
                <el-radio :label="0">仅讲师和打赏者可见</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog title="添加商品" :visible.sync="showGoodsBox" @click="closeGoodsBox">
      <div class="search-area">
        <el-input v-model="searchName" class="search-input" placeholder="请输入商品名称" style="width:300px" />
        <el-button class="search-btns" @click="searchGoods">搜索</el-button>
        <el-button class="search-btns" @click="toCreateGoods">新建商品</el-button>
      </div>
      <div class="tab-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="图文" name="first" />
          <el-tab-pane label="视频" name="second" />
          <el-tab-pane label="直播" name="third" />
          <el-tab-pane label="音频" name="fourth" />
          <el-tab-pane label="手机海报" name="fifth" />
        </el-tabs>
      </div>
      <div class="selection-count">
        <p>已选择{{ selectedGoods.length }}个商品</p>
      </div>
      <el-table
        :show-header="false"
        :height="500"
        :data="tableData"
        @select="changeSelection"
      >
        <el-table-column type="selection" />
        <el-table-column prop="goods">
          <template slot-scope="scope">
            <div class="img-info">
              <img :src="Host + '/res/' + scope.row.cover">
              <div class="info">
                <p style="font-size:16px;font-weight:900">{{ scope.row.title }}</p>
                <p style="font-size:13px;">¥{{ scope.row.realUnitPrice }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="submit">
        <el-button @click="showGoodsBox = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加优惠券" :visible.sync="showCouponBox" @closed="closeCouponBox">
      <div class="search-area">
        <el-input v-model="searchName" class="search-input" placeholder="请输入优惠券名称" style="width:300px" />
        <el-button class="search-btns" @click="searchCoupon">搜索</el-button>
        <el-button class="search-btns">新建优惠券</el-button>
      </div>
      <el-table
        :height="500"
        :data="tableData"
        @select="changeSelection"
      >
        <el-table-column type="selection" />
        <el-table-column prop="title" label="优惠券名称" />
        <el-table-column prop="cType" label="类型">
          <template slot-scope="scope">
            <span>{{ scope.row.cType === 1 ? '满减优惠' : '折扣优惠' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="有效期" />
        <el-table-column prop="content" label="优惠券内容" />
      </el-table>
      <div class="submit">
        <el-button @click="showCouponBox = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.interactive-container {
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    width: 800px;
    padding: 15px 10px;
    .el-form {
      .el-form-item {
        .tips {
          font-size: 13px;
          color: #333333;
          margin: 0;
        }
        .money {
          width: 360px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          .el-input--medium {
            .el-input__inner {
              text-align: center;
              border-right: 0;
              background-color: #f3f5f7;
            }
          }
        }
      }
    }
  }
  .search-area {
    height: 60px;
    .search-input {
      margin-right: 10px;
    }
    .search-btns {
      width: 110px;
    }
  }
  .el-dialog__body {
    padding: 20px;
    .selection-count {
      border-bottom: 1px solid #E4E7ED;
    }
    .tab-list {
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav-wrap:after {
          height: 1px;
        }
      }
    }
    .el-table {
      .img-info {
        display: flex;
        flex-direction: row;
        img {
          width: 125px;
          height: 90px;
          border-radius: 5px;
          margin-right: 20px;
          background-color: #f3f5f7;
        }
      }
    }
    .submit {
      height: 90px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .el-tag {
    margin-right: 10px;
  }
}
</style>

<script>
import { queryDocuments } from '@/api/document'
import { queryCoupon } from '@/api/coupon'
import { Host } from '@/config'

const rTypes = {
  first: 1,
  second: 2,
  third: 3,
  forth: 6,
  fifth: 4
}

export default {
  data() {
    return {
      Host: Host,
      searchName: '',
      searchCouponName: '',
      activeName: 'first',
      showGoodsBox: false,
      showCouponBox: false,
      tableData: [],
      form: {
        includeGoods: 1,
        includeCoupon: 1,
        recommendCard: 1,
        tipping: 1,
        includeGoodsDisplay: 1,
        money1: 1.00,
        money2: 2.00,
        money3: 3.00,
        money4: 4.00,
        money5: 5.00,
        money6: 6.00
      },
      selection: [],
      couponList: [],
      selectedGoods: [],
      selectedCoupons: []
    }
  },
  methods: {
    toCreateGoods() {
      this.$confirm('确认要退出当前编辑吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(res => {
        this.$router.push({ path: '/commodity/goods' })
      })
    },
    // 查询优惠券
    async searchCoupon() {
      if (!this.searchCouponName) {
        this.$message({
          type: 'error',
          message: '请先输入优惠券名称！'
        })
        return
      }
      try {
        const { data: { list }} = await queryCoupon({ search: this.searchCouponName, status: 2, start: 1, limit: 100 })
        this.couponList = list
        if (list.length === 0) {
          this.$message({ type: 'warning', message: '没有查询到数据！' })
        }
      } catch (error) {
        console.log(error)
      }
    },
    changeGoodsSwitch(evt) {
      if (evt === 0) {
        this.selectedGoods = []
      }
    },
    // 选中商品
    changeSelection(evt) {
      this.selection = evt
    },
    // 确认选中商品
    confirm() {
      const selectedIds = this.selectedGoods.map(itm => itm.id)
      const selectedGoods = this.selection.filter(itm => !selectedIds.includes(itm.id))
      this.selectedGoods = this.selectedGoods.concat(selectedGoods)
      this.showGoodsBox = false
      this.searchName = ''
      this.tableData = []
    },
    handleClick() {

    },
    // 获取表单数据
    getFormData() {
      const form = {}
      for (const key in this.form) {
        form[key] = this.form[key]
      }
      if (this.form.includeGoods && this.selectedGoods.length > 0) {
        this.selectedGoods.forEach((good, index) => { form[`goods[${index}]`] = good.id })
      }
      if (this.form.includeCoupon && this.selectedCoupons.length > 0) {
        this.selectedCoupons.forEach((coupon, index) => { form[`coupons[${index}]`] = coupon.id })
      }
      return form
    },
    // 搜索商品
    async searchGoods() {
      // if (!this.searchName) {
      //   this.$message({
      //     type: 'error',
      //     message: '请先输入商品名称！'
      //   })
      //   return
      // }
      const { data: { list }} = await queryDocuments({ search: this.searchName, cType: rTypes[this.activeName], start: 1, limit: 20 })
      if (!list.length) {
        this.$message({
          type: 'warning',
          message: '没有查询到商品！'
        })
      }
      this.tableData = list
    },
    closeTab(index) {
      this.selectedGoods.splice(index, 1)
    },
    closeCouponTab(index) {

    },
    closeGoodsBox() {
      this.tableData = []
    },
    closeCouponBox() {
      this.tableData = []
    }
  }
}
</script>
