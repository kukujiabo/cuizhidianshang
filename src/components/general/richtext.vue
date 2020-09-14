<template>
  <div :class="['comp-content', component.active ? 'active' : '']" :style="getStyle">
    <div class="image-box">
      <div class="text-holder" v-html="component.action.config">{{component.action.config}}</div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Richtext',
  props: {
    component: {
      type: Object,
      default: () => ({ 
        style: [], 
        action: { 
          config: ''
        } 
      })
    }
  },
  created() {
    // this.$bus.$on('richtextchange', val => {
    //   this.content = val
    //   console.log(val, this.component.action.config)
    // })
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    getStyle() {
      const ret = []
      this.component.style.forEach(item => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-box {
  position: relative;
  overflow: hidden;
  padding: 10px;
  background-color: #fff;
  .text-holder {
    width: 100%;
    min-height: 150px;
    background-color: #fff;
  }
}
</style>
