<template>
  <div class="icontainer">
    <div class="operation">
      <div>
        <el-button type="primary">创建邀请码</el-button>
        <el-button>如何批量邀请客户</el-button>
      </div>
      <div class="search-options">
        <el-select />
        <div class="divi" />
        <el-input placeholder="搜索邀请码标题">
          <el-button slot="append">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="table-list">
      <el-table
        stripe
        :height="900"
        :header-cell-style="{
          'background':'#F8FBFF',
          'height':'54px',
          'line-height':'54px',
          'border-bottom': '1px solid #e1e1e1',
          'box-sizing':'border-box;',
          'padding-right':'15px',
          'padding-left':'15px',
          'font-size':'16px',
          'color':'#666'
        }"
      >
        <el-table-column label="邀请码标题" />
        <el-table-column label="邀请码数量" />
        <el-table-column label="使用数量" />
        <el-table-column label="专栏/单个" />
        <el-table-column label="生效时间" />
        <el-table-column label="失效时间" />
        <el-table-column label="状态" />
        <el-table-column label="操作" />
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="scss">
.icontainer {
  padding: 40px;
  .operation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .search-options {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .divi {
        width: 15px;
      }
    }
  }
  .table-list {
    margin-top: 20px;
  }
  .page {
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    background-color: #fff;
  }
}
</style>
<script>
export default {
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 20,
        start: 1
      }
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
