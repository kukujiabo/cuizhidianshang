<template>
  <div class="app-option">
    <div class="shop-management">
      <el-button type="primary" plain @click="manageShopNav">店铺导航管理</el-button>
      <el-button @click="showSubjectManage">店铺主题管理</el-button>
    </div>
    <el-form ref="options-form" style="padding:0" label-width="66px">
      <div style="padding-top:12px;color:#000">
        <h2>{{ option.title }}</h2>
      </div>
      <div class="option-list">
        <template v-if="option.action">
          <template v-if="option.action.type === 'image-click'">
            <image-click :action="option.action" :items="option.action.config" />
          </template>
          <template v-if="option.action.type === 'swiper-click'">
            <banner-item :dom-id="option.domId" :banners="option.action.config" />
          </template>
          <template v-if="option.action.type === 'bottom-menu-click'">
            <bottom-menu-item :items="option.action.config" />
          </template>
          <template v-if="option.action.type === 'floor-menu-click'">
            <floor-menu-item :menus="option.action.config" />
          </template>
          <template v-if="option.action.type === 'left-scroll-click'">
            <scroll-item :scrolls="option.action.config" />
          </template>
          <template v-if="option.action.type === 'horizontal-item-click'">
            <horizontal-item :items="option.action.config" />
          </template>
          <template v-if="option.action.type === 'richtext'">
            <richtext-item :action="option.action" />
          </template>
          <template v-if="option.action.type === 'fenlei-item-click'">
            <fenlei-item :action="option.action" :items="option.action.config" />
          </template>
          <template v-if="option.action.type === 'vertical-item-click'">
            <vertical-item :items="option.action.config" />
          </template>
          <template v-if="option.action.type === 'form-submit'">
            <input-item :forms="option.action.config" />
          </template>
          <template v-if="option.action.type === 'timeout-click'">
            <timeout-item
              :show.sync="timeoutClickShow"
              :end="option.style[0].val"
              :img="option.style[1].val"
              :times="option.action.config"
            />
            <el-button
              icon="el-icon-plus"
              :disabled="!option.style[1].val"
              round
              @click="timeoutClickShow = true"
            >时间项配置</el-button>
          </template>
          <template v-if="option.action.type === 'grid-menu-click'">
            <grid-menu-item :action="option.action" :grids.sync="option.action.config" />
          </template>
          <template v-if="option.action.type === 'marquee-click'">
            <marquee-item :marquees="option.action.config" />
          </template>
          <template v-if="option.action.type === 'page-paragraph'">
            <page-paragraph-item :action="option.action" />
          </template>
          <template v-if="option.action.type === 'page-faq-list'">
            <page-faq-item :paragraphs="option.action.config" />
          </template>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import formItem from '@/common/formItem.vue'
import imageClick from '@/views/itemOption/imageClick.vue'
import timeoutItem from '@/views/itemOption/timeoutItem.vue'
import bannerItem from '@/views/itemOption/bannerItem.vue'
import bottomMenuItem from '@/views/itemOption/bottomMenuItem.vue'
import floorMenuItem from '@/views/itemOption/floorMenuItem.vue'
import horizontalItem from '@/views/itemOption/horizontalItem.vue'
import fenleiItem from '@/views/itemOption/fenleiItem.vue'
import verticalItem from '@/views/itemOption/verticalItem.vue'
import scrollItem from '@/views/itemOption/scrollItem.vue'
import inputItem from '@/views/itemOption/inputItem.vue'
import gridMenuItem from '@/views/itemOption/gridMenuItem.vue'
import marqueeItem from '@/views/itemOption/marqueeItem.vue'
import pageParagraphItem from '@/views/itemOption/pageParagraphItem.vue'
import pageFaqItem from '@/views/itemOption/pageFaqItem.vue'
import richtextItem from '@/views/itemOption/richtextItem'

export default {
  name: 'AppOption',
  components: {
    formItem,
    imageClick,
    timeoutItem,
    bannerItem,
    bottomMenuItem,
    floorMenuItem,
    scrollItem,
    horizontalItem,
    verticalItem,
    inputItem,
    gridMenuItem,
    marqueeItem,
    pageParagraphItem,
    pageFaqItem,
    fenleiItem,
    richtextItem
  },
  props: {
    option: {
      type: Object
    },
    pageOption: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      imageClickShow: false,
      timeoutClickShow: false
    }
  },
  methods: {
    manageShopNav() {
      this.$bus.$emit('showManageShopNav')
    },
    showSubjectManage() {
      this.$bus.$emit('showManageSubject')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "~@/styles/color.scss";
.app-option {
  width: 400px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;
  .option-list {
    // padding: 0 20px;
    .option-config-container {
      padding: 10px 20px;
      .config-item-container {
        padding: 15px;
        background-color: #f3f5f7;
        border-radius: 6px;
        .add-item-btn {
          height: 42px;
          color: $themeBlue;
          background-color: #fff;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          border: 0.5px solid #e1e1e1;
        }
        .add-item-btn:hover {
          cursor: pointer;
        }
      }
    }
    .divider {
      height: 1px;
      width: 100%;
      background-color: #F2F2F2;
      margin: 5px 0;
    }
  }
  .el-dropdown-link {
    font-size: 12px;
    color: $themeBlue;
  }
  .shop-management {
    height: 80px;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  h2 {
    margin: 13px 0;
    font-size: 14px;
  }
  .el-form {
    padding: 10px 25px 10px 25px;
    > h3 {
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
        font-size: 13px;
      }
    }
    .foo-wrapper {
      padding: 6px;
      background-color: #f3f5f7;
      .add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.comp-tips {
  font-size: 12px;
  color: #a1a1a1;
}
.line-options {
  // margin: 20px 0;
  // border-top: 0.5px solid #efefef;
  // border-bottom: 0.5px solid #efefef;
  .el-form {
    padding-bottom: 0 !important;
  }
}
.option-container {
  padding: 10px;
  background-color: #f3f5f7;
  .form-list-panel {
    margin-top: 8px;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    padding: 0px 10px 0px 0px;
    border-radius: 6px;
    height: 92px;
    &:first-child {
      margin-top: 0;
    }
    .list-item-opt {
      text-align: right;

      > a {
        margin-left: 10px;
        color: #2aa7ff;
        font-size: 12px;
      }
    }
  }
  .add-option {
    display: flex;
    border-radius: 6px;
    margin-top: 10px;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 56px;
    border: 0.5px solid #efefef;
  }
}
</style>
