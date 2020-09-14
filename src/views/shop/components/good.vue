<template>
  <div class="goods-item-container">
    <img class="goods-img" :src="Host + '/res/' + data.cover">
    <div class="info">
      <p class="title">{{ goodsType[data.cType - 1] }} | {{ data.title }}</p>
      <div class="price-view">
        <p class="price">¥ 99</p>
        <p class="views">312 人浏览</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.goods-item-container {
  width: 165px;
  height: 180px;
  border-radius: 10px;
  .goods-img {
    width: 165px;
    height: 124px;
    border-radius: 10px;
    border: 0;
    background-color: #f3f5f7;
  }
  .info {
    padding: 8px 0;
    .title {
      font-size: 14px;
      font-weight: 900;
      margin: 0;
      width: 165px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
    .price-view {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      .price {
        color: #ff0000;
      }
      .views {
        color: #999;
      }
    }
  }
}
</style>
<script>
import { Host } from '@/config'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      Host,
      goodsType: ['图文', '视频', '直播', '海报', '', '音频']
    }
  },
  methods: {

  }
}
</script>
