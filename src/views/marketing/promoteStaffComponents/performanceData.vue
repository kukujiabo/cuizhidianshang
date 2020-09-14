<template>
  <div class="gcontainer">
    <div class="operation">
      <div>
        <el-button type="primary">导出excel表</el-button>
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
        <el-table-column label="序号" />
        <el-table-column label="推广员昵称" />
        <el-table-column label="姓名" />
        <el-table-column label="手机号码" />
        <el-table-column label="直接推广订单数" />
        <el-table-column min-width="100px" label="直接推广订单总额（元）" />
        <el-table-column label="间接推广订单数" />
        <el-table-column label="佣金比例" />
        <el-table-column min-width="100px" label="间接推广订单总额（元）" />
        <el-table-column label="累计收益（元）" />
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
