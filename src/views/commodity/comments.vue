<template>
  <div class="page-container">
    <div class="operation">
      <div class="operation-btns">
        <h3>评论列表</h3>
        <div>
          <el-select v-model="listQuery.type" placeholder="选择状态">
            <el-option :value="0" label="全部状态">全部状态</el-option>
            <el-option :value="1" label="已上架">已上架</el-option>
            <el-option :value="2" label="已下架">已下架</el-option>
            <el-option :value="3" label="待上架">待上架</el-option>
            <el-option :value="4" label="停售">停售</el-option>
          </el-select>
          <el-input v-model="listQuery.search" placeholder="搜索用户昵称" class="input-with-select">
            <el-button slot="append" type="primary" @click="() => getList(listQuery)">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="main-table">
        <el-table
          stripe
          size="large"
          :data="type == 2 ? tableData : tableData2"
          :height="tableHeight"
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
          <el-table-column min-width="120px" prop="nickname" align="left" label="头像昵称">
            <template slot-scope="scope">
              <div class="nickname">
                <img class="avatar" :src="scope.row.avatar" />
                <span>{{scope.row.nickname}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" align="center" prop="content" label="评论内容" />
          <el-table-column min-width="120px" align="center" prop="putDate" label="上架时间" />
          <el-table-column min-width="120px" align="center" prop="resourceName" label="资源名称" />
          <el-table-column min-width="100px" align="center" prop="type" label="类型">
            <template slot-scope="scope">
              <span>{{ commentTypes[scope.row.type] }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="80px" align="center" prop="praise" label="点赞" />
          <el-table-column min-width="80px" align="center" prop="reply" label="回复" />
          <el-table-column min-width="120px" align="center" prop="putDate" label="上架时间" />
          <el-table-column min-width="150px" align="right" label="操作">
            <template slot-scope="scope">
              <div style="padding-right:18px;">
                <el-button size="mediu" type="text" @click="reply(scope.row)">回复</el-button>
                <el-button type="text">
                  <el-dropdown
                    trigger="hover"
                    @command="(command) => handleCommand(command, scope.row, 2)"
                  >
                    <span class="el-dropdown-link" style="color:#1890ff">
                      更多
                      <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>发私信</el-dropdown-item>
                      <el-dropdown-item>精选评论</el-dropdown-item>
                      <el-dropdown-item>加入黑名单</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
  </div>
</template>
<style lang="scss">
@import "~@/styles/index.scss";
.page-container {
  padding: 30px 40px;
  .operation {
    .operation-btns {
      @extend .flex;
      @extend .flex-row;
      @extend .flex-space-between;
      @extend .flex-align-center;
      padding-bottom: 20px;
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
      background-color: #ffffff;
      .nickname {
        @extend .flex;
        @extend .flex-row;
        @extend .flex-align-center;
        font-size: 14px;
        color: #000;
        padding: 20px 0;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-left: 12px;
          margin-right: 15px;
        }
      }
      .light-table-header-background {
        background-color: #f8fbff;
        border-bottom: 0;
      }
      .pagenigation {
        padding: 30px;
        @extend .flex;
        @extend .flex-row;
        @extend .flex-justify-end;
        .el-pagination {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
<script>
import { Host } from "@/config";
import { getToken, getTokenType } from "@/utils/auth";

export default {
  data() {
    return {
      type: 0,
      total: 0,
      Host: "",
      tableHeight: 0,
      listQuery: {
        type: "",
        search: "",
      },
      commentTypes: ["", "图文", "视频", "音频"],
      tableData: [
        {
          nickname: "Jenny",
          avatar: "https://image.sharelab.com.cn/meinv2.jpg",
          content: "djkqwjjw",
          putDate: "2020-07-10",
          resourceName: "测试视频",
          type: 2,
          praise: 10,
          reply: 10,
        }
      ],
      tableData2: [
        {
          nickname: "Jenny",
          avatar: "https://image.sharelab.com.cn/meinv2.jpg",
          content: "djkqwjjw",
          putDate: "2020-07-10",
          resourceName: "测试音频",
          type: 3,
          praise: 10,
          reply: 10,
        }
      ]
    };
  },
  created() {
    this.tableHeight = window.innerHeight - 350;
    this.type = this.$route.query.type;
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getList(query) {},
    handleCommand() {

    }
  },
};
</script>