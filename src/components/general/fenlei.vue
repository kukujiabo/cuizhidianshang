<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="list-title">
      <div 
        class="fen-lei-tab"
        :class="{ active: tab.key === currentKey, 'list-title-item-full': tabs.length === 4, 'list-title-item': tabs.length < 4 }"
        :style="tabs.length === 4 ? 'text-align:center' : ''"
        v-for="tab in tabs"
        :key="tab.key"
        @click.prevent="switchTab(tab)"
      >{{tab.label}}</div>
    </div>
    <div :class="component.action.display === 'small' ? 'page-row-list' : 'page-list'">
      <div
        v-for="(item, idx) in list"
        :class=" listClass[component.action.display] "
        :key="idx"
        :style="getItemStyle('horizontal-list-item')"
      >
        <div class="page-list-item__hd">
          <div class="page-list-item__img" :style="{backgroundImage: 'url(' + Host + '/res/' + item.cover + ')'}"></div>
        </div>
        <div class="page-list-item__bd">
          <div class="page-list-item__title" :style="getItemStyle('horizontal-list-title_')">{{ item.title }}</div>
          <p class="page-list-item__desc" :style="getItemStyle('horizontal-list-desc_')">{{ item.putDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Host } from '@/config'
export default {
  name: 'FenLei',
  props: {
    component: {
      type: Object
    }
  },
  data() {
    return {
      Host,
      currentKey: 1,
      tabs: this.component.action.config,
      list: this.component.action.config[0].children,
      listClass: {
        list: 'page-list-item',
        small: 'page-list-item--small',
        large: 'page-list-item--large'
      }
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
      width: 20%;
      color: #666;
      margin-right: 5%;
      text-align: center;
      height: 40px;
    }
    .list-title-item-full {
      font-size: 15px;
      font-weight: 600;
      height: 28px;
      line-height: 28px;
      width: 25%;
      color: #666;
      margin-right: 2%;
      margin-left: 2%;
      text-align: left;
      height: 40px;
      box-sizing: border-box;
    }
    .fen-lei-tab:hover {
      font-size: 16px;
    }
    .active {
      border-bottom: 2px solid #f5a90f;
    }
  }
  .page-row-list {
    background-color: #fff;
    border-top: 0.5px solid #e1e1e1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .page-list-item--small {
      position: relative;
      display: flex;
      flex-direction: column;
      .page-list-item__hd {
        text-align: center;
        width:165px;height:115px;
        margin-bottom: 10px;
        border-radius: 8px;
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
    }
  }
  .page-list {
    background-color: #fff;
    border-top: 0.5px solid #e1e1e1;
    .page-list-item--large {
      position: relative;
      display: flex;
      flex-direction: column;
      .page-list-item__hd {
        text-align: center;
        width:345px;height:200px;
        margin-bottom: 10px;
        border-radius: 8px;
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
    }
    .page-list-item {
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
        margin-right: .8em;
        text-align: center;
        width:140px;height:78px;
        border-radius: 6px;
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
