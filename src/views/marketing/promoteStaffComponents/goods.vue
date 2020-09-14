<template>
  <div class="gcontainer">
    <div class="operation">
      <div>
        <el-button type="primary">添加商品</el-button>
      </div>
      <div class="search-options">
        <el-select v-model="listQuery.option" />
        <div class="divi" />
        <el-input v-model="listQuery.search" placeholder="搜索图文名称">
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
        <el-table-column label="商品名称" />
        <el-table-column label="商品类型" />
        <el-table-column label="商品价格" />
        <el-table-column label="是否参与推广" />
        <el-table-column label="直接/简介推广佣金" />
        <el-table-column label="状态" />
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
.gcontainer {
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
      currentPage: 1,
      listQuery: {
        search: '',
        option: '',
        start: 1,
        limit: 20
      }
    }
  },
  methods: {
    handleSizeChange(evt) {

    },
    handleCurrentChange(evt) {

    }
  }
}
</script>
