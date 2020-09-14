<template>
	<el-row :gutter="40" class="panel-group">
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('newVisitis')">
				<div class="card-panel-description">
					<div class="card-panel-text">
						总销售额
					</div>
					<count-to :start-val="0" :end-val="126560" :duration="2500" class="card-panel-num" />
					<img class="card-panel-img" src="@/assets/info-circle.png" />
				</div>
				<div class="card-panel-bottom-ztb">
					<div>
						周同比
					</div>
					<div><img style="margin-left:8px; margin-right: 8px;" src="@/assets/cardtop.png" /></div>
					<div>
						￥
						<count-to :start-val="0" :end-val="12" :duration="2500" class="" />%
					</div>
				</div>
				<div class="card-panel-bottom-rhb">
					<div>日环比</div>
					<div>
						<img src="@/assets/bottom.png" style="margin-left:8px; margin-right: 8px;"/>
					</div>
					<div>
						￥
						<count-to :start-val="0" :end-val="11" :duration="2500" class="card-panel-num-small" />%
					</div>
				</div>
			</div>
			<div class="card-info-bottom">
				日均销售额：¥
				<count-to :start-val="0" :end-val="12243" :duration="2500" class="card-panel-num" />
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('messages')">
				<div class="card-panel-description">
					<div class="card-panel-text">
						访问量
					</div>
					<count-to :start-val="0" :end-val="count" :duration="2500" class="card-panel-num" />
					<img class="card-panel-img" src="@/assets/info-circle.png" />
				</div>
				<img src="@/assets/Rectangle.png" class="card-panel-visiimg"/>
			</div>
			<div class="card-info-bottom">
				日访问量：
				<count-to :start-val="0" :end-val="dayCount" :duration="2500" class="card-panel-num" />
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('purchases')">
				<div class="card-panel-description">
					<div class="card-panel-text">
						支付笔数
					</div>
					<count-to :start-val="0" :end-val="6560" :duration="3000" class="card-panel-num" />
					<img class="card-panel-img" src="@/assets/info-circle.png" />
				</div>
				<img src="@/assets/Group.png" class="card-panel-visiimg"/>
			</div>
			<div class="card-info-bottom">
				支付成功率：
				<count-to :start-val="0" :end-val="60" :duration="2500" class="card-panel-num" />%
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('shoppings')">
				<div class="card-panel-description">
					<div class="card-panel-text">
						订单数
					</div>
					<count-to :start-val="0" :end-val="78" :duration="3600" class="card-panel-num" />%
					<img class="card-panel-img" src="@/assets/info-circle.png" />
				</div>
				<img src="@/assets/Groupjdt.png"  class="card-panel-visiimg"/>
			</div>
			<div class="card-info-bottom">
				<div class="card-info-bottom-ztb">
					<div>
						周同比
					</div>
					<div><img style="margin-left:8px; margin-right: 8px;" src="@/assets/cardtop.png" /></div>
					<div>
						￥
						<count-to :start-val="0" :end-val="12" :duration="2500" class="" />%
					</div>
				</div>
				<div class="card-info-bottom-rhb">
					<div>日环比</div>
					<div>
						<img src="@/assets/bottom.png" style="margin-left:8px; margin-right: 8px;"/>
					</div>
					<div>
						￥
						<count-to :start-val="0" :end-val="11" :duration="2500" class="card-info-num-small" />%
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import CountTo from 'vue-count-to'
	import {
		getVisitorLogsCount
	} from '@/api/cartogram'
import { mapGetters } from 'vuex'


	export default {
		data(){
				return {
					appid:0,
					count:0,
					dayCount:0
				}
			},
		  computed: {
			...mapGetters(['getCurrentShop'])
		  },
		components: {
			CountTo
		},
		created() {
			this.getVisitorLogsCount()
		},
		methods: {
			handleSetLineChartData(type) {
				this.$emit('handleSetLineChartData', type)
			},
			//访问量
			async getVisitorLogsCount() {
				let data = await getVisitorLogsCount(this.getCurrentShop.appId);
				if (data.success = true) {
					this.count=data.data.count,
					this.dayCount=data.data.dayCount
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel-group {
		margin-top: 18px;

		.card-panel-col {
			margin-bottom: 32px;
		}

		.card-info-bottom {
			padding: 10px 15px;
			color: #666;
			text-align: center;
			font-size: 14px;
			font-weight: 900;
			background: #fff;
			border-top: 1px solid #e1e1e1;
			display: flex;
			justify-content: center;

			.card-info-bottom-ztb {
				// margin-left: -150px;
				display: flex;
				justify-content: center;
			}

			.card-info-bottom-rhb {
				// margin-left: 130px;
				// margin-top: -15px;
				display: flex;
				justify-content: center;

			}
		}

		.card-panel {
			// height: 108px;
			cursor: pointer;
			font-size: 12px;
			position: relative;
			overflow: hidden;
			color: #666;
			background: #fff;
			// box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
			border-color: rgba(0, 0, 0, .05);
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 2px 15px 30px 15px;
			box-sizing: border-box;

			.card-panel-bottom-ztb {
				font-size: 14px;
				position: absolute;
				overflow: hidden;
				display: flex;
				justify-content: center;
				margin-top: 50px;
			}

			.card-panel-bottom-rhb {
				font-size: 14px;
				position: absolute;
				overflow: hidden;
				display: flex;
				justify-content: center;
				margin-top: 50px;
				margin-left: 140px;
			}

			&:hover {
				.card-panel-icon-wrapper {
					color: #fff;
				}

				.icon-people {
					background: #40c9c6;
				}

				.icon-message {
					background: #36a3f7;
				}

				.icon-money {
					background: #f4516c;
				}

				.icon-shopping {
					background: #34bfa3
				}
			}

			.icon-people {
				color: #40c9c6;
			}

			.icon-message {
				color: #36a3f7;
			}

			.icon-money {
				color: #f4516c;
			}

			.icon-shopping {
				color: #34bfa3
			}

			.card-panel-icon-wrapper {
				padding: 16px;
				transition: all 0.38s ease-out;
				border-radius: 6px;
			}

			.card-panel-icon {
				float: left;
				font-size: 36px;
			}
			.card-panel-visiimg{
				position: absolute;
				overflow: hidden;
				margin-top: 45px;
				width: 300px;
			}
			.card-panel-description {
				font-weight: bold;
				margin-top: 5px;
				margin-bottom: 26px;
				margin-left: 0px;
				.card-panel-text {
					line-height: 18px;
					color: rgba(0, 0, 0, 0.45);
					font-size: 14px;
					margin-bottom: 12px;
				}

				.card-panel-text-small {
					font-size: 14px;
				}

				.card-panel-img {
					position: absolute;
					margin-top: -26px;
					margin-right: 24px;
					right: 0px;
				}

				.card-panel-num {
					font-size: 30px;
				}

				.card-panel-num-small {
					font-size: 16px;
				}
			}
		}
	}

	@media (max-width:550px) {
		.card-panel-description {
			display: none;
		}

		.card-panel-icon-wrapper {
			float: none !important;
			width: 100%;
			height: 100%;
			margin: 0 !important;

			.svg-icon {
				display: block;
				margin: 14px auto !important;
				float: none !important;
			}
		}
	}
</style>
