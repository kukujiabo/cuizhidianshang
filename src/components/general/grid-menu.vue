<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
    style="background:#fff"
  >
    <ul class="grid-menu">
      <li
        v-for="item in items"
        :key="item.text"
        :style="getItemStyle"
        class="grid-menu-item"
      >
        <img class="circle" v-if="item.val" :src="item.val">
        <div v-else class="image-placeholder">
          <i class="fa fa-circle" />
        </div>
        <span v-if="item.title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GridMenu',
  props: {
    component: {
      type: Object
    }
  },
  data() {
    return {
      action: this.component.action,
      items: this.component.action.config
    }
  },
  computed: {
    getStyle() {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    },
    getItemStyle() {
      // const column = parseInt(this.component.base[0].val)
      // const num = this.items.length > column ? 100 / column : 100 / this.items.length
      return 'width:' + (this.action.num === 3 ? 33.3 : 25) + '%;'
    }
  },
  watch: {
    component: {
      handler() {
        this.items = this.component.action.config
        this.action = this.component.action
      },
      deep: true
    }
  },
  created() {
    
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .grid-menu {
    position: relative;
    margin: 0;
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    .grid-menu-item {
      display: inline-block;
      margin-top: 15px;
      vertical-align: top;
      text-align: center;
      font-size: 0;
      text-decoration: none;
      list-style-type: none;

      .circle {
        border-radius: 50%;
      }

      > .image-placeholder {
        margin: 0 auto;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;

        > .fa {
          color: #83c0ff;
          font-size: 40px;
          vertical-align: middle;
        }
      }

      > img {
        display: block;
        margin: 0 auto;
        width: 40px;
        height: 40px;
      }
      > span {
        display: block;
        margin: 10px auto 0 auto;
        font-size: 12px;
        color: #0a1b2b;
      }
    }
  }
</style>
