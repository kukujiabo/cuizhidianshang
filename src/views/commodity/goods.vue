<template>
  <div class="goods-container">
    <div class="title">
      <p>商品档案</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图文" name="first">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateTextImage">新建图文</el-button>
            <div>
              <el-select v-model="listTextImageQuery.status" placeholder="选择状态">
                <el-option :value="1" label="全部状态">全部状态</el-option>
                <el-option :value="2" label="已上架">已上架</el-option>
                <el-option :value="3" label="已下架">已下架</el-option>
                <el-option :value="4" label="待上架">待上架</el-option>
              </el-select>
              <el-input v-model="listTextImageQuery.keywords" placeholder="搜索图文名称" class="input-with-select">
                <el-button slot="append" type="primary">搜索</el-button>
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
              <el-table-column prop="image" label="图文名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                      <span style="color:red">{{ scope.row.selMode === 0 ? '免费' : '付费' }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="订阅量" />
              <el-table-column prop="putDate" label="上架时间" />
              <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="textDocumentDownload(scope.row)">下载</el-button>
                    <el-button type="text" @click="remove(scope.row, 1)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视频" name="second">
        <div class="operation">
          <el-button type="primary" @click="toCreateVideo">新建视频</el-button>
          <div class="main-table">
            <el-table
              stripe
              :data="videoDocuments"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column prop="image" label="视频名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="Host + '/res/' + scope.row.cover"/>
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.putMode === 1">上架</span>
                  <span v-if="scope.row.putMode === 0">下架</span>
                </template>
              </el-table-column>
              <el-table-column prop="putDate" label="上架时间" />
              <el-table-column prop="relatContent" label="关联内容" />
              <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="textDocumentDownload(scope.row)">分享</el-button>
                    <el-button type="text">
                      <el-dropdown trigger="hover" @command="(command) => handleCommand(command, scope.row)">
                        <span class="el-dropdown-link" style="color:#1890ff">
                          更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>下架</el-dropdown-item>
                          <el-dropdown-item>查看评论</el-dropdown-item>
                          <el-dropdown-item command="r">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listVideoQuery.page"
              :page-size="listVideoQuery.pageSize"
              :total="videoListTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="音频" name="third">
        <div class="operation">
          <el-button type="primary" @click="toCreateVoice">新建音频</el-button>
          <div class="main-table">
            <el-table
              stripe
              :data="videoDocuments"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column prop="image" label="视频名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="scope.row.coverUrl"/>
                    <div class="row-info">
                      <span>音频</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">上架</span>
                  <span v-if="scope.row.status === 2">下架</span>
                </template>
              </el-table-column>
              <el-table-column prop="onshelfTime" label="上架时间" />
              <el-table-column prop="relatContent" label="关联内容" />
              <el-table-column align="right" label="操作">
                <div style="padding-right:18px;">
                  <el-button type="text" @click="textDocumentEdit(scope.row)">数据统计</el-button>
                  <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="textDocumentDownload(scope.row)">分享</el-button>
                  <el-button type="text" @click="textDocumentRemove(scope.row)">更多</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="直播" name="fourth">
        <div class="operation">
          <el-button type="primary" @click="toCreateOnAir">创建直播</el-button>
          <div class="main-table">
            <el-table
              stripe
              :data="videoDocuments"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column prop="image" label="直播名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="scope.row.coverUrl">
                    <div class="row-info">
                      <span>音频</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="onshelfTime" label="直播类型" />
              <el-table-column prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">上架</span>
                  <span v-if="scope.row.status === 2">下架</span>
                </template>
              </el-table-column>
              <el-table-column prop="onshelfTime" label="上架时间" />
              <el-table-column prop="relatContent" label="关联内容" />
              <el-table-column prop="relatContent" label="直播状态" />
              <el-table-column align="right" label="操作">
                <div style="padding-right:18px;">
                  <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="textDocumentEdit(scope.row)">讲师管理</el-button>
                  <el-button type="text" @click="textDocumentDownload(scope.row)">分享</el-button>
                  <el-button type="text" @click="textDocumentRemove(scope.row)">更多</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="手机海报" name="fifth">
        <div class="operation">
          <el-button type="primary" @click="toCreateOnAir">上传海报</el-button>
          <div class="main-table">
            <el-table
              stripe
              :data="videoDocuments"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column prop="onshelfTime" label="海报标题" />
              <el-table-column prop="image" label="海报图片">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="post-image" :src="scope.row.coverUrl">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="onshelfTime" label="海报类型" />
              <el-table-column prop="status" label="海报状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">上架</span>
                  <span v-if="scope.row.status === 2">下架</span>
                </template>
              </el-table-column>
              <el-table-column prop="onshelfTime" label="上架时间" />
              <el-table-column align="right" label="操作">
                <div style="padding-right:18px;">
                  <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="textDocumentEdit(scope.row)">讲师管理</el-button>
                  <el-button type="text" @click="textDocumentDownload(scope.row)">分享</el-button>
                  <el-button type="text" @click="textDocumentRemove(scope.row)">更多</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.goods-container {
  padding: 0;
  .operation {
    overflow: hidden;
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
        color: #FFFFFF;
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
          background-color: #F3F5F7;
        }
        .row-image {
          width: 100px;
          height: 70px;
          background-color: #597EF7;
          border: 0 !important;
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
}
</style>

<script>
import GoodsBasic from './components/goodsBasicInfo'
import { queryDocuments, removeGoods } from '@/api/document'
import { Host } from '@/config'

export default {
  components: {
    GoodsBasic
  },
  data() {
    return {
      Host: Host,
      tidocuments: [],
      videoDocuments: [],
      activeName: 'first',
      imageList: [],
      listTextImageTotal: 0,
      listTextImageQuery: {
        cType: 1,
        clsId: 0,
        search: '',
        putMode: 0,
        start: 1,
        limit: 20
      },
      videoListTotal: 0,
      listVideoQuery: {
        cType: 2,
        clsId: 0,
        search: '',
        putMode: 0,
        start: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getGoodsDocuments(this.listTextImageQuery)
    this.getVideoList(this.listVideoQuery)
  },
  methods: {
    // 查询商品档案
    async getGoodsDocuments(query) {
      try {
        const { data: { list, total }} = await queryDocuments(query)
        this.listTextImageTotal = total
        this.imageList = list
      } catch (error) {
        console.log(error)
      }
    },
    // 查询视频档案
    async getVideoList(query) {
      try {
        const { data: { list, total }} = await queryDocuments(query)
        this.videoDocuments = list
        this.videoListTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick() {},
    textDocumentEdit(row) {

    },
    textDocumentDownload(row) {

    },
    textDocumentRemove(row) {

    },
    clickDropDown(evt) {
      console.log(evt)
    },
    toCreateTextImage() {
      this.$router.push({ path: '/commodity/addTextImage' })
    },
    toCreateVideo() {
      this.$router.push({ path: '/commodity/addVideo' })
    },
    toCreateOnAir() {
      this.$router.push({ path: '/commodity/onAir' })
    },
    toCreateVoice() {
      this.$router.push({ path: '/commodity/addVoice' })
    },
    handleCommand(command, row) {
      switch (command) {
        case 'r':
          this.remove(row, 2)
          break
      }
    },
    remove(row, index) {
      this.$confirm(`确认删除档案 ${row.title} ？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async res => {
        try {
          const { success } = await removeGoods({ id: row.id })
          if (success) {
            this.$message({
              type: 'success',
              message: '档案已删除！'
            })
            switch (index) {
              case 1:
                this.getGoodsDocuments(this.listTextImageQuery)
                break
              case 2:
                this.getVideoList(this.listVideoQuery)
                break
            }
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请联系管理员！'
            })
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>
