<template>
  <div class="pcontainer">
    <el-card shadow="never">
      <div class="operation">
        <el-button-group>
          <el-button>达人榜</el-button>
          <el-button type="primary" plain>审核信息</el-button>
        </el-button-group>
      </div>
      <div class="operation">
        <div class="oleft">
          <el-button type="primary">批量修改等级</el-button>
          <el-button>导出</el-button>
        </div>
        <div class="oright">
          <el-select v-model="listQuery.option" style="width:150px">
            <el-option :value="1" label="全部达人">全部达人</el-option>
          </el-select>
          <div class="divi" />
          <el-date-picker v-model="listQuery.enter_date" placeholder="加入时间" style="width:150px" />
          <div class="divi" />
          <el-input v-model="listQuery.search" style="width:452px">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div>
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
          <el-table-column width="72px" type="selection" />
          <el-table-column label="头像/昵称" />
          <el-table-column label="姓名" />
          <el-table-column label="手机号" />
          <el-table-column label="上级达人" />
          <el-table-column label="累计客户（人）" />
          <el-table-column label="累计邀请（人）" />
          <el-table-column label="累计收益（元）" />
          <el-table-column label="加入时间" />
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
    </el-card>
  </div>
</template>
<style lang="scss">
.pcontainer {
  .el-card__body {
    padding: 0;
    .operation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 25px;
      border-bottom: 0.5px solid #e1e1e1;
      .oright {
        display: flex;
        flex-direction: row;
        .divi {
          width: 15px;
        }
      }
    }
  }
  .page {
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
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
        enter_date: '',
        option: 1,
        start: 1,
        limit: 20
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
