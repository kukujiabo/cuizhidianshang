<template>
  <div
    class="search-box"
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <!-- <div class="text-box" v-html="getText"></div> -->
    <div class="text-box">
      <img class="search-icon" src="@/assets/search.png">
      <input class="text-search" placeholder="搜索商品" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseText',
  props: {
    component: {
      type: Object
    }
  },
  computed: {
    getStyle() {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        if (item.val) {
          if (Array.isArray(item.attr)) {
            item.attr.forEach((atr, i) => {
              ret.push(atr + ':' + item.val[i])
            })
          } else if (item.attr === 'background-image') {
            ret.push(item.attr + ':url(' + item.val + ')')
          } else {
            ret.push(item.attr + ':' + item.val + unit)
          }
        }
      })
      return ret.join(';')
    },
    getText() {
      const arr = this.component.base[0].val.split('\n')
      if (arr.length) {
        return arr.join('<br/>')
      }
      return this.component.base[0].val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-box {
    background-color: #fff;
    padding: 10px;
  }
  .comp-content {
    background-repeat: no-repeat;
  }
  .text-box {
    display: block;
    background-color: #f3f5f7;
    height: 36px;
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    .search-icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
    .text-search {
      height: 28px;
      line-height: 28px;
      border: 0;
      background-color: transparent;
      width: 90%;
      outline: transparent;
    }
  }
</style>
