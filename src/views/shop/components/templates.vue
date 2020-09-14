<template>
  <div class="templates-container">
    <div class="template-mask" />
    <div class="template-wrapper">
      <div class="title">
        <h2>模版中心</h2>
        <i class="el-icon-close" @click="emitClose" />
      </div>
      <div class="template-list">
        <div
          v-for="temp in templateList"
          :key="temp.id"
          class="tmp"
          :style="{ backgroundImage: `url(${temp.img})` }"
          @mouseenter="temp.showChoose = true"
          @mouseleave="temp.showChoose = false"
        >
          <div v-if="temp.showChoose" class="temp-mask" />
          <div v-if="temp.showChoose" class="temp-select">
            <el-button size="mini" type="primary" @click="chooseTemplate(temp)">选用模板</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.templates-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .template-mask {
    background-color: #000;
    position: absolute;
    opacity: 0.3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .template-wrapper {
    position: absolute;
    overflow: scroll;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 600px;
    background-color: #f3f5f7;
    .title {
      padding: 0 30px;
      height: 80px;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .el-icon-close {
        font-size: 30px;
      }
      .el-icon-close:hover {
        cursor: pointer;
      }
    }
  }
  .template-list {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    padding: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .tmp {
      width: 236px;
      height: 501px;
      background-color: #fff;
      border: 0.5px solid #e1e1e1;
      margin-bottom: 40px;
      background-position: top center;
      background-size: 100% auto;
      background-repeat: no-repeat;
      position: relative;
      .temp-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.4;
        background-color: #000;
      }
      .temp-select {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
    .tmp:nth-child(2n) {
      margin-left: 30px;
    }
  }
}
</style>
<script>
import Tmp1 from '@/assets/tmp1.png'
import Tmp2 from '@/assets/tmp2.png'
import Tmp3 from '@/assets/tmp3.png'
import Tmp4 from '@/assets/tmp4.png'
import Tmp5 from '@/assets/tmp5.png'
import { queryTemplates } from '@/api/template'

export default {
  data() {
    return {
      templateList: [
        // { id: 1, img: Tmp1, showChoose: false },
        // { id: 2, img: Tmp2, showChoose: false },
        // { id: 3, img: Tmp3, showChoose: false },
        // { id: 4, img: Tmp4, showChoose: false },
        // { id: 5, img: Tmp5, showChoose: false }
      ],
      listQuery: {
        // code: '',
        // start: 1,
        // limit: 20
      }
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    chooseTemplate(temp) {
      this.$emit('selected', temp)
      this.$emit('close')
    },
    async getTemplateList() {
      const { data: { list }} = await queryTemplates(this.listQuery)
      for (const tmp of list) {
        const configs = JSON.parse(tmp.context)
        this.templateList.push({ id: tmp.id, img: tmp.backImg, showChoose: false, conf: configs })
      }
    }
  }
}
</script>
