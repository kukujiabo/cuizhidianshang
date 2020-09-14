<template>
  <div class="new">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" required :model="form" label-width="120px">
          <el-form-item prop="title" label="视频名称：">
            <el-input
              v-model="form.title"
              maxlength="45"
              show-word-limit
              style="width:400px"
              placeholder="请输入视频名称，建议字数在14字以内，不超过45个字"
            />
            <!-- <a class="text-blue" href="javascript:void(0);" style="margin-left:10px">修改</a> -->
          </el-form-item>
          <el-form-item required prop="videoFile" label="视频上传：">
            <div style="width:400px">
              <el-upload
                multiple
                class="upload-demo"
                :action="Host"
                accept=".mp4,.wmv,.avi"
                :auto-upload="false"
                :limit="1"
                :on-change="changeVideo"
              >
                <el-button type="info" plain size="small">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">支持.mp4, .wmv, .avi格式的视频</div>
              </el-upload>
              <el-button style="margin:5px 0" v-if="!form.videoFile && oldfile">{{form.title + '.' + oldfile.split('.')[1]}}</el-button>
            </div>
          </el-form-item>
          <el-form-item required prop="cover" label="视频封面：">
            <!-- <el-input v-show="false" v-model="form.cover" type="hidden" /> -->
            <div>
              <img v-if="form.coverUrl" class="cover-image" :src="form.coverUrl">
              <img v-else class="cover-image" src="@/assets/emptyimageholder.jpg">
            </div>
            <el-upload
              multiple
              class="upload-demo"
              accept="image/*"
              :action="Host"
              :auto-upload="false"
              :limit="1"
              :on-change="changeCover"
            >
              <el-button type="info" plain size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">视频封面是指商品列表展示的图片，建议上传750*560px或4:3，JPG、PNG、格式；图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="cover" label="图视频贴片：">
            <el-input v-show="false" v-model="form.cover" type="hidden" />
            <div>
              <img v-if="form.frontCoverUrl" class="cover-image" :src="form.frontCoverUrl">
              <img v-else class="cover-image" src="@/assets/emptyimageholder.jpg">
            </div>
            <el-upload
              multiple
              class="upload-demo"
              accept="image/*"
              :action="Host"
              :auto-upload="false"
              :limit="1"
              :on-change="changeFrontCover"
            >
              <el-button type="info" plain size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">视频贴片是指视频播放器在播放前展示的图片，建议上传750*560或4:3，JPG、PNG格式，图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content" label="视频详情：">
            <tinymce
              v-model="form.content"
              :width="600"
              :height="300"
            />
          </el-form-item>
          <el-form-item prop="allowCopy" label="文字防复制：">
            <div style="padding-top:10px">
              <el-radio-group v-model="form.allowCopy">
                <div class="radio-item">
                  <el-radio :label="0">允许复制</el-radio>
                  <p>课程的文字内容允许复制，图片点击放大和长按识别二维码功能允许使用</p>
                </div>
                <div class="radio-item">
                  <el-radio :label="1">禁止复制</el-radio>
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
    width: 800px;
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
import { Host } from '@/config'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      Host,
      content: '',
      oldfile: '',
      fileList: [],
      form: {
        title: '',
        content: '',
        introduc: '',
        coverUrl: '',
        cover: null,
        allowCopy: 0,
        videoNetSrc: '',
        frontCoverUrl: '',
        frontCover: null,
        videoFile: null
      }
    }
  },
  methods: {
    // 返回表单数据
    getFormData() {
      return this.form
    },
    // 上传视频
    changeVideo(file) {
      this.form.videoFile = file.raw
    },
    // 上传封面
    changeCover(file) {
      this.form.cover = file.raw
      this.form.coverUrl = URL.createObjectURL(file.raw)
    },
    // 上传贴图
    changeFrontCover(file) {
      this.form.frontCover = file.raw
      this.form.frontCoverUrl = URL.createObjectURL(file.raw)
    },
    // 设置数据
    setData(data) {
      this.form.title = data.title
      this.form.content = data.content
      this.form.coverUrl = data.coverUrl
      this.form.allowCopy = data.allowCopy
      this.form.videoNetSrc = data.videoNetSrc
      this.form.frontCoverUrl = data.frontCoverUrl
      this.oldfile = '20200805/7b6cb3f4a5314930805ecee1b7e7148a.mp4'
    } 
  }
}
</script>
