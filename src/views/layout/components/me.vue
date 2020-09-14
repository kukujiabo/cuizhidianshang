<template>
  <div>
    <el-form ref="options-form" :inline="false">
      <el-form-item>
        <el-input v-model="option.pageName" />
      </el-form-item>
    </el-form>
    <el-form ref="options-form" :inline="false">
      <p class="section-title" style="margin-top:0px">推广中心</p>
      <el-form-item>
        <div class="form-item-section">
          <h4 style="margin:8px 0;color:#a1a1a1">展示规则</h4>
          <el-radio-group v-model="option.inviteBonus.type">
            <el-radio :label="1">所有人可见</el-radio>
            <el-radio :label="2">仅推广员可见</el-radio>
          </el-radio-group>
        </div>
        <div class="form-item-section">
          <h4 style="margin:8px 0;color:#a1a1a1">展示语</h4>
          <el-radio-group v-model="option.inviteBonus.display">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </div>
        <div class="form-item-section">
          <el-input v-model="option.inviteBonus.words" />
        </div>
      </el-form-item>
      <p class="section-title">设置菜单</p>
      <el-form-item>
        <div>
          <h4 style="margin:8px 0;color:#a1a1a1">菜单展示</h4>
          <el-radio-group v-model="option.items.layoutType">
            <el-radio :label="1">列表</el-radio>
            <el-radio :label="2">九宫格</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
