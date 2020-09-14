<template>
  <div>
    <el-form ref="options-form" :inline="false">
      <el-form-item>
        <el-input v-model="option.pageName" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
