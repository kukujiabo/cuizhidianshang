<template>
  <div class="select-material">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="groups">
            <h3 style="margin:8px 0">图片分组</h3>
            <div class="groups-list">
              <el-tree 
                :props="defaultProps"
                :data="clsList"
                @node-click="nodeClick"
              >
              </el-tree>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <div class="search-img">
          <el-input
            v-model="listQuery.searchOfFileName"
            class="input-with-select"
            placeholder="搜索名称"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchImage" />
          </el-input>
        </div>
        <div class="img-grid">
          <div
            class="img-grid-item"
            v-for="img in imgList"
            :key="img.id"
            >
            <i v-if="selected.Id == img.Id" class="select-icon el-icon-success"></i>
            <img
              :src="Host + '/res/' + img.src"
              @click="handleClick(img)"
              />
          </div>
          <p v-if="imgList.length === 0">没有数据</p>
        </div>
        <div style="padding: 10px 0;text-align:right">
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="listQuery.limit"
            :total="listTotal"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="setImgUrl">确 定</el-button>
    </div> -->
  </div>
</template>
<style lang="scss">
@import "~@/styles/color.scss";
.select-material {
  .search-img {
    text-align: right;
  }
  .cls {
    color: #333;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .cls-item {
      display: inline-block;
      font-size: 16px;
      margin-right: 40px;
      padding: 10px 0;
      // border-bottom: 2px solid $themeBlue;
      cursor: pointer;
    }
    .active {
      font-weight: 900;
      color: $themeBlue;
    }
  }
  .groups {
    height: 500px;
    .groups-list {
      padding: 20px 20px 0 0;
    }
  }
  .dialog-footer {
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-top: 0.5px solid #e1e1e1;
  }
  .img-grid {
    height: 480px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    .img-grid-item {
      margin: 8px;
      width: 90px;
      height: 90px;
      position: relative;
      img {
        width: 90px;
        height: 90px;
        border-radius: 8px;
      }
      .select-icon {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        color: $themeBlue;
        z-index: 1000;
      }
    }
    .img-grid-item:hover {
      cursor: pointer;
    }
  }
}
</style>
<script>
import { getMaterialList, getMaterialClass } from "@/api/material";
import { Host } from "@/config";
export default {
  data() {
    return {
      Host: Host,
      clsList: [],
      searchPicName: "",
      imgUrl: "",
      imgList: [],
      activeCls: 1,
      listTotal: 0,
      selected: { Id: '' },
      listQuery: {
        searchOfFileName: "",
        clsId: 0,
        rType: 1,
        start: 1,
        limit: 20,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getMaterialClass(1);
    this.getMaterialList(1);
  },
  methods: {
    nodeClick(node) {
      this.listQuery.clsId = node.id;
      this.getMaterialList(this.activeCls);
    },
    // 取消选择
    cancel() {
      this.$confirm("确认取消选择？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then((_) => {
        this.$emit("cancel");
      });
    },
    // 查询素材分类
    async getMaterialClass(rType) {
      try {
        const { data } = await getMaterialClass({ rType });
        this.clsList = data;
        this.clsList.unshift({ id: 0, title: "全部" });
      } catch (error) {
        console.log(error);
      }
    },
    // 查询素材列表
    async getMaterialList(rType) {
      try {
        this.listQuery.rType = rType;
        const {
          data: { list, total },
        } = await getMaterialList(this.listQuery);
        this.imgList = list;
        this.listTotal = total;
      } catch (error) {
        console.log(erro);
      }
    },
    // 切换分组
    switchCls(index) {
      this.activeCls = index;
      this.listQuery.start = 1;
      this.listQuery.clsId = 0;
      this.listQuery.searchOfFileName = "";
      this.getMaterialClass(index);
      this.getMaterialList(index);
    },
    handleClick(row) {
      this.selected = row
      this.$emit("materialselected", { row, cls: this.activeCls });
    },
    // 搜索列表
    async searchImage() {
      if (!this.listQuery.searchOfFileName) {
        this.$message({
          type: "error",
          message: "图片名称必须输入",
        });
        return;
      }
      this.getMaterialList(this.activeCls);
    },
    upload(e) {
      const file = e.target.files[0];
      if (file) {
        if (
          ["image/gif", "image/png", "image/jpg", "image/jpeg"].indexOf(
            file.type
          ) > -1
        ) {
          // 获取图片宽高
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
              let invalide = true;
              if (this.item.hasOwnProperty("limit")) {
                if (img.width !== this.item.limit.w) {
                  invalide = false;
                  this.$alert(
                    "图片宽度必须为 " + this.item.limit.w + "px",
                    "提示"
                  );
                }
                if (img.height !== this.item.limit.h) {
                  invalide = false;
                  this.$alert(
                    "图片高度必须为 " + this.item.limit.h + "px",
                    "提示"
                  );
                }
                if (file.size / 1024 > this.item.limit.s) {
                  invalide = false;
                  this.$alert(
                    "图片大小不能超过 " + this.item.limit.s + "k",
                    "提示"
                  );
                }
              } else {
                if (img.width > 750) {
                  invalide = false;
                  this.$alert("图片宽度不能超过750px", "提示");
                }
                if (file.type === "image/gif") {
                  if (file.size / 1024 > 2048) {
                    invalide = false;
                    this.$alert("gif图片不能超过2048k", "提示");
                  }
                } else {
                  if (file.size / 1024 > 512) {
                    invalide = false;
                    this.$alert("jpeg、png图片不能超过512k", "提示");
                  }
                }
              }
              if (invalide) {
                const width = 750;
                const height = img.height * (750 / img.width).toFixed(4);
                this.item.width = width;
                this.item.height = height;
                this.item.val = img.src;
                this.$emit("uploadSuccess", this.item, img, this.index);
              }
            };
            img.src = reader.result;
            this.$emit("beforeUpload", file, this.item, img, this.index);
          };
          reader.onerror = (err) => {
            console.log("reader error", err);
          };
          // 读出文件路径
          reader.readAsDataURL(file);
        } else {
          this.$alert("图片格式须为jpg、jpeg、png、gif之一！", "提示");
        }
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
