<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="list-title">
      <span>直播</span>
      <div class="see-all">
        <span style="font-size:12px;color:#a1a1a1">查看全部</span>
        <img class="right-icon" src="@/assets/right.png">
      </div>
    </div>
    <div class="page-list">
      <div v-for="(item, idx) in list" class="page-list-item" :key="idx" :style="getItemStyle('horizontal-list-item')">
        <div class="page-list-item__hd" style="width:140px;height:78px;">
          <div class="page-list-item__img" :style="{backgroundImage: 'url(' + item.val + ')'}"></div>
        </div>
        <div class="page-list-item__bd">
          <div class="page-list-item__title" :style="getItemStyle('horizontal-list-title_')">{{ item.title }}</div>
          <p class="page-list-item__desc" :style="getItemStyle('horizontal-list-desc_')">{{ item.desc }}</p>
          <div class="page-list-item__time">
            <span style="font-size:12px;color:#a1a1a1">2020.5.11</span>
            <el-button size="mini">即将开始</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalList',
  props: {
    component: {
      type: Object
    }
  },
  data() {
    return {
      list: this.component.action.config
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
  methods: {
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
  }
  .list-title {
    padding: 15px 0px 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .see-all {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      .right-icon {
        width: 17px;
        height: 17px;
      }
    }
  }
  .page-list {
    background-color: #fff;

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
        justify-content: space-between;
        .page-list-item__title {
          margin-bottom: .3em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          word-wrap: break-word;
          word-break: break-all;
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
