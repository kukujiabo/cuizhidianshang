<template>
	<div>
		<div id="radar" class="container"></div>
	</div>

</template>

<script>
	// 引入基本模板
	import echarts from 'echarts/lib/echarts'
	export default {
		mounted() {
			const option = {
				color: ['#1890FF'],
				title: {
					text: '销售额趋势',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '2%',
					right: '2%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390]
				}]
			}

			//初始化图表
			const chartObj = echarts.init(document.getElementById('radar'))
			chartObj.setOption(option)
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 430px;
	}
</style>
