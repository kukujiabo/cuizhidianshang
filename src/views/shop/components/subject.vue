<template>
  <div>
    <el-dialog width="1280px" title="店铺主题管理" :visible.sync="showDialog">
      <div class="subject-container">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="color-panel">
              <h4>主题配色方案</h4>
              <div class="color-list">
                <div
                  v-for="color in colors"
                  :key="color"
                  class="colors"
                  :style="{ backgroundColor: color }"
                  @click="selectColor(color)"
                >
                  <i v-if="color === selectedColor" class="el-icon-success" style="font-size:24px;color:#fff" />
                </div>
                <div class="colors user-color">
                  <el-color-picker v-model="selfDefineColor" @active-change="changeColor" />
                  <div class="color-tips">自定义颜色</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <h4>当前配色展示</h4>
            <div class="page-panel">
              <img
                class="page"
                src="@/assets/subject-index.png"
                :style="{ backgroundColor: selectedColor }"
              >
              <img
                class="page"
                src="@/assets/subject-detail.png"
                :style="{ backgroundColor: selectedColor }"
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.subject-container {
  padding: 30px;
  background-color: #f3f5f7;
  .color-panel {
    .color-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .colors {
        margin: 5px;
        width: 72px;
        height: 72px;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .el-color-picker--medium {
          width: 72px;
          height: 72px;
          .el-color-picker__trigger {
            width: 72px;
            height: 72px;
            padding: 0;
            border-radius: 8px;
            overflow: hidden;
            .el-color-picker__color {
              border: 0;
              margin: 0;
              border-radius: 8px;
            }
          }
        }
      }
      .user-color {
        position: relative;
        .color-tips {
          height: 24px;
          background-color: #666;
          opacity: 0.6;
          color: #fff;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 10px;
          text-align: center;
          line-height: 24px;
          border-radius: 0 0 8px 8px;
        }
      }
      .colors:hover {
        cursor: pointer;
      }
    }
  }
  .page-panel {
    display: flex;
    flex-direction: row;
    .page {
      margin: 0 10px;
      width: 337.5px;
      height: 730px;
      border: 0;
    }
  }
}
</style>
<script>
import { saveShopDesign, getShopDesign } from '@/api/shop'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      shopid: Cookies.get('shopid'),
      showDialog: false,
      selfDefineColor: '#ffffff',
      selectedColor: '#222220',
      colors: [
        '#222220',
        '#4452E4',
        '#00C802',
        '#1F71FF',
        '#F13F37',
        '#F5A90F',
        '#FA6400',
        '#2AB7F3',
        '#9C80FF',
        '#F36A8E'
      ]
    }
  },
  methods: {
    // 选择颜色
    selectColor(color) {
      this.selectedColor = color
    },
    // 显示
    show() {
      this.getStyleDesign()
      this.showDialog = true
    },
    // 隐藏
    hide() {
      this.showDialog = false
    },
    // 改变自定义颜色
    changeColor(color) {
      this.selectedColor = color
    },
    // 查询主题配置
    async getStyleDesign() {
      const options = { shopId: this.shopid, partType: 'subject' }
      try {
        const { data: { context }} = await getShopDesign(options)
        const { color } = JSON.parse(context)
        this.selectedColor = color
        if (!this.colors.includes(color)) {
          this.selfDefineColor = color
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 保存主题
    async confirm() {
      const subjectStyles = {
        shopId: this.shopid,
        partType: 'subject',
        context: JSON.stringify({
          color: this.selectedColor
        })
      }
      const subjectArray = [subjectStyles]
      try {
        const { success, message } = await saveShopDesign(subjectArray)
        if (success) {
          this.$message({ type: 'success', message: '主题保存成功！' })
          this.showDialog = false
        } else {
          this.$message({ type: 'error', message })
        }
      } catch (error) {
        this.$message({ type: 'error', message: error.getMessage() })
      }
    }
  }
}
</script>
