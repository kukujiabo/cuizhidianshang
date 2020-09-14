<template>
  <div class="goods-container">
    <div class="title">
      <p>设置</p>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateRole">添加角色</el-button>
            <div>
              <el-input
                v-model="roleListQuery.search"
                placeholder="搜索角色名称"
                class="input-with-select"
              >
                <el-button slot="append" type="primary" @click="getRoleList(roleListQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="roleList"
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
            >
              <el-table-column prop="roleName" label="角色名称" />
              <el-table-column prop="remark" label="角色说明" />
              <el-table-column prop="personNum" label="人数" />
              <el-table-column prop="Status" label="收费/免费">
                <template slot-scope="scope">
                  <span>{{ scope.row.Status === 0 ? '收费' : '免费' }}</span>
                </template>
              </el-table-column>
              <el-table-column width="300px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="roleDetail(scope.row)">详情</el-button>
                    <el-button type="text" @click="editRole(scope.row)">编辑</el-button>
                    <el-button type="text" @click="removeRole(scope.row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="roleTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="员工管理" name="second">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateCru">新增员工</el-button>
            <div>
              <el-input
                v-model="listTextImageQuery.keywords"
                placeholder="搜索账号/名称/手机号"
                class="input-with-select"
              >
                <el-button slot="append" type="primary">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="cruList"
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
            >
              <el-table-column prop="userCode" label="账号" />
              <el-table-column prop="userName" label="姓名" />
              <el-table-column prop="phone" label="手机号" />
              <el-table-column prop="role" label="角色">
                <template slot-scope="scope">
                  <span>{{ scope.row.roles }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="admin" label="添加人" />
              <el-table-column prop="registerDateTime" label="添加时间" />
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.status === 1 ? '启用' : '禁用' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sellModel" label="收费/免费">
                <template slot-scope="scope">
                  <span>{{ scope.row.sellModel === 1 ? '收费' : '免费' }}</span>
                </template>
              </el-table-column>
              <el-table-column width="300px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="cruDetail(scope.row)">详情</el-button>
                    <el-button type="text" @click="editCru(scope.row)">编辑</el-button>
                    <el-button type="text" @click="removeUser(scope.row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="cruListQuery.start"
              :page-size="cruListQuery.limit"
              :total="cruTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限管理" name="third">
        <el-row :gutter="24">
          <el-col :lg="6" :xl="4">
            <el-card>
              <div slot="header" class="clearfix">
                <span>角色列表</span>
              </div>
              <div class="role-list">
                <div
                  v-for="role in allRoleList"
                  :key="role.id"
                  :class="(currentRole && role.id === currentRole.id) ? 'active' : ''"
                  class="role-list-item"
                  @click="selectRole(role)"
                >{{ role.roleName }}
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="18" :xl="20">
            <el-card v-if="currentRole && getRoleList">
              <div v-for="menu in allMenus" :key="menu.code" class="section-item">
                <div class="section-title">
                  <div>
                    <span>{{ menu.name }}</span>
                  </div>
                  <div v-if="menu.code !== undefined">
                    <el-switch
                      v-if="menu.code === 'CommoditFiles'"
                      v-model="CommoditFiles"
                      active-color="#1f71f"
                      @change="(evt) => switchAuth(evt, menu.code, menu.children)"
                    />
                    <el-switch
                      v-if="menu.code === 'MarketingManage'"
                      v-model="MarketingManage"
                      active-color="#1f71f"
                      @change="(evt) => switchAuth(evt, menu.code, menu.children)"
                    />
                    <el-switch
                      v-if="menu.code === 'MaterialManage'"
                      v-model="MaterialManage"
                      active-color="#1f71f"
                      @change="(evt) => switchAuth(evt, menu.code, menu.children)"
                    />
                    <el-switch
                      v-if="menu.code === 'SetupManage'"
                      v-model="SetupManage"
                      active-color="#1f71f"
                      @change="(evt) => switchAuth(evt, menu.code, menu.children)"
                    />
                    <el-switch
                      v-if="menu.code === 'ShopDecoration'"
                      v-model="ShopDecoration"
                      active-color="#1f71f"
                      @change="(evt) => switchAuth(evt, menu.code, menu.children)"
                    />
                  </div>
                </div>
                <div class="section-options">
                  <el-tree
                    :ref="menu.code"
                    show-checkbox
                    node-key="code"
                    :props="defaultProps"
                    :data="menu.children"
                    :default-expand-all="true"
                    @node-click="(node) => handleNodeClick(node, 1)"
                  />
                </div>
              </div>
              <div style="height:100px" />
            </el-card>
          </el-col>
        </el-row>
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
        color: #ffffff;
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
        .row-image {
          width: 100px;
          height: 70px;
          background-color: #597ef7;
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
  .el-card__header {
    font-weight: 800;
  }
  .role-list {
    .active {
      color: $themeBlue;
    }
    .role-list-item {
      height: 37px;
      font-size: 15px;
    }
    .role-list-item:hover {
      cursor: pointer;
    }
  }
  .section-item {
    padding: 20px;
    .section-title {
      position: relative;
      font-weight: 800;
      margin-left: 5px;
      @extend .flex;
      @extend .flex-row;
      @extend .flex-space-between;
    }
    .section-title::before {
      content: "";
      width: 3px;
      height: 12px;
      background-color: $themeBlue;
      position: absolute;
      top: 4px;
      left: -10px;
    }
    .section-options {
      padding: 40px 0;
      border-bottom: 1px solid #efefef;
    }
  }
}
</style>

<script>
const routerPath = {
  '/profile/role': 'first',
  '/profile/cur': 'second',
  '/profile/auth': 'third'
}
import {
  getRoleList,
  removeRole,
  getCruList,
  removeCru,
  getAllRoleMenus,
  getAllMenus,
  getRolePermission
} from '@/api/roles'
export default {
  components: {},
  data() {
    return {
      menu1: false,
      menu2: false,
      menu3: false,
      menus: ['查看', '编辑', '新增', '删除'],
      roleTotal: 0,
      roleList: [],
      cruList: [],
      cruTotal: 0,
      allRoleList: [],
      subChecked: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      videoDocuments: [
        {
          image: '',
          status: 1,
          onshelfTime: '2020-05-10 10:00:00',
          relatContent: ''
        }
      ],
      activeName: 'first',
      listTextImageTotal: 0,
      listTextImageQuery: {
        status: '',
        keywords: '',
        page: 1,
        pageSize: 20
      },
      roles: [
        { id: 1, name: '超级管理员' },
        { id: 2, name: '普通管理员' },
        { id: 3, name: '行政' },
        { id: 4, name: '财务' }
      ],
      checkedCities: '',
      roleListQuery: {
        search: '',
        start: 1,
        limit: 20
      },
      cruListQuery: {
        keywords: '',
        start: 1,
        limit: 20
      },
      currentRole: null,
      allMenus: [],
      roleMenuList: [],
      checkedKeys: {},
      menuSwitch: {},
      CommoditFiles: false,
      MarketingManage: false,
      MaterialManage: false,
      SetupManage: false,
      ShopDecoration: false
    }
  },
  created() {
    this.activeName = routerPath[this.$route.path]
    this.getAllRoleList()
    this.getRoleList(this.roleListQuery)
    this.getCruList(this.cruListQuery)
    this.getAllMenus()
  },
  methods: {
    switchAuth(evt, code, roots) {
      console.log(roots)
      if (evt) {
        this.$refs[code][0].setCheckedKeys(roots.map(root => root.code), false)
      } else {
        this.$refs[code][0].setCheckedKeys([], false)
      }
    },
    roleDetail(row) {
      this.$router.push({ path: `/profile/roleDetail?id=${row.id}&roleName=${row.roleName}&remark=${row.remark}&roleCode=${row.roleCode}` })
    },
    /**
     * 员工详情
     */
    cruDetail(row) {
      this.$router.push({ path: '/profile/cruDetail?id=' + row.id })
    },
    handleNodeClick(node) {
      console.log(node)
    },
    /**
     * 查询全部菜单
     */
    async getAllMenus() {
      try {
        const { data } = await getAllMenus()
        console.log(data)
        this.allMenus = data
        this.allMenus.forEach(menu => {
          this.menuSwitch[menu.code] = false
          this.subChecked[menu.code] = []
        })
        console.log(this.menuSwitch)
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 选择角色
     */
    selectRole(row) {
      this.getRoleMenus(row)
      this.currentRole = row
    },
    /**
     * 删除角色
     */
    async removeRole(row) {
      this.$confirm('此操作将永久删除角色：' + row.roleName + '，确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const options = [{ id: row.id }]
        const { success, message } = await removeRole(options)
        if (success) {
          this.$message({ type: 'success', message: '角色已删除!' })
          this.getRoleList(this.roleListQuery)
        } else {
          this.$message({ type: 'error', message: message })
        }
      })
    },
    /**
     * 新增角色
     */
    toCreateRole() {
      this.$router.push({ path: '/profile/addRole' })
    },
    /**
     * 新增员工
     */
    toCreateCru() {
      this.$router.push({ path: '/profile/addCru' })
    },
    /**
     * 编辑角色
     */
    editRole(row) {
      this.$router.push({ path: '/profile/editRole', query: { id: row.id, role_data: JSON.stringify(row) }})
    },
    /**
     * 编辑员工
     */
    editCru(row) {
      this.$router.push({ path: '/profile/editCru', query: { id: row.id }})
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    /**
     * 查询全部角色菜单
     */
    async getRoleMenus(role) {
      try {
        const { data } = await getAllRoleMenus({ roleCode: role.roleCode })
        this.roleMenuList = data
        data.forEach(m => {
          this.checkedKeys[m.code] = []
          this.$set(this.menuSwitch, m.code, true)
          this.filterAllCode(m)
        })
        for (const key in this.checkedKeys) {
          this.$refs[key][0].setCheckedKeys(this.checkedKeys[key])
        }
        this.$forceUpdate()
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 查询全部角色
     */
    async getAllRoleList() {
      try {
        const { data: { list }} = await getRoleList({ start: 1, limit: 100 })
        this.allRoleList = list
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 角色列表
     */
    async getRoleList(query) {
      try {
        for (const key in query) {
          if (query[key] === '' || query[key] === undefined) {
            delete query[key]
          }
        }
        const { data: { list, total }} = await getRoleList(query)
        this.roleList = list
        this.roleTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 员工列表
     */
    async getCruList(query) {
      try {
        const { data: { list, total }} = await getCruList(query)
        console.log(list, total)
        this.cruList = list
        this.cruTotal = total
      } catch (error) {
        console.log(error)
      }
    },
    filterAllCode(data) {
      if (data.children && data.children.length > 0) {
        data.children.forEach(m => {
          this.checkedKeys[data.code].push(m.code)
          if (m.children && m.children.length > 0) {
            m.children.forEach(sm => {
              this.checkedKeys[data.code].push(sm.code)
            })
          }
        })
      }
    },
    /**
     * 删除员工
     */
    async removeUser(row) {
      this.$confirm('此操作将永久删除员工：' + row.userName + '，确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        const options = [{ id: row.id }]
        const { success, message } = await removeCru(options)
        if (success) {
          this.$message({ type: 'success', message: '员工已删除!' })
          this.getCruList(this.cruListQuery)
        } else {
          this.$message({ type: 'error', message: message })
        }
      })
    }
  }
}
</script>
