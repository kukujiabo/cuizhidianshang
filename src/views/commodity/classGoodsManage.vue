<template>
  <div class="goods-container">
    <div class="title">
      <p>{{className}}</p>
    </div>
    <div class="operation-data">
      <div class="operation-btns">
        <el-button type="primary" @click="addToGroups">添加商品</el-button>
        <div>
          <el-select v-model="listQuery.putMode" placeholder="选择状态">
            <el-option :value="0" label="全部状态">全部状态</el-option>
            <el-option :value="1" label="已上架">已上架</el-option>
            <el-option :value="3" label="已下架">已下架</el-option>
            <el-option :value="2" label="待上架">待上架</el-option>
            <el-option :value="4" label="停售">停售</el-option>
            <el-option :value="5" label="隐藏">隐藏</el-option>
          </el-select>
          <el-input
            v-model="listQuery.search"
            placeholder="搜索分组名称"
            class="input-with-select"
          >
            <el-button slot="append" type="primary" @click="() => getGoodsDocuments(listQuery)">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="main-table">
        <el-table
          stripe
          :data="imageList"
          class="content-table"
          empty-text="没有数据"
          header-row-class-name="light-table-header-background"
          :header-cell-style="{
                'background':'transparent',
                'height':'54px',
                'line-height':'54px',
                'border-bottom':0,
                'box-sizing':'border-box;',
                'padding-right':'15px',
                'padding-left':'15px',
                'font-size':'16px',
                'color':'#666'
              }"
        >
          <el-table-column min-width="300px" prop="image" label="商品名称">
            <template slot-scope="scope">
              <div class="row-image-info">
                <img class="row-image" :src="`${Host}/res/` + scope.row.cover" />
                <div class="row-info">
                  <span>{{ scope.row.title }}</span>
                  <span style="color:red">{{ scope.row.sellMode == 0 ? '免费' : '付费' }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" prop="putDate" label="类型">
            <template slot-scope="scope">
              <span>{{classTypes[scope.row.cType]}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" align="center" prop="status" label="上架状态">
            <template slot-scope="scope">
              <!-- <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
              <span class="process-fail" v-if="scope.row.putMode === 0">下架</span>-->
              <span>{{putModeTypes[scope.row.putMode]}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="200px" prop="putDate" label="上架时间" />
          <el-table-column min-width="200px" align="right" label="操作">
            <template slot-scope="scope">
              <div style="padding-right:18px;">
                <el-button type="text" @click="removeClass(scope.row)">移出分组</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagenigation">
        <el-pagination
          :current-page.sync="listQuery.page"
          :page-size="listQuery.pageSize"
          :total="total"
          layout="prev, pager, next, sizes, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="添加商品"
      width="800px"
      :visible.sync="showGoodsList"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      
    >
      <div class="add-list-container">
        <div style="padding-bottom:20px">
          <el-input style="width:400px" v-model="searchList.search" placeholder="搜索商品名称">
            <el-button slot="append" type="primary" @click="doSearch">搜索</el-button>
          </el-input>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="图文" name="1">
            <div>
              <el-table 
                :height="500"
                :show-header="false"
                :data="searchImageList"
                @selection-change="selectionImageChange"
                >
                <el-table-column type="selection" />
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="image-zoom">
                      <img :src="Host + '/res/' + scope.row.cover" class="cover-image">
                      <div class="image-title">
                        <p>{{scope.row.title}}</p>
                        <p style="color:#ff0000">¥ {{scope.row.realUnitPrice}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="音频" name="6">
            <div>
              <el-table 
                :height="500"
                :show-header="false"
                :data="searchAudioList"
                @selection-change="selectionAudioChange"
                >
                <el-table-column type="selection" />
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="image-zoom">
                      <img :src="Host + '/res/' + scope.row.cover" class="cover-image">
                      <div class="image-title">
                        <p>{{scope.row.title}}</p>
                        <p style="color:#ff0000">¥ {{scope.row.realUnitPrice}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="视频" name="2">
            <div>
              <el-table 
                :height="500"
                :show-header="false"
                :data="searchVideoList"
                @selection-change="selectionVideoChange"
                >
                <el-table-column type="selection" />
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="image-zoom">
                      <img :src="Host + '/res/' + scope.row.cover" class="cover-image">
                      <div class="image-title">
                        <p>{{scope.row.title}}</p>
                        <p style="color:#ff0000">¥ {{scope.row.realUnitPrice}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="直播" name="3">
            <div>
              <el-table 
                :height="500"
                :show-header="false"
                :data="searchOnAirList"
                @selection-change="selectionOnAirChange"
                >
                <el-table-column type="selection" />
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="image-zoom">
                      <img :src="Host + '/res/' + scope.row.cover" class="cover-image">
                      <div class="image-title">
                        <p>{{scope.row.title}}</p>
                        <p style="color:#ff0000">¥ {{scope.row.realUnitPrice}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="海报" name="4">
            <div>
              <el-table 
                :height="500"
                :show-header="false"
                :data="searchPosterList"
                @selection-change="selectionPosterChange"
                >
                <el-table-column type="selection" />
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="image-zoom">
                      <img :src="Host + '/res/' + scope.row.cover" class="cover-image">
                      <div class="image-title">
                        <p>{{scope.row.title}}</p>
                        <p style="color:#ff0000">¥ {{scope.row.realUnitPrice}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-pagination
                layout="prev, pager, next"
                :total="50">
              </el-pagination> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="submit">
        <el-button @click="cancel">取消</el-button>
        <el-button v-loading="loading" type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.goods-container {
  padding: 0;
  .el-dialog__body {
    padding: 10px 0 0 0;
    .add-list-container {
      padding: 30px;
      background-color: #f3f5f7;
      .image-zoom {
        display: flex;
        flex-direction: row;
        .cover-image {
          width: 100px;
          height: 70px;
        }
        .image-title {
          padding-left: 10px;
          p {
            margin: 5px 0;
          }
        }
      }
    }
    .submit {
      padding: 15px;
      text-align: center;
    }
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      padding: 0;
    }
  }

  .operation-data {
    overflow: hidden;
    padding: 40px;
    .operation-btns {
      @extend .flex;
      @extend .flex-row;
      @extend .flex-space-between;
      .el-select {
        margin-right: 20px;
      }
      .input-with-select {
        width: 400px;
      }
      .el-input-group__append {
        color: #ffffff;
        background-color: $themeBlue;
      }
    }
    .main-table {
      @include radius(8px);
      margin-top: 40px;
      .content-table {
        min-height: 500px;
      }
      .light-table-header-background {
        background-color: #f8fbff;
        border-bottom: 0;
      }
      .row-image-info {
        @extend .flex;
        @extend .flex-row;
        .post-image {
          width: 60px;
          height: 106px;
          border: 0;
          border-radius: 6px;
          background-color: #f3f5f7;
        }
        .row-image {
          width: 100px;
          height: 70px;
          background-color: #597ef7;
          border: 0 !important;
          object-fit: scale-down;
          @include radius(8px);
        }
        .row-info {
          @extend .flex;
          @extend .flex-column;
          padding-left: 15px;
        }
      }
      .el-table__row {
        td {
          padding-left: 15px;
        }
      }
    }
    .pagenigation {
      padding: 40px 0;
      text-align: right;
      .el-pagination__jump {
        margin-left: 0;
      }
    }
  }
  .title {
    color: $textDark;
    font-size: 20px;
    font-weight: 800;
    padding: 0 40px;
    background-color: $wt;
    height: 90px;
    line-height: 90px;
    p {
      margin: 0;
    }
  }
  .el-tabs__nav-scroll {
    background-color: $wt;
    padding: 0 40px;
  }
  .el-tabs__content {
    padding: 30px 40px;
  }
  .upe {
    .el-dialog {
      margin-top: 8vh !important;
      .el-dialog__body {
        padding: 0;
        .upload-post-container {
          height: 750px;
          padding: 40px 0;
          box-sizing: border-box;
          background-color: #f3f5f7;
          .poster-holder {
            width: 90px;
            height: 160px;
          }
          .radius-group {
            width: 500px;
            .radius-item {
              display: block;
              height: 45px;
              margin-bottom: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
              .el-radio {
                .el-radio__label {
                  color: $textGray;
                }
              }
              .radius-tips {
                font-size: 10px;
                color: #b1b1b1;
              }
            }
          }
        }
        .submit {
          height: 90px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>

<script>
import GoodsBasic from "./components/goodsBasicInfo";
import { queryDocuments, removeGoods, removeFromGroup, moveGoodsInClass } from "@/api/document";
import { Host } from "@/config";
import { getToken, getTokenType } from "@/utils/auth";
import Cookies from "js-cookie";

export default {
  components: {
    GoodsBasic,
  },
  data() {
    return {
      Host: Host,
      className: "",
      classId: "",
      loading: false,
      editLoading: false,
      showGoodsList: false,
      postDialogTitle: "上传海报",
      tidocuments: [],
      videoDocuments: [],
      audioList: [],
      activeName: "1",
      imageList: [],
      total: 0,
      searchList: {
        cType: 1,
        search: '',
        start: 1,
        limit: 20
      },
      listQuery: {
        cType: 0,
        clsId: 0,
        search: "",
        putMode: 0,
        start: 1,
        limit: 20,
      },
      classTypes: ["", "图文", "视频", "直播", "手机海报", "专题海报", "音频"],
      putModeTypes: ["", "已上架", "待上架", "已下架", "停售", "隐藏"],
      searchImageList: [],
      searchAudioList: [],
      searchVideoList: [],
      searchOnAirList: [],
      searchPosterList: [],
      selectedImages: [],
      selectedVideo: [],
      selectedAudio: [],
      selectedOnair: [],
      selectedPoster: []
    };
  },
  created() {
    this.className = this.$route.query.name;
    this.listQuery.clsId = this.classId = this.$route.query.id;
    this.getGoodsDocuments(this.listQuery);
    // this.doSearch()
  },
  methods: {
    cancel() {
      this.showGoodsList = false
    },
    selectionImageChange(selection) {
      this.selectedImages = selection
    },
    selectionVideoChange(selection) {
      this.selectedVideo = selection
    },
    selectionAudioChange(selection) {
      this.selectedAudio = selection
    },
    selectionOnAirChange(selection) {
      this.selectedOnair = selection
    },
    selectionPosterChange(selection) {
      this.selectedPoster = selection
    },
    async doSearch() {
      try {
        const { data: { list } } = await queryDocuments(this.searchList)
        switch(this.searchList.cType.toString()) {
          case '1':
            this.searchImageList = list
            break
          case '6':
            this.searchAudioList = list
            break
          case '2':
            this.searchVideoList = list
            break
          case '3':
            this.searchOnAirList = list
            break
          case '4':
            this.searchPosterList = list
            break
        }
      } catch (error) {
        
      }
    },
    async confirm() {
      const allGoods = [
        ...this.selectedImages, 
        ...this.selectedVideo, 
        ...this.selectedAudio, 
        ...this.selectedOnair, 
        ...this.selectedPoster
      ]
      const ids = allGoods.map(ag => ag.id)
      const data = {
        goodsId: ids, //JSON.stringify(ids),
        clsId: this.classId
      }
      const { success, message } = await moveGoodsInClass(data)
      if (success) {
        this.$message({ 
          type: 'success',
          message: '移动成功！'
        })
        this.showGoodsList = false
      } else {
        this.$message({
          type: 'error',
          message
        })
      }
    },
    addToGroups() {
      this.showGoodsList = true
      this.searchList.cType = 1
      this.doSearch(this.searchList)
    },
    // 查询商品档案
    async getGoodsDocuments(query) {
      try {
        const {
          data: { list, total },
        } = await queryDocuments(query);
        this.listTextImageTotal = total;
        this.imageList = list;
      } catch (error) {

      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(evt) {
      this.searchList.cType = this.activeName
      this.doSearch()
    },
    editImageText(row) {
      this.$router.push({ path: "/commodity/editTextImage?id=" + row.id });
    },
    editVideo(row) {
      this.$router.push({ path: "/commodity/editVideo?id=" + row.id });
    },
    textDocumentEdit(row) {},
    textDocumentDownload(row) {},
    textDocumentRemove(row) {},
    clickDropDown(evt) {
      console.log(evt);
    },
    removeClass(row, index) {
      this.$confirm(`确认将档案 ${row.title} 移出当前分组？`, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(async (res) => {
        try {
          const { success } = await removeFromGroup({ goodsId: row.id });
          if (success) {
            this.$message({
              type: "success",
              message: "档案已移出！",
            });
            this.getGoodsDocuments(this.listQuery);
          } else {
            this.$message({
              type: "error",
              message: "移出失败，请联系管理员！",
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
  },
};
</script>
