<template>
  <div>
    <template>
      <div>
        <div class="option-config-container">
          <p class="comp-tips">最多可添加10个图片，图片大小不超过2M，拖动选中的图片可对其进 行排序</p>
        </div>
        <div class="line-options" style="margin-bottom:0;border-bottom:0">
          <el-form>
            <el-form-item>
              <h4 style="margin:10px 0;color:#999">一行显示</h4>
              <div>
                <el-radio v-model="action.num" label="2">2张</el-radio>
                <el-radio v-model="action.num" label="3">3张</el-radio>
                <el-radio v-model="action.num" label="swiper">轮播图</el-radio>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="line-options" style="margin-top:0">
          <el-form>
            <el-form-item>
              <h4 style="margin:10px 0;color:#999">内容样式</h4>
              <div>
                <el-radio v-model="action.displayType" label="space">留边</el-radio>
                <el-radio v-model="action.displayType" label="fill">填充</el-radio>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="option-config-container">
          <div
            ref="itemlist"
            class="option-container"
            @dragstart="onDragStart"
            @dragover="onDragOver"
            @dragend="onDragEnd"
          >
            <div
              class="form-list-panel"
              style="margin-top: 0;margin-bottom:8px;"
              v-for="(item, idx) in list"
              :key="item.key"
            >
              <upload :index="idx" :item="item" @removeitem="removeItem"></upload>
            </div>
            <div class="add-option" style="height:50px">
              <el-button type="text" icon="el-icon-plus" @click="addItem">添加图文</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import util from "@/utils/util.js"
import upload from "@/common/navUpload.vue"
import compConfig from "@/config/comp.config.js"
import { createUniqueString } from "@/utils/index"
export default {
  components: {
    upload,
  },
  data() {
    return {
      list: this.items,
      defaultConf: util.copyObj(compConfig["fenlei"]),
      draging: null,
      target: null
    };
  },
  props: {
    items: {
      type: Array,
    },
    action: {
      type: Object,
      default: () => ({ display: 1 }),
    },
  },
  methods: {
    removeItem(index) {
      console.log(index)
      this.list.splice(index, 1)
    },
    onDragStart(event) {
      this.draging = event.target;
    },
    onDragOver(event) {
      this.target = this.getParent(event.target);
      if (!this.target) {
        return
      }
      if (this.target !== this.draging) {
        const dragingIndex = this._index(this.draging)
        const targetIndex = this._index(this.target)
        const dragingItem = this.list[dragingIndex]
        const targetItem = this.list[targetIndex]
        this.list.splice(dragingIndex, 1, targetItem)
        this.list.splice(targetIndex, 1, dragingItem)
      }
    },
    onDragEnd(event) {

    },
    _index(el){
      let domData=Array.from(this.$refs.itemlist.childNodes)
      return domData.findIndex(i=>i.getAttribute('data-key') === el.getAttribute('data-key'))
    },
    getParent(node) {
      if (node.className !== 'form-list-panel') {
        return this.getParent(node.parentNode)
      } else {
        return node
      }
    },
    upItem(idx) {
      const tmp = util.copyObj(this.list[idx]);
      this.list.splice(idx, 1);
      this.list.splice(idx - 1, 0, tmp);
    },
    removeClass(index) {
      this.$confirm("确认删除分类" + this.list[index].label + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then((_) => {
        this.$bus.$emit("removefenleiclass", {
          index,
          key: this.list[index].key,
        });
        this.list.splice(index, 1);
      });
    },
    downItem(idx) {
      const tmp = util.copyObj(this.list[idx]);
      this.list.splice(idx, 1);
      this.list.splice(idx + 1, 0, tmp);
    },
    delItem(idx) {
      this.list.splice(idx, 1);
    },
    addItem() {
      // if (this.list.length < 4) {
      // } else {
      //   this.$alert("最多添加4个分类！");
      // }
      // const newConfig = util.copyObj(this.defaultConf.action.config[0]);
      // newConfig.key = this.list.length + 1;
      // this.list.push(newConfig);
      const item = this.defaultConf.action.config[0];
      item.key = createUniqueString();
      this.list.push(util.copyObj(item));
    },
    addClassItem(cls) {
      // const newObj = util.copyObj(this.list[0]);
      // (newObj.key = this.list.length + 1),
      //   (newObj.val = ""),
      //   (newObj.desc = "默认文案描述，默认文案描述，默认文案描述默认文案描述"),
      //   (newObj.click = null);
      // this.list.push(newObj);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
