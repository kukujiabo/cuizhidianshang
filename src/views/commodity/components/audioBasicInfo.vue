<template>
  <div class="new">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" required :model="form" label-width="120px">
          <el-form-item prop="title" required label="音频名称：">
            <el-input
              v-model="form.title"
              maxlength="45"
              show-word-limit
              style="width:400px"
              placeholder="请输入视频名称，建议字数在14字以内，不超过45个字"
            />
            <!-- <a class="text-blue" href="javascript:void(0);" style="margin-left:10px">修改</a> -->
          </el-form-item>
          <el-form-item required prop="videoFile" label="音频上传：">
            <el-upload
              multiple
              class="upload-demo"
              accept=".mp3,.m4a"
              :action="Host"
              :auto-upload="false"
              :limit="1"
              :on-change="changeVoice"
            >
              <el-button type="info" plain size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">格式支持mp3、m4a，为保证音频加载与播放流畅性，建议上传大小不超过500M</div>
            </el-upload>
            <!-- <p style="margin:5px 0" v-if="!form.audioFile && oldfile">{{oldfile}}</p> -->
            <el-button style="margin:5px 0" v-if="!form.audioFile && oldfile">{{form.title + '.' + oldfile.split('.')[1]}}</el-button>
          </el-form-item>
          <el-form-item required prop="coverUrl" label="音频封面：">
            <!-- <el-input v-show="false" v-model="form.coverUrl" type="hidden" /> -->
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
          <el-form-item prop="displayContent" label="详情设置：">
            <el-radio-group v-model="form.displayContent">
              <div class="dc-radio-item">
                <el-radio :label="1">购买前查看完成商品详情</el-radio>
              </div>
              <div class="dc-radio-item">
                <el-radio :label="0">购买前仅查看介绍内容</el-radio>
              </div>
              <p style="font-size:12px;color:#a1a1a1">购买后即可查看完整详情，不再显示介绍内容，付费音频可见</p>
            </el-radio-group>
          </el-form-item>
          <el-form-item required prop="content" label="音频详情：">
            <tinymce v-model="form.content" :width="600" :height="300" />
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
          <el-form-item prop="audition" label="片段试听：">
            <div>
              <el-checkbox v-model="form.audition">开启片段试听</el-checkbox>
            </div>
            <p style="font-size:12px;color:#a1a1a1;margin:0">开启后为用户提供一段时间试听，刺激用户购买</p>
            <div>
              <el-card style="width:480px;background-color:#f3f5f7">
                <p style="margin:0">试听设置</p>
                <div class="audio-time">音频前&nbsp;&nbsp;<el-input :disabled="!form.audition" :aria-controls="false" v-model="form.auditionTime" style="width:100px;" size="mini" type="number" />&nbsp;&nbsp;分钟为试听范围 </div>
              </el-card>
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
      .dc-radio-item {
        line-height: 48px;
        height: 35px;
      }
      .audio-time {
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-input--mini {
          .el-input__inner {
            background-color: #fff;
            text-align: center;
          }
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
      fileList: [],
      oldfile: '',
      form: {
        title: '',
        content: '',
        coverUrl: '',
        cover: null,
        allowCopy: 0,
        frontCoverUrl: '',
        frontCover: null,
        displayContent: 1,
        audition: true,
        auditionTime: '',
        audioFile: null
      }
    }
  },
  methods: {
    // 返回表单数据
    getFormData() {
      return this.form
    },
    // 上传视频
    changeVoice(file) {
      this.form.audioFile = file.raw
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
      this.form.frontCoverUrl = data.frontCoverUrl
      this.form.content = data.content
      this.form.coverUrl = data.coverUrl
      this.form.displayContent = data.displayContent
      this.form.audition = data.audition === 1 ? true : false
      this.form.auditionTime = data.auditionTime
      this.oldfile = data.audioFile
      console.log(data)
    }
  }
}
</script>
