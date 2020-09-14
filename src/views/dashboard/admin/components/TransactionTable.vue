 <template>
	<!-- <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="店铺销售额排名" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.shop_name | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column  width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column> -->
	<!-- <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column> -->
	<!-- </el-table> -->
	<div class="tran-view">
		<div class="tran-box">
			<div class="tran-top">
				店铺销售额排名
			</div>
			<div v-for="(item,index) in list" :key="index" v-if="index<7" class="tran-cont">
				<div class="tran-circle" v-if="index<3">{{index+1}}</div>
				<div class="tran-circleh" v-if="index>=3">{{index+1}}</div>
				<div class="tran-name">{{item.shop_name}}</div>
				<div class="tran-num">{{item.price}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		transactionList
	} from '@/api/remote-search'

	export default {
		filters: {
			statusFilter(status) {
				const statusMap = {
					success: 'success',
					pending: 'danger'
				}
				return statusMap[status]
			},
			orderNoFilter(str) {
				return str.substring(0, 30)
			}
		},
		data() {
			return {
				list: [{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '江山欧派',
						price: 16200
					},
					{
						shop_name: '欧派门业',
						price: 28172
					}
				]
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {

			}
		}
	}
</script>
<style lang="scss">
 .tran-view {
  margin-left: 50px;
  margin-top: 30px;

  .tran-box {
   margin-left: 10px;
   margin-right: 50px;
   font-size: 14px;

   .tran-top {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 34px;
   }

   .tran-cont {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    line-height: 20px;

    .tran-circle {
     color: #FFFFFF;
     text-align: center;
     background-color: #1890FF;
     width: 20px;
     height: 20px;
     border-radius: 50%;
    }

    .tran-circleh {
     color: #000000;
     text-align: center;
     background-color: #F0F2F5;
     width: 20px;
     height: 20px;
     border-radius: 50%;
    }
   }
  }
 }
</style>