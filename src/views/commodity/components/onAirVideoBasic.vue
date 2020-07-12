<template>
  <div class="new">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item required prop="title" label="直播名称：">
            <el-input
              v-model="form.title"
              maxlength="45"
              show-word-limit
              placeholder="请输入图文名称，建议字数在14字以内，不超过45个字"
            />
            <a class="text-blue" href="javascript:void(0);" style="margin-left:10px">修改</a>
          </el-form-item>
          <el-form-item required prop="introduc" label="直播简介：" style="height:110px;">
            <el-input
              v-model="form.introduc"
              type="textarea"
              placeholder="请填写直播简介"
              :rows="4"
            />
          </el-form-item>
          <el-form-item required label="直播时间：">
            <div>
              开始时间：<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="form.tvBeginTime" style="width:240px;" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              直播时长：<el-select v-model="form.tvDuration" style="width:240px;">
                <el-option :value="1" :label="1">1小时</el-option>
                <el-option :value="1.5" :label="1.5">1.5小时</el-option>
                <el-option :value="2" :label="2">2小时</el-option>
                <el-option :value="2.5" :label="2.5">2.5小时</el-option>
              </el-select>
            </div>
            <p style="font-size:12px;color:#a1a1a1;">直播主持人可以在直播间操作主动结束直播</p>
          </el-form-item>
          <el-form-item required prop="cover" label="详情封面：">
            <el-input v-show="false" v-model="form.cover" type="hidden" />
            <div>
              <img v-if="form.coverUrl" class="cover-image" :src="form.coverUrl">
              <img v-else class="cover-image">
            </div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-change="changeCover"
            >
              <el-button type="info" plain size="small">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">建议上传750*560或4:3，JPG、PNG格式，图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item required prop="warmCover" label="直播现场图：">
            <el-input v-show="false" v-model="form.warmCover" type="hidden" />
            <div>
              <img v-if="form.warmCoverUrl" class="cover-image" :src="form.warmCoverUrl">
              <img v-else class="cover-image">
            </div>
            <el-upload
              class="upload-demo"
              multiple
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-change="changeWarmCover"
            >
              <el-button type="info" plain size="small">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">建议上传750*560或4:3，JPG、PNG格式，图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item required prop="giveCover" label="直播宣传封面：">
            <el-input v-show="false" v-model="form.cover" type="hidden" />
            <div>
              <img v-if="form.giveCoverUrl" class="cover-image" :src="form.giveCoverUrl">
              <img v-else class="cover-image">
            </div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-change="changeGiveCover"
            >
              <el-button type="info" plain size="small">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">建议上传750*560或4:3，JPG、PNG格式，图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content" label="直播详情：">
            <div class="flex flex-row">
              <tinymce v-model="form.content" :width="600" :height="300" />
              <div style="margin-left:20px;">
                <el-button type="info" plain style="margin">预览</el-button>
              </div>
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
      .el-form-item__label {
        height: 40px;
        line-height: 40px;
      }
      .el-textarea {
        width: 580px;
      }
        .el-select--medium {
          .el-input--medium {
            width: 240px;
          }
        }
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
import Tinymce from '@/components/Tinymce';

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      content: '',
      fileList: [],
      form: {
        title: '',
        content: '',
        introduc: '',
        tvDuration: 1,
        tvBeginTime: '',
        cover: null,
        coverUrl: '',
        warmCover: null,
        warmCoverUrl: '',
        giveCover: null,
        giveCoverUrl: ''
      }
    }
  },
  methods: {
    getFormData() {
      return this.form
    },
    changeCover(evt) {
      this.form.cover = evt.raw
      this.form.coverUrl = URL.createObjectURL(evt.raw)
    },
    changeWarmCover(evt) {
      this.form.warmCover = evt.raw
      this.form.warmCoverUrl = URL.createObjectURL(evt.raw)
    },
    changeGiveCover(evt) {
      this.form.giveCover = evt.raw
      this.form.giveCoverUrl = URL.createObjectURL(evt.raw)
    }
  }
}
</script>
