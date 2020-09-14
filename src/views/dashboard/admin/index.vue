<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->
    <el-card>
          <div class="search-options">
            <div class="tags">
			<el-button type="text" >今日</el-button>
			<el-button type="text" >本周</el-button>
			<el-button type="text" >本月</el-button>
			<el-button type="text" >全年</el-button>
            </div>
            <el-date-picker
			style="z-index: 99;"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first">
          <el-row :gutter="24">
           <el-col :xs="17" :sm="17" :lg="17" :xl="17">
              <div class="chart-wrapper">
                <!-- <bar-chart /> -->
				<visit-chart />
              </div>
            </el-col>
            <el-col :xs="{span: 7}" :sm="{span: 7}" :md="{span: 7}" :lg="{span: 7}" :xl="{span: 7}" style="padding-right:8px;margin-bottom:30px;">
              <transaction-table />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="second">

        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import visitChart from './components/visitChart.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
	visitChart
  },
  data() {
    return {
      activeName: 'first',
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleClick() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .search-options {
    height: 54px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
	margin-bottom: -40px;
    .tags {
		z-index: 99;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
