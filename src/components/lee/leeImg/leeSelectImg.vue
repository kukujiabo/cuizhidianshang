<!--
 * @Author: lee
 * @Date: 2020-07-17 12:08:45
 * @LastEditors: lee
 * @LastEditTime: 2020-07-17 14:05:05
 * @Description: 选择图片组件，就是右上角有个斜角勾勾的
-->
<template>
  <div :class="value===label? 'selectImg active':'selectImg'" @click="onClick(label)">
    <img class="selected-icon" :style="'width: '+iconSize+'px;height: '+iconSize+'px'" src="@/components/lee/assets/icon_selected.svg">
    <img class="img" :style="'width: '+width+'px;height: '+height+'px'" :src="src">
  </div>
</template>
<style lang="scss">
  @import "~@/components/lee/style/lee.scss";
</style>
<script>
export default {
  props: {
    // 绑定值
    value: {
      type: Number,
      default: null
    },
    // 选择后的返回值
    label: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 12
    },
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 71
    }
  },
  data() {
    return {
      active: false
    }
  },
  // 监听
  watch: {
  },
  created() {
  },
  methods: {
    // 单选发生变化时
    onClick(val) {
      if (this.value === val) {
        this.$emit('input', null)
      } else {
        this.$emit('input', val)
      }
    }
  }
}
</script>
