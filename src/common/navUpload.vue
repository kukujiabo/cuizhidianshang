<template>
  <div class="el-form-item small el-form-item--mini picker-dialog">
    <div class="el-form-item__content">
      <div class="upload-container">
        <div class="el-upload el-upload--text">
          <div class="el-upload-dragger" @click.prevent="showMaterialDialog()">
            <i class="el-icon-upload"></i>
            <div
              v-if="item.val"
              class="image-preview"
              :class="{ circle: shape === 2 }"
              :style="{ backgroundImage: 'url(' + item.val + ')' }"
            >
            </div>
            <div class="el-upload__text">
              <em>
                <a href="javascript:;">修改</a>
              </em>
            </div>
          </div>
          <div class="upload-attrs">
            <el-form size="mini" label-width="54px" label-position="left">
              <el-form-item label="标题">
                <el-input v-model="item.title" placeholder="选填" />
              </el-form-item>
              <el-form-item label="跳转链接">
                <el-dropdown @command="emitCommend">
                  <span class="el-dropdown-link jump-page-select">
                    <span class="jump-page-tips">{{item.selectedPage}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="group">商品分组</el-dropdown-item>
                    <el-dropdown-item v-if="optionType === 'grid-menu-item'" command="order">我的已购</el-dropdown-item>
                    <el-dropdown-item v-else command="list">实物商品</el-dropdown-item>
                    <el-dropdown-item command="sharecenter">推广中心</el-dropdown-item>
                    <el-dropdown-item command="shareposter">海报分享</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </el-form>
          </div>
          <!-- <input @change="upload" type="file" name="photoImg" class="upload-input" /> -->
        </div>
        <i class="el-icon-error" @click.stop="remove(item)"></i>
      </div>
    </div>
    <div>
      <el-dialog
        id="netImgDialog"
        :title="commend === 'list' ? '选择商品' : '选择分组' "
        :close-on-click-modal="false"
        :append-to-body="true"
        :visible.sync="dialogShow"
        width="1240px"
        @close="dialogShow=false"
      >
        <div v-if="optionType === 1" class="zoom-in">
          <select-goods v-if="commend === 'list'" @cancel="cancelDialog" @goodsselected="selectGoods" />
          <select-group v-if="commend === 'group'" @cancel="cancelDialog" @groupselected="selectGroup" />
        </div>
        <div v-if="optionType === 2" class="zoom-in">
          <select-material @cancel="cancelDialog" @materialselected="selectMateiral" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SelectMaterial from "@/common/selectMateiral"
import SelectGoods from "@/common/selectGoods"
import SelectGroup from '@/common/selectGroup'
import SelectByGroup from '@/common/selectByGroup'
import { getMaterialList } from "@/api/material"
import { Host } from "@/config"

const goodsDetailPage = [
  '/otherPage/pages/productInfo', // 图文
  '/otherPage/pages/videoInfo', // 视频
  '', // 直播
  '', // 手机海报
  '', // 
  '/otherPage/pages/musicInfo', // 音频
]

export default {
  name: "Upload",
  components: {
    SelectGroup,
    SelectGoods,
    SelectByGroup,
    SelectMaterial,
  },
  data() {
    return {
      Host: Host,
      optionType: 1,
      commend: 'list',
      searchPicName: "",
      currentTab: "goods",
      imgUrl: "",
      dialogShow: false,
      tableData: [],
      imgList: [],
      selectedRow: {},
      selectedCls: {},
      selectedGroups: [],
      selectedType: 0
    };
  },
  props: {
    label: {
      type: String,
    },
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
    },
    shape: {
      type: Number,
      default: 1
    },
    optionType: {
      type: String,
      default: ''
    }
  },
  created() {

  },
  methods: {
    cancel() {
      this.dialogShow = false
    },
    remove() {
      this.$emit('removeitem', this.index)
    }, 
    selectGroup(groups) {
      this.selectedType = 3
      this.selectedGroups = groups
    },
    showMaterialDialog() {
      this.dialogShow = true
      this.optionType = 2
    },
    showGoodsDialog() {
      this.dialogShow = true
      this.optionType = 1
    },
    // 选中商品
    selectGoods({ row, cls }) {
      this.selectedType = 1
      this.selectedRow = row
      this.selectedCls = cls
    },
    // 选中素材
    selectMateiral({ row, cls }) {
      this.selectedType = 2
      this.selectedRow = row
      this.selectedCls = cls
    },
    confirm() {
      if (this.optionType === 1) { 
        // 选择商品
        if (this.selectedType === 1) {
          // 商品详情
          const row = this.selectedRow
          const cls = this.selectedCls
          this.item.link = goodsDetailPage[row.cType - 1] + '?id=' + row.id
          this.item.selectedPage = '商品：' + row.title
          this.dialogShow = false
        } else if (this.selectedType === 3) {
          // 选择分组
          if (this.selectedGroups.length === 0) {
            this.$message({ type: 'warning', message: '请至少选择一个分组！' })
            return
          }
          this.item.link = '/otherPage/pages/productGroup'
          this.item.groups = []
          this.item.groups = this.selectedGroups.map(g => ({ id: g.id, title: g.title }) )
          this.selectedGroups = []
          this.item.selectedPage = '商品分组'
          this.dialogShow = false
        } else {
          this.$message({ type: 'error', message: '没有选择任何选项！' })
        }
      } else {
        const row = this.selectedRow
        this.item.val = Host + "/res/" + row.src
        this.dialogShow = false
      }
    },
    // 触发命令
    emitCommend(evt) {
      this.optionType = 1
      this.commend = evt
      switch (evt) {
        case "group":
        case "list":
          this.dialogShow = true
          break
        case "sharecenter":
          this.item.link = '/personPage/pages/extendCenter'
          this.item.selectedPage = '推广中心'
          break
        case "shareposter":
          this.item.link = '/otherPage/pages/sharePaper'
          this.item.selectedPage = '海报分享'
          break
        case "order":
          this.item.link = '/personPage/pages/order'
          this.item.selectedPage = '我的已购'
          break
      }
    },
    // 取消选择
    cancelDialog() {
      this.item.val = "";
      this.item.ty = "";
      this.item.id = "";
      this.item.cls = 0;
      this.dialogShow = false;
    },
    switchTab(evt) {},
    handleClick(row) {
      console.log(row);
    },
    async searchImage() {
      if (!this.searchPicName) {
        this.$message({
          type: "error",
          message: "图片名称必须输入",
        });
        return;
      }
      try {
        const query = {
          rType: 1,
          searchOfFileName: this.searchPicName,
          start: 1,
          limit: 100,
        };
        const {
          data: { list },
        } = await getMaterialList(query);
        this.imgList = list;
      } catch (error) {
        this.$message({ type: "error", message: "系统错误，请联系管理员！" });
      }
    },
    setImgUrl() {
      try {
        const img = new Image();
        img.onload = () => {
          let invalide = true;
          if (this.item.hasOwnProperty("limit")) {
            if (img.naturalWidth !== this.item.limit.w) {
              invalide = false;
              this.$alert("图片宽度必须为 " + this.item.limit.w + "px", "提示");
            }
            if (img.naturalHeight !== this.item.limit.h) {
              invalide = false;
              this.$alert("图片高度必须为 " + this.item.limit.h + "px", "提示");
            }
          } else {
            if (img.naturalWidth > 750) {
              invalide = false;
              this.$alert("图片宽度不能超过750px", "提示");
            }
          }
          if (invalide) {
            const width = 750;
            const height =
              img.naturalHeight * (750 / img.naturalWidth).toFixed(4);
            this.item.width = width;
            this.item.height = height;
            this.item.val = img.src;
            this.dialogShow = false;
            this.$emit("uploadSuccess", this.item, img, this.index);
          }
        };
        img.src = this.imgUrl;
      } catch (e) {
        console.warn(e);
      }
    },
    delImg(item) {
      item.val = "";
    },
    clickTab(tab) {
      this.currentTab = tab.name;
    },
  },
};
</script>

<style lang="scss" scoped>
#netImgDialog {
  .el-dialog__body {
    padding-top: 10px;
  }
}

.upload-container {
  display: flex;
  flex-direction: row;
  position: relative;
  .el-icon-error {
    position: absolute;
    right: -15px;
    top: -5px;
    color: #a1a1a1;
    cursor: pointer;
  }
  .upload-tips {
    display: block;
    font-size: 12px;
    line-height: 1.5;
    padding: 5px;
    color: #666;

    h3 {
      margin: 0;
    }
  }
}
.el-upload {
  display: flex;
  flex-direction: row;
  .el-upload-dragger {
    width: 90px !important;
    height: 90px !important;
    border-radius: 6px 0 0 6px;
    background-color: #f3f5f7;
    .el-icon-upload {
      margin: 10px 0 0 0;
      font-size: 40px;
    }
    .el-upload__text {
      font-size: 12px;
      background-color: #000;
      opacity: 0.5;
      a {
        color: #fff !important;
      }
    }
  }
  .upload-attrs {
    box-sizing: border-box;
    padding: 10px;
    height: 90px;
    flex: 1;
    .el-form {
      padding-bottom: 0;
      .el-form-item--mini {
        margin-bottom: 6px;
      }
    }
  }
}
.circle {
  border-radius: 50%;
}
.image-preview {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ecf5ff;

  .fa-window-close {
    position: absolute;
    top: 0;
    right: 0;
    color: #666;
    font-size: 22px;
    z-index: 99;
  }
}

.upload-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 150px;
  height: 115px;
  cursor: pointer;
}
.el-dialog__wrapper {
  .el-dialog {
    margin-top: 8vh !important;
    .el-dialog__body {
      padding-left: 0;
      padding-right: 0;
    }
    .el-dialog__footer {
      padding: 20px 0;
      text-align: center;
    }
  }
}
.zoom-in {
  background-color: #f3f5f7;
  padding: 20px;
}
.jump-page-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  .jump-page-tips {
    font-size: 12px;
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
}
</style>
