<template>
  <div class="groupby-container">
    <div class="operation">
      <div class="operation-btns">
        <div>
          <el-button type="primary" @click="addGrouping">创建拼团</el-button>
          <el-button type="default" @click="showMovement">拼团使用教程</el-button>
        </div>
        <div>
          <el-input
            v-model="imgListQuery.searchOfFileName"
            placeholder="搜索图片名称"
            class="input-with-select"
          >
            <el-button slot="append" type="primary" @click="() => getImageList(imgListQuery)">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="main-table">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-table
              stripe
              :height="tableHeight"
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
              <el-table-column type="selection" width="55px" />
              <el-table-column prop="image" label="拼团商品" min-width="200px">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="Host + '/res/' + scope.row.src">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="fileSize" align="center" label="成团人数" min-width="120px" />
              <el-table-column prop="createDate" label="拼团价（元）" min-width="160px" />
              <el-table-column prop="createDate" label="团长价（元）" min-width="160px" />
              <el-table-column prop="createDate" label="拼团活动时间" min-width="180px" />
              <el-table-column prop="createDate" label="总团数" min-width="120px" />
              <el-table-column prop="isNet" label="状态" width="100px">
                <template slot-scope="scope">
                  <span v-if="scope.row.isNet === 0" class="process-success">正常</span>
                  <span v-if="scope.row.isNet === 1" class="process-fail">失效</span>
                </template>
              </el-table-column>
              <el-table-column align="right" label="操作" min-width="190px">
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
          @size-change="(val) => { imgListQuery.limit = val; getImageList(imgListQuery) }"
          @current-change="(val) => { imgListQuery.page = val; getImageList(imgListQuery) }"
        />
      </div>
    </div>
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
              :action="Host + '/api/res/addRes'"
              :accept="uploadFileType[classIndex]"
              :list-type="classIndex === 1 ? 'picture-card' : ''"
              :auto-upload="false"
              :file-list="uploadList"
              :limit="100"
              :multiple="true"
              :data="uploadData"
              :on-success="fileUploaded"
              :on-change="uploadFileChange"
              :on-progress="fileUploadProgress"
              :on-error="uploadError"
              :headers="{
                Authorization: uploadToken,
                appid: appid
              }"
            >
              <div v-if="classIndex === 1">
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
              <el-button v-if="classIndex > 1" slot="trigger" size="small" plain type="primary">选取文件</el-button>
              <div v-if="classIndex === 1" slot="tip" class="el-upload__tip">
                1. 建议上传7501334px, JPG PNG 格式
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 2" slot="tip" class="el-upload__tip">
                1. 支持mda，mp3格式，大小不超过500MB
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 3" slot="tip" class="el-upload__tip">
                1. 支持mp4，avi，wmv格式，大小不超过2G
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 4" slot="tip" class="el-upload__tip">
                1. 支持pdf，epub格式，大小不超过100MB
                <br>2. 且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button style="min-width:100px" plain type="primary" @click="cancelUploader">取消</el-button>
        <el-button
          :loading="uploadLoading"
          style="min-width:100px"
          type="primary"
          @click="confirmUploader"
        >确认上传</el-button>
      </div>
    </el-dialog>
    <!-- 更新 -->
    <el-dialog
      width="902px"
      class="x-el-dialog"
      :title="editTitle"
      :visible.sync="showEditBox"
      @closed="clearEditData"
    >
      <div class="upload-container">
        <el-form ref="editUploadForm" :model="editFormData" label-width="100px">
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
          <el-form-item required props="title" label="素材名称：">
            <el-input v-model="editFormData.title" style="width:200px" />
          </el-form-item>
          <el-form-item required prop="file" label="本地文件：">
            <el-upload
              ref="editFileUploader"
              name="file"
              class="upload-demo"
              :action="Host + '/api/res/addRes'"
              :auto-upload="false"
              :file-list="uploadList"
              :limit="100"
              :data="uploadData"
              :on-success="fileUploaded"
              :on-change="editFileChange"
              :headers="{
                Authorization: uploadToken,
                appid: getCurrentShop.appId
              }"
            >
              <div v-if="classIndex === 1">
                <img
                  v-if="editFormData.src"
                  :src="editFormData.file ? editFormData.src : Host + '/res/' + editFormData.src"
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
              <el-button v-if="classIndex > 1" slot="trigger" size="small" plain type="primary">选取文件</el-button>
              <div v-if="classIndex === 1" slot="tip" class="el-upload__tip">
                1. 建议上传7501334px, JPG PNG 格式
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 2" slot="tip" class="el-upload__tip">
                1. 支持mda，mp3格式，大小不超过500MB
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 3" slot="tip" class="el-upload__tip">
                1. 支持mp4，avi，wmv格式，大小不超过2G
                <br>2. 一次最多上传100个文件
              </div>
              <div v-if="classIndex === 4" slot="tip" class="el-upload__tip">
                1. 支持pdf，epub格式，大小不超过100MB
                <br>2. 且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button style="width:100px" plain type="primary" @click="showEditBox = false">取消</el-button>
        <el-button
          :loading="uploadLoading"
          style="width:100px"
          type="primary"
          @click="confirmEdit"
        >确认修改</el-button>
      </div>
    </el-dialog>
    <el-dialog class="x-el-dialog" title="移动素材到" width="600px" :visible.sync="visibleMove">
      <div class="upload-container" style="background:#FFF">
        <el-tree :props="defaultProps" :data="moveClassTree" @node-click="selectMoveClass" />
      </div>
      <div class="submit">
        <el-button style="width:100px" plain type="primary" @click="visibleMove = false">取消</el-button>
        <el-button
          :loading="uploadLoading"
          style="width:100px"
          type="primary"
          @click="confirmMovement"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.groupby-container {
  padding: 40px 40px 0 40px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
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
        width: 400px;
        .color-block {
          width: 28px;
          height: 28px;
        }
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
        // .process-fail::before {
        //   content: "";
        //   display: inline-block;
        //   width: 6px;
        //   height: 6px;
        //   border-radius: 5px;
        //   margin-right: 10px;
        //   margin-bottom: 2px;
        //   background-color: #ff0000;
        // }
        // .process-success::before {
        //   content: "";
        //   display: inline-block;
        //   width: 6px;
        //   height: 6px;
        //   border-radius: 5px;
        //   margin-right: 10px;
        //   margin-bottom: 2px;
        //   background-color: #52c41a;
        // }
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
          background-color: #fafafa;
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
        background-color: #f3f5f7;
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
          background: #ffffff;
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
import {
  createMateiralClass,
  moveMaterial,
  getMaterialClass,
  getMaterialList,
  batchRemoveMaterial,
  getBlobFile,
  getCapacity,
  removeMaterialClass
} from '@/api/material'
import { getToken, getTokenType } from '@/utils/auth'
import { Host } from '@/config'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import reqform from '@/utils/request-form'

export default {
  computed: {
    ...mapGetters(['getCurrentShop'])
  },
  data() {
    const token = getTokenType() + ' ' + getToken()
    return {
      uploadProgressNumber: 0,
      uploadFileNumber: 0,
      capacityData: [
        { name: '图片', size: 200, color: 'red' },
        { name: '音频', size: 200, color: 'yellow' },
        { name: '视频', size: 200, color: 'purple' },
        { name: '电子书', size: 200, color: 'green' }
      ],
      capacity: {
        amount: 0,
        resourceFileTypeSpaceCapacity: {
          image: 0,
          audio: 0,
          video: 0,
          ebook: 0
        },
        usedAmount: 0
      },
      tableHeight: 0,
      dloading: false,
      Host: Host,
      appid: Cookies.get('appid'),
      moveNode: null,
      visibleMove: false,
      uploadFileType: [
        '',
        'image/*',
        '.mda,.mp3',
        '.mp4,.wmv,.avi',
        '.pdf,.epub'
      ],
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
        title: [{ required: true, message: '分类名称必须填写' }]
      },
      classIndex: 1,
      classForm: { pId: 0, title: '', content: '' },
      classDialogTitle: '',
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
      activeName: 'first',
      listTextImageTotal: 0,
      listAudioTotal: 0,
      listVideoTotal: 0,
      listEbookTotal: 0,
      imagePage: 1,
      listTextImageQuery: {
        status: '',
        keywords: '',
        page: 1,
        pageSize: 20
      },
      uploadTitle: '',
      uploadFormData: {
        pId: []
      },
      editFormData: {
        pId: [],
        title: '',
        src: '',
        file: null
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
      audioSelection: [],
      uploadFileList: []
    }
  },
  created() {
    this.tableHeight = window.innerHeight - 360
  },
  methods: {
    addGrouping() {
      this.$router.push({ path: '/marketing/addGrouping' })
    },
    removeGroup(node, data, index) {
      this.$confirm(`确认删除分组 ${data.title} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async(_) => {
        try {
          const { success } = await removeMaterialClass({ clsId: data.id })
          if (success) {
            this.$message({
              type: 'success',
              message: '分类已删除'
            })
            switch (index) {
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
          }
        } catch (error) {}
      })
    },
    // 清除编辑表单数据
    clearEditData() {
      this.$refs.editUploadForm.clearFields()
      this.$refs.editFileUploader.clearFiles()
    },
    // 上传编辑图片
    editFileChange(file) {
      this.editFormData.src = URL.createObjectURL(file.raw)
      this.editFormData.file = file.raw
    },
    // 标签页切换
    handleTabClick() {
      switch (this.activeName) {
        case 'first':
          this.classIndex = 1
          this.moveClassTree = this.treeData.filter((tree) => tree.id !== 0)
          break
        case 'second':
          this.classIndex = 2
          this.moveClassTree = this.treeData2.filter((tree) => tree.id !== 0)
          break
        case 'third':
          this.classIndex = 3
          this.moveClassTree = this.treeData3.filter((tree) => tree.id !== 0)
          break
        case 'fourth':
          this.classIndex = 4
          this.moveClassTree = this.treeData4.filter((tree) => tree.id !== 0)
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
        const { success, message } = await moveMaterial({
          targetClsId: this.moveNode.id,
          resIds: materials.map((i) => i.Id)
        })
        if (success) {
          this.getImageList(this.imgListQuery)
          this.moveNode = null
          this.$message({ type: 'success', message: '移动成功！' })
          this.visibleMove = false
        } else {
          this.$message({ type: 'error', message })
        }
      } catch (error) {
        console.log(error)
        this.$message({ type: 'error', message: '移动失败，请联系管理员！' })
      }
    },
    selectMoveClass(node) {
      this.moveNode = node
    },
    showMovement() {
      switch (this.activeName) {
        case 'first':
          if (this.imageSelection.length === 0) {
            this.$message({ type: 'error', message: '请先选择素材！' })
            return
          }
          break
        case 'second':
          if (this.audioSelection.length === 0) {
            this.$message({ type: 'error', message: '请先选择素材！' })
            return
          }
          break
        case 'third':
          if (this.videoSelection.length === 0) {
            this.$message({ type: 'error', message: '请先选择素材！' })
            return
          }
          break
        case 'fourth':
          if (this.ebookSelection.length === 0) {
            this.$message({ type: 'error', message: '请先选择素材！' })
            return
          }
          break
      }
      this.visibleMove = true
    },
    uploadFileChange(file, fileList) {
      this.uploadFileList = fileList
      this.uploadFileNumber = fileList.length
    },
    uploadError(err) {
      console.log(err, 'err')
    },
    // 播放
    play(id) {
      const audio = document.getElementById(id)
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    // 取消上传
    cancelUploader() {
      this.showUploadBox = false
      this.$refs.uploadForm.resetFields()
      this.$refs.fileUploader.clearFiles()
    },
    // 确认新增
    confirmUploader() {
      if (this.uploadFormData.pId.length === 0) {
        this.$message({ type: 'error', message: '分类必须选择！' })
        return
      }
      if (this.uploadFileList.length === 0) {
        this.$message({ type: 'error', message: '请选择要上传的文件！' })
        return
      }
      this.uploadData.clsId = this.uploadFormData.pId[
        this.uploadFormData.pId.length - 1
      ]
      this.uploadLoading = true
      this.confirmFileNumber = this.uploadFileNumber
      this.$refs.fileUploader.submit()
    },
    // 确认修改
    async confirmEdit() {
      if (!this.editFormData.title) {
        this.$message({ type: 'error', message: '素材名称必须填写' })
        return
      }
      try {
        const formData = {
          resId: this.editFormData.id,
          title: this.editFormData.title,
          clsId: this.editFormData.pId[0]
        }
        if (this.editFormData.file) {
          formData.file = this.editFormData.file
        }
        const { success, message } = await reqform('res/editRes', formData)
        if (success) {
          this.$message({ type: 'success', message: '修改成功！' })
          this.showEditBox = false
          switch (this.activeName) {
            case 'first':
              this.getImageList(this.imgListQuery)
              break
            case 'second':
              this.getAudioList(this.audioListQuery)
              break
            case 'third':
              this.getVideoList(this.videoListQuery)
              break
            case 'fourth':
              this.getEbookList(this.eBookListQuery)
              break
          }
        } else {
          this.showEditBox = false
          this.$message({ type: 'success', message })
        }
      } catch (error) {
        console.log(error)
      }
    },
    textDocumentEdit(row, index) {
      this.showEditBox = true
      this.classIndex = index
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
      this.editFormData.id = row.Id
      this.editFormData.pId.push(Number(row.clsId))
      this.editFormData.title = row.title
      this.editFormData.content = row.content
      this.editFormData.src = row.src
      console.log(this.editFormData)
    },
    fileUploadProgress(event, file, fileList) {
      if (event.percent === 100) {
        this.uploadProgressNumber++
        if (this.uploadProgressNumber === this.confirmFileNumber) {
          this.$message({ type: 'success', message: '上传成功！' })
          this.uploadFileList = []
          this.uploadLoading = false
          this.uploadProgressNumber = 0
          this.showUploadBox = false
          this.$refs.uploadForm.resetFields()
          this.$refs.fileUploader.clearFiles()
          if (this.classIndex === 1) {
            this.getImageList(this.imgListQuery)
          } else if (this.classIndex === 2) {
            this.getAudioList(this.audioListQuery)
          } else if (this.classIndex === 3) {
            this.getVideoList(this.videoListQuery)
          } else if (this.classIndex === 4) {
            this.getEbookList(this.eBookListQuery)
          }
        }
      }
    },
    fileUploaded(evt, fileList) {

    },
    toUpload(index) {
      if (index === 1) {
        this.uploadTitle = '上传图片'
        this.classOptions = this.treeData.filter((tree) => tree.id !== 0)
      } else if (index === 2) {
        this.uploadTitle = '上传音频'
        this.classOptions = this.treeData2.filter((tree) => tree.id !== 0)
      } else if (index === 3) {
        this.uploadTitle = '上传视频'
        this.classOptions = this.treeData3.filter((tree) => tree.id !== 0)
      } else if (index === 4) {
        this.uploadTitle = '新增电子书'
        this.classOptions = this.treeData4.filter((tree) => tree.id !== 0)
      }
      this.classIndex = index
      this.showUploadBox = true
    },
    editMaterial() {
      this.showEditBox = true
    },
    clearDataChildren(arr) {
      arr.forEach((a) => this.removeChildren(a))
      arr.unshift({
        id: 0,
        pId: 0,
        title: '全部',
        content: '全部分组',
        children: []
      })
      return arr
    },
    removeChildren(data) {
      if (data.children.length === 0) {
        delete data.children
      } else {
        data.children.forEach((c) => this.removeChildren(c))
      }
      return data
    },

    /**
     * 取消新增分类
     */
    cancelAddClass() {
      this.$refs.classForm.resetFields()
      this.classDialog = false
    },
    /**
     * 新增分类
     */
    addNewClass() {
      this.$refs.classForm.validate(async(valid) => {
        if (valid) {
          const formData = {
            rType: this.classIndex,
            pId:
              this.classForm.pId instanceof Array
                ? this.classForm.pId.pop()
                : 0,
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
                await this.getImageClass()
                break
              case 2:
                await this.getAudioClass()
                this.moveClassTree = this.treeData2
                break
              case 3:
                await this.getVideoClass()
                this.moveClassTree = this.treeData3
                break
              case 4:
                await this.getEBookClass()
                this.moveClassTree = this.treeData4
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
    handleSizeChange() {},
    handleCurrentChange() {},
    async textDocumentDownload(row) {
      try {
        const not = this.$notify({
          message: '正在下载...',
          duration: 0
        })
        const res = await getBlobFile(row.Id)
        const url = window.URL.createObjectURL(res)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', row.title) // 文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象
        not.close()
      } catch (error) {
        console.log('error', error.message)
      }
    },
    textDocumentRemove(row, index) {
      this.$confirm('此操作将永久文件' + row.title + '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async(_) => {
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
      this.$router.push({ path: '/commodity/addTextImage' })
    },
    toCreateVideo() {
      this.$router.push({ path: '/commodity/addVideo' })
    },
    toCreateOnAir() {
      this.$router.push({ path: '/commodity/onAir' })
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
      }).then(async(_) => {
        const res = await batchRemoveMaterial(
          this.imageSelection.map((img) => ({ resId: img.Id }))
        )
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
      }).then(async(_) => {
        const res = await batchRemoveMaterial(
          this.videoSelection.map((img) => ({ resId: img.Id }))
        )
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
      }).then(async(_) => {
        const res = await batchRemoveMaterial(
          this.audioSelection.map((img) => ({ resId: img.Id }))
        )
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
      }).then(async(_) => {
        const res = await batchRemoveMaterial(
          this.ebookSelection.map((img) => ({ resId: img.Id }))
        )
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
