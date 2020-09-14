<template>
  <div class="goods-container">
    <div class="title">
      <p>商品档案</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图文" name="first">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateTextImage">新建图文</el-button>
            <div>
              <el-select v-model="listTextImageQuery.putMode" placeholder="选择状态">
                <el-option :value="0" label="全部状态">全部状态</el-option>
                <el-option :value="1" label="已上架">已上架</el-option>
                <el-option :value="2" label="已下架">已下架</el-option>
                <el-option :value="3" label="待上架">待上架</el-option>
                <el-option :value="4" label="停售">停售</el-option>
                <el-option :value="5" label="隐藏">隐藏</el-option>
              </el-select>
              <el-input v-model="listTextImageQuery.search" placeholder="搜索图文名称" class="input-with-select">
                <el-button slot="append" type="primary" @click="() => getGoodsDocuments(listTextImageQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="imageList"
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
              <el-table-column min-width="350px" prop="image" label="图文名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                      <span style="color:red">{{ scope.row.sellMode == 0 ? '免费' : '付费' }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" prop="book" label="订阅量" />
              <el-table-column min-width="120px" align="center" prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
                  <span class="process-fail" v-if="scope.row.putMode === 2">下架</span>
                  <span class="process-wait" v-if="scope.row.putMode === 3">待上架</span>
                  <span class="process-stop" v-if="scope.row.putMode === 4">停售</span>
                  <span class="process-hide" v-if="scope.row.putMode === 5">隐藏</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px" prop="putDate" label="上架时间" />
              <el-table-column min-width="200px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="editImageText(scope.row)">编辑</el-button>
                    <el-button type="text" @click="showShareDialog(scope.row)">分享</el-button>
                    <el-button type="text" v-if="scope.row.putMode !== 1" @click="enable(scope.row, scope.$index)">上架</el-button>
                    <el-button type="text" v-else @click="stop(scope.row, scope.$index)">下架</el-button>
                    <el-button type="text" @click="remove(scope.row, 1)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视频" name="second">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateVideo">新建视频</el-button>
            <div>
              <el-select v-model="listVideoQuery.putMode" placeholder="选择状态">
                <el-option :value="0" label="全部状态">全部状态</el-option>
                <el-option :value="1" label="已上架">已上架</el-option>
                <el-option :value="2" label="已下架">已下架</el-option>
                <el-option :value="3" label="待上架">待上架</el-option>
                <el-option :value="4" label="停售">停售</el-option>
                <el-option :value="5" label="隐藏">隐藏</el-option>
              </el-select>
              <el-input v-model="listVideoQuery.search" placeholder="搜索视频名称" class="input-with-select">
                <el-button slot="append" type="primary" @click="() => getVideoList(listVideoQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="videoDocuments"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column min-width="350px" prop="image" label="视频名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                      <span style="color:red">{{ scope.row.sellMode == 0 ? '免费' : '付费' }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" prop="book" label="订阅量" />
              <el-table-column min-width="120px" align="center" prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
                  <span class="process-fail" v-if="scope.row.putMode === 2">下架</span>
                  <span class="process-wait" v-if="scope.row.putMode === 3">待上架</span>
                  <span class="process-stop" v-if="scope.row.putMode === 4">停售</span>
                  <span class="process-hide" v-if="scope.row.putMode === 5">隐藏</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px" align="center" prop="putDate" label="上架时间" />
              <el-table-column min-width="200px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="editVideo(scope.row)">编辑</el-button>
                    <el-button type="text" @click="showShareDialog(scope.row)">分享</el-button>
                    <el-button type="text">
                      <el-dropdown trigger="hover" @command="(command) => handleCommand(command, scope.row, 2)">
                        <span class="el-dropdown-link" style="color:#1890ff">
                          更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-if="scope.row.putMode !== 1" command="u">上架</el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.putMode === 1" command="s">下架</el-dropdown-item>
                          <el-dropdown-item command="c">查看评论</el-dropdown-item>
                          <el-dropdown-item command="r">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listVideoQuery.page"
              :page-size="listVideoQuery.pageSize"
              :total="videoListTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="音频" name="third">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateVoice">新建音频</el-button>
            <div>
              <el-select v-model="listAudioQuery.putMode" placeholder="选择状态">
                <el-option :value="0" label="全部状态">全部状态</el-option>
                <el-option :value="1" label="已上架">已上架</el-option>
                <el-option :value="2" label="已下架">已下架</el-option>
                <el-option :value="3" label="待上架">待上架</el-option>
                <el-option :value="4" label="停售">停售</el-option>
                <el-option :value="5" label="隐藏">隐藏</el-option>
              </el-select>
              <el-input v-model="listAudioQuery.search" placeholder="搜索音频名称" class="input-with-select">
                <el-button slot="append" type="primary" @click="() => getAudioList(listAudioQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="audioList"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column min-width="350px" prop="image" label="音频名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                      <span style="color:red">{{ scope.row.sellMode == 0 ? '免费' : '付费' }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" prop="book" label="订阅量" />
              <el-table-column min-width="120px" align="center" prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
                  <span class="process-fail" v-if="scope.row.putMode === 2">下架</span>
                  <span class="process-wait" v-if="scope.row.putMode === 3">待上架</span>
                  <span class="process-stop" v-if="scope.row.putMode === 4">停售</span>
                  <span class="process-hide" v-if="scope.row.putMode === 5">隐藏</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px" align="center" prop="putDate" label="上架时间" />
              <el-table-column min-width="200px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="editVoice(scope.row)">编辑</el-button>
                    <el-button type="text" @click="showShareDialog(scope.row)">分享</el-button>
                    <el-button type="text">
                      <el-dropdown trigger="hover" @command="(command) => handleCommand(command, scope.row, 3)">
                        <span class="el-dropdown-link" style="color:#1890ff">
                          更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-if="scope.row.putMode !== 1" command="u">上架</el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.putMode === 1" command="s">下架</el-dropdown-item>
                          <el-dropdown-item command="c">查看评论</el-dropdown-item>
                          <el-dropdown-item command="r">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="直播" name="fourth">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="toCreateOnAir">创建直播</el-button>
            <div>
              <el-select v-model="listOnAirQuery.putMode" placeholder="选择状态">
                <el-option :value="0" label="全部状态">全部状态</el-option>
                <el-option :value="1" label="已上架">已上架</el-option>
                <el-option :value="2" label="已下架">已下架</el-option>
                <el-option :value="3" label="待上架">待上架</el-option>
                <el-option :value="4" label="停售">停售</el-option>
                <el-option :value="5" label="隐藏">隐藏</el-option>
              </el-select>
              <el-input v-model="listOnAirQuery.search" placeholder="搜索直播名称" class="input-with-select">
                <el-button slot="append" type="primary" @click="() => getOnAirDocuments(listOnAirQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="onAirList"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column min-width="350px" prop="image" label="直播名称">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                    <div class="row-info">
                      <span>{{ scope.row.title }}</span>
                      <span style="color:red">{{ scope.row.sellMode == 0 ? '免费' : '付费' }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" prop="book" label="订阅量" />
              <el-table-column min-width="120px" prop="status" label="上架状态">
                <template slot-scope="scope">
                  <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
                  <span class="process-fail" v-if="scope.row.putMode === 2">下架</span>
                  <span class="process-wait" v-if="scope.row.putMode === 3">待上架</span>
                  <span class="process-stop" v-if="scope.row.putMode === 4">停售</span>
                  <span class="process-hide" v-if="scope.row.putMode === 5">隐藏</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px" prop="putDate" label="上架时间" />
              <el-table-column min-width="200px" prop="relatContent" label="关联内容" />
              <el-table-column min-width="150px" prop="eachPlay" label="回放设置">
                <template slot-scope="scope">
                  <span>{{ scope.row.eachPlay === 1 ? '开启' : '关闭' }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="260px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="textDocumentEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="textDocumentEdit(scope.row)">讲师管理</el-button>
                    <el-button type="text" @click="showShareDialog(scope.row)">分享</el-button>
                    <el-button type="text">
                      <el-dropdown trigger="hover" @command="(command) => handleCommand(command, scope.row, 4)">
                        <span class="el-dropdown-link" style="color:#1890ff">
                          更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>直播间信息设置</el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.putMode !== 1" command="u">上架</el-dropdown-item>
                          <el-dropdown-item v-if="scope.row.putMode === 1" command="s">下架</el-dropdown-item>
                          <el-dropdown-item command="r">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="手机海报" name="fifth">
        <div class="operation">
          <div class="operation-btns">
            <el-button type="primary" @click="showUploadPoster = true;postDialogTitle='上传海报'">上传海报</el-button>
            <div>
              <el-select v-model="listPosterQuery.putMode" placeholder="选择状态">
                <el-option :value="0" label="全部状态">全部状态</el-option>
                <el-option :value="1" label="已上架">已上架</el-option>
                <el-option :value="2" label="已下架">已下架</el-option>
                <el-option :value="3" label="待上架">待上架</el-option>
                <el-option :value="4" label="停售">停售</el-option>
                <el-option :value="5" label="隐藏">隐藏</el-option>
              </el-select>
              <el-input v-model="listPosterQuery.search" placeholder="搜索海报名称" class="input-with-select">
                <el-button slot="append" type="primary" @click="() => getPosterDocuments(listPosterQuery)">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="main-table">
            <el-table
              stripe
              :data="posterList"
              class="content-table"
              empty-text="没有数据"
              header-row-class-name="light-table-header-background"
              :header-cell-style="{
                'background': 'transparent',
                'height': '54px',
                'line-height': '54px',
                'border-bottom': 0,
                'box-sizing': 'border-box',
                'padding-right': '15px',
                'padding-left': '15px',
                'font-size': '16px',
                'color': '#666'
              }"
            >
              <el-table-column min-width="200px" prop="title" label="海报标题" />
              <el-table-column min-width="200px" prop="image" label="海报图片">
                <template slot-scope="scope">
                  <div class="row-image-info">
                    <img class="row-image" :src="`${Host}/res/` + scope.row.cover">
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" prop="content" label="海报类型" />
              <el-table-column min-width="150px" align="center" prop="book" label="订阅量" />
              <el-table-column min-width="120px" prop="status" label="海报状态">
                <template slot-scope="scope">
                  <span class="process-success" v-if="scope.row.putMode === 1">上架</span>
                  <span class="process-fail" v-if="scope.row.putMode === 2">下架</span>
                  <span class="process-wait" v-if="scope.row.putMode === 3">待上架</span>
                  <span class="process-stop" v-if="scope.row.putMode === 4">停售</span>
                  <span class="process-hide" v-if="scope.row.putMode === 5">隐藏</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px" prop="putDate" label="上架时间" />
              <el-table-column min-width="200px" align="right" label="操作">
                <template slot-scope="scope">
                  <div style="padding-right:18px;">
                    <el-button type="text" @click="showShareDialog(scope.row)">分享</el-button>
                    <el-button type="text" @click="downloadPoster(scope.row)">下载</el-button>
                    <el-button type="text" v-loading="editLoading" @click="editPoster(scope.row)">编辑</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagenigation">
            <el-pagination
              :current-page.sync="listTextImageQuery.page"
              :page-size="listTextImageQuery.pageSize"
              :total="listTextImageTotal"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="upe">
      <el-dialog
        :title="postDialogTitle"
        :visible.sync="showUploadPoster"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="clearPosterFields"
        >
        <div class="upload-post-container">
          <el-form
            ref="uploadPosterForm"
            :model="newPostForm"
            :inline="true"
            :show-message="false"
            label-width="110px"
          >
            <div>
              <el-form-item prop="title" required label="海报标题">
                <el-input v-model="newPostForm.title" style="width:300px" placeholder="请填写海报标题" />
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="content" required label="海报类别">
                <el-input v-model="newPostForm.content" style="width:300px" placeholder="自定义海报类别" />
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="cover" required label="选择文件">
                <img v-if="newPostForm.coverUrl" :src="newPostForm.coverUrl" class="poster-holder">
                <img v-else src="@/assets/poster-holder.jpg" class="poster-holder">
                <el-upload
                  ref="uploadFilePoster"
                  class="upload-demo"
                  multiple
                  accept="image/*"
                  :action="Host"
                  :limit="1"
                  :auto-upload="false"
                  :on-change="changeUploadPoster"
                >
                  <el-button size="small" plain type="primary">选择文件</el-button>
                  <div slot="tip" class="el-upload__tip">建议上传7501334px，JPG、PNG、格式；图片小于2M</div>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="putMode" label="上架设置：">
                <el-radio-group v-model="newPostForm.putMode" class="radius-group">
                  <div class="radius-item">
                    <el-radio :label="1">立即上架</el-radio>
                  </div>
                  <div class="radius-item">
                    <el-radio :label="2">定时上架</el-radio>
                    <el-date-picker
                      :disabled="newPostForm.putMode != 2"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="newPostForm.readyPutDate"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </div>
                  <div class="radius-item">
                    <el-radio :label="3">暂不上架</el-radio>
                  </div>
                  <div class="more-options" style="padding-left:20px">
                    <div class="radius-item">
                      <el-checkbox :disabled="newPostForm.putMode === 3" v-model="newPostForm.isClose">停售</el-checkbox>
                      <span class="radius-tips">上架的商品设置停售后，将停止售卖</span>
                    </div> 
                    <div class="radius-item">
                      <el-checkbox :disabled="newPostForm.putMode === 3" v-model="newPostForm.isHide">隐藏</el-checkbox>
                      <span class="radius-tips">上架的商品设置隐藏后，在店铺内不显示，但可以通过链接访问</span>
                    </div>
                  </div>
                  <!-- <div class="radius-item">
                    <el-radio :label="4">停售</el-radio>
                    <span class="radius-tips">上架的商品设置隐藏后，在店铺内不显示，但可以通过链接访问</span>
                  </div>
                  <div class="radius-item">
                    <el-radio :label="5">隐藏</el-radio>
                    <span class="radius-tips">上架的商品设置停售后，将停止售卖</span>
                  </div> -->
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="submit">
          <el-button @click="cancelPoster">取消</el-button>
          <el-button v-loading="loading" type="primary" @click="submitPoster">确认</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="share-box">
      <el-dialog width="360px" :title="shopName" :visible.sync="showShareBox">
        <div class="share-content">
          <img class="share-code">
          <p>商品名称：{{shareName}}</p>
          <div>
            <el-button size="mini" plain type="primary">下载二维码</el-button>
          </div>
        </div>
        <div class="share-link">
          <el-input ref="copyInput" v-model="shareLink" readonly>
            <el-button slot="append" @click="copyShareLink">复制</el-button>
          </el-input>
        </div>
      </el-dialog>
    </div>
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
import GoodsBasic from './components/goodsBasicInfo'
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
    GoodsBasic
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
        readyPutDate: '',
        isClose: false,
        isHide: false
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
    // editStatus(row, putMode) {
    //   editStatus({ goodsId: row.id, putMode })
    // },\
    // 下载海报
    downloadPoster(row) {
      // const url = Host + '/res/' + row.cover
      // const a = document.createElement('a')
      // console.log(a)
      // a.download = row.cover.split('/')[1] // 设置图片名称
      // console.log(a.download)
      // a.href = url // 将生成的URL设置为a.href属性
      // a.click() // 触发a的单击事件
      // let image = new Image();
      // // 解决跨域 Canvas 污染问题
      // // image.setAttribute("crossOrigin", "anonymous");
      // image.onload = function() {
      //   let canvas = document.createElement("canvas");
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //   let context = canvas.getContext("2d");
      //   context.drawImage(image, 0, 0, image.width, image.height);
      //   let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      //   let a = document.createElement("a"); // 生成一个a元素
      //   let event = new MouseEvent("click"); // 创建一个单击事件
      //   a.download = name || "photo"; // 设置图片名称
      //   a.href = url; // 将生成的URL设置为a.href属性
      //   a.dispatchEvent(event); // 触发a的单击事件
      // };
      // console.log(imgsrc)
      // image.src = imgsrc
      var resourceUrl = Host + '/res/' + row.cover
      var x=new XMLHttpRequest();
      x.open("GET", resourceUrl, true);
      x.responseType = 'blob';
      x.onload=function(e){
        // ie10+
        if (navigator.msSaveBlob) {
          var name = resourceUrl.substr(resourceUrl.lastIndexOf("/") + 1);
          return navigator.msSaveBlob(x.response, name);
        } else {
          var url = window.URL.createObjectURL(x.response)
          var a = document.createElement('a');
          a.href = url;
          a.download = '下载';
          a.click();
        }
      }
      x.send();
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
      document.execCommand("copy");
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
      this.newPostForm.isHide = false
      this.newPostForm.isClose = false
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
      if (this.loading) {
        return
      }
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
        // this.editLoading = false
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
            this.loading = false
            this.showUploadPoster = false
          }, 1000)
        } else {
          this.loading = false
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
      goodsForm.append('isHide', this.newPostForm.isHide ? 1 : 0)
      goodsForm.append('isClose', this.newPostForm.isClose ? 1 : 0)
      if (this.newPostForm.id) {
        goodsForm.append('id', this.newPostForm.id)
      }
      xhr.setRequestHeader('appid', Cookies.get('appid'))
      this.loading = true
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
          this.$router.push({ path: '/commodity/comments', query: { type: index } })
          break
        case 's':
          this.stop(row, index)
          break
        case 'u':
          this.enable(row, index)
          break
      }
    },
    enable(row, index) {
      this.$confirm(`确认上架 ${row.title} ？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async _ => {
        try {
          const { success, message } = await editStatus({ goodsId: row.id, putMode: 1 })
          if (success) {
            row.putMode = 1
          } else {
            this.$message({ type: 'error', message })
          }
        } catch (error) {
          console.log(error)
        }
      })
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
          const { success } = await editStatus({ goodsId: row.id, putMode: 3 })
          if (success) {
            row.putMode = 3
          } else {
            this.$message({ type: 'error', message })
          }
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
