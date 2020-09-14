<template>
  <el-card :class="shop.status === 0 ? 'shop-card-active' : 'shop-card'">
    <div style="cursor:pointer">
      <div class="block">
        <div class="title">
          <div class="title-text" @click="selectShop(shop)">
            <span class="shop-name">{{ shop.name }}</span>
            <span class="shop-version">{{ ranks[shop.proType] }}</span>
          </div>
          <div>
            <el-switch
              size="mini"
              :active-value="0"
              :inactive-value="2"
              v-model="shop.status"
              @change="value => changeSwitch(value, shop)"
            />
          </div>
        </div>
      </div>
      <div class="decoration-type" @click="selectShop(shop)">{{ busTypes[shop.busType - 1] }}</div>
      <div class="date">
        <span @click="selectShop(shop)">创建日期：{{shop.createDate}}</span>
      </div>
    </div>
  </el-card>
</template>
<style lang="scss">
.shop-card-active,
.shop-card {
  border-radius: 15px;
  margin-bottom: 30px;
}
.shop-card {
  .el-card__body {
    border-top: 8px solid #ccccc0;
    box-sizing: border-box;
  }
  .block {
    width: 100%;
    .title {
      .title-text {
        .shop-name {
          color: #ccccc0;
        }
        .shop-version {
          color: #ccccc0;
          border: 1px solid #ccccc0;
        }
      }
    }
  }
  .decoration-type {
    color: #ccccc0;
  }
  .date {
    color: #ccccc0;
  }
}
.shop-card-active {
  .el-card__body {
    border-top: 8px solid #1890ff;
    box-sizing: border-box;
  }
}
.date {
  font-size: 12px;
  color: #a1a1a1;
  height: 42px;
  line-height: 66px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .el-button--mini {
    height: 24px;
    padding: 3px 5px !important;
  }
}
.block {
  width: 100%;
  .title {
    height: 36px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .title-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      .shop-name {
        color: #1890ff;
        font-size: 18px;
        font-weight: 900;
        display: inline-block;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
      .shop-version {
        margin-left: 10px;
        color: #1890ff;
        font-size: 14px;
        padding: 7px;
        border: 1px solid #1890ff;
        border-radius: 5px;
      }
    }
  }
}
.decoration-type {
  height: 42px;
  line-height: 42px;
}
</style>
<script>
import { enableShop, disableShop } from "@/api/shop";
export default {
  props: {
    shop: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      busTypes: ["家装", "材料"],
      ranks: ["旗舰版", "高级版", "旗舰版"],
    };
  },
  methods: {
    selectShop(shop) {
      this.$emit("selectshop", shop);
    },
    // 启用/禁用店铺
    changeSwitch(value, shop) {
      if (value === 0) {
        this.enable(shop);
      } else {
        this.disable(shop);
      }
    },
    // 启用店铺
    async enable(shop) {
      try {
        const { success, message } = await enableShop({ shopId: shop.id });
        if (success) {
          this.$message({ type: "success", message: "店铺已启用" });
          shop.status = 0;
        } else {
          this.$message({ type: "error", message });
        }
      } catch (error) {
        console.log(error);
        // this.$message({ type: 'error', message: '网络错误！' })
      }
    },
    // 停用店铺
    async disable(shop) {
      try {
        const { success, message } = await disableShop({ shopId: shop.id });
        if (success) {
          this.$message({ type: "success", message: "店铺已停用" });
          shop.status = 2;
        } else {
          this.$message({ type: "error", message });
        }
      } catch (error) {
        console.log(error);
        // this.$message({ type: 'error', message: '网络错误！' })
      }
    },
  },
};
</script>