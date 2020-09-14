<template>
  <div class="message-container">
    <p class="title">{{ data.title }}</p><p /><p class="content">{{ data.content }}</p>
    <div class="bottom">
      <span class="time">{{ data.time }}</span>
      <el-button v-if="data.btnText" round type="warning" plain size="mini">{{ data.btnText }}</el-button>
    </div>
  </div>
</template>
<style lang="scss">
.message-container {
  background-color: #fff;
  padding: 5px 15px 15px 15px;
  border-radius: 6px;
  box-shadow: 0 0 12px #ccc;
  .title {
    font-weight: 900;
    font-size: 16px;
    color: #000;
  }
  .content {
    line-height: 24px;
    font-size: 14px;
    color: #666666;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .time {
      font-size: 12px;
      color: #a1a1a1;
    }
  }
}
</style>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
        time: '',
        btnText: ''
      })
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
