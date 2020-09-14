<template>
  <div :class="['comp-content', component.active ? 'active' : '']" :style="getStyle">
    <div
      v-show="component.action.num != 'swiper'"
      class="page-list"
      :style="{ padding: component.action.displayType === 'space' ? '4px' : '0'}"
    >
      <div
        v-for="(item, idx) in list"
        class="page-list-item-img"
        :style="{ 
          width: component.action.num == 2 ? '50%' : '33.3%', 
          padding: component.action.displayType === 'space' ? '4px' : '0',
        }"
        :key="idx"
      >
        <div class="page-list-item__hd">
          <div
            class="page-list-item__img"
            :style="{
            backgroundImage: 'url(' + item.val + ')',
            borderRadius: component.action.displayType === 'space' ? '5px' : '0' 
          }"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-show="component.action.num == 'swiper'"
      class="page-list"
      :style="{ padding: component.action.displayType === 'space' ? '10px' : '0'}"
    >
      <div class="swiper-container" :id="component.domId">
        <div class="swiper-wrapper">
          <div v-for="banner in list" class="swiper-slide" :key="banner.key">
            <img class="swiper-slide-img" v-if="banner.val" :src="banner.val" />
            <div v-else class="image-placeholder">
              <i class="fa fa-caret-square-o-right"></i>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "BaseImage",
  props: {
    component: {
      type: Object,
    },
  },
  watch: {
    component: {
      handler() {
        this.banners = this.component.action.config;
        this.pagination = this.component.base[1].val;
        // this.height = this.getMaxHeight();
        // this.width = this.getWidth();
        setTimeout(() => {
          this.swiper.update();
        }, 0);
      },
      deep: true,
    },
  },
  data() {
    return {
      currentKey: 1,
      swiper: null,
      list: this.component.action.config,
      pagination: this.component.base[1].val
    };
  },
  computed: {
    getStyle() {
      const ret = [];
      this.component.style.forEach((item) => {
        const unit = item.unit || "";
        if (item.val) {
          if (item.attr === "background-image") {
            ret.push(item.attr + ":url(" + item.val + ")");
          } else {
            ret.push(item.attr + ":" + item.val + unit);
          }
        }
      });
      return ret.join(";");
    },
  },
  mounted() {
    console.log(this.component.domId);
    this.swiper = new Swiper("#" + this.component.domId, {
      autoplay: false,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
  created() {
    this.$bus.$on("removefenleiclass", ({ index, key }) => {
      if (this.currentKey == key) this.switchTab(this.tabs[index - 1]);
    });
  },
  methods: {
    switchTab(tab) {
      this.list = tab.children;
      this.currentKey = tab.key;
    },
    getItemStyle(key) {
      const ret = [];
      this.component.others.config.forEach((item) => {
        const isItem = item.attr.indexOf(key);
        const idx = item.attr.indexOf("_");
        if (isItem === 0) {
          const unit = item.unit || "";
          item.val &&
            ret.push(
              item.attr.substring(idx + 1, item.attr.length) +
                ":" +
                item.val +
                unit
            );
        }
      });
      return ret.join(";");
    },
    // getMaxHeight() {
    //   let h = 0;
    //   if (this.component.action.config && this.component.action.config.length) {
    //     this.component.action.config.forEach((item) => {
    //       if (item.height && item.height > h) {
    //         h = item.height;
    //       }
    //     });
    //   }
    //   return h > 0 ? h / 2 + "px" : "112px";
    // },
    // getWidth() {
    //   return (
    //     (750 - this.component.style[2].val - this.component.style[4].val) / 2 +
    //     "px"
    //   );
    // },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 150px;
  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    > img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }
}

.image-placeholder {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;

  > .fa {
    color: #83c0ff;
    font-size: 40px;
  }
}
.comp-content {
  background-repeat: no-repeat;
  // padding-bottom: 7px;
}
.list-title {
  // padding: 10px 0px 0px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  .list-title-item {
    font-size: 15px;
    font-weight: 600;
    height: 28px;
    line-height: 28px;
    width: 15%;
    color: #666;
    margin-right: 10%;
    text-align: left;
    height: 40px;
  }
  .list-title-item-full {
    font-size: 15px;
    font-weight: 600;
    height: 28px;
    line-height: 28px;
    width: 15%;
    color: #666;
    margin-right: 5%;
    margin-left: 5%;
    text-align: left;
    height: 40px;
  }
  .fen-lei-tab:hover {
    font-size: 16px;
  }
  .active {
    border-bottom: 2px solid #f5a90f;
  }
}
.page-list {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .page-list-item-img {
    box-sizing: border-box;
    border-bottom: 0;
    padding-bottom: 0;
    position: relative;
    display: flex;
    align-items: center;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      background-color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    &:last-child {
      &:after {
        display: none;
      }
    }
    .page-list-item__hd {
      // margin: 0 5px;
      text-align: center;
      width: 100%;
      height: 93px;
      // border-radius: 6px;
      overflow: hidden;
      .page-list-item__img {
        margin: 0 auto;
        height: 100%;
        background-color: #e9e9eb;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    .page-list-item__bd {
      flex: 1;
      height: 78px;
      min-width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .page-list-item__title {
        margin-bottom: 0.3em;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        word-wrap: break-word;
        word-break: break-all;
        margin-bottom: 10px;
      }
      .page-list-item__time {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .el-button--mini {
          padding: 3px 5px;
          font-size: 10px;
        }
      }
      .page-list-item__desc {
        font-size: 10px;
        margin: 0;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
