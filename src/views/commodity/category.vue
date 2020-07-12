<template>
  <div class="group-container">
    <div class="operation-btns">
      <el-button type="primary" @click="showCreateNewGroup">新建商品分组</el-button>
      <div>
        <el-input v-model="groupListQuery.keywords" placeholder="搜索分组名称" class="input-with-select">
          <el-button slot="append" type="primary">搜索</el-button>
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
          'font-size':'16px',
          'color':'#666'
        }"
      >
        <el-table-column prop="title" label="分组名称" />
        <el-table-column prop="goodsQty" label="商品数" />
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <div style="padding-right:18px;">
              <el-button type="text" @click="editContent(scope.row)">内容管理</el-button>
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="remove(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      width="600px"
      class="x-el-dialog"
      :title="formTitle"
      :visible.sync="newGroupVisible"
      @closed="closeDialog"
    >
      <div class="upload-container">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item prop="title" label="分组名称：">
            <el-input v-model="form.title" placeholder="请输入分组名称" />
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button
          style="width:100px"
          plain
          type="primary"
          @click="cancel"
        >取消</el-button>
        <el-button
          :loading="btnLoading"
          style="width:100px"
          type="primary"
          @click="addNewGroup"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.group-container {
  padding: 40px;
  .operation-btns {
    @extend .flex;
    @extend .flex-row;
    @extend .flex-space-between;
    .el-select {
      margin-right: 20px;
    }
    .input-with-select {
      width: 400px;
    }
    .el-input-group__append {
      color: #FFFFFF;
      background-color: $themeBlue;
    }
  }
  .main-table {
    @include radius(8px);
    margin-top: 40px;
  }
  .content-table {
    min-height: 500px;
    .el-table__row {
      .cell {
        padding-left: 27px !important;
      }
    }
  }
  .light-table-header-background {
    background-color: #f8fbff;
    border-bottom: 0;
  }
  .x-el-dialog {
    .el-dialog__body {
      padding-left: 0;
      padding-right: 0;
      .upload-container {
        min-height: 200px;
        background-color: #F3F5F7;
        padding: 40px;
      }
    }
    .submit {
      padding-top: 30px;
      background-color: #ffffff;
      text-align: center;
    }
  }
}
</style>

<script>
import { addNewGroup, removeGroup, queryGoodsGroup, editGroup } from '@/api/goodsGroup'
export default {
  data() {
    return {
      formTitle: '新增分组',
      currentRow: null,
      btnLoading: false,
      newGroupVisible: false,
      groupListQuery: {
        keywords: ''
      },
      list: [],
      groupList: [],
      form: {
        title: ''
      },
      listQuery: {
        search: '',
        limit: 20,
        start: 1
      },
      listTotal: 0
    }
  },
  created() {
    this.queryGoodsGroup(this.listQuery)
  },
  methods: {
    // 内容管理
    editContent(row) {

    },
    // 编辑
    edit(row) {
      this.currentRow = row
      this.newGroupVisible = true
      this.form.title = row.title
      this.formTitle = '编辑分组'
    },
    // 删除
    remove(row) {
      try {
        this.$confirm('确认删除分组' + row.title + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async _ => {
          const { success } = await removeGroup({ clsId: row.id })
          if (success) {
            this.$message({
              type: 'success',
              message: '分组已删除！'
            })
            this.queryGoodsGroup(this.listQuery)
          } else {
            this.$message({
              type: 'error',
              message: '删除错误，请联系管理员'
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 显示新增分组对话框
    showCreateNewGroup() {
      this.newGroupVisible = true
    },
    // 显示对话框时清空数据
    closeDialog() {
      this.$refs.form.resetFields()
      this.currentRow = null
      this.formTitle = '新增商品分组'
    },
    // 查询商品分组
    async queryGoodsGroup(query) {
      try {
        const { data: { list, total }} = await queryGoodsGroup(query)
        this.list = list
        this.listTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    // 取消新增
    async cancel() {
      if (this.form.title) {
        this.$confirm('您确认取消编辑吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.newGroupVisible = false
          this.$refs.form.resetFields()
        })
      } else {
        this.newGroupVisible = false
        this.$refs.form.resetFields()
      }
    },
    // 新增/编辑分组
    async addNewGroup() {
      if (!this.form.title) {
        this.$message({ type: 'error', message: '分组名称不能为空！' })
        return
      }
      if (this.currentRow) {
        this.btnLoading = true
        try {
          const { success } = await editGroup({ clsId: this.currentRow.id, title: this.form.title })
          this.btnLoading = false
          if (success) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.$refs.form.resetFields()
            this.queryGoodsGroup(this.listQuery)
            this.currentRow = null
            this.formTitle = '新增商品分组'
            setTimeout(_ => {
              this.newGroupVisible = false
            }, 0)
          } else {
            this.$message({
              type: 'error',
              message: '修改失败，请联系管理员！'
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          this.btnLoading = true
          const { success } = await addNewGroup({ title: this.form.title })
          this.btnLoading = false
          if (success) {
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.$refs.form.resetFields()
            this.queryGoodsGroup(this.listQuery)
            setTimeout(_ => {
              this.newGroupVisible = false
            }, 0)
          } else {
            this.$message({
              type: 'error',
              message: '添加错误，请联系管理员！'
            })
          }
        } catch (error) {
          this.$message({
            type: 'error',
            message: '添加错误，请联系管理员！'
          })
        }
      }
    }
  }
}
</script>
