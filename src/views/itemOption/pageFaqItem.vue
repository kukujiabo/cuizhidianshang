<template>
  <div>
    <template v-if="items && items.length">
      <div v-for="(item, idx) in items" class="form-list-panel">
        <upload
          :label="'头像' + (idx + 1)"
          :index="idx"
          :item="item"
        />
        <el-form-item class="small" label="昵称：">
          <el-input v-model="item.nickName" :maxlength="32" placeholder="用户昵称" />
        </el-form-item>
        <el-form-item class="small" label="聊天内容：">
          <el-input
            v-model="item.text"
            type="textarea"
            :rows="4"
            placeholder="段落文案"
          />
        </el-form-item>
        <el-form-item class="small" label="本人身份：">
          <el-radio v-model="item.isAuthor" :label="1">是</el-radio>
          <el-radio v-model="item.isAuthor" :label="0">否</el-radio>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="idx !== 0"
            href="javascript:;"
            @click="upInput(idx)"
          ><i class="el-icon-arrow-up" /></a>
          <a
            v-if="idx !== items.length - 1"
            href="javascript:;"
            @click="downInput(idx)"
          ><i class="el-icon-arrow-down" /></a>
          <a
            v-if="idx > 0"
            href="javascript:;"
            @click="delInput(idx)"
          ><i class="el-icon-delete" /></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addInput">添加段落项</el-button>
  </div>
</template>

<script>
import util from '@/utils/util.js'
import compConfig from '@/config/comp.config.js'
import upload from '@/common/navUpload.vue'

export default {
  components: {
    upload
  },
  props: {
    paragraphs: {
      type: Array
    }
  },
  data() {
    return {
      items: this.paragraphs,
      defaultConf: util.copyObj(compConfig['page-paragraph'])
    }
  },
  methods: {
    upInput(idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx - 1, 0, tmp)
    },
    downInput(idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx + 1, 0, tmp)
    },
    delInput(idx) {
      this.items.splice(idx, 1)
    },
    addInput() {
      if (this.items.length <= 20) {
        this.items.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加20个段落项！')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
