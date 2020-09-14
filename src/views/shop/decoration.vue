<template>
  <div class="app-body">
    <div class="shop-options">
      <div class="shop-option-item" @click="switchShopOption(1)">
        <img v-if="shopOptionIndex === 1" src="@/assets/shop.png">
        <img v-else src="@/assets/shop-inactive.png">
        <span :class="shopOptionIndex === 1 ? 'active' : ''">店铺装修</span>
      </div>
      <div class="shop-option-item" @click="switchShopOption(2)">
        <img v-if="shopOptionIndex === 2" src="@/assets/settings.png">
        <img v-else src="@/assets/settings-inactive.png">
        <span :class="shopOptionIndex === 2 ? 'active' : ''">店铺设置</span>
      </div>
    </div>
    <settings v-show="shopOptionIndex === 2" :shop-info="shopInfo" @refreshshop="handleRefreshShop" />
    <designer v-show="shopOptionIndex === 1" :shop-info="shopInfo" />
  </div>
</template>

<script>
import { getShop } from '@/api/shop'
import Designer from '@/views/shop/designer'
import Settings from '@/views/shop/shopSettings'
import { setShopName } from '@/utils/auth'

export default {
  name: 'AppMain',
  components: {
    Settings,
    Designer
  },
  props: {
    shopInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      shopId: '',
      shopOptionIndex: 1
      // shopInfo: {}
    }
  },
  created() {
    // this.shopId = this.$route.params.id
    // this.getShopDetail(this.shopId)
  },
  methods: {
    switchShopOption(index) {
      this.shopOptionIndex = index
    },
    handleRefreshShop() {
      this.$emit('refreshshop')
    }
  }
}
</script>
