<template>
  <div>
    <div class="section-title">
      <h3>个性化设置</h3>
    </div>
    <div class="section-content">
      <el-form label-width="90px">
        <el-form-item label="按钮文案：">
          <el-radio-group v-model="form.promote_mode">
            <el-radio :label="1">参与推广</el-radio> 
            <el-radio :label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <div>
            <el-input style="width:300px" placeholder="自定义文案" v-model="form.wenan" />
            <p style="color:#a1a1a1;font-size:12px">根据《微信外部链接内容管理规范》，文章不允许有明确提示和暗示金钱奖励的字段，可自定义文字，不超过5个字</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="section-title">
      <h3>推广店铺海报</h3>
    </div>
    <div class="section-content">
      <p>自定义海报，点击可对海报进行编辑，最多添加三张</p>
      <div>
        <div class="up-img" @click="addImage">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div class="ps-dialog">
      <el-dialog width="770px" title="添加海报" :visible.sync="showAddImage">
        <div class="zoom-in">
          <el-row>
            <el-col :span="6">
              <div class="img-container">

              </div>
            </el-col>
            <el-col :span="18">
              <el-form label-width="150px">
                <el-form-item label="自定义背景图片：">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :on-success="uploadSuccess"
                    :limit="1"
                    :show-file-list="false"
                    >
                    <el-button plain size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">建议尺寸750x1334px或9:16， JPG、PNG格式，图片小于1M</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="用户头像昵称：">
                  <el-radio-group v-model="form.promote_mode">
                    <el-radio :label="1">显示</el-radio> 
                    <el-radio :label="2">隐藏</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="昵称文字颜色：">
                  <el-radio-group v-model="form.promote_mode">
                    <el-radio :label="1">黑色</el-radio> 
                    <el-radio :label="2">白色</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="位置自定义：">
                  <el-button>恢复默认位置</el-button>
                  <p>可拖拽头像、昵称、二维码自定义位置</p>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
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
@import '~@/styles/color.scss';
.up-img {
  width: 135px;
  height: 240px;
  border: 1px solid $themeBlue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .el-icon-plus {
    color: $themeBlue;
  }
}

.up-img:hover {
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      showAddImage: false,
      form: {
        wenan: '',
        promote_mode: 1
      }
    }
  },
  methods: {
    cancel() {
      this.showAddImage = false
    },
    addImage() {
      this.showAddImage = true
    },
    uploadSuccess(evt) {

    }
  } 
}
</script>