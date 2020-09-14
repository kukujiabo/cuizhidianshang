<template>
  <div>
    <template>
      <div>
        <div class="divider"></div>
        <p class="option-config-container" style="color:#a1a1a1;">优惠券来源</p>
        <div class="option-config-container">
          <el-radio-group v-model="action.fetchMode">
            <el-radio label="auto">自动获取</el-radio>
            <el-radio label="menul">手动选择</el-radio>
          </el-radio-group>
        </div>
        <div class="option-config-container">
          <div class="config-item-container">
            <div class="coupon-itm" v-for="(c, index) in action.config" :key="c.id">
              <p>{{c.title}}</p>
              <!-- <p>{{}}</p> -->
              <i class="el-icon-remove" @click="removeCoupon(index)"></i>
            </div>
            <div class="add-item-btn" @click="openDialog">
              + 添加优惠券
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="option-config-container">
          <div class="flex flex-row" style="justify-content:space-between">
            <span class="text-gray">更多设置</span>
            <span>
              <el-checkbox v-model="action.hideUsed" label="隐藏已抢完优惠券"></el-checkbox>
            </span>
          </div>
          <p>当页面无有效优惠券时，优惠券区块则进行隐藏</p>
        </div>
      </div>
      <div>
        <el-dialog
          :close-on-click-modal="false"
          title="添加优惠券"
          width="800px"
          :visible.sync="showDialog"
          @closed="clearSearch"
          >
          <div class="search-line">
            <el-input v-model="listQuery.search" style="width:360px;" placeholder="请输入优惠券名称">
              <el-button slot="append" @click="getCouponList">搜索</el-button>
            </el-input>
          </div>
          <div style="padding:5px 15px;">
            <el-table
              border
              stripe 
              :height="400"
              :data="coupons"
              @selection-change="selectChange"
              >
              <el-table-column type="selection" />
              <el-table-column prop="title" label="优惠券名称" />
              <el-table-column prop="content" label="优惠内容" />
              <el-table-column label="有效期">
                <template slot-scope="scope">
                  <span>{{scope.row.BeginTime}} - {{scope.row.EndTime}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="receiveQty" label="限令/人" />
            </el-table>
          </div>
          <div slot="footer">
            <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import { queryCoupon } from '@/api/coupon'
  export default {
    data() {
      return {
        showDialog: false,
        list: this.items,
        defaultConf: util.copyObj(compConfig['fenlei']),
        selection: [],
        coupons: [],
        listQuery: {
          search: '',
          status: 2,
          cType: 0,
          start: 1,
          limit: 20
        }
      }
    },
    props: {
      items: {
        type: Array
      },
      action: {
        type: Object,
        default: () => ({ display: 1 })
      }
    },
    methods: {
      clearSearch() {
        this.listQuery.search = ''
      },
      removeCoupon(index) {
        this.action.config.splice(index, 1)
      },
      openDialog() {
        this.showDialog = true
        this.getCouponList()
      },
      selectChange(evt) {
        this.selection = evt
      },
      confirm() {
        if (0 == this.selection.length) {
          this.$message({ 
            type: 'error',
            message: '请至少选择一个优惠券！'
          })
          return
        }
        this.action.config = this.selection
        this.showDialog = false
        console.log(this.action)
      },
      async getCouponList() {
        try {
          const { data: { list } } = await queryCoupon(this.listQuery)
          this.coupons = list
        } catch (error) {
          console.log(error)
        }
      },
      upItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx - 1, 0, tmp)
      },
      removeClass(index) {
        this.$confirm('确认删除分类' + this.list[index].label + '吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(_ => {
          this.$bus.$emit('removefenleiclass', { index, key: this.list[index].key })
          this.list.splice(index, 1)
        })
      },
      downItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.list.splice(idx, 1)
      },
      addItem() {
        if (this.list.length < 4) {
          const newConfig = util.copyObj(this.defaultConf.action.config[0])
          newConfig.key = this.list.length + 1
          newConfig.label = '分类' + (this.list.length + 1)
          this.list.push(newConfig)
        } else {
          this.$alert('最多添加4个分类！')
        }
      },
      addClassItem(cls) {
        const newObj = util.copyObj(this.list[0])
        newObj.key = this.list.length,
        newObj.val = '',
        newObj.title = '默认标题',
        newObj.desc = '默认文案描述，默认文案描述，默认文案描述默认文案描述',
        newObj.click = null
        this.list.push(newObj)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.search-line {
  padding: 15px;
}
.coupon-itm {
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e1e1e1;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  p {
    width: 100%;
  }
  .el-icon-remove {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #a1a1a1;
    cursor: pointer;
  }
}
</style>
