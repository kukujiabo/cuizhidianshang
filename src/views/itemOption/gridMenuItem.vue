<template>
  <div>
    <template v-if="items && items.length">
      <div class="option-config-container">
        <p style="font-size:12px;color:#a1a1a1">建议上传尺寸为1:1，JPG、PNG、GIF格式，大小不超过2M</p>
      </div>
      <div class="divider"></div>
      <div class="option-config-container">
        <div class="line-options">
          <el-form>
            <el-form-item>
              <h4 style="margin:10px 0;color:#999">一行显示</h4>
              <div>
                <el-radio v-model="action.num" :label="3">3</el-radio>
                <el-radio v-model="action.num" :label="4">4</el-radio>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="divider"></div>
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
            v-for="(item, idx) in items"
            :data-key="item.key"
            :key="item.key"
            :draggable="true"
          >
            <upload
              :label="'图片' + (idx + 1)"
              :index="idx"
              :item="item"
              :shape="2"
              option-type="grid-menu-item"
              @removeitem="removeItem"
              />
          </div>
          <div class="add-option" style="height:50px">
            <el-button type="text" icon="el-icon-plus" @click="addItem">添加图文导航</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { createUniqueString } from "@/utils/index";
import util from "@/utils/util.js";
import compConfig from "@/config/comp.config.js";
import upload from "@/common/navUpload.vue";
export default {
  name: 'grid-menu-item',
  data() {
    return {
      target: null,
      optionType: 2,
      defaultConf: util.copyObj(compConfig["grid-menu"]),
      items: this.grids,
      num: "3",
      option: this.option,
    };
  },
  components: {
    upload,
  },
  props: {
    action: {
      type: Object,
      default: () => ({ num: 3 }),
    },
    grids: {
      type: Array,
    },
  },
  watch: {
    grids: {
      handler(val) {
        this.items = val;
      },
      deep: true,
    },
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1)
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
        const dragingItem = this.items[dragingIndex]
        const targetItem = this.items[targetIndex]
        this.items.splice(dragingIndex, 1, targetItem)
        this.items.splice(targetIndex, 1, dragingItem)
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
    showClick(banner, idx) {
      this.$bus.$emit("click:show", idx, ["outside"]);
    },
    delItem(idx) {
      this.items.splice(idx, 1);
    },
    addItem() {
      if (this.items.length < 10) {
        const item = this.defaultConf.action.config[0];
        item.key = createUniqueString();
        this.items.push(util.copyObj(item));
      } else {
        this.$alert("最多添加10个点击项！");
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
