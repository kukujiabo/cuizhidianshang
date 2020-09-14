<template>
  <div class="goods-container">
    <div class="title">
      <p>达人榜</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="达人榜" name="first">
        <div class="operation">
          <promote-staff-list />
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品列表" name="second">
        <div class="operation">
          <goods />
        </div>
      </el-tab-pane>
      <el-tab-pane label="推广记录" name="third">
        <div class="operation">
          <promote-records />
        </div>
      </el-tab-pane>
      <el-tab-pane label="绑定查询" name="fourth">
        <div class="operation">
          <relate-list />
        </div>
      </el-tab-pane>
      <el-tab-pane label="业绩统计" name="fifth">
        <div class="operation">
          <performance-data />
        </div>
      </el-tab-pane>
      <el-tab-pane label="推广设置" name="sixth">
        <div class="operation">
          <promote-settings />
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
          border: 0 !important;
          background-color: #fafafa;
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
  .share-box {
    .el-dialog__body {
      padding: 0;
      .share-content {
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .share-code {
          width: 180px;
          height: 180px;
        }
      }
      .share-link {
        padding: 20px;
        .el-input__inner {
          background-color: #f3f5f7;
        }
      }
    }
  }
}
</style>

<script>
import PromoteStaffList from '@/views/marketing/promoteStaffComponents/promoteStaffList'
import PromoteSettings from '@/views/marketing/promoteStaffComponents/promoteSettings'
import PromoteRecords from '@/views/marketing/promoteStaffComponents/promoteRecords'
import PerformanceData from '@/views/marketing/promoteStaffComponents/performanceData'
import RelateList from '@/views/marketing/promoteStaffComponents/relateList'
import Goods from '@/views/marketing/promoteStaffComponents/goods'
import { queryDocuments, removeGood, stopGoods, removeGoods, editStatus } from '@/api/document'
import { Host } from '@/config'
import { getToken, getTokenType } from '@/utils/auth'
import Cookies from 'js-cookie'
import Clipboard from 'clipboard'

const upTypes = [
  '',
  'upGoodsImage',
  'upVideo',
  'upTv',
  'upPoster',
  '',
  'upAudio'
]

export default {
  components: {
    Goods,
    RelateList,
    PromoteRecords,
    PromoteSettings,
    PerformanceData,
    PromoteStaffList
  },
  data() {
    const shopName = Cookies.get('shopName')
    return {
      Host: Host,
      shareLink: '1123123123123',
      shareName: '',
      shopName: shopName,
      loading: false,
      showShareBox: false,
      editLoading: false,
      postDialogTitle: '上传海报',
      tidocuments: [],
      videoDocuments: [],
      audioList: [],
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
      },
      audioListTotal: 0,
      listAudioQuery: {
        cType: 6,
        clsId: 0,
        search: '',
        putMode: 0,
        start: 1,
        limit: 20
      },
      onAirTotal: 0,
      listOnAirQuery: {
        cType: 3,
        clsId: 0,
        search: '',
        putMode: 0,
        start: 1,
        limit: 20
      },
      onAirList: [],
      showUploadPoster: false,
      newPostForm: {
        id: '',
        title: '',
        content: '',
        putMode: 1,
        cover: null,
        coverUrl: '',
        readyPutDate: ''
      },
      posterTotal: 0,
      posterList: [],
      listPosterQuery: {
        cType: 4,
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
    this.getAudioList(this.listAudioQuery)
    this.getOnAirDocuments(this.listOnAirQuery)
    this.getPosterDocuments(this.listPosterQuery)
  },
  methods: {
    editStatus(row, putMode) {
      editStatus({ goodsId: row.id, putMode })
    },
    cancelPoster() {
      this.showUploadPoster = false
    },
    showShareDialog(row) {
      this.showShareBox = true
      this.shareName = row.title
    },
    copyShareLink() {
      this.$refs.copyInput.select()
      document.execCommand('copy')
      this.$message({
        type: 'success',
        message: '分享链接已复制'
      })
    },
    clearPosterFields() {
      this.newPostForm.coverUrl = ''
      this.newPostForm.cover = null
      this.$refs.uploadFilePoster.clearFiles()
      // this.$refs.uploadPosterForm.resetFields()
      this.newPostForm.title = ''
      this.newPostForm.content = null
      this.newPostForm.putMode = 0
      this.newPostForm.id = ''
    },
    // 编辑海报
    editPoster(row) {
      this.postDialogTitle = '编辑海报'
      this.newPostForm.id = row.id
      this.newPostForm.content = row.content
      this.newPostForm.title = row.title
      this.newPostForm.coverUrl = Host + '/res/' + row.cover
      this.newPostForm.putMode = row.putMode
      this.newPostForm.readyPutDate = row.readyPutDate
      this.showUploadPoster = true
    },
    editVoice(row) {
      this.$router.push({ path: '/commodity/editVoice?id=' + row.id })
    },
    submitPoster() {
      if (!this.newPostForm.title) {
        this.$message({ type: 'error', message: '海报名称必须填写！' })
        return
      }
      if (!this.newPostForm.content) {
        this.$message({ type: 'error', message: '海报分类必须填写！' })
        return
      }
      if (!this.newPostForm.id && !this.newPostForm.cover) {
        this.$message({ type: 'error', message: '海报图片必须上传！' })
        return
      }
      const api = Host + (this.newPostForm.id ? '/api/goods/upPoster' : '/api/goods/addPoster')
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', api)
      xhr.setRequestHeader('Authorization', getTokenType() + ' ' + getToken())
      xhr.onload = () => {
        this.loading = false
        this.editLoading = false
        if (xhr.status !== 200) {
          return
        }
        const { success, message } = JSON.parse(xhr.responseText)
        if (success) {
          if (!this.newPostForm.id) {
            this.$message({ type: 'success', message: '添加成功！' })
          } else {
            this.$message({ type: 'success', message: '修改成功！' })
          }
          this.getPosterDocuments(this.listPosterQuery)
          setTimeout(_ => {
            this.showUploadPoster = false
          }, 1000)
        } else {
          this.$message({ type: 'error', message: message })
        }
      }
      const goodsForm = new FormData()
      goodsForm.append('title', this.newPostForm.title)
      if (this.newPostForm.cover) {
        goodsForm.append('cover', this.newPostForm.cover, this.newPostForm.cover.filename)
      }
      goodsForm.append('content', this.newPostForm.content)
      goodsForm.append('putMode', this.newPostForm.putMode)
      goodsForm.append('readyPutDate', this.newPostForm.readyPutDate)
      if (this.newPostForm.id) {
        goodsForm.append('id', this.newPostForm.id)
      }
      xhr.setRequestHeader('appid', Cookies.get('appid'))
      this.editLoading = true
      xhr.send(goodsForm)
    },
    changeUploadPoster(file) {
      this.newPostForm.cover = file.raw
      this.newPostForm.coverUrl = URL.createObjectURL(file.raw)
    },
    // 查询海报档案
    async getPosterDocuments(query) {
      try {
        const { data: { list, total }} = await queryDocuments(query)
        this.posterList = list
        this.posterTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    // 查询直播档案
    async getOnAirDocuments(query) {
      try {
        const { data: { list, total }} = await queryDocuments(query)
        this.onAirList = list
        this.onAirTotal = total
      } catch (error) {
        console.log(error)
      }
    },
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
    // 查询音频档案
    async getAudioList(query) {
      try {
        const { data: { list, total }} = await queryDocuments(query)
        this.audioList = list
        this.audioListTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick() {},
    editImageText(row) {
      this.$router.push({ path: '/commodity/editTextImage?id=' + row.id })
    },
    editVideo(row) {
      this.$router.push({ path: '/commodity/editVideo?id=' + row.id })
    },
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
    handleCommand(command, row, index) {
      switch (command) {
        case 'r':
          this.remove(row, index)
          break
        case 'c':
          this.$router.push({ path: '/commodity/comments', query: { type: index }})
          break
        case 's':
          this.stop(row, index)
          break
      }
    },
    /**
     * 下架档案
     */
    stop(row, index) {
      this.$confirm(`确认下架 ${row.title} ？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async _ => {
        try {
          const { success } = await stopGoods(row.id, upTypes[row.cType])
        } catch (error) {
          console.log(error)
        }
      })
    },
    /**
     * 删除档案
     */
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
              case 3:
                this.getAudioList(this.listAudioQuery)
                break
              case 4:
                this.getOnAirDocuments(this.listOnAirQuery)
                break
              case 5:
                this.getPosterDocuments(this.listPosterQuery)
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
