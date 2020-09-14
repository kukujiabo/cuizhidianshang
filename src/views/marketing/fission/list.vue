<!--
 * @Author: lee
 * @Date: 2020-07-12 14:22:57
 * @LastEditors: lee
 * @LastEditTime: 2020-07-21 22:53:42
 * @Description: 裂变列表页面
-->
<template>
  <div class="group-container">
    <div class="operation-btns">
      <div>
        <el-button class="btn primary" type="primary" @click="toAdd">新建裂变活动</el-button>
        <el-button class="btn default" type="default">裂变教程</el-button>
      </div>
      <div>
        <el-select v-model="listQuery.status" placeholder="选择状态">
          <el-option :value="-1" label="全部">全部</el-option>
          <el-option :value="0" label="未开始">未开始</el-option>
          <el-option :value="1" label="进行中">进行中</el-option>
          <el-option :value="2" label="已失效">已失效</el-option>
        </el-select>
        <el-input v-model="listQuery.keyword" placeholder="搜索活动名称" class="input-with-select">
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
        <el-table-column prop="name" label="活动名称" min-width="120" />
        <el-table-column label="关联商品" min-width="120">
          <template slot-scope="scope">
            <div style="display: flex;">
              <el-image :src="`${Host}/res/` + scope.row.goodsImg" style="height: 45px; vertical-align:middle;" />
              <div style="margin-left:10px;line-height: 45px;">
                <div style="font-weight: bold;">{{ scope.row.goodsName }}</div>
                <!-- {{ `${Host}/res/` + scope.row.goodsImg }} -->
                <!-- <div style="color: #c82a2a;">{{ scope.row.sellMode === 0 ? '免费': '￥ '+scope.row.realUnitPrice }}</div> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" min-width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.cType == 1 ? 'primary' : 'success'"
              disable-transitions
            > {{ scope.row.cType==1 ? '满减优惠' : '折扣优惠' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rewardRatio" label="分层比例" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.rewardRatio }}%
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status == 0"
              type="primary"
              disable-transitions
            > 未开始
            </el-tag>
            <el-tag
              v-if="scope.row.status == 1"
              type="info"
              disable-transitions
            > 进行中
            </el-tag>
            <el-tag
              v-if="scope.row.status == 2"
              type="warning"
              disable-transitions
            > 已失效
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作" min-width="340">
          <template slot-scope="scope">
            <div style="padding-right:18px;">
              <!-- {{scope}} -->
              <el-button v-if="scope.row.status==0 || scope.row.status==1" type="text" @click="onEdit(scope.row)">编辑</el-button>
              <el-popover
                v-if="scope.row.status==1"
                placement="left"
                width="375"
                trigger="click"
                style="margin: 0 5px;height: 432px"
              >
                <div style="text-align: center;">
                  <div style="font-size:18px;margin-top:73px">蜗牛小店</div>
                  <img style="width: 160px; height: 160px; margin-top:23px" src="@/assets/sigh.png">
                  <div style="margin-top:23px;margin-bottom: 42px;">
                    <el-button> 下载二维码 </el-button>
                  </div>
                  <el-input placeholder="请输入内容" disabled>
                    <template slot="append" @click="copyQrcode">复制</template>
                  </el-input>
                </div>
                <el-button slot="reference" type="text"> 生成海报 </el-button>
              </el-popover>
              <el-button v-if="scope.row.status==0 || scope.row.status==1" type="text" @click="onStop(scope.row)">立即结束</el-button>
              <el-button v-if="scope.row.status==2" type="text" @click="onDel(scope.row)">删除</el-button>
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

    <!-- 停止 -->
    <el-dialog
      :visible.sync="stopDialog"
      width="600px"
    >
      <div style="text-align: center;">
        <img style="width: 74px; height: 74px" src="@/assets/sigh.png">
        <div style="height: 50px;line-height: 50px;font-size:20px;">停止</div>
        <div style="line-height:20px;margin-bottom: 59px;">
          注意！活动结束后将无法重新开启，确定要结束活动吗？
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 112px; margin: 0 20px;" @click="stopDialog = false"> 取 消 </el-button>
          <el-button type="primary" style="width: 112px; margin: 0 20px;" @click="stopSubmit"> 立即结束 </el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      :visible.sync="delDialog"
      width="600px"
    >
      <div style="text-align: center;">
        <img style="width: 74px; height: 74px" src="@/assets/sigh.png">
        <!-- <div style="height: 50px;line-height: 50px;font-size:20px;">删除</div> -->
        <div style="line-height:20px;margin-bottom: 59px; margin-top: 20px;">
          删除后，活动信息无法恢复，是否确定删除该裂变活动？
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 112px; margin: 0 20px;" @click="delDialog = false"> 取 消 </el-button>
          <el-button type="primary" style="width: 112px; margin: 0 20px;" @click="delSubmit"> 立即删除 </el-button>
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
import { queryFission, upFissionStatus, removeFission } from '@/api/marketing'
import { Host } from '@/config'
export default {
  data() {
    return {
      Host: Host,
      list: [],
      listTotal: 0,
      listQuery: {
        /* 活动状态（0：未开始，1：进行中，2：已失效） */
        status: -1,
        /* 活动名称 */
        keyword: '',
        start: 1,
        limit: 10
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
      stopID: null,
      delDialog: false,
      delID: null
    }
  },
  created() {
    // 初始化列表
    this.getQueryFission(this.listQuery)
  },
  methods: {
    // 查询裂变列表
    async getQueryFission(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await queryFission(query)
        // console.log(res)
        this.listTotal = res.data.total
        this.list = res.data.list
      } catch (error) {
        console.log(error)
      }
    },
    // 更新裂变状态
    async upFissionStatus(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await upFissionStatus(query)
        if (res.success) {
          this.$message({ type: 'success', message: '停止成功！' })
          this.stopDialog = false
          this.getQueryFission(this.listQuery) // 刷新列表
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 删除裂变活动
    async removeFission(query) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await removeFission(query)
        if (res.success) {
          this.$message({ type: 'success', message: '删除成功' })
          this.delDialog = false
          this.getQueryFission(this.listQuery) // 刷新列表
        }
      } catch (error) {
        console.log(error)
      }
    },
    toAdd() {
      this.$router.push({ path: '/marketing/fission/add' })
    },
    // 点击搜索按钮
    onQuery() {
      this.getQueryFission(this.listQuery)
    },
    // 点击修改
    onEdit(row) {
      this.$router.push({ path: '/marketing/fission/edit', query: { id: row.id }})
    },
    // // 点击定向投放
    // onLaunch(row) {
    //   // console.log('row', row)
    //   // this.launchData = row
    //   this.launchForm.couponId = row.id
    //   this.launchDialog = true
    // },
    // // 关闭定向回放
    // launchDialogClose() {
    //   // alert('launchDialogClose')
    //   this.launchDialog = false
    // },
    // // 选择商品
    // onGoods() {
    //   // console.log(this.form.includeGoods)
    //   this.$refs['leeDialogGoods'].onDialog(this.ids)
    // },
    // // 通过时间组件获取开始时间和结束时间
    // getTime() {
    //   // console.log(val)
    //   this.launchForm.beginTime = this.launchForm.time[0]
    //   this.launchForm.endTime = this.launchForm.time[1]
    // },
    // // 选中的商品
    // getGoods(data) {
    //   this.goods = data
    //   // 处理写入数据给form
    //   this.changeGoods()
    // },
    // // 处理goods选中的商品给form.includeGoods
    // changeGoods() {
    //   this.launchForm.includeGoods = []
    //   this.ids = []
    //   console.log(this.goods)
    //   for (var key in this.goods) {
    //     this.launchForm.includeGoods.push(
    //       {
    //         goodsId: this.goods[key].id,
    //         /* 1:全部时间 2:指定时间段 */
    //         timeType: 1,
    //         time: null,
    //         beginTime: null,
    //         endTime: null
    //       }
    //     )
    //     this.ids.push(this.goods[key].id)
    //   }
    //   // console.log(this.launchForm.includeGoods)
    // },
    // // 处理商品里的时间
    // getGoodsTime(i) {
    //   // console.log(i, this.launchForm.includeGoods[i].time)
    //   if (this.launchForm.includeGoods[i].time !== null) {
    //     this.launchForm.includeGoods[i].beginTime = this.launchForm.includeGoods[i].time[0]
    //     this.launchForm.includeGoods[i].endTime = this.launchForm.includeGoods[i].time[1]
    //   }
    // },
    // // 提交定向投放
    // launchSubmit() {
    //   console.log('launchSubmit', this.launchForm)
    //   // 调用接口提交定向投放
    //   this.setDistributeCoupon(this.launchForm)
    // },
    // // 删除商品
    // delGoods(row) {
    //   for (var i = 0; i < this.goods.length; i++) {
    //     if (this.goods[i].id === row.id) {
    //       this.goods.splice(i, 1)
    //       this.ids.splice(i, 1)
    //       this.launchForm.includeGoods.splice(i, 1)
    //     }
    //   }
    // },
    // 点击停止
    onStop(row) {
      this.stopID = row.id
      this.stopDialog = true
    },
    // 确认停止状态
    stopSubmit() {
      this.upFissionStatus({
        id: this.stopID,
        status: 2
      })
    },
    // 赋值二维码
    copyQrcode() {
      alert(111)
    },
    // 点击删除按钮
    onDel(row) {
      this.delID = row.id
      this.delDialog = true
    },
    // 删除确认按钮
    delSubmit() {
      // 调用删除接口
      this.removeFission([{
        id: this.delID
      }])
    }
  }
}
</script>
