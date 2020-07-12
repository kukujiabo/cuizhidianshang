<template>
  <div class="new">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form required ref="form" :model="form" label-width="120px">
          <el-form-item prop="name" label="角色名称：">
            <el-input v-model="form.name" maxlength="45" show-word-limit placeholder="例如行政，财务" />
          </el-form-item>
          <el-form-item prop="remark" label="角色描述：" style="height:110px;">
            <el-input
              v-model="form.remark"
              type="textarea"
              show-word-limit
              placeholder="用一句话描述角色的职责和作用，方便您的查看！"
              :maxlength="50"
              :rows="4"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="height:30px" />
      <div class="inner-form-wrapper" style="border-bottom:0">
        <el-form required ref="authForm" :model="form" label-width="120px">
          <el-form-item label="权限配置：">
            <div class="config">
              <div class="func">功能</div>
              <span>
                全选&nbsp;&nbsp;<el-checkbox @change="changeAll"></el-checkbox>
              </span>
            </div>
          </el-form-item>
          <el-form-item prop="menus" label=" ">
            <el-tree
              ref="authTree"
              show-checkbox
              node-key="id"
              node-va
              :data="authData"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              @check-change="treeChange"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="operation">
        <el-button type="primary" plain @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.new {
  .operation {
    padding: 40px 135px;
    .el-button {
      width: 112px;
    }
  }
  .section-title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    padding: 15px 10px;
    border-bottom: 1px solid #efefef;
    .el-form-item {
      min-height: 50px;
      .config {
        height: 40px;
        width: 310px;
        box-sizing: border-box;
        background-color: $lightBackground;
        border-radius: 5px;
        padding: 0 15px;
        font-weight: 800;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #666;
        .func {
          font-size: 16px;
        }
      }
      .el-input--medium {
        width: 310px;
        height: 40px;
        background-color: $lightBackground;
        border-radius: 5px;
        .el-input__inner {
          border: 0;
          height: 40px;
          line-height: 20px;
          background: transparent;
        }
        .el-input__count-inner {
          background: transparent !important;
        }
      }
      .el-textarea {
        height: 94px;
        .el-textarea__inner {
          background-color: $lightBackground;
          border: 0;
        }
        .el-input__count-inner {
          background: transparent !important;
        }
        .el-input__count {
          background: transparent !important;
        }
      }
      .cover-image {
        width: 190px;
        height: 100px;
        background-color: $lightBackground;
        margin-bottom: 10px;
        border: 0 !important;
        @include radius(5px);
      }
      .radio-item {
        width: 500px;
        p {
          font-size: 13px !important;
          color: #a1a1a1 !important;
          height: 50px !important;
          line-height: 30px !important;
          margin: 0 !important;
        }
      }
    }
  }
}
</style>

<script>
import { addNewRole, getAllMenus, editRoleData } from '@/api/roles'

export default {
  data() {
    return {
      roleId: '',
      content: '',
      fileList: [],
      form: {
        name: '',
        remark: ''
      },
      allMenus: [],
      authForm: [],
      authData: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  created() {
    this.getAllMenus()
  },
  methods: {
    treeChange(evt, checked) {
      let authForm = this.authForm
      if (checked) {
        authForm.push(evt.id)
      } else {
        authForm = authForm.filter(id => id !== evt.id)
      }
      this.authForm = authForm
    },
    async confirm() {
      const form = this.form
      const authForm = this.authForm
      if (!form.name) {
        this.$message({ type: 'error', message: '角色名称必须填写！' })
        return
      }
      if (!form.remark) {
        this.$message({ type: 'error', message: '角色描述必须填写！' })
        return
      }
      const roleData = {
        name: form.name,
        remark: form.remark,
        menus: authForm.map(id => ({ menuId: id }))
      }
      if (!this.roleId) {
        const { success } = await addNewRole(roleData)
        if (success) {
          this.$message({ type: 'success', message: '添加成功！' })
          setTimeout(_ => {
            this.$router.back()
          }, 1500)
        } else {
          this.$message({ type: 'error', message: '添加错误，请通知管理员！' })
        }
      } else {
        roleData.id = this.roleId
        roleData.roleName = roleData.name
        delete roleData.name
        const { success } = await editRoleData(roleData)
        if (success) {
          this.$message({ type: 'success', message: '修改成功！' })
        } else {
          this.$message({ type: 'error', message: '修改错误，请通知管理员！' })
        }
      }
    },
    cancel() {
      this.$router.back()
    },
    changeAll(evt) {
      if (evt) {
        // this.$refs.authTree.
      }
    },
    setData(data, menus) {
      this.roleId = data.id
      this.form.name = data.roleName
      this.form.remark = data.remark
      this.$refs.authTree.setCheckedKeys(menus.map(menu => menu.Id), true)
    },
    async getAllMenus() {
      try {
        const { data: { list }} = await getAllMenus()
        this.authData = list
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
