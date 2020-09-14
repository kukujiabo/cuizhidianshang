<!--
 * @Author: lee
 * @Date: 2020-07-13 16:25:04
 * @LastEditors: lee
 * @LastEditTime: 2020-07-16 22:23:52
 * @Description: 选择商品的引用弹出框
-->
<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialog"
    width="60%"
    height="80%"
    class="lee"
  >
    <el-input v-model="listQuery.search" placeholder="搜索商品名称" class="input-with-select">
      <el-button slot="append" type="primary" @click="onQuery">搜索</el-button>
    </el-input>

    <el-tabs v-model="listQuery.cType" class="lee" @tab-click="onQuery">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      />
    </el-tabs>

    <el-table
      ref="table"
      stripe
      :data="list"
      class="content-table none"
      empty-text="没有数据"
      border
      @select="onSelect"
      @selection-change="onSelectionChange"
      @select-all="selectAll"
    >
      <el-table-column v-if="!singleSelect" type="selection" width="50" align="center" />
      <el-table-column v-if="singleSelect" width="50" align="center">
        <template slot-scope="scope">
          <el-radio v-model="goodsId" :label="scope.row.id" class="none" @change="onRadio(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="singleSelect? '商品信息' :'已选中'+ids.length+'个商品'" min-width="200">
        <template slot-scope="scope">
          <div style="display: flex;">
            <el-image :src="`${Host}/res/` + scope.row.cover" style="width: 80px; vertical-align:middle;" />
            <div style="margin-left:10px;">
              <div style="font-weight: bold;">{{ scope.row.title }}</div>
              <div style="color: #c82a2a;">{{ scope.row.sellMode === 0 ? '免费': '￥ '+scope.row.realUnitPrice }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
@import "~@/styles/lee.scss";
</style>

<script>
// import { queryGoodsGroup } from '@/api/goodsGroup'
import { queryDocuments } from '@/api/document'
import { Host } from '@/config'

export default {
  // props: {
  //   selectedGoods: Array
  // },
  props: {
    // 是否多选
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Host: Host,
      dialog: false,
      tabs: [
        { name: '1', title: '图文' },
        { name: '2', title: '视频' },
        { name: '3', title: '直播' },
        { name: '4', title: '手机海报' },
        { name: '5', title: '专题海报' },
        { name: '6', title: '音频' }
      ],
      tabsValue: null,
      selection: [],
      // -------------------
      list: [],
      listTotal: 0,
      listQuery: {
        /* 商品类型  1:图文 2:视频 3:直播 4:手机海报 5:专题海报 6:音频 */
        cType: '1',
        // /*商品分组Id 0:全部 */
        clsId: 0,
        /* 通过商品id查询 */
        // "matchIds":[1,2,3],
        // /*商品名称*/
        // "search":"",
        // /*查询 上架模式 1:立即上架(已上架) 2:定时上架(待上架) 3:暂不上架(已下架) 4:停售 5:隐藏 */
        // "putMode":0,
        // "start":1,
        // "limit":10
        /* 商品名称 */
        search: '',
        start: 1,
        limit: 20
      },
      launchDialog: false,
      launchForm: {
        type: 1
      },
      ids: [],
      // 单选的时候单独传一个ID
      goodsId: null,
      // 单选给的全部值
      radioData: {}
    }
  },
  // 监听
  watch: {
    // 由于value是数组，所以要用这种方法来监听，确保里面每个值变化的时候都监听到
    // value: {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     console.log('深度监听', newValue, oldValue)
    //     // this.selection = newValue
    //     // // 先清空再添加
    //     // this.$refs.table.clearSelection()
    //     // this.selection.forEach(row => {
    //     //   this.$refs.table.toggleRowSelection(row, true)
    //     // })
    //     // // this.$emit('input', newValue)
    //   }
    // }
  },
  created() {
    console.log('singleSelect', this.singleSelect)
    // 初始化列表
    // this.queryGoodsGroup({ start: 1, limit: 10 })
    this.queryDocuments(this.listQuery)
  },
  methods: {
    // // 获取商品分类
    // async queryGoodsGroup(query) {
    //   try {
    //     const res = await queryGoodsGroup(query)
    //     this.tabs = []
    //     for (var key in res.data.list) {
    //       this.tabs.push({ name: res.data.list[key].id, title: res.data.list[key].title })
    //     }
    //   } catch (error) {
    //     // console.log(error)
    //   }
    // },
    // 查询商品档案
    async queryDocuments(query) {
      try {
        const res = await queryDocuments(query)
        // console.log('123', res)
        this.list = res.data.list
        this.listTotal = res.data.total
        // 更新一次选中值
        if (!this.singleSelect) {
          this.setSelection()
        }
      } catch (error) {
        console.log(error)
      }
    },
    toAddCoupon() {
      this.$router.push({ path: '/marketing/addCoupon' })
    },
    // 点击搜索按钮
    onQuery() {
      this.queryDocuments(this.listQuery)
    },
    // 点击定向投放
    onLaunch(row) {
      this.launchData = row
      this.launchDialog = true
    },
    // 关闭dialog
    offDialog() {
      this.dialog = false
    },
    // 打开dialog
    onDialog(goods = []) {
      this.dialog = true
      if (this.singleSelect) {
        this.goodsId = goods
      } else {
        this.ids = goods
        // 更新一次选中值
        this.setSelection()
      }
    },
    // 提交按钮
    submit() {
      var new_selection = []
      for (var key in this.selection) {
        new_selection.push(this.selection[key].id)
      }
      // this.$emit('input', new_selection)
      // this.$emit('on-submit', new_selection)
      if (this.singleSelect) {
        this.$emit('on-submit', this.radioData)
      } else {
        this.$emit('on-submit', this.selection)
      }
      this.dialog = false
    },
    // props: ['value'],
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    onSelect(selection, row) {
      // var me = this
      // row.id 判断这个ID是否再selection里，如果不在代表是删除，如果存在代表是添加
      var isContain = false // 是否包含
      selection.forEach(itme => {
        if (itme.id === row.id) {
          isContain = true
        }
        if (isContain) {
          // console.log(1, this.ids)
          // 判断这个ID是否存在ids中
          // console.log('is', this.ids.indexOf(row.id))
          if (this.ids.indexOf(row.id) === -1) {
            this.ids.push(row.id)
          }
        } else {
          // console.log(2, this.ids)
          // console.log('is', this.ids.indexOf(row.id))
          if (this.ids.indexOf(row.id) !== -1) {
            this.ids.splice(this.ids.indexOf(row.id), 1)
          }
        }
      })
      // console.log('onSelect', selection, row, this.ids)
    },
    selectAll(selection) {
      // 0代表全部不选，大于0代表全部选中
      if (selection.length === 0) {
        this.list.forEach(item => {
          if (this.ids.indexOf(item.id) !== -1) {
            this.ids.splice(this.ids.indexOf(item.id), 1)
          }
        })
      } else {
        this.list.forEach(item => {
          if (this.ids.indexOf(item.id) === -1) {
            this.ids.push(item.id)
          }
        })
      }
    },
    // 当选择项发生变化时会触发该事件
    onSelectionChange(selection) {
      this.selection = selection
    },
    // 单选发生变化时
    onRadio(row) {
      this.radioData = row
    },
    // 更新选着值
    setSelection() {
      // console.log(this.ids)
      // var me = this
      // 先清空再添加
      // window.setTimeout(() => {
      if (!this.singleSelect) {
        this.$nextTick(() => {
          if (this.$refs.table !== undefined) {
            this.$refs.table.clearSelection()
            this.ids.forEach(id => {
              this.list.forEach(row => {
                if (row.id === id) {
                  this.$refs.table.toggleRowSelection(row, true)
                }
              })
            })
          }
        })
      }
    }
  }
}
</script>
