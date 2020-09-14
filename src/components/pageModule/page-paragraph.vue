<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-list">
      <p v-if="list.length === 0" class="text-gray" style="width:100%;line-height:75px;text-align:center">添加优惠券</p>
      <div
        v-for="(item, idx) in list"
        class="page-list-item-img"
        :key="idx"
        :style="getItemStyle('horizontal-list-item')"
      >
        <div class="page-list-item__hd">
          <img class="page-list-item__img" :src="item.val || coupon">
          <div v-if="item.reduction" class="money"><span style="font-size:10px">¥</span>{{item.reduction}}</div>
          <div v-if="item.discount" class="money">{{item.discount}} <span style="font-size:10px">折</span> </div>
          <p class="tips" v-if="item.leastAmoun > 0">满{{item.leastAmount}}可用</p>
          <p class="tips" v-else>无门槛</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coupon from '@/assets/youhuiquan-unfetched.png'
export default {
  name: 'PageParagraph',
  props: {
    component: {
      type: Object
    }
  },
  data() {
    return {
      coupon: Coupon,
      currentKey: 1,
      list: this.component.action.config
    }
  },
  watch: {
    component: {
      handler() {
        this.list = this.component.action.config
      },
      deep: true
    }
  },
  computed: {
    getStyle() {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        if (item.val) {
          if (item.attr === 'background-image') {
            ret.push(item.attr + ':url(' + item.val + ')')
          } else {
            ret.push(item.attr + ':' + item.val + unit)
          }
        }
      })
      return ret.join(';')
    }
  },
  created() {
    this.$bus.$on('removefenleiclass', ({ index, key }) => {
      if (this.currentKey == key)
        this.switchTab(this.tabs[index - 1])
    })
  },
  methods: {
    switchTab(tab) {
      this.list = tab.children
      this.currentKey = tab.key
    },
    getItemStyle(key) {
      const ret = []
      this.component.others.config.forEach((item) => {
        const isItem = item.attr.indexOf(key)
        const idx = item.attr.indexOf('_')
        if (isItem === 0) {
          const unit = item.unit || ''
          item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
        }
      })
      return ret.join(';')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .comp-content {
    background-repeat: no-repeat;
    padding-bottom: 7px;
  }
  .list-title { 
    padding: 10px 0px 0px 0;
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
    min-height: 100px;
    .page-list-item-img {
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
        background-color: #E5E5E5;
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
        position: relative;
        margin: 0 5px;
        text-align: center;
        width:162px;height:93px;
        border-radius: 6px;
        overflow: hidden;
        .money {
          position: absolute;
          left: 30px;
          color: #F5A90F;
          font-size: 20px;
          font-weight: 900;
          z-index: 100;
          top: 20%;
        }
        .tips {
          position: absolute;
          left: 35px;
          color: #999;
          font-size: 10px;
          font-weight: 900;
          z-index: 100;
          top: 40%;
        }
        .page-list-item__img {
          margin: 0 auto;
          width: 100%;
          height: 100%;
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
          margin-bottom: .3em;
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
