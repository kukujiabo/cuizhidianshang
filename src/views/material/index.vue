<template>
  <div class="goods-container">
    <div class="title">
      <div>
        <span>素材档案</span>
      </div>
      <div class="capacity">
        <div class="capacity-tips" style="height:66px">
          <span>空间容量：5MB/10GB</span>
          <span style="color:#1F71FF">详情</span>
        </div>
        <div>
          <el-progress :show-text="false" :percentage="5" :stroke-width="12" />
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="图片" name="first">
        <div class="operation">
          <div class="operation-btns">
            <div>
              <el-button type="primary" @click="toUpload(1)">上传图片</el-button>
              <el-button type="default" @click="batchRemoveImage()">批量删除</el-button>
              <el-button type="default" @click="showMovement">移动到</el-button>
            </div>
            <div>
              <el-input
                v-model="listTextImageQuery.keywords"
                placeholder="搜索图片名称"
                class="input-with-select"
              >
                <el-button slot="append" type="primary">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-row :gutter="24">
              <el-col :xl="4" :md="6">
                <el-card style="min-height: 500px;">
                  <div slot="header" class="clearfix">
                    <span class="section-title">图片分组</span>
                  </div>
                  <div class="tree-node">
                    <img class="plus" src="@/assets/plus.png" @click="showClassDialog(1)">
                    <el-tree
                      :props="defaultProps"
                      :data="treeData"
                      @node-click="(node) => handleNodeClick(node, 1)"
                    />
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="20" :md="18">
                <el-table
                  stripe
                  :data="tidocuments"
                  class="content-table"
                  empty-text="没有数据"
                  header-row-class-name="light-table-header-background"
                  :header-cell-style="{
                    'background':'transparent',
                    'height':'54px',
                    'line-height':'54px',
                    'border-bottom':0,
                    'box-sizing':'border-box',
                    'padding-right':'15px',
                    'padding-left':'15px',
                    'font-size':'16px',
                    'color': '#666'
                  }"
                  @selection-change="handleImageSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="65"
                  />
                  <el-table-column prop="image" label="图片">
                    <template slot-scope="scope">
                      <div class="row-image-info">
                        <img class="row-image" :src="'http://49.234.156.48:8083/res/' + scope.row.src">
                        <div class="row-info">
                          <span>{{scope.row.title}}</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="大小">
                    <template slot-scope="scope">
                      <span>{{ scope.row.fileSize/1000 }}kb</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createDate" label="上传时间" />
                  <el-table-column prop="isNet" label="状态">
                    <template slot-scope="scope">
                      <span class="process-fail" v-if="scope.row.isNet === 0">下架</span>
                      <span class="process-success" v-if="scope.row.isNet === 1">正常</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <div style="padding-right:18px;">
                        <el-button type="text" @click="textDocumentEdit(scope.row, 1)">编辑</el-button>
                        <el-button type="text" @click="textDocumentDownload(scope.row)">下载</el-button>
                        <el-button type="text" @click="textDocumentRemove(scope.row, 1)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="imgListQuery.page"
              :page-size="imgListQuery.limit"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="音频" name="second">
        <div class="operation">
          <div class="operation-btns">
            <div>
              <el-button type="primary" @click="toUpload(2)">上传音频</el-button>
              <el-button type="default" @click="batchRemoveAudio">批量删除</el-button>
              <el-button type="default" @click="showMovement">移动到</el-button>
            </div>
            <div>
              <el-input
                v-model="listTextImageQuery.keywords"
                placeholder="搜索音频名称"
                class="input-with-select"
              >
                <el-button slot="append" type="primary">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-row :gutter="24">
              <el-col :xl="4" :md="6">
                <el-card style="min-height: 500px;">
                  <div slot="header" class="clearfix">
                    <span class="section-title">音频分组</span>
                  </div>
                  <div class="tree-node">
                    <img class="plus" src="@/assets/plus.png" @click="showClassDialog(2)" />
                    <el-tree :props="defaultProps" :data="treeData2" @node-click="handleNodeClick(2)" />
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="20" :md="18">
                <el-table
                  stripe
                  :data="audioDocuments"
                  class="content-table"
                  empty-text="没有数据"
                  header-row-class-name="light-table-header-background"
                  :header-cell-style="{
                    'background':'transparent',
                    'height':'54px',
                    'line-height':'54px',
                    'border-bottom':0,
                    'box-sizing':'border-box',
                    'padding-right':'15px',
                    'padding-left':'15px',
                    'font-size':'16px',
                    'color': '#666'
                  }"
                  @selection-change="handleAudioSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="65"
                  />
                  <el-table-column prop="image" label="音频">
                    <template slot-scope="scope">
                      <div class="row-image-info">
                        <img class="row-image" style="padding:10px 15px;box-sizing:border-box;cursor:pointer" src="@/assets/audio.png" @click="play(scope.row.src)">
                        <audio :id="scope.row.src" :src="'http://49.234.156.48:8083/res/' + scope.row.src" />
                        <div class="row-info">
                          <span>{{scope.row.title}}</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="大小" />
                  <el-table-column prop="createDate" label="上传时间" />
                  <el-table-column prop="isNet" label="状态">
                    <template slot-scope="scope">
                      <span class="process-fail" v-if="scope.row.isNet === 0">下架</span>
                      <span class="process-success" v-if="scope.row.isNet === 1">正常</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <div style="padding-right:18px;">
                        <el-button type="text" @click="textDocumentEdit(scope.row, 2)">编辑</el-button>
                        <el-button type="text" @click="textDocumentDownload(scope.row)">下载</el-button>
                        <el-button type="text" @click="textDocumentRemove(scope.row, 2)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="audioListQuery.page"
              :page-size="audioListQuery.limit"
              :total="listAudioTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视频" name="third">
        <div class="operation">
          <div class="operation-btns">
            <div>
              <el-button type="primary" @click="toUpload(3)">上传视频</el-button>
              <el-button type="default" @click="batchRemoveVideo">批量删除</el-button>
              <el-button type="default" @click="showMovement">移动到</el-button>
            </div>
            <div>
              <el-input
                v-model="listTextImageQuery.keywords"
                placeholder="搜索视频名称"
                class="input-with-select"
              >
                <el-button slot="append" type="primary">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-row :gutter="24">
              <el-col :xl="4" :md="6">
                <el-card style="min-height: 500px;">
                  <div slot="header" class="clearfix">
                    <span class="section-title">视频分组</span>
                  </div>
                  <div class="tree-node">
                    <img class="plus" src="@/assets/plus.png" @click="showClassDialog(3)">
                    <el-tree :props="defaultProps" :data="treeData3" @node-click="handleNodeClick(3)" />
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="20" :md="18">
                <el-table
                  stripe
                  :data="videoDocuments"
                  class="content-table"
                  empty-text="没有数据"
                  header-row-class-name="light-table-header-background"
                  :header-cell-style="{
                    'background':'transparent',
                    'height':'54px',
                    'line-height':'54px',
                    'border-bottom':0,
                    'box-sizing':'border-box',
                    'padding-right':'15px',
                    'padding-left':'15px',
                    'font-size':'16px',
                    'color': '#666'
                  }"
                  @selection-change="handleVideoSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="65"
                  />
                  <el-table-column prop="image" label="视频">
                    <template slot-scope="scope">
                      <div class="row-image-info">
                        <img class="row-image"/>
                        <div class="row-info">
                          <span>{{scope.row.title}}</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="大小" />
                  <el-table-column prop="createDate" label="上传时间" />
                  <el-table-column prop="isNet" label="状态">
                    <template slot-scope="scope">
                      <span class="process-fail" v-if="scope.row.isNet === 0">下架</span>
                      <span class="process-success" v-if="scope.row.isNet === 1">正常</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <div style="padding-right:18px;">
                        <el-button type="text" @click="textDocumentEdit(scope.row, 3)">编辑</el-button>
                        <el-button type="text" @click="textDocumentDownload(scope.row)">下载</el-button>
                        <el-button type="text" @click="textDocumentRemove(scope.row, 3)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="videoListQuery.page"
              :page-size="videoListQuery.limit"
              :total="listVideoTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="电子书" name="fourth">
        <div class="operation">
          <div class="operation-btns">
            <div>
              <el-button type="primary" @click="toUpload(4)">上传电子书</el-button>
              <el-button type="default" @click="batchRemoveEbook">批量删除</el-button>
              <el-button type="default" @click="showMovement">移动到</el-button>
            </div>
            <div>
              <el-input
                v-model="listTextImageQuery.keywords"
                placeholder="搜索电子书名称"
                class="input-with-select"
              >
                <el-button slot="append" type="primary">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-row :gutter="24">
              <el-col :xl="4" :md="6">
                <el-card style="min-height: 500px;">
                  <div slot="header" class="clearfix">
                    <span class="section-title">电子书分组</span>
                  </div>
                  <div class="tree-node">
                    <img class="plus" src="@/assets/plus.png" @click="showClassDialog(4)">
                    <el-tree :props="defaultProps" :data="treeData4" @node-click="handleNodeClick(4)" />
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="20" :md="18">
                <el-table
                  stripe
                  :data="eBookDocuments"
                  class="content-table"
                  empty-text="没有数据"
                  header-row-class-name="light-table-header-background"
                  :header-cell-style="{
                    'background':'transparent',
                    'height':'54px',
                    'line-height':'54px',
                    'border-bottom':0,
                    'box-sizing':'border-box',
                    'padding-right':'15px',
                    'padding-left':'15px',
                    'font-size':'16px',
                    'color': '#666'
                  }"
                  @selection-change="handleEbookSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="65"
                  />
                  <el-table-column prop="image" label="电子书">
                    <template slot-scope="scope">
                      <div class="row-image-info">
                        <img class="row-image">
                        <div class="row-info">
                          <span>{{scope.row.title}}</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="大小" />
                  <el-table-column prop="createDate" label="上传时间" />
                  <el-table-column prop="isNet" label="状态">
                    <template slot-scope="scope">
                      <span class="process-fail" v-if="scope.row.isNet === 0">下架</span>
                      <span class="process-success" v-if="scope.row.isNet === 1">正常</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <div style="padding-right:18px;">
                        <el-button type="text" @click="textDocumentEdit(scope.row, 4)">编辑</el-button>
                        <el-button type="text" @click="textDocumentDownload(scope.row)">下载</el-button>
                        <el-button type="text" @click="textDocumentRemove(scope.row, 4)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="eBookListQuery.page"
              :page-size="eBookListQuery.limit"
              :total="listEbookTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="classDialogTitle" :visible.sync="classDialog" width="600px">
      <div class="form-container">
        <el-form
          ref="classForm"
          label-width="100px"
          prop="pId"
          :model="classForm"
          :rules="classRules"
        >
          <el-form-item label="上级分类">
            <el-cascader
              v-model="classForm.pId"
              style="width:400px;"
              clearable
              :show-all-levels="false"
              :props="cascadeOptions"
              :options="classOptions"
              placeholder="请选择上级分类"
            />
          </el-form-item>
          <el-form-item required prop="title" label="分类名称">
            <el-input v-model="classForm.title" style="width:400px" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item prop="content" label="分类说明">
            <el-input v-model="classForm.content" style="width:400px" placeholder="请输入分类说明" />
          </el-form-item>
          <el-form-item>
            <div style="float:right;padding:30px 30px 0 30px;">
              <el-button type="cancel" @click="cancelAddClass">取消</el-button>
              <el-button type="primary" @click="addNewClass">新增</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog width="902px" class="x-el-dialog" :title="uploadTitle" :visible.sync="showUploadBox">
      <div class="upload-container">
        <el-form ref="uploadForm" :model="uploadFormData" label-width="100px">
          <el-form-item required prop="pId" label="上传到：">
            <el-cascader
              v-model="uploadFormData.pId"
              style="width:200px;"
              clearable
              :show-all-levels="false"
              :props="cascadeOptions"
              :options="classOptions"
              placeholder="请选择上级分类"
            />
          </el-form-item>
          <el-form-item required prop="file" label="本地文件：">
            <el-upload
              ref="fileUploader"
              name="file"
              class="upload-demo"
              action="http://49.234.156.48:8083/api/res/addRes"
              :accept="uploadFileType[classIndex]"
              :list-type="classIndex === 1 ? 'picture-card' : ''"
              :auto-upload="false"
              :file-list="uploadList"
              :limit="100"
              :multiple="true"
              :data="uploadData"
              :on-success="fileUploaded"
              :on-change="uploadFileChange"
              :headers="{
                Authorization: uploadToken
              }"
            >
              <div v-if="classIndex === 1">
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
              <el-button v-if="classIndex > 1" slot="trigger" size="small" plain type="primary">选取文件</el-button>
              <div v-if="classIndex === 1" slot="tip" class="el-upload__tip">
                1. 建议上传7501334px, JPG PNG 格式 <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 2" slot="tip" class="el-upload__tip">
                1. 支持mda，mp3格式，大小不超过500MB <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 3" slot="tip" class="el-upload__tip">
                1. 支持mp4，avi，wmv格式，大小不超过2G <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 4" slot="tip" class="el-upload__tip">
                1. 支持pdf，epub格式，大小不超过100MB <br> 2. 且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button style="width:100px" plain type="primary" @click="cancelUploader">取消</el-button>
        <el-button :loading="uploadLoading" style="width:100px" type="primary" @click="confirmUploader">确认上传</el-button>
      </div>
    </el-dialog>
    <!-- 更新 -->
    <el-dialog width="902px" class="x-el-dialog" :title="editTitle" :visible.sync="showEditBox">
      <div class="upload-container">
        <el-form ref="uploadForm" :model="editFormData" label-width="100px">
          <el-form-item required prop="pId" label="上传到：">
            <el-cascader
              v-model="editFormData.pId"
              style="width:200px;"
              clearable
              :show-all-levels="false"
              :props="cascadeOptions"
              :options="classOptions"
              placeholder="请选择上级分类"
            />
          </el-form-item>
          <el-form-item required prop="file" label="本地文件：">
            <el-upload
              ref="fileUploader"
              name="file"
              class="upload-demo"
              action="http://49.234.156.48:8083/api/res/addRes"
              :auto-upload="false"
              :file-list="uploadList"
              :limit="100"
              :data="uploadData"
              :on-success="fileUploaded"
              :on-change="uploadFileChange"
              :headers="{
                Authorization: uploadToken
              }"
            >
              <div v-if="classIndex === 1">
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
              <el-button v-if="classIndex > 1" slot="trigger" size="small" plain type="primary">选取文件</el-button>
              <div v-if="classIndex === 1" slot="tip" class="el-upload__tip">
                1. 建议上传7501334px, JPG PNG 格式 <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 2" slot="tip" class="el-upload__tip">
                1. 支持mda，mp3格式，大小不超过500MB <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 3" slot="tip" class="el-upload__tip">
                1. 支持mp4，avi，wmv格式，大小不超过2G <br> 2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 4" slot="tip" class="el-upload__tip">
                1. 支持pdf，epub格式，大小不超过100MB <br> 2. 且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button style="width:100px" plain type="primary" @click="cancelUploader">取消</el-button>
        <el-button :loading="uploadLoading" style="width:100px" type="primary" @click="confirmUploader">确认上传</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="x-el-dialog"
      title="移动素材到"
      width="600px"
      :visible.sync="visibleMove"
    >
      <div class="upload-container" style="background:#FFF">
        <el-tree
          :props="defaultProps"
          :data="moveClassTree"
          @node-click="selectMoveClass"
        />
      </div>
      <div class="submit">
        <el-button style="width:100px" plain type="primary" @click="cancelUploader">取消</el-button>
        <el-button :loading="uploadLoading" style="width:100px" type="primary" @click="confirmMovement">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.goods-container {
  padding: 0;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .capacity {
      font-size: 14px;
      width: 400px;
      display: flex;
      flex-direction: column;
      .capacity-tips {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 350px;
      }
    }
  }
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
        color: #ffffff;
        background-color: $themeBlue;
      }
    }
    .main-table {
      @include radius(8px);
      margin-top: 40px;
      .el-table__row {
        td {
          padding-left: 10px !important;
        }
      }
      .tree-node {
        position: relative;
        .plus {
          z-index: 10;
          position: absolute;
          top: 5px;
          right: 6px;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .content-table {
        min-height: 500px;
        .process-fail::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 2px;
          background-color: #ff0000;
        }
        .process-success::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 2px;
          background-color: #52c41a;
        }
      }
      .light-table-header-background {
        background-color: #f8fbff;
        border-bottom: 0;
      }
      .row-image-info {
        @extend .flex;
        @extend .flex-row;
        .row-image {
          width: 100px;
          height: 70px;
          background-color: #FFF;
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
  .form-container {
    width: 100%;
    text-align: center;
  }
  .x-el-dialog {
    .el-dialog__body {
      padding-left: 0;
      padding-right: 0;
      .upload-container {
        min-height: 340px;
        background-color: #F3F5F7;
        padding: 40px;
        .el-tree {
          background-color: transparent !important;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 90px;
          height: 90px;
          line-height: 90px;
          text-align: center;
          background: #FFFFFF;
          border: 0.5px solid #dfdfdf;
          border-radius: 5px;
        }
        .avatar {
          width: 90px;
          height: 90px;
          display: block;
        }
        .el-upload--picture-card {
          background: transparent;
          border: 0;
          padding: 0;
        }
        
      }
      .submit {
        padding-top: 30px;
        background-color: #ffffff;
        text-align: center;
      }
      .el-upload {
        text-align: left;

      }
      .el-upload__tip {
        margin-top: 20px;
        line-height: 18px;
      }
    }
  }
  .el-dialog-inner-wrapper {
    min-height: 150px;
    padding: 0 30px;
  }
}
</style>

<script>
import { createMateiralClass, moveMaterial, getMaterialClass, getMaterialList, batchRemoveMaterial, getBlobFile } from '@/api/material'
import { getToken, getTokenType } from '@/utils/auth'

export default {
  data() {
    const token = getTokenType() + ' ' + getToken()
    return {
      moveNode: null,
      visibleMove: false,
      uploadFileType: ['', 'image/*', '.mda,.mp3', 'mp4,wmv,avi', '.pdf,.epub'],
      editTitle: '',
      showEditBox: false,
      uploadLoading: false,
      uploadToken: token,
      uploadImageUrl: '',
      showUploadBox: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      cascadeOptions: {
        value: 'id',
        label: 'title',
        children: 'children',
        checkStrictly: true
      },
      classRules: {
        title: [{ required: true, message: "分类名称必须填写" }]
      },
      classIndex: 1,
      classForm: { pId: 0, title: "", content: "" },
      classDialogTitle: "",
      classDialog: false,
      classOptions: [],
      treeData: [],
      treeData2: [],
      treeData3: [],
      treeData4: [],
      moveClassTree: [],
      tidocuments: [],
      audioDocuments: [],
      videoDocuments: [],
      eBookDocuments: [],
      activeName: "first",
      listTextImageTotal: 0,
      listAudioTotal: 0,
      listVideoTotal: 0,
      listEbookTotal: 0,
      listTextImageQuery: {
        status: "",
        keywords: "",
        page: 1,
        pageSize: 20
      },
      uploadTitle: '',
      uploadFormData: {
        pId: []
      },
      editFormData: {
        pId: []
      },
      uploadList: [],
      uploadData: {
        title: '',
        content: '',
        clsId: ''
      },
      imgListQuery: {
        clsId: '',
        searchOfFileName: '',
        page: 1,
        limit: 20
      },
      audioListQuery: {
        clsId: '',
        searchOfFileName: '',
        page: 1,
        limit: 20
      },
      videoListQuery: {
        clsId: '',
        searchOfFileName: '',
        page: 1,
        limit: 20
      },
      eBookListQuery: {
        clsId: '',
        searchOfFileName: '',
        page: 1,
        limit: 20
      },
      imageSelection: [],
      ebookSelection: [],
      videoSelection: [],
      audioSelection: []
    }
  },
  created() {
    this.getImageClass()
    this.getAudioClass()
    this.getVideoClass()
    this.getEBookClass()
    this.getImageList(this.imgListQuery)
    this.getAudioList(this.audioListQuery)
    this.getVideoList(this.videoListQuery)
    this.getEbookList(this.eBookListQuery)
  },
  methods: {
    handleTabClick() {
      switch (this.activeName) {
        case 'first':
          this.moveClassTree = this.treeData
          break
        case 'second':
          this.moveClassTree = this.treeData2
          break
        case 'third':
          this.moveClassTree = this.treeData3
          break
        case 'fourth':
          this.moveClassTree = this.treeData4
          break
      }
    },
    async confirmMovement() {
      if (!this.moveNode) {
        this.$message({ type: 'error', message: '请选择分类' })
        return
      }
      if (this.activeName === 'first' && this.imageSelection.length === 0) {
        this.$message({ type: 'error', message: '请选择素材' })
        return
      }
      if (this.activeName === 'second' && this.audioSelection.length === 0) {
        this.$message({ type: 'error', message: '请选择素材' })
        return
      }
      if (this.activeName === 'third' && this.videoSelection.length === 0) {
        this.$message({ type: 'error', message: '请选择素材' })
        return
      }
      if (this.activeName === 'fourth' && this.ebookSelection.length === 0) {
        this.$message({ type: 'error', message: '请选择素材' })
        return
      }
      let materials = []
      if (this.activeName === 'first') {
        materials = this.imageSelection
      }
      if (this.activeName === 'second') {
        materials = this.audioSelection
      }
      if (this.activeName === 'third') {
        materials = this.videoSelection
      }
      if (this.activeName === 'fourth') {
        materials = this.ebookSelection
      }
      try {
        const { success } = await moveMaterial({ targetClsId: this.moveNode.id, resIds: materials.map(i => i.Id) })
        if (success) {
          this.getImageList(this.imgListQuery)
          this.moveNode = null
          this.$message({ type: 'success', message: '移动成功！' })
          this.visibleMove = false
        } else {
          this.$message({ type: 'error', message: '移动失败，请联系管理员！' })
        }
      } catch (error) {
        this.$message({ type: 'error', message: '移动失败，请联系管理员！' })
      }
    },
    selectMoveClass(node) {
      this.moveNode = node
    },
    showMovement() {
      this.visibleMove = true
    },
    uploadFileChange(evt) {
      console.log(evt)
    },
    play(id) {
      const audio = document.getElementById(id)
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    cancelUploader() {
      this.showUploadBox = false
      this.$refs.uploadForm.resetFields()
      this.$refs.fileUploader.clearFiles()
    },
    confirmUploader() {
      if (this.uploadFormData.pId.length === 0) {
        this.$message({ type: 'error', message: '分类必须选择！' })
        return
      }
      this.uploadData.clsId = this.uploadFormData.pId[this.uploadFormData.pId.length - 1]
      this.uploadLoading = true
      this.$refs.fileUploader.submit()
    },
    textDocumentEdit(row, index) {
      this.showEditBox = true
      if (index === 1) {
        this.editTitle = '编辑图片'
        this.classOptions = this.treeData
      } else if (index === 2) {
        this.editTitle = '编辑音频'
        this.classOptions = this.treeData2
      } else if (index === 3) {
        this.editTitle = '编辑视频'
        this.classOptions = this.treeData3
      } else if (index === 4) {
        this.editTitle = '编辑电子书'
        this.classOptions = this.treeData4
      }
      this.editFormData.pId.push(Number(row.clsId))
      this.editFormData.title = row.title
      this.editFormData.content = row.content
    },
    fileUploaded(evt) {
      this.uploadLoading = false
      if (evt.success) {
        this.$message({ type: 'success', message: '上传成功！' })
        this.showUploadBox = false
        this.$refs.uploadForm.resetFields()
        this.$refs.fileUploader.clearFiles()
        if (this.classIndex === 1) {
          this.getImageList(this.imgListQuery)
        } else if (this.classIndex === 2) {
          this.getAudioList(this.audioListQuery)
        }
      } else {
        this.$message({ type: 'error', message: evt.message })
      }
    },
    toUpload(index) {
      if (index === 1) {
        this.uploadTitle = '上传图片'
        this.classOptions = this.treeData
      } else if (index === 2) {
        this.uploadTitle = '上传音频'
        this.classOptions = this.treeData2
      } else if (index === 3) {
        this.uploadTitle = '上传视频'
        this.classOptions = this.treeData3
      } else if (index === 4) {
        this.uploadTitle = '新增电子书'
        this.classOptions = this.treeData4
      }
      this.classIndex = index
      this.showUploadBox = true
    },
    editMaterial() {
      this.showEditBox = true
    },
    clearDataChildren(arr) {
      arr.forEach(a => this.removeChildren(a))
      return arr
    },
    removeChildren(data) {
      if (data.children.length === 0) {
        delete data.children
      } else {
        data.children.forEach(c => this.removeChildren(c))
      }
      return data
    },
    /**
     * 查询图片列表
     */
    async getImageList(query) {
      try {
        const options = {
          rType: 1,
          start: (query.page - 1) * query.limit + 1,
          limit: query.limit
        }
        if (query.clsId) {
          options.clsId = query.clsId
        }
        if (query.searchOfFileName) {
          options.searchOfFileName = query.searchOfFileName
        }
        const { data: { list, total }} = await getMaterialList(options)
        this.listTextImageTotal = total
        this.tidocuments = list
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 查询音频列表
     */
    async getAudioList(query) {
      try {
        const options = {
          rType: 2,
          start: (query.page - 1) * query.limit + 1,
          limit: query.limit
        }
        if (query.clsId) {
          options.clsId = query.clsId
        }
        if (query.searchOfFileName) {
          options.searchOfFileName = query.searchOfFileName
        }
        const { data: { list, total }} = await getMaterialList(options)
        this.listAudioTotal = total
        this.audioDocuments = list
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 查询视频列表 
     */
    async getVideoList(query) {
      try {
        const options = {
          rType: 3,
          start: (query.page - 1) * query.limit + 1,
          limit: query.limit
        }
        if (query.clsId) {
          options.clsId = query.clsId
        }
        if (query.searchOfFileName) {
          options.searchOfFileName = query.searchOfFileName
        }
        const { data: { list, total }} = await getMaterialList(options)
        this.listVideoTotal = total
        this.videoDocuments = list
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 查询电子书列表
     */
    async getEbookList(query) {
      try {
        const options = {
          rType: 4,
          start: (query.page - 1) * query.limit + 1,
          limit: query.limit
        }
        if (query.clsId) {
          options.clsId = query.clsId
        }
        if (query.searchOfFileName) {
          options.searchOfFileName = query.searchOfFileName
        }
        const { data: { list, total }} = await getMaterialList(options)
        this.listEbookTotal = total
        this.eBookDocuments = list
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 查询图片分类
     */
    async getImageClass() {
      try {
        const { data } = await getMaterialClass({ rType: 1 })
        this.treeData = this.clearDataChildren(data)
        this.moveClassTree = this.treeData
      } catch (error) {
        console.log(error)
      }
    },
    async getAudioClass() {
      try {
        const { data } = await getMaterialClass({ rType: 2 })
        this.treeData2 = this.clearDataChildren(data)
      } catch (error) {
        console.log(error)
      }
    },
    async getVideoClass() {
      try {
        const { data } = await getMaterialClass({ rType: 3 })
        this.treeData3 = this.clearDataChildren(data)
      } catch (error) {
        console.log(error)
      }
    },
    async getEBookClass() {
      try {
        const { data } = await getMaterialClass({ rType: 4 })
        this.treeData4 = this.clearDataChildren(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 选择列表分类
    handleNodeClick(node, index) {
      if (index === 1) {
        this.imgListQuery.clsId = node.id
        this.getImageList(this.imgListQuery)
      } else if (index === 2) {
        this.audioListQuery.clsId = node.id
        this.getAudioList(this.audioListQuery)
      } else if (index === 3) {
        this.videoListQuery.clsId = node.id
        this.getVideoList(this.videoListQuery)
      } else if (index === 4) {
        this.eBookListQuery.clsId = node.id
        this.getEbookList(this.eBookListQuery)
      }
    },
    handleClassChange() {

    },
    /**
     * 显示新增分类
     */
    showClassDialog(index) {
      if (index === 1) {
        this.classDialogTitle = "新增图片分类";
        this.classOptions = this.treeData
      } else if (index === 2) {
        this.classDialogTitle = "新增音频分类";
        this.classOptions = this.treeData2
      } else if (index === 3) {
        this.classDialogTitle = "新增视频分类";
        this.classOptions = this.treeData3
      } else if (index === 4) {
        this.classDialogTitle = "新增电子书分类";
        this.classOptions = this.treeData4
      }
      this.classIndex = index;
      this.classDialog = true;
    },
    /**
     * 取消新增分类
     */
    cancelAddClass() {
      this.$refs.classForm.resetFields();
      this.classDialog = false;
    },
    /**
     * 新增分类
     */
    addNewClass() {
      this.$refs.classForm.validate(async valid => {
        if (valid) {
          const formData = {
            rType: this.classIndex,
            pId: this.classForm.pId instanceof Array ? this.classForm.pId.pop() : 0,
            title: this.classForm.title,
            content: this.classForm.content
          }
          const res = await createMateiralClass(formData)
          if (res.success) {
            this.$message({ type: 'success', message: '新增成功！' })
            this.$refs.classForm.resetFields()
            this.classDialog = false
            switch (this.classIndex) {
              case 1:
                this.getImageClass()
                break
              case 2:
                this.getAudioClass()
                break
              case 3:
                this.getVideoClass()
                break
              case 4:
                this.getEBookClass()
                break
            }
          } else {
            this.$message({ type: 'error', message: '新增失败！' })
          }
          return true
        } else {
          return false
        }
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    async textDocumentDownload(row) {
      try {
        const res = await getBlobFile(row.Id)
        const url = window.URL.createObjectURL(res)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', row.title + '.' + row.src.split('.')[1])// 文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象
      } catch (error) {
        console.log(error.message)
      }
    },
    textDocumentRemove(row, index) {
      this.$confirm('此操作将永久文件' + row.title + '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        await batchRemoveMaterial([{ resId: row.Id }])
        this.$message({ type: 'success', message: '删除成功!' })
        if (index === 1) {
          this.getImageList(this.imgListQuery)
        } else if (index === 2) {
          this.getAudioList(this.audioListQuery)
        } else if (index === 3) {
          this.getVideoList(this.videoListQuery)
        } else if (index === 4) {
          this.getEbookList(this.eBookListQuery)
        }
      })
    },
    toCreateTextImage() {
      this.$router.push({ path: "/commodity/addTextImage" });
    },
    toCreateVideo() {
      this.$router.push({ path: "/commodity/addVideo" });
    },
    toCreateOnAir() {
      this.$router.push({ path: "/commodity/onAir" });
    },
    batchRemoveImage() {
      if (this.imageSelection.length === 0) {
        this.$message({ type: 'error', message: '请先选择图片' })
        return
      }
      this.$confirm('此操作将永久这些文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await batchRemoveMaterial(this.imageSelection.map(img => ({ resId: img.Id })))
        this.$message({ type: 'success', message: '删除成功!' })
        this.getImageList(this.imgListQuery)
      })
    },
    batchRemoveVideo() {
      if (this.videoSelection.length === 0) {
        this.$message({ type: 'error', message: '请先选择视频' })
        return
      }
      this.$confirm('此操作将永久这些文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await batchRemoveMaterial(this.videoSelection.map(img => ({ resId: img.Id })))
        this.$message({ type: 'success', message: '删除成功!' })
        this.getVideoList(this.imgListQuery)
      })
    },
    batchRemoveAudio() {
      if (this.audioSelection.length === 0) {
        this.$message({ type: 'error', message: '请先选择音频' })
        return
      }
      this.$confirm('此操作将永久这些文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await batchRemoveMaterial(this.audioSelection.map(img => ({ resId: img.Id })))
        this.$message({ type: 'success', message: '删除成功!' })
        this.getAudioList(this.imgListQuery)
      })
    },
    batchRemoveEbook() {
      if (this.ebookSelection.length === 0) {
        this.$message({ type: 'error', message: '请先选择电子书' })
        return
      }
      this.$confirm('此操作将永久这些文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const res = await batchRemoveMaterial(this.ebookSelection.map(img => ({ resId: img.Id })))
        this.$message({ type: 'success', message: '删除成功!' })
        this.getEbookList(this.imgListQuery)
      })
    },
    handleEbookSelectionChange(evt) {
      this.ebookSelection = evt
    },
    handleVideoSelectionChange(evt) {
      this.videoSelection = evt
    },
    handleAudioSelectionChange(evt) {
      this.audioSelection = evt
    },
    handleImageSelectionChange(evt) {
      this.imageSelection = evt
    }
  }
}
</script>
