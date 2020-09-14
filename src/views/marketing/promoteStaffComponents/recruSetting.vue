<template>
  <div>
    <div class="section-title">
      <h3>推广达人招募</h3>
    </div>
    <div class="section-content">
      <el-form :inline="true">
        <div>
          <el-form-item label="链接地址：">
            <el-input v-model="form.link" style="width:600px" />
            &nbsp;&nbsp;<el-button type="text">复制链接</el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="页面标题：">
            <el-input v-model="form.title" style="width:600px" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="描述详情：">
            <p style="color:red;margin: 0">*为了降低被微信警告或禁用的风险，建议使用模版文案或长图</p>
            <div class="rich-text-container" style="padding: 10px 0">
              <tinymce v-model="form.content" :width="800" :height="600" />
              <div style="margin-left:20px">
                <div>
                  <el-button>预览</el-button>
                </div>
                <div>
                  <el-button type="text" @click="openTemplate">查看模版</el-button>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="ps-dialog">
      <el-dialog width="770px" title="查看模版" :visible.sync="showTemplate">
        <div class="zoom-in">
          <div class="tmp" v-html="form.content"></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确定上传</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss">
.rich-text-container {
  display: flex;
  flex-direction: row;
}
.tmp {
  width: 100%;
  height: 600px;
  overflow: scroll;
}
</style>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      showTemplate: false,
      form: {
        link: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    openTemplate() {
      this.showTemplate = true
    }
  }
}
</script>