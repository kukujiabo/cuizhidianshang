<!--
 * @Author: lee
 * @Date: 2020-07-12 14:22:56
 * @LastEditors: lee
 * @LastEditTime: 2020-07-16 14:48:24
 * @Description: 优惠券列表页面
-->
<template>
  <div class="group-container">
    <div class="operation-btns">
      <div>
        <el-button class="btn primary" type="primary" @click="toAddCoupon">新建优惠券</el-button>
        <el-button class="btn default" type="default">优惠券教程</el-button>
      </div>
      <div>
        <el-select v-model="listQuery.status" placeholder="选择状态">
          <el-option :value="0" label="全部状态">全部状态</el-option>
          <el-option :value="1" label="停用">停用</el-option>
          <el-option :value="2" label="启用">启用</el-option>
          <el-option :value="3" label="废弃">废弃</el-option>
        </el-select>
        <el-select v-model="listQuery.cType" placeholder="选择类型">
          <el-option :value="0" label="全部类型">全部类型</el-option>
          <el-option :value="1" label="满减优惠券">满减优惠券</el-option>
          <el-option :value="2" label="折扣优惠券">折扣优惠券</el-option>
        </el-select>
        <el-input v-model="listQuery.search" placeholder="搜索优惠券名称" class="input-with-select">
          <el-button slot="append" type="primary" @click="onQuery">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="main-table">
      <el-table
        stripe
        :data="list"
        class="content-table"
        empty-text="没有数据"
        header-row-class-name="light-table-header-background"
        :header-cell-style="{
          'background':'transparent',
          'height':'54px',
          'line-height':'54px',
          'border-bottom':0,
          'box-sizing':'border-box;',
          'padding-right':'15px',
          'padding-left':'15px',
          'font-size':'14px',
          'color':'#666'
        }"
      >
        <el-table-column prop="title" label="优惠券名称" min-width="120" />
        <el-table-column label="类型" min-width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.cType == 1 ? 'primary' : 'success'"
              disable-transitions
            > {{ scope.row.cType==1 ? '满减优惠' : '折扣优惠' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="优惠券内容" min-width="120" />
        <el-table-column label="已领取 / 优惠券总数" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.receiveQty }} / {{ scope.row.issueQty }}
          </template>
        </el-table-column>
        <el-table-column prop="usageQty" label="已使用" min-width="100" />
        <el-table-column label="状态" min-width="100">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status == 1"
              type="danger"
              disable-transitions
            > 已停用
            </el-tag>
            <el-tag
              v-if="scope.row.status == 2"
              type="primary"
              disable-transitions
            > 进行中
            </el-tag>
            <el-tag
              v-if="scope.row.status == 3"
              type="info"
              disable-transitions
            > 已失效
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作" min-width="340">
          <template slot-scope="scope">
            <div style="padding-right:18px;">
              <!-- {{scope}} -->
              <el-button type="text" @click="onLaunch(scope.row)">定向发放</el-button>
              <el-button type="text" @click="onEffectData(scope.row)">效果数据</el-button>
              <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="onStop(scope.row)">停止</el-button>
              <el-popover
                placement="left"
                width="375"
                trigger="click"
                style="margin: 0 5px;height: 432px"
              >
                <div style="text-align: center;">
                  <div style="font-size:18px;margin-top:73px">蜗牛小店</div>
                  <img style="width: 160px; height: 160px;margin-top:23px" src="@/assets/sigh.png">
                  <div style="margin-top:23px;margin-bottom: 42px;">
                    <el-button> 下载二维码 </el-button>
                  </div>
                  <el-input placeholder="请输入内容" disabled>
                    <template slot="append" @click="copyQrcode">复制</template>
                  </el-input>
                </div>
                <el-button slot="reference" type="text"> 推广 </el-button>
              </el-popover>
              <el-button type="text" @click="onCopy(scope.row)">复制</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagenigation">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        :total="listTotal"
        layout="prev, pager, next, sizes, jumper"
        @size-change="onQuery"
        @current-change="onQuery"
      />
    </div>

    <!-- 定向投放 -->
    <el-dialog
      title="定向投放"
      :visible.sync="launchDialog"
      width="60%"
      class="lee"
    >
      <el-form ref="launchForm" :model="launchForm" label-width="120px">
        <div class="inner-form-wrapper">
          <el-form-item required prop="distributeType" label="选择用户：">
            <el-radio v-model="launchForm.distributeType" :label="1">全部用户</el-radio>
            <el-radio v-model="launchForm.distributeType" :label="2">制定用户群体</el-radio>
            <div v-if="launchForm.distributeType == 1">
              <div class="radius-tips">勾选全部用户，对自定义时间段内所有购买过商品的用户定向发放</div>
              <span class="input-left">自定义时间段：</span>
              <el-date-picker
                v-model="launchForm.time"
                class="el-radio-fixed"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @change="getTime"
              />
            </div>
            <div v-if="launchForm.distributeType == 2">
              <el-button class="btn default" type="default" icon="el-icon-plus" @click="onGoods()">添加指定商品付费用户</el-button>
              <div>
                <div v-for="(item, i) in goods" :key="i+item.title">
                  <el-card class="box-card" shadow="hover" style="width: 500px;margin-top:10px;">
                    <!-- <div slot="header" class="clearfix">
                      <span>卡片名称</span>
                      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div> -->
                    <el-button style="float: right; padding-right: 0px; padding-top: 0px;" type="text" @click="delGoods(item)"><i class="el-icon-close" /></el-button>
                    <el-image :src="`${Host}/res/` + item.cover" style="width: 80px; vertical-align:middle;" />
                    <span style="margin-left:5px;">{{ item.title }}</span>
                    <div>选择购买时间段的用户：</div>
                    <div class="radius-item">
                      <el-radio v-model="launchForm.includeGoods[i].timeType" :label="1">全部时间段</el-radio>
                    </div>
                    <div class="radius-item">
                      <el-radio v-model="launchForm.includeGoods[i].timeType" :label="2">制定时间段</el-radio>
                      <el-date-picker
                        v-model="launchForm.includeGoods[i].time"
                        style="width: 300px;"
                        class="el-radio-fixed"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :disabled="launchForm.includeGoods[i].timeType==1?true:false"
                        @change="getGoodsTime(i)"
                      />
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="launchDialog = false">取 消</el-button>
        <el-button type="primary" @click="launchSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <leeDialogGoods ref="leeDialogGoods" @on-submit="getGoods" />

    <!-- 停止 -->
    <el-dialog
      :visible.sync="stopDialog"
      width="600px"
    >
      <div style="text-align: center;">
        <!-- <el-image
          style="width: 100px; height: 100px"
          src="@/assets/audio.png"
        /> -->
        <img style="width: 74px; height: 74px" src="@/assets/sigh.png">
        <div style="height: 50px;line-height: 50px;font-size:20px;">停止</div>
        <div style="line-height:20px;margin-bottom: 59px;">
          停止发券后，已领取/发放的优惠券，在可用时间内还能继续使用，
          <br>
          但无法再编辑优惠券内容。确定停止发券？
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 112px; margin: 0 20px;" @click="stopDialog = false"> 取 消 </el-button>
          <el-button type="primary" style="width: 112px; margin: 0 20px;" @click="stopSubmit"> 确 定 </el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
@import "~@/styles/lee.scss";
</style>

<script>
import { queryCouponList, setDistributeCoupon, upCouponStatus } from '@/api/marketing'
import { Host } from '@/config'
export default {
  data() {
    return {
      Host: Host,
      list: [],
      listTotal: 0,
      listQuery: {
        // 查询内容
        search: '',
        // 状态 0:查询所有 1:停用 2:启用 3:废弃
        status: 0,
        // 优惠券类型 0:查询所有 1:满减优惠 2:折扣优惠
        cType: 0,
        start: 1,
        limit: 20
      },
      launchDialog: false,
      // 定向发送传给后台的数据
      launchForm: {
        // type: 1,
        // 这个值是开始时间和结束事件的合集
        time: [],
        // beginTime: null,
        // endTime: null,
        couponId: null,
        /* 发放类型 1:全部用户 2:指定用户(添加指定商品付费用户) */
        distributeType: 2,
        /* 类型为1时:对自定义时间段内所有购买商品的用户定向发放优惠券 */
        beginTime: '',
        endTime: '',
        /* 类型为2 指定商品付费用户，比如：购买了图文类商品的用户可以收到优惠券 */
        includeGoods: []
      },
      // 选中的商品
      goods: [],
      ids: [],
      stopDialog: false,
      stopID: null
    }
  },
  created() {
    // 初始化列表
    this.getQueryCouponList(this.listQuery)
  },
  methods: {
    // 查询优惠券列表
    async getQueryCouponList(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await queryCouponList(query)
        // console.log(res)
        this.listTotal = res.data.total
        this.list = res.data.list
      } catch (error) {
        console.log(error)
      }
    },
    // 提交定向投放
    async setDistributeCoupon(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await setDistributeCoupon(query)
        console.log(res)
        if (res.success) {
          this.$message({ type: 'success', message: '添加成功！' })
          this.launchDialog = false
          this.getQueryCouponList(this.listQuery) // 刷新列表
        }
        // this.listTotal = res.data.total
        // this.list = res.data.list
      } catch (error) {
        console.log(error)
      }
    },
    // 更新优惠券状态
    async upCouponStatus(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await upCouponStatus(query)
        console.log(res)
        if (res.success) {
          this.$message({ type: 'success', message: '停止成功！' })
          this.stopDialog = false
          this.getQueryCouponList(this.listQuery) // 刷新列表
        }
        // this.listTotal = res.data.total
        // this.list = res.data.list
      } catch (error) {
        console.log(error)
      }
    },
    toAddCoupon() {
      this.$router.push({ path: '/marketing/coupon/add' })
    },
    // 点击搜索按钮
    onQuery() {
      this.getQueryCouponList(this.listQuery)
    },
    // 点击定向投放
    onLaunch(row) {
      // console.log('row', row)
      // this.launchData = row
      this.launchForm.couponId = row.id
      this.launchDialog = true
    },
    // 关闭定向回放
    launchDialogClose() {
      // alert('launchDialogClose')
      this.launchDialog = false
    },
    // 选择商品
    onGoods() {
      // console.log(this.form.includeGoods)
      this.$refs['leeDialogGoods'].onDialog(this.ids)
    },
    // 通过时间组件获取开始时间和结束时间
    getTime() {
      // console.log(val)
      this.launchForm.beginTime = this.launchForm.time[0]
      this.launchForm.endTime = this.launchForm.time[1]
    },
    // 选中的商品
    getGoods(data) {
      this.goods = data
      // 处理写入数据给form
      this.changeGoods()
    },
    // 处理goods选中的商品给form.includeGoods
    changeGoods() {
      this.launchForm.includeGoods = []
      this.ids = []
      console.log(this.goods)
      for (var key in this.goods) {
        this.launchForm.includeGoods.push(
          {
            goodsId: this.goods[key].id,
            /* 1:全部时间 2:指定时间段 */
            timeType: 1,
            time: null,
            beginTime: null,
            endTime: null
          }
        )
        this.ids.push(this.goods[key].id)
      }
      // console.log(this.launchForm.includeGoods)
    },
    // 处理商品里的时间
    getGoodsTime(i) {
      // console.log(i, this.launchForm.includeGoods[i].time)
      if (this.launchForm.includeGoods[i].time !== null) {
        this.launchForm.includeGoods[i].beginTime = this.launchForm.includeGoods[i].time[0]
        this.launchForm.includeGoods[i].endTime = this.launchForm.includeGoods[i].time[1]
      }
    },
    // 提交定向投放
    launchSubmit() {
      console.log('launchSubmit', this.launchForm)
      // 调用接口提交定向投放
      this.setDistributeCoupon(this.launchForm)
    },
    // 点击修改
    onEdit(row) {
      this.$router.push({ path: '/marketing/coupon/edit', query: { id: row.id }})
    },
    // 删除商品
    delGoods(row) {
      for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id === row.id) {
          this.goods.splice(i, 1)
          this.ids.splice(i, 1)
          this.launchForm.includeGoods.splice(i, 1)
        }
      }
    },
    // 点击停止
    onStop(row) {
      this.stopID = row.id
      this.stopDialog = true
    },
    // 确认停止
    stopSubmit() {
      this.upCouponStatus({
        couponId: this.stopID,
        status: 1
      })
    },
    // 赋值二维码
    copyQrcode() {
      alert(111)
    },
    onCopy(row) {
      this.$router.push({ path: '/marketing/coupon/copy', query: { id: row.id }})
    },
    onEffectData(row) {
      this.$router.push({ path: '/marketing/coupon/effectData', query: { id: row.id }})
    }
  }
}
</script>
