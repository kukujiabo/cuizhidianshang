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
      <span>{{ id ? '编辑角色' : '添加角色' }}</span>
    </div>
    <add-role-form ref="addRoleForm" />
  </div>
</template>

<style lang="scss">
@import '~@/styles/index.scss';
.app-container {
  .operation {

  }
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
import { getAllRoleMenus } from '@/api/roles'
import addRoleForm from './components/AddRoleForm'

export default {
  components: {
    addRoleForm
  },
  data() {
    return {
      id: '',
      roleData: {}
    }
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.roleData = JSON.parse(this.$route.query.role_data)
      const menus = await this.getRoleMenus(this.roleData.roleCode)
      setTimeout(_ => {
        this.$refs.addRoleForm.setData(this.roleData, menus)
      }, 100)
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async getRoleMenus(roleCode) {
      try {
        const { data } = await getAllRoleMenus({ roleCode })
        return data
      } catch (error) {
        return error.message
      }
    }
  }
}
</script>
