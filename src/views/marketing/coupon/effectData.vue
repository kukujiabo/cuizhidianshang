<!--
 * @Author: lee
 * @Date: 2020-07-16 14:44:44
 * @LastEditors: lee
 * @LastEditTime: 2020-07-16 16:39:18
 * @Description: 效果数据页面
-->
<template>
  <div>
    <div style="padding: 30px;background-color:#fff">
      <el-button icon="el-icon-arrow-left" @click="goBack">返回列表</el-button>
    </div>
    <el-card title shadow="never" class="lee border-none">
      <div slot="header" class="clearfix">
        <span class="section-title">领用规则</span>
      </div>
      <div class="inner-form-wrapper">
        <el-row style="margin-bottom: 10px;">
          <el-col :span="4">
            <div style="border-right: 1px solid #DFE0E6;text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">￥2000</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">用券成交额
                <el-tooltip class="item" effect="dark" content="使用该优惠券订单付款总金额" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="border-right: 1px solid #DFE0E6;text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">￥18900</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">优惠总金额
                <el-tooltip class="item" effect="dark" content="使用该优惠券所优惠的总金额" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="border-right: 1px solid #DFE0E6;text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">100%</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">费效比
                <el-tooltip class="item" effect="dark" content="优惠总金额/用券总成交额" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="border-right: 1px solid #DFE0E6;text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">￥0</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">客单价
                <el-tooltip class="item" effect="dark" content="用券总成交额/使用该优惠券的付款订单数" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="border-right: 1px solid #DFE0E6;text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">￥2000</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">领券总用户
                <el-tooltip class="item" effect="dark" content="优惠券到账的用户数" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center;height: 60px;">
              <div style="font-size:18px;color:rgba(51,51,51,1);">8</div>
              <div style="font-size:14px;margin-top:15px;color:rgba(51,51,51,1);padding-left: 20px;">用券总用户
                <el-tooltip class="item" effect="dark" content="使用该优惠券的成交用户数" placement="top">
                  <el-button type="text" style="color:#777"><i class="el-icon-warning-outline" /></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin:20px 30px" shadow="never">
      <!-- <el-radio-group v-model="radio">
        <el-radio-button :label="1">定向发放记录</el-radio-button>
        <el-radio-button :label="2">用券商品</el-radio-button>
        <el-radio-button :label="3">领/用券用户</el-radio-button>
      </el-radio-group> -->
      <!-- <el-button-group>
        <el-button autofocus>定向发放记录</el-button>
        <el-button>用券商品</el-button>
        <el-button>领/用券用户</el-button>
      </el-button-group> -->
      <el-tabs type="card">
        <el-tab-pane label="定向发放记录">
          <el-table
            :data="launchData"
            style="width: 100%"
            class="lee"
          >
            <el-table-column prop="date" label="优惠券名称" width="180" />
            <el-table-column prop="name" label="已发放" width="180" />
            <el-table-column prop="address" label="发放时间" />
            <el-table-column align="right" label="操作" min-width="80">
              <template slot-scope="scope">
                <div style="padding-right:18px;">
                  <el-button type="text" @click="onSee(scope.row)">查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="用券商品">用券商品</el-tab-pane>
        <el-tab-pane label="领/用券用户">领/用券用户</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      launchData: []
    }
  },
  methods: {
    goBack() {
      // console.log('go back')
      this.$router.back()
    },
    // 列表点击查看
    onSee(row) {
      console.log(row)
    }
  }
}
</script>
