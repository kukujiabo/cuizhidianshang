<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import resize from './mixins/resize'

	const animationDuration = 6000

	export default {
		mixins: [resize],
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '430px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initChart()
			})
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')

				this.chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					title: {
						show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
						text: '销售额趋势',
					},
					grid: {
						top: 10,
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
						name: '销售额',
						type: 'value',
						axisTick: {
							show: false
						},
						axisLabel: {
							formatter: '¥{value}'
						}
					}],
					series: [{
						name: 'pageA',
						type: 'bar',
						stack: 'vistors',
						barWidth: '40%',
						data: [79, 52, 200, 334, 390, 330, 220, 180, 400, 100, 50, 250],
						animationDuration
					}]
				})
			}
		}
	}
</script>
