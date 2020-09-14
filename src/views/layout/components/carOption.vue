<template>
  <div>
    <el-form ref="options-form" :inline="false">
      <el-form-item>
        <el-input v-model="option.pageName"></el-input>
      </el-form-item>
    </el-form>
    <div class="section-line">
      <h2>品牌LOGO</h2>
      <div style="border-top:0.5px solid #e1e1e1">
        <el-form ref="options-form" :inline="true">
          <!-- <h2>品牌LOGO</h2> -->
          <div style="padding: 20px 0;">
            <el-form-item>
              <div class="upload-container">
                <el-upload
                  class="avatar-uploader"
                  :action="Host + '/api/goods/upImgFile'"
                  :show-file-list="false"
                  :on-success="handleBrandAvatarSuccess"
                  :auto-upload="true"
                  :headers="{
                    Authorization: token
                  }"
                >
                  <img v-if="option.brandInfo.logo" :src="option.brandInfo.logo" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="upload-tips">建议上传：图片尺寸1:1，JPG、PNG格式，大 小不超过2M</p>
              </div>
              <!-- <span>建议上传：图片尺寸1:1，JPG、PNG格式，大 小不超过2M</span> -->
            </el-form-item>
          </div>
          <div>
            <el-form-item label="品牌名称">
              <el-input
                style="width:260px"
                placeholder="请输入品牌名称"
                v-model="option.brandInfo.brandName"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item label="品牌介绍">
              <el-input
                style="width:260px"
                placeholder="请输入品牌介绍"
                v-model="option.brandInfo.brandDesc"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div style="border-top:0.5px solid #e1e1e1"></div>
    <div class="section-line">
      <h2>添加商品</h2>
      <div style="padding: 0 25px;">
        <div class="add-goods-list">
          <div class="good-info" v-for="(good, index) in option.goodsList" :key="good.id">
            <div class="type">
              {{goodsType[good.cType - 1]}}
            </div>
            <div class="name">{{good.title}}</div>
            <div class="remove" @click="removeGoods(index)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="new-goods" @click="addGoods">+ 添加商品</div>
      </div>
    </div>
    <div>
      <el-dialog
        id="netImgDialog"
        title="选择商品"
        :close-on-click-modal="false"
        :append-to-body="true"
        :visible.sync="dialogShow"
        width="1240px"
        @close="dialogShow=false"
      >
        <div class="zoom-in">
          <select-goods @cancel="cancelDialog" @goodsselected="selectGoods" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss">
@import "~@/styles/color.scss";
.add-goods-list {
  background-color: #f3f5f7;
  border-radius: 8px;
  padding: 15px;
  border: 0.5px solid #efefef;
  .good-info {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    .type {
      color: $themeBlue;
      width: 20%;
      text-align: center;
    }
    .name {
      width: 66%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
    }
    .remove {
      width: 14%;
      text-align: center;
    }
    .remove:hover {
      cursor: pointer;
    }
  }
}
.new-goods {
  height: 36px;
  line-height: 36;
  margin-top: 20px;
  border: 0.5px solid $themeBlue;
  border-radius: 5px;
  color: $themeBlue;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
}
.upload-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .upload-tips {
    font-size: 12px;
    color: #a1a1a1;
    line-height: 15px;
    margin-left: 10px;
  }
  .avatar-uploader .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
  }
}
</style>
<script>
import { getToken, getTokenType } from "@/utils/auth";
import SelectGoods from "@/common/selectGoods";
import { Host } from "@/config/index";
export default {
  components: {
    SelectGoods,
  },
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      Host,
      dialogShow: false,
      selectedGood: null,
      token: getTokenType() + " " + getToken(),
      goodsType: [ '图文', '视频', '直播', '海报', '', '音频' ]
    };
  },
  methods: {
    addGoods() {
      this.dialogShow = true;
    },
    removeGoods(idx) {
      this.option.goodsList.splice(idx, 1)
    },
    selectGoods({ row }) {
      console.log(row)
      this.selectedGood = row;
    },
    confirm() {
      this.option.goodsList.push(this.selectedGood);
      this.selectedGood = null;
      this.dialogShow = false;
    },
    cancel() {
      this.selectedGood = null;
      this.dialogShow = false;
    },
    cancelDialog() {},
    handleBrandAvatarSuccess({ success, data: { url } }) {
      if (success) {
        this.option.brandInfo.logo = Host + url;
      } else {
        this.$message({
          type: "error",
          message: "上传logo，请联系系统管理员！",
        });
      }
    },
  },
};
</script>