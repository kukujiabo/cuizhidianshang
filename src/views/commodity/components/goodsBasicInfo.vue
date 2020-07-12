<template>
  <div class="new">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" required :model="form" label-width="120px">
          <el-form-item required prop="title" label="图文名称：">
            <el-input
              v-model="form.title"
              maxlength="45"
              show-word-limit
              placeholder="请输入图文名称，建议字数在14字以内，不超过45个字"
            />
            <a class="text-blue" href="javascript:void(0);" style="margin-left:10px">修改</a>
          </el-form-item>
          <el-form-item required prop="cover" label="封面图片：">
            <el-input v-show="false" v-model="form.cover" type="hidden" />
            <div>
              <img v-if="form.cover" class="cover-image" :src="form.cover">
              <img v-else class="cover-image" src="@/assets/emptyimageholder.jpg">
            </div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :show-file-list="false"
              :limit="1"
              :file-list="fileList"
              :on-change="changeFile"
            >
              <el-button type="info" plain size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">建议上传750*560或4:3，JPG、PNG格式，图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content" label="图文详情：">
            <tinymce
              ref="formContent"
              v-model="form.content"
              :width="600"
              :height="300"
            />
          </el-form-item>
          <el-form-item prop="allowCopy" label="文字仿复制：">
            <div style="padding-top:10px">
              <el-radio-group v-model="form.allowCopy">
                <div class="radio-item">
                  <el-radio :label="0">允许复制</el-radio>
                  <p>课程的文字内容允许复制，图片点击放大和长按识别二维码功能允许使用</p>
                </div>
                <div class="radio-item">
                  <el-radio :label="1">材料</el-radio>
                  <p>课程的文字内容禁止复制，图片点击放大和长按识别二维码功能不允许使用</p>
                </div>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.new {
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    padding: 15px 10px;
    .el-form-item {
      min-height: 50px;
      .el-input--medium {
        width: 580px;
        height: 40px;
        background-color: $lightBackground;
        border-radius: 5px;
        .el-input__inner {
          border: 0;
          height: 40px;
          line-height: 20px;
          background: transparent;
        }
        .el-input__count-inner {
          background: transparent !important;
        }
      }
      .cover-image {
        width: 190px;
        height: 100px;
        background-color: $lightBackground;
        margin-bottom: 10px;
        border: 0 !important;
        @include radius(5px);
      }
      .radio-item {
        width: 500px;
        p {
          font-size: 13px !important;
          color: #a1a1a1 !important;
          height: 50px !important;
          line-height: 30px !important;
          margin: 0 !important;
        }
      }
    }
  }
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
      imgUrl: '',
      uploadUrl: '',
      imageUrl: '',
      content: '',
      fileList: [],
      form: {
        cover: '',
        title: '',
        content: '',
        allowCopy: 0,
        coverFile: null
      }
    }
  },
  created() {
    // this.uploadUrl = ''
  },
  methods: {
    changeFile(file) {
      this.form.coverFile = file.raw
      this.form.cover = URL.createObjectURL(file.raw)
    },
    getFormData() {
      return this.form
    }
  }
}
</script>
