<template>
  <el-row class="app-toolbar">
    <el-col :span="12">
      <div class="pages">
        <div
          v-for="tabbar in tabbars"
          :key="tabbar.key"
          :class="currentKey === tabbar.key ? 'active' : ''"
          class="page-nav"
          @click="switchPage(tabbar)"
        >
          <span>{{ tabbar.title }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="12" />
  </el-row>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    tabbars: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentKey: ''
    }
  },
  created() {
    this.currentKey = this.tabbars[0].key
  },
  methods: {
    showPageSet() {
      this.$emit('showPageSet')
    },
    showPreview() {
      this.$emit('showPreview')
    },
    saveAll() {
      this.$emit('savePageSet')
    },
    switchPage(tabbar) {
      this.currentKey = tabbar.key
      console.log(this.currentKey)
      this.$emit('switchPage', this.currentKey)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-toolbar {
    position: relative;
    height: 80px;
    line-height: 78px;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    background-color: #F4F4F9;
    .pages {
      display: flex;
      flex-direction: row;
      .page-nav {
        width: 150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #a1a1a1;
      }
      .page-nav:hover {
        cursor: pointer;
      }
      .active {
        background-color: #fff;
        color: #000;
        font-weight: 900;
      }
    }

    > :last-child {
      text-align: right;
    }

    .bar-btn {
      display: inline-block;
      white-space: nowrap;
      padding: 0 16px;
      font-size: 14px;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      cursor: pointer;

      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
</style>
