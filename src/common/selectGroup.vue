<template>
  <div class="select-material">
    <el-row :gutter="24">
      <el-col :span="24">
        <div>
          <div class="search-img">
            <el-input
              v-model="listQuery.search"
              class="input-with-select"
              placeholder="搜索名称"
            >
              <el-button
                slot="append"
                type="primary"
                @click="searchImage"
                >搜索
              </el-button>
            </el-input>
          </div>
        </div>
        <div class="group-list">
          <div class="heading">
            <p>分组列表（可多选）</p>
          </div>
          <div class="group-list-item" v-for="group in clsList" :key="group.id">
            <div>
              <p class="title">{{group.title}}</p>
              <p class="num">共{{group.goodsQty}}个商品</p>
            </div>
            <div>
              <i v-if="selectedGroups.includes(group)" class="el-icon-success active" @click="unsetSelectGroup(group)"></i>
              <i v-else class="el-icon-success inactive" @click="setSelectGroup(group)"></i>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;text-align:right">
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="listQuery.limit"
            :total="listTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
    </div> -->
  </div>
</template>
<style lang="scss">
@import '~@/styles/color.scss';
.select-material {
  .group-list {
    background-color: #fff;
    .heading {
      padding: 10px 25px;
    }
    .group-list-item {
      height: 90px;
      padding: 20px 25px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #efefef;
      .title {
        font-size: 16px;
      }
      .num {
        font-size: 12px;
      }
      .el-icon-success {
        font-size: 20px;
        cursor: pointer;
      }
      .inactive {
        color: #a1a1a1;
      }
      .active {
        color: $themeBlue;
      }
    }
  }
  .cls {
    color: #333;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    padding: 32px 24px;
    border-bottom: 0.5px solid #efefef;
    .cls-item {
      display: inline-block;
      font-size: 16px;
      margin-right: 40px;
      padding: 10px 0;
      cursor: pointer;
    }
    .active {
      font-weight: 900;
      color: $themeBlue;
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
  .info {
    display: flex;
    flex-direction: row;
    p {
      margin: 5px 10px;
    }
  }
  .select-icon {
    font-size: 20px;
  }
  .select-icon:hover {
    cursor: pointer;
  }
}
</style>
<script>
import { queryDocuments } from '@/api/document'
import { queryGoodsGroup } from '@/api/goodsGroup'
import { Host } from '@/config'
export default {
  data() {
    return {
      Host: Host,
      clsList: [],
      searchPicName: '',
      imgUrl: '',
      imgList: [],
      activeCls: 1,
      listTotal: 0,
      listQuery: {
        seach: '',
        clsId: 0,
        cType: 1,
        start: 1,
        limit: 20
      },
      selectedGroups: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      selectedRow: { id: 0 },
    }
  },
  created() {
    this.queryGoodsGroup(1)
    this.queryDocuments(1)
  },
  methods: {
    // 取消选择
    cancel() {
      this.$confirm('确认取消选择？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(_ => {
        this.$emit('cancel')
      })
    },
    setSelectGroup(group) {
      this.selectedGroups.push(group)
      this.$emit('groupselected', this.selectedGroups)
    },
    unsetSelectGroup(group) {
      this.selectedGroups = this.selectedGroups.filter(g => g !== group)
      this.$emit('groupselected', this.selectedGroups)
    },
    // 查询商品分类
    async queryGoodsGroup(cType) {
      try {
        const { data } = await queryGoodsGroup({ cType })
        this.clsList = data
      } catch (error) {
        console.log(error)
      }
    },
    // 查询商品列表
    async queryDocuments(cType) {
      try {
        this.listQuery.cType = cType
        const { data: { list, total }} = await queryDocuments(this.listQuery)
        this.imgList = list
        this.listTotal = total
      } catch (error) {
        console.log(erro)
      }
    },
    // 切换分组
    switchCls(index) {
      this.activeCls = index
      this.listQuery.start = 1
      this.listQuery.clsId = 0
      this.listQuery.search = ''
      // this.queryGoodsGroup(index)
      this.queryDocuments(index === 3 ? 6 : index)
    },
    // 选择商品
    handleClick(row) {
      this.selectedRow = row 
      this.$emit('goodsselected', { row, cls: this.activeCls })
    },
    // 搜索列表
    async searchImage() {
      this.queryDocuments(this.activeCls === 3 ? 6 : this.activeCls)
    },
    upload(e) {
      const file = e.target.files[0]
      if (file) {
        if (['image/gif', 'image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) > -1) {
          // 获取图片宽高
          const reader = new FileReader()
          reader.onloadend = () => {
            const img = new Image()
            img.onload = () => {
              let invalide = true
              if (this.item.hasOwnProperty('limit')) {
                if (img.width !== this.item.limit.w) {
                  invalide = false
                  this.$alert('图片宽度必须为 ' + this.item.limit.w + 'px', '提示')
                }
                if (img.height !== this.item.limit.h) {
                  invalide = false
                  this.$alert('图片高度必须为 ' + this.item.limit.h + 'px', '提示')
                }
                if (file.size / 1024 > this.item.limit.s) {
                  invalide = false
                  this.$alert('图片大小不能超过 ' + this.item.limit.s + 'k', '提示')
                }
              } else {
                if (img.width > 750) {
                  invalide = false
                  this.$alert('图片宽度不能超过750px', '提示')
                }
                if (file.type === 'image/gif') {
                  if (file.size / 1024 > 2048) {
                    invalide = false
                    this.$alert('gif图片不能超过2048k', '提示')
                  }
                } else {
                  if (file.size / 1024 > 512) {
                    invalide = false
                    this.$alert('jpeg、png图片不能超过512k', '提示')
                  }
                }
              }
              if (invalide) {
                const width = 750
                const height = img.height * (750 / img.width).toFixed(4)
                this.item.width = width
                this.item.height = height
                this.item.val = img.src
                this.$emit('uploadSuccess', this.item, img, this.index)
              }
            }
            img.src = reader.result
            this.$emit('beforeUpload', file, this.item, img, this.index)
          }
          reader.onerror = (err) => {
            console.log('reader error', err)
          }
          // 读出文件路径
          reader.readAsDataURL(file)
        } else {
          this.$alert('图片格式须为jpg、jpeg、png、gif之一！', '提示')
        }
      }
    },
    setImgUrl() {
      try {
        const img = new Image()
        img.onload = () => {
          let invalide = true
          if (this.item.hasOwnProperty('limit')) {
            if (img.naturalWidth !== this.item.limit.w) {
              invalide = false
              this.$alert('图片宽度必须为 ' + this.item.limit.w + 'px', '提示')
            }
            if (img.naturalHeight !== this.item.limit.h) {
              invalide = false
              this.$alert('图片高度必须为 ' + this.item.limit.h + 'px', '提示')
            }
          } else {
            if (img.naturalWidth > 750) {
              invalide = false
              this.$alert('图片宽度不能超过750px', '提示')
            }
          }
          if (invalide) {
            const width = 750
            const height = img.naturalHeight * (750 / img.naturalWidth).toFixed(4)
            this.item.width = width
            this.item.height = height
            this.item.val = img.src
            this.dialogShow = false
            this.$emit('uploadSuccess', this.item, img, this.index)
          }
        }
        img.src = this.imgUrl
      } catch (e) {
        console.warn(e)
      }
    },
    delImg(item) {
      item.val = ''
    }
  }
}
</script>
