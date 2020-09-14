<template>
  <div>
    <template v-if="list && list.length">
      <div>
        <p style="color:#a1a1a1;margin-left:25px">最多可添加30个图文</p>
        <div class="list-type">
          <h4 style="font-size:16px">列表样式</h4>
          <el-radio-group v-model="action.display">
            <el-radio label="list">列表</el-radio>
            <el-radio label="small">小图</el-radio>
            <el-radio label="large">大图</el-radio>
          </el-radio-group>
        </div>
        <div class="class-wrapper" v-for="(cls, cindex) in list" :key="cls.key">
          <div class="class-item">
            <div class="class-name">
              <el-form-item class="small" label="分类名称：">
                <el-input
                  v-model="cls.label"
                  placeholder="请填写分类名称（最长4个字符）"
                  :maxlength="4"
                >
                </el-input>
              </el-form-item>
            </div>
            <div class="add-goods-list" style="padding: 0">
              <div
                class="good-info" 
                style="margin-bottom:15px"
                v-for="(good, index) in cls.children"
                :key="good.key"
              >
                <div class="type">
                  {{goodsType[good.cType - 1]}}
                </div>
                <div class="name">{{good.title}}</div>
                <div class="remove" @click="removeGoods(cindex, index)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
            <div class="new-goods" @click="addGoods(cindex)">+ 添加商品</div>
          </div>
        </div>
      </div>
    </template>
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
          <select-goods @cancel="cancel" @goodsselected="selectGoods" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="padding: 0 25px;">
      <div class="new-goods new-class" @click="addItem">+ 添加分类</div>
      <!-- <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加分类</el-button> -->
    </div>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import upload from '@/common/navUpload.vue'
  import compConfig from '@/config/comp.config.js'
  import SelectGoods from "@/common/selectGoods";
  export default {
    components: {
      upload,
      SelectGoods
    },
    data() {
      return {
        cindex: 0,
        dialogShow: false,
        list: this.items,
        selectedGood: null,
        defaultConf: util.copyObj(compConfig['fenlei']),
        goodsType: [ '图文', '视频', '直播', '海报', '', '音频' ]
      }
    },
    props: {
      items: {
        type: Array
      },
      action: {
        type: Object,
        default: () => ({ display: 'list' })
      }
    },
    watch: {
      items(val) {
        this.list = val
      }
    },
    methods: {
      cancel() {
        this.dialogShow = false
        this.selectedGood = null
      },
      selectGoods({ row }) {
        console.log(row)
        this.selectedGood = row;
      },
      confirm() {
        this.list[this.cindex].children.push(this.selectedGood)
        this.selectedGood = null;
        this.dialogShow = false;
      },
      upItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx - 1, 0, tmp)
      },
      removeGoods(cindex, index) {
        this.list[cindex].children.splice(index, 1)
      },
      removeClass(index) {
        this.$confirm('确认删除分类' + this.list[index].label + '吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(_ => {
          this.$bus.$emit('removefenleiclass', { index, key: this.list[index].key })
          this.list.splice(index, 1)
        })
      },
      downItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx + 1, 0, tmp)
      },
      delItem(tab, idx) {
        tab.children.splice(idx, 1)
      },
      addItem() {
        if (this.list.length < 4) {
          const newConfig = util.copyObj(this.defaultConf.action.config[0])
          newConfig.key = this.list.length + 1
          newConfig.label = '分类' + (this.list.length + 1)
          this.list.push(newConfig)
        } else {
          this.$alert('最多添加4个分类！')
        }
      },
      addGoods(cindex) {
        this.cindex = cindex
        this.dialogShow = true;
      },
      addClassItem(cls) {
        // const newObj = util.copyObj(cls.children[0])
        // newObj.key = cls.children.length,
        // newObj.val = 'https://yangyuji.github.io/h5-factory/static/img/logo.png',
        // newObj.title = '默认标题',
        // newObj.desc = '默认文案描述，默认文案描述，默认文案描述默认文案描述',
        // newObj.click = null
        // cls.children.push(newObj)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.list-type {
  border-top: 0.5px solid #e1e1e1;
  border-bottom: 0.5px solid #e1e1e1;
  display: flex;
  color: #a1a1a1;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  padding: 0 25px;
  height: 108px;
  > h4 {
    margin: 0 0 20px 0;
  }
}
.class-wrapper {
  padding: 25px;
  .class-item {
    background-color: #f3f5f7;
    border-radius: 8px;
    padding: 16px;
    .class-name {
      padding: 15px 8px 15px 5px;
    }
  }
}
.new-class {
  height: 50px;
  line-height: 50px;
}
</style>
