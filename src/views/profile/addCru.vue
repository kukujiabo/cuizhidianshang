<template>
  <div class="app-container">
    <div class="sec-title">
      <el-button
        type="primary"
        plain
        class="section-back"
        icon="el-icon-arrow-left"
        @click="goBack"
      />
      <span>{{ id ? '编辑' : '添加员工' }}</span>
    </div>
    <add-role-form ref="addCruForm"  />
  </div>
</template>

<style lang="scss">
@import '~@/styles/index.scss';
.app-container {
  .sec-title {
    font-size: 20px;
    font-weight: 800;
    height: 72px;
    line-height: 72px;
    .section-back {
      height: 24px;
      width: 24px;
      padding: 0;
      box-sizing: border-box;
      line-height: 24px;
      margin-right: 10px;
      font-weight: 800;
      border: 1px solid $themeBlue;
      color: $themeBlue;
    }
  }
  .form-section-divider {
    height: 30px;
  }
}
</style>

<script>
import addRoleForm from './components/AddCruForm'
import { getCruDetail } from '@/api/roles'
export default {
  components: {
    addRoleForm
  },
  data() {
    return {
      id: '',
      cruData: null
    }
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      const { data } = await getCruDetail(this.id)
      this.$refs.addCruForm.setData(data)
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
