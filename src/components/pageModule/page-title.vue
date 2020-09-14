<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="page-title">
      <div class="image-title">
        <div>
          <img src="@/assets/logo.png">
        </div>
        <div>
        <h3 :style="getH3Style">渔燕公众号</h3>
        <p v-if="component.base[1].val" :style="getPStyle">关注公众号</p>
        </div>
      </div>
      <el-button style="width:66px;font-size:12px;line-height:24px;height:24px">关注</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageTitle',
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
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      },
      getH3Style() {
        const ret = []
        this.component.others.config.forEach((item, idx) => {
          const unit = item.unit || ''
          if (item.val && idx < 4) {
            if (Array.isArray(item.attr)) {
              item.attr.forEach((atr, i) => {
                ret.push(atr + ':' + item.val[i])
              })
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      },
      getPStyle() {
        const ret = []
        this.component.others.config.forEach((item, idx) => {
          const unit = item.unit || ''
          if (item.val && idx > 3) {
            if (Array.isArray(item.attr)) {
              item.attr.forEach((atr, i) => {
                ret.push(atr + ':' + item.val[i])
              })
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
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
  .page-title {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .image-title {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
      }
    }
    .el-button {
      color: #F5A90F;
      border-radius: 20px;
      border: 1px solid #F5A90F;
    }
    * {
      margin: 0;
      padding: 0;
      line-height: 1;
    }

    > h3 {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
