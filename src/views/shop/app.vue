<template>
  <div id="appx" class="app-wrapper">
    <app-header :shop-info="shopInfo" @changeshop="handleChangeShop" />
    <app-body :shop-info="shopInfo" @refreshshop="handleRefreshShop" />
  </div>
</template>

<script>
import appHeader from '@/views/layout/header.vue'
import appBody from '@/views/shop/decoration.vue'
import { getShop, getAllShop } from '@/api/shop'
import { setAppId, setShopName, setShopId } from '@/utils/auth'
export default {
  name: 'App',
  components: {
    appHeader,
    appBody
  },
  data() {
    return {
      shopId: '',
      shopInfo: {},
      shopOptionIndex: 1
    }
  },
  created() {
    this.shopId = this.$route.params.id
    this.getShop()
    this.getAllShop()
  },
  methods: {
    async getAllShop() {
      try {
        const { data } = await getAllShop({})
        this.$store.dispatch('shop/setAllShop', data)
      } catch (error) {
        console.log(error)
      }
    },
    async getShop() {
      try {
        const { data } = await getShop({ shopId: this.shopId })
        this.shopInfo = data
        setAppId(data.appId)
        setShopName(data.name)
        setShopId(data.id)
        setTimeout(_ => {
          this.$bus.$emit('shopinfosync')
        }, 0)
      } catch (error) {
        console.log(error)
      }
    },
    handleChangeShop(id) {
      this.shopId = id
      // this.getShop()
      window.location.reload()
    },
    handleRefreshShop() {
      this.getShop()
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  #appx {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    min-width: 1000px;

    .app-body {
      display: flex;
      position: absolute;
      top: 80px;
      bottom: 0;
      width: 100%;
    }
    .shop-options {
      width: 110px;
      height: 100%;
      background-color: #111B37;
      .shop-option-item {
        width: 110px;
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
        }
        span {
          margin-top: 10px;
          color: #e6e6e6;
          font-weight: 900;
        }
        span.active {
          color: #FFF;
        }
      }
      .shop-option-item:hover {
        cursor: pointer;
      }
    }
  }
</style>
