<!--
 * @Author: lee
 * @Date: 2020-07-12 15:55:23
 * @LastEditors: lee
 * @LastEditTime: 2020-07-16 22:44:13
 * @Description: 新增优惠券
-->
<template>
  <div class="app-container lee">
    <div class="sec-title">
      <el-button type="primary" plain class="section-back" icon="el-icon-arrow-left" @click="goBack" />
      <span>新增优惠券</span>
    </div>
    <div class="new">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-card title shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">基本信息</span>
          </div>
          <div class="inner-form-wrapper">
            <el-form-item required prop="title" label="优惠券名称：">
              <el-input
                v-model="form.title"
                style="width: 310px;"
                show-word-limit
                placeholder="请输入优惠券名称"
              />
            </el-form-item>
            <el-form-item required prop="content" label="优惠券说明：">
              <el-input
                v-model="form.content"
                style="width: 310px;"
                show-word-limit
                placeholder="请输入优惠券说明"
              />
            </el-form-item>
            <el-form-item required prop="cType" label="优惠券类型：">
              <el-radio v-model="form.cType" :label="1" @change="clickcoupon(1)">满减优惠券</el-radio>
              <el-radio v-model="form.cType" :label="2" @change="clickcoupon(2)">折扣优惠券</el-radio>
            </el-form-item>
            <el-form-item required prop="isThreshold" label="使用门槛：">
              <div class="radius-item">
                <el-radio v-model="form.isThreshold" :label="false">无门槛</el-radio>
              </div>
              <div class="radius-item">
                <el-radio v-model="form.isThreshold" :label="true">有门槛</el-radio>
                <div v-if="form.isThreshold==true" style="display:inline">
                  <span class="input-left">满</span>
                  <el-input
                    v-model="form.leastAmount"
                    style="width: 200px;"
                    show-word-limit
                    placeholder="请输入金额"
                  >
                    <span slot="suffix">元</span>
                  </el-input>
                  <span class="input-right">可使用</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item required prop="reduction" label="优惠内容：" v-show="coupontype==1">
              <span class="input-left">减</span>
              <el-input
                v-model="form.reduction"
                style="width: 200px;"
                show-word-limit
                placeholder="请输入金额"
              >
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
            <el-form-item required prop="discount" label="优惠内容：" v-show="coupontype==2">
              <span class="input-left">打</span>
              <el-input
                v-model="form.discount"
                style="width: 200px;"
                show-word-limit
                placeholder="请输入金额"
              >
                <span slot="suffix">折</span>
              </el-input>
			  <el-form-item style="margin-top: 30px;" prop="mostfavorable">
			    <el-checkbox v-model="form.maxcoupon" :true-label="1" :false-label="0" >最多优惠
				  <el-input
                v-model="form.favorable"
                style="width: 200px;"
                show-word-limit
                placeholder="请输入金额"
                :disabled="form.maxcoupon===1? false: true"
              >
              </el-input></el-checkbox>
			  </el-form-item>
            </el-form-item>
            <el-form-item required prop="issueQty" label="发行量：">
              <el-input
                v-model="form.issueQty"
                style="width: 310px;"
                show-word-limit
                placeholder="请输入张数"
              >
                <span slot="suffix">张</span>
              </el-input>
              <div class="radius-tips">注意：优惠券创建后，发行量只能增加不能减少</div>
            </el-form-item>
            <el-form-item required prop="goodsType" label="适用商品：">
              <div class="radius-item">
                <el-radio v-model="form.goodsType" :label="1">全部商品</el-radio>
              </div>
              <div class="radius-item">
                <el-radio v-model="form.goodsType" :label="2">制定商品</el-radio>
                <div v-if="form.goodsType==2" style="display:inline">
                  <span class="input-left">添加商品：</span>
                  <el-button class="btn default" type="default" icon="el-icon-plus" @click="onGoods()">添加指定商品</el-button>
                </div>
              </div>
              <div v-if="form.goodsType==2 && goods.length>0" style="width:450px">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                  <el-table
                    stripe
                    :data="goods"
                    class="none"
                    empty-text="没有数据"
                    style=""
                  >
                    <el-table-column prop="title" label="商品" min-width="150">
                      <template slot-scope="scope">
                        <div style="display: flex;">
                          <el-image :src="`${Host}/res/` + scope.row.cover" style="width: 80px; vertical-align:middle;" />
                          <div style="margin-left:10px;">
                            <div style="font-weight: bold;">{{ scope.row.title }}</div>
                            <div style="color: #c82a2a;">{{ scope.row.sellMode === 0 ? '免费': '￥ '+scope.row.realUnitPrice }}</div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态" min-width="100">
                      <!-- /*商品类型  1:图文 2:视频 3:直播 4:手机海报 5:专题海报 6:音频*/ -->
                      <template slot-scope="scope">
                        <el-tag
                          v-if="scope.row.cType == 1"
                          type="danger"
                          disable-transitions
                        > 图文
                        </el-tag>
                        <el-tag
                          v-if="scope.row.cType == 2"
                          type="primary"
                          disable-transitions
                        > 视频
                        </el-tag>
                        <el-tag
                          v-if="scope.row.cType == 3"
                          type="info"
                          disable-transitions
                        > 直播
                        </el-tag>
                        <el-tag
                          v-if="scope.row.cType == 4"
                          type="primary"
                          disable-transitions
                        > 手机海报
                        </el-tag>
                        <el-tag
                          v-if="scope.row.cType == 5"
                          type="info"
                          disable-transitions
                        > 专题海报
                        </el-tag>
                        <el-tag
                          v-if="scope.row.cType == 6"
                          type="primary"
                          disable-transitions
                        > 音频
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column align="right" label="操作" width="60">
                      <template slot-scope="scope">
                        <div style="padding-right:0px;">
                          <el-button type="text" @click="delGoods(scope.row)">移除</el-button>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </el-form-item>
            <el-form-item required prop="timeType" label="使用时间：">
              <div class="radius-item">
                <el-radio v-model="form.timeType" class="none" style="margin-right: 10px;" :label="1">&nbsp;</el-radio>
                <el-date-picker
                  v-model="form.time"
                  class="el-radio-fixed"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :disabled="form.timeType === 1? false: true"
                  @change="getTime"
                />
              </div>
              <div class="radius-item">
                <el-radio v-model="form.timeType" class="none" style="margin-right: 10px;" :label="2">&nbsp;</el-radio>
                <span class="input-left el-radio-fixed">领取当天</span>
                <el-input
                  v-model="form.lateDays"
                  style="width: 200px;"
                  show-word-limit
                  placeholder="请输入天数"
                  :disabled="form.timeType === 2? false: true"
                >
                  <span slot="suffix">天</span>
                </el-input>
                <span class="input-right">可使用</span>
              </div>
            </el-form-item>
          </div>
        </el-card>

        <el-card title shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">领用规则</span>
          </div>
          <div class="inner-form-wrapper">
            <el-form-item required prop="lateDays" label="领取次数限制：">
              <div>
                <el-radio v-model="form.getCountType" :label="0">不限次数</el-radio>
                <span class="radius-tips">每人最多领取100张</span>
              </div>
              <div>
                <el-radio v-model="form.getCountType" :label="1">每次限领几次：</el-radio>
                <el-input
                  v-model="form.maxGetCount"
                  style="width: 200px;"
                  show-word-limit
                  placeholder="请输入数量"
                  :disabled="form.getCountType === 1? false: true"
                >
                  <span slot="suffix">次</span>
                </el-input>
                <div class="radius-tips">领取次数限制仅对用户在店铺首页、商品详情页、领取优惠券页手动领取优惠券时生效</div>
              </div>
            </el-form-item>
            <el-form-item prop="share" label="分享设置：">
              <el-checkbox v-model="form.share" :true-label="1" :false-label="0">优惠券允许分享给好友领取</el-checkbox>
            </el-form-item>
            <el-form-item prop="isSingle" label="活动叠加限制：">
              <el-checkbox v-model="form.isSingle" :true-label="1" :accesskey="0">优惠仅原价购买时可用，与其他优惠活动互斥</el-checkbox>
            </el-form-item>
            <el-form-item prop="getOfGoods" label="公开设置：">
              <el-checkbox v-model="form.getOfGoods" :true-label="1" :false-label="0">用户可在商品详情页领取</el-checkbox>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
    <div class="btns">
      <el-button type="primary" plain @click="goBack">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

    <leeDialogGoods ref="leeDialogGoods" @on-submit="getGoods" />
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
@import "~@/styles/lee.scss";
</style>

<script>
import { addCoupon } from '@/api/marketing'
import { Host } from '@/config'
export default {
  data() {
    return {
      Host: Host,
	  coupontype:1,
      form: {
        /* 优惠券名称*/
        title: '',
        // 优惠券说明 // 好像蓝狐上没有
        content: '',
        /* 优惠券类型 1:满减优惠 2:折扣优惠*/
        cType: 1,
        // 使用门槛 false：无门槛；true：有门槛
        isThreshold: false,
        /* 多少金额可用*/
        leastAmount: 0,
        /* 优惠金额*/
        reduction: 0,
        /* 折扣 0.1*/
        discount: '',
        /* 发行数量*/
        issueQty: 0,
        // 使用时间类型 1、开始结束时间；2、领券后多少天
        timeType: 1,
        // 使用时间
        time: [],
        /* 使用时间 开始时间*/
        beginTime: '',
        /* 使用时间 结束时间*/
        endTime: '',
        /* 领劵后多少天可用*/
        lateDays: 0,
        // 限领数量类型 0、不限次数；1、每次限领几次
        getCountType: 0,
        /* 每人最大领取数量*/
        maxGetCount: 0,
        /* 是否分享给好友领取 0:不允许 1:允许分享*/
        share: 0,
        /* 是否单独使用 0:可以叠加 1:单独使用*/
        isSingle: 0,
        /* 是否商品页获得 0:否 1:是*/
        getOfGoods: 0,
        /* 适用商品 1:全部商品  2:部分商品*/
        goodsType: 1,
        /* 商品id*/
        includeGoods: [],
		//折扣
		// 优惠卷
		maxcoupon:0
      },
      goods: [],
      rules: {
        title: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ]
      }
    }
  },
  // 监听
  watch: {},
  created() {},
  methods: {
    // 通过时间组件获取开始时间和结束时间
    getTime() {
      if (this.form.time !== null) {
        this.form.beginTime = this.form.time[0]
        this.form.endTime = this.form.time[1]
      }
    },
    goBack() {
      this.$router.back()
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          const res = await addCoupon(this.form)
          if (res.success) {
            this.$message({ type: 'success', message: '新增成功！' })
            this.goBack()
          } else {
            this.$message({ type: 'error', message: '新增失败！' })
          }
        }
      })
    },
    // 选择商品
    onGoods() {
      // console.log(this.form.includeGoods)
      this.$refs['leeDialogGoods'].onDialog(this.form.includeGoods)
    },
    // 选中的商品
    getGoods(data) {
      this.goods = data
      // 处理写入数据给form
      this.changeGoods()
    },
    // 处理goods选中的商品给form.includeGoods
    changeGoods() {
      this.form.includeGoods = []
      for (var key in this.goods) {
        this.form.includeGoods.push(this.goods[key].id)
      }
    },
    // 删除商品
    delGoods(row) {
      for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id === row.id) {
          this.goods.splice(i, 1)
          this.form.includeGoods.splice(i, 1)
        }
      }
    },
	clickcoupon(index){
		this.coupontype=index
		console.log(index,123123123)
	},
	maxcoupon(e){
		console.log(123123)
	}
  }
}
</script>
