<template>
  <div>
    <template v-if="slides && slides.length">
      <div class="option-config-container">
        <p style="font-size:12px;color:#a1a1a1">最多添加12个轮播图，拖动选中的轮播图可对其排序</p>
        <div
          ref="itemlist"
          class="option-container"
          @dragstart="onDragStart"
          @dragover="onDragOver"
          @dragend="onDragEnd"
        >
          <div
            v-for="(slide, idx) in slides"
            :key="slide.key"
            class="form-list-panel"
            :data-key="slide.key"
            :draggable="true"
          >
            <upload
              :label="'图片' + (idx + 1)"
              :index="idx"
              :item="slide"
              @uploadSuccess="uploadSuccess"
              @removeitem="removeItem"
            />
            <template v-if="slide.click">
              <el-form-item class="small" label="跳转到：">
                <span style="word-break: break-all;">{{ slide.click.href }}</span>
              </el-form-item>
            </template>
          </div>
          <div class="add-option" @click="addBanner">
            <el-button type="text" icon="el-icon-plus">添加轮播图</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import util from '@/utils/util.js'
import { createUniqueString } from '@/utils/index'
import compConfig from '@/config/comp.config.js'
import upload from '@/common/navUpload.vue'

export default {
  components: {
    upload
  },
  props: {
    domId: {
      type: String
    },
    banners: {
      type: Array
    }
  },
  data() {
    return {
      defaultConf: util.copyObj(compConfig['swiper-banner']),
      slides: this.banners,
      draging: null,
      target: null
    }
  },
  watch: {
    banners: {
      handler(val) {
        this.slides = val
      },
      deep: true
    }
  },
  methods: {
    removeItem(index) {
      this.banners.splice(index, 1)
    },
    showClick(banner, idx) {
      this.$bus.$emit('click:show', idx, ['outside', 'code'])
    },
    upBanner(idx) {
      const tmp = util.copyObj(this.slides[idx])
      this.slides.splice(idx, 1)
      this.slides.splice(idx - 1, 0, tmp)
    },
    downBanner(idx) {
      const tmp = util.copyObj(this.slides[idx])
      this.slides.splice(idx, 1)
      this.slides.splice(idx + 1, 0, tmp)
    },
    delBanner(idx) {
      this.slides.splice(idx, 1)
    },
    addBanner() {
      if (this.slides.length < 10) {
        const item = this.defaultConf.action.config[0]
        item.key = createUniqueString()
        this.slides.push(util.copyObj(item))
      } else {
        this.$alert('最多添加10个图片项！')
      }
    },
    uploadSuccess(item, img, idx) {
      console.log('uploadSuccess', item)
    },
    onDragStart(event) {
      this.draging = event.target
    },
    onDragOver(event) {
      this.target = this.getParent(event.target)
      if (!this.target) {
        return
      }
      if (this.target !== this.draging) {
        const dragingIndex = this._index(this.draging)
        const targetIndex = this._index(this.target)
        const dragingItem = this.slides[dragingIndex]
        const targetItem = this.slides[targetIndex]
        this.slides.splice(dragingIndex, 1, targetItem)
        this.slides.splice(targetIndex, 1, dragingItem)
      }
    },
    onDragEnd(event) {

    },
    _index(el) {
      const domData = Array.from(this.$refs.itemlist.childNodes)
      return domData.findIndex(i => i.getAttribute('data-key') === el.getAttribute('data-key'))
    },
    getParent(node) {
      if (node.className !== 'form-list-panel') {
        return this.getParent(node.parentNode)
      } else {
        return node
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
