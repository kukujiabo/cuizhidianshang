<template>
  <div class="info">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">商品信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" required :model="form" label-width="120px">
          <el-form-item prop="name" label="商品分组：">
            <el-select v-model="form.clsId" placeholder="选择商品分组">
              <el-option
                v-for="category in groups"
                :key="category.id"
                :value="category.id"
                :label="category.title"
              />
            </el-select>
            <a class="text-blue" href="javascript:void(0);" style="margin-left:10px" @click="toGroups">前往商品分组</a>
          </el-form-item>
          <el-form-item label="售卖方式：">
            <el-checkbox v-model="form.singleSell" label="支持单独售卖" />
          </el-form-item>
          <el-form-item label=" ">
            <el-radio-group v-model="form.sellMode">
              <el-radio :disabled="!form.singleSell" :label="1">付费</el-radio>
              <el-radio :disabled="!form.singleSell" :label="0">免费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <div class="inline-input">
              <el-input type="number" :min="0.01" :disabled="!form.singleSell ? true : form.sellMode === 0" @input="val => val < 0.01 ? form.stdUnitPrice = 0.01 : form.stdUnitPrice = Number(val.toFixed(2))" v-model="form.stdUnitPrice" placeholder="输入商品原价">
                <template slot="append">元</template>
              </el-input>
              <el-input type="number" :min="0.01" :disabled="!form.singleSell ? true : form.sellMode === 0" @input="val => val  < 0.01 ? form.realUnitPrice = 0.01 : form.realUnitPrice = Number(val.toFixed(2))" v-model="form.realUnitPrice" placeholder="输入商品现价">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import '~@/styles/index.scss';

.info {
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    .el-form-item {
      .el-select, .el-button {
        width: 200px;
      }
      .el-select {
        background-color: $lightBackground;
      }
      .el-button {
        border: 0;
        height: 40px;
        line-height: 20px;
        color: $themeBlue;
      }
      .inline-input {
        .el-input {
          width: 180px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<script>
import { queryGoodsGroup } from '@/api/goodsGroup'

export default {
  data() {
    return {
      groups: [],
      form: {
        clsId: 0,
        singleSell: 0,
        sellMode: 0,
        stdUnitPrice: '',
        realUnitPrice: ''
      }
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    getFormData() {
      return this.form
    },
    async getGroupList() {
      try {
        const { data: { list }} = await queryGoodsGroup({ start: 1, limit: 100 })
        this.groups = list
        this.groups.unshift({ id: 0, title: '选择分组' })
      } catch (error) {
        console.log(error)
      }
    },
    toGroups() {
      this.$router.push({ path: '/commodity/category' })
    },
    setData(data) {
      this.form.clsId = data.clsId
      this.form.singleSell = data.singleSell === 1 ? true : false
      this.form.sellMode = data.sellMode
      this.form.stdUnitPrice = data.stdUnitPrice
      this.form.realUnitPrice = data.realUnitPrice
    }
  }
}
</script>
