<template>
  <div>
    <div class="section-title">
      <h3>推广员招募</h3>
    </div>
    <div class="section-content">
      <el-form label-width="100px">
        <el-form-item label="开启招募：">
          <el-radio-group v-model="form1.opencru">
            <div class="radio-item">
              <el-radio :label="1">开启</el-radio>
              <span class="tips">开启后，用户可以主动申请成为推广达人</span>
            </div>
            <div class="radio-item">
              <el-radio :label="0">关闭</el-radio>
              <span class="tips">关闭后，用户不可以主动申请成为推广达人</span>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邀请下级：">
          <el-radio-group v-model="form1.sub">
            <div class="radio-item">
              <el-radio :label="1">开启</el-radio>
              <span class="tips">开启后，用户可以主动申请成为推广达人</span>
            </div>
            <div class="radio-item">
              <el-radio :label="0">关闭</el-radio>
              <span class="tips">关闭后，用户不可以主动申请成为推广达人</span>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <p>推广员与下级建立客户关系</p>
          <el-radio-group v-model="form1.sub">
            <div class="radio-item">
              <el-radio :label="1">开启</el-radio>
              <span class="tips">开启后，用户可以主动申请成为推广达人</span>
            </div>
            <div class="radio-item">
              <el-radio :label="0">关闭</el-radio>
              <span class="tips">关闭后，用户不可以主动申请成为推广达人</span>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="section-title">
      <h3>客户绑定模式</h3>
    </div>
    <div class="section-content">
      <div class="bind-type">
        <div class="bind-item" :class="{ active: form2.mod === 1 }" @click="form2.mod = 1">
          <i class="el-icon-success" />
          <h4>简单模式</h4>
          <p>客户永久有效</p>
          <p>不允许抢客</p>
        </div>
        <div class="bind-item" :class="{ active: form2.mod === 2 }" @click="form2.mod = 2">
          <i class="el-icon-success" />
          <h4>自定义</h4>
          <p>有效期：永久有效</p>
          <p>不允许抢客</p>
        </div>
      </div>
    </div>
    <div class="section-title">
      <h3>权益设置</h3>
    </div>
    <div class="section-content">
      <el-form label-width="100px">
        <el-form-item label="结算方式：">
          自定结算 <span>订单完成后立即结算，推达人可提现</span>
        </el-form-item>
        <el-form-item label="自购分佣：">
          <el-radio-group v-model="form3.pens">
            <div class="radio-item">
              <el-radio :label="1">开启</el-radio>
              <span class="tips">开启后，达人购买商品可获得直接推广佣金，达人的上级邀请人可获得间接推广佣金</span>
            </div>
            <div class="radio-item">
              <el-radio :label="0">关闭</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
        <div class="sp-table">
          <el-form-item label="等级规则：">
            <el-table
              border
              :header-cell-style="{
                'background':'#F8FBFF',
                'height':'54px',
                'line-height':'54px',
                'border-bottom': '1px solid #efefef',
                'box-sizing':'border-box;',
                'padding-right':'15px',
                'padding-left':'15px',
                'font-size':'16px',
                'color':'#666'
              }"
            >
              <el-table-column label="达人等级" />
              <el-table-column label="升级规则" />
              <el-table-column label="默认直接推广佣金比例" />
              <el-table-column label="默认间接推广佣金比例" />
              <el-table-column label="操作" />
            </el-table>
            <p>选择多个升级条件时，需要同时满足才能升级</p>
            <div>
              <el-button plain type="primary">添加等级</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
@import '~@/styles/color.scss';

</style>
<script>
export default {
  data() {
    return {
      form1: {
        sub: 1,
        opencru: 1
      },
      form2: {
        mod: 1
      },
      form3: {
        pens: 1
      }
    }
  },
  methods: {

  }
}
</script>
