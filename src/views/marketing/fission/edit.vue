<!--
 * @Author: lee
 * @Date: 2020-07-12 15:55:23
 * @LastEditors: lee
 * @LastEditTime: 2020-07-22 02:11:32
 * @Description: 编辑裂变
-->
<template>
  <div class="app-container">
    <div class="sec-title">
      <el-button type="primary" plain class="section-back" icon="el-icon-arrow-left" @click="goBack" />
      <span>编辑裂变</span>
    </div>
    <div class="new">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-card title shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">基本信息</span>
          </div>
          <div class="inner-form-wrapper">
            <el-form-item prop="goodsId" label="关联商品：">
              <el-button v-if="form.goodsId===null" class="btn default" type="default" icon="el-icon-plus" @click="onGoods()">添加指定商品</el-button>
              <el-card v-if="form.goodsId!==null" class="box-card" shadow="hover" style="width: 500px;margin-top:10px;">
                <el-button style="float: right; margin-top: 27px;" @click="onGoods()">更换商品</el-button>
                <div style="display: flex;">
                  <el-image :src="`${Host}/res/` + goodsData.cover" style="height: 90px; vertical-align:middle;" />
                  <div style="margin-left:10px;">
                    <div style="font-weight: bold;line-height: 30px;">{{ goodsData.title }}</div>
                    <div style="color: #c82a2a;line-height: 30px;">{{ goodsData.sellMode === 0 ? '免费': '￥ '+goodsData.realUnitPrice }}</div>
                    <div style="color: #888;line-height: 30px;">商品类型：
                      <el-tag
                        v-if="goodsData.cType == 1"
                        type="danger"
                        disable-transitions
                      > 图文
                      </el-tag>
                      <el-tag
                        v-if="goodsData.cType == 2"
                        type="primary"
                        disable-transitions
                      > 视频
                      </el-tag>
                      <el-tag
                        v-if="goodsData.cType == 3"
                        type="info"
                        disable-transitions
                      > 直播
                      </el-tag>
                      <el-tag
                        v-if="goodsData.cType == 4"
                        type="primary"
                        disable-transitions
                      > 手机海报
                      </el-tag>
                      <el-tag
                        v-if="goodsData.cType == 5"
                        type="info"
                        disable-transitions
                      > 专题海报
                      </el-tag>
                      <el-tag
                        v-if="goodsData.cType == 6"
                        type="primary"
                        disable-transitions
                      > 音频
                      </el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </div>
        </el-card>

        <el-card title shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">裂变信息</span>
          </div>
          <div class="inner-form-wrapper">
            <el-form-item prop="name" label="活动名称：">
              <el-input
                v-model="form.name"
                style="width: 310px;"
                show-word-limit
                placeholder="活动名称，不超过10个字"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item prop="time" label="活动时间：">
              <div>
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  @change="getTime"
                />
              </div>
            </el-form-item>
            <el-form-item prop="isBackImg" label="海报背景：">
              <div>
                <el-radio v-model="form.isBackImg" :label="0">设置背景图片</el-radio>
                <el-radio v-model="form.isBackImg" :label="1">自定义背景图</el-radio>
              </div>
              <div v-if="form.isBackImg==0" style="margin-top: 10px;">
                <leeSelectImg v-model="form.backImgId" :label="1" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg1.png" />
                <leeSelectImg v-model="form.backImgId" :label="2" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg2.png" />
                <leeSelectImg v-model="form.backImgId" :label="3" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg3.png" />
                <leeSelectImg v-model="form.backImgId" :label="4" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg4.png" />
                <leeSelectImg v-model="form.backImgId" :label="5" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg5.png" />
                <leeSelectImg v-model="form.backImgId" :label="6" :icon-size="20" :width="80" :height="117" src="http://eccs.com.cn/services/sres/backImg/share-bg6.png" />
              </div>
              <div v-if="form.isBackImg==1" style="margin-top: 10px;">
                <el-input v-show="false" v-model="form.backImgUrl" type="hidden" />
                <div>
                  <img v-if="form.backImgUrl" class="cover-image" :src="form.backImgUrl">
                  <img v-else class="cover-image" src="@/assets/emptyimageholder.jpg">
                </div>
                <el-upload
                  class="upload-demo"
                  action=""
                  multiple
                  :show-file-list="false"
                  :limit="1"
                  :file-list="backImgFileList"
                  :on-change="backImgChangeFile" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <el-button type="info" plain size="small">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">点击上传图片，建议尺寸750*1334px或9:16，jpg\png格式，图片小于1M </div>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="form.isShowHead" :true-label="1" :false-label="0">显示用户头像</el-checkbox>
            </el-form-item>
            <el-form-item prop="rewardRatio" label="奖励比例：">
              <el-input
                v-model="form.rewardRatio"
                style="width: 300px;"
                show-word-limit
                placeholder="高于0且小于100的数值"
              >
                <span slot="suffix">%</span>
              </el-input>
              <div class="radius-tips">用户每邀请一个新用户购买商品即可获得对应比例的奖励，奖励金额（商品价格*比例）必须高于1元</div>
            </el-form-item>
            <el-form-item prop="isGetPoster" label="海报获取：">
              <div>
                <el-radio v-model="form.isGetPoster" :label="0">购买前后均可获取</el-radio>
                <el-radio v-model="form.isGetPoster" :label="1">购买后才可获取</el-radio>
              </div>
              <div class="radius-tips">选择“购买后才可获取”用户购买商品后才可分享海报  </div>
            </el-form-item>
            <el-form-item prop="isGuideAttention" label="引导关注：">
              <div>
                <el-radio v-model="form.isGuideAttention" :label="1">开启</el-radio>
                <el-radio v-model="form.isGuideAttention" :label="0">关闭</el-radio>
              </div>
              <div class="radius-tips">开启后，可在用户购买商品后进行引导关注，关闭后仅显示【查看商品】入口    </div>
            </el-form-item>
            <el-form-item v-if="form.isGuideAttention===1" prop="guideContent" label="引导文案：">
              <el-input
                v-model="form.guideContent"
                style="width: 300px;"
                show-word-limit
                placeholder="请输入引导文案"
              />
              <div class="radius-tips">请输入少于8个字的引导文案，比如进群拿红包*比例）必须高于1元</div>
            </el-form-item>
            <el-form-item v-if="form.isGuideAttention===1" prop="qrCode" label="二维码设置：">
              <el-input v-show="false" v-model="form.qrCodeUrl" type="hidden" />
              <div>
                <img v-if="form.qrCodeUrl" class="cover-image" :src="form.qrCodeUrl">
                <img v-else class="cover-image" src="@/assets/emptyimageholder.jpg">
              </div>
              <el-upload
                class="upload-demo"
                action=""
                multiple
                :show-file-list="false"
                :limit="1"
                :file-list="fileList"
                :on-change="changeFile" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              >
                <el-button type="info" plain size="small">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">建议尺寸132px*132px的正方形二维码图片，JPG/PNG格式，图片小于1M.建议上传群二维码/公众号二维码等</div>
              </el-upload>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
    <div class="btns">
      <el-button type="primary" plain @click="goBack">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

    <leeDialogGoods ref="leeDialogGoods" single-select @on-submit="getGoods" />
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
@import "~@/styles/lee.scss";
</style>

<script>
import { getFission, upFission } from '@/api/marketing'
import { Host } from '@/config'
export default {
  data() {
    var validateRewardRatio = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('不能小余0'))
      } else if (value > 100) {
        callback(new Error('不能大于100'))
      } else {
        callback()
      }
    }
    return {
      Host: Host,
      form: {
        id: this.$route.query.id,
        // 活动名称
        name: '',
        /* 商品id*/
        goodsId: null,
        // 使用时间
        time: [],
        /* 使用时间 开始时间*/
        beginTime: '',
        /* 使用时间 结束时间*/
        endTime: '',
        /* 是否为自定义背景图 0:不是 1:是 */
        isBackImg: 0,
        // 背景图片Id
        backImgId: 1,
        // 自定义背景图片
        backImg: '',
        backImgUrl: '',
        /* 是否显示头像 0:不显示 1:显示 */
        isShowHead: 1,
        // 奖励比例
        rewardRatio: null,
        /* 是否可获取海报 0:均可以 1:购买后可以 */
        isGetPoster: 0,
        /* 是否引导 0:不引导 1:引导 */
        isGuideAttention: 1,
        guideContent: '',
        qrCode: '',
        qrCodeUrl: ''
      },
      goodsData: {},
      backImgFileList: [],
      fileList: [],
      rules: {
        name: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '必选选择一个时间段', trigger: 'blur' }
        ],
        goodsId: [
          { required: true, message: '商品不能为空', trigger: 'blur' }
        ],
        isBackImg: [
          { required: true, message: '海报背景不能为空', trigger: 'blur' }
        ],
        isShowHead: [
          { required: true, message: '用户头像不能为空', trigger: 'blur' }
        ],
        rewardRatio: [
          { required: true, message: '奖励比例不能为空', trigger: 'blur' },
          { validator: validateRewardRatio, trigger: 'blur' }
        ],
        isGetPoster: [
          { required: true, message: '海报获取不能为空', trigger: 'blur' }
        ],
        isGuideAttention: [
          { required: true, message: '引导关注不能为空', trigger: 'blur' }
        ],
        guideContent: [
          { required: true, message: '引导文案不能为空', trigger: 'blur' }
        ],
        qrCodeUrl: [
          { required: true, message: '二维码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  // 监听
  watch: {},
  created() {
    // 获得单个优惠券
    this.getFission(this.$route.query.id)
  },
  methods: {
    // 获得单个裂变
    async getFission(id) {
      try {
        // const { data: { list, total }} = await queryCouponList(query)
        const res = await getFission(id)
        if (res.success) {
          var res_data = res.data
          // 活动名称
          // name: '',
          this.form.name = res_data.name
          /* 商品id*/
          // goodsId: null,
          this.form.goodsId = res_data.goodsId
          this.goodsData.title = res_data.goodsName
          this.goodsData.cover = res_data.goodsImg
          this.goodsData.realUnitPrice = res_data.realUnitPrice // 商品价格
          this.goodsData.cType = res_data.cType // 商品类型
          // 使用时间
          // time: [],
          this.form.time = [res_data.beginTime, res_data.endTime]
          /* 使用时间 开始时间*/
          this.form.beginTime = res_data.beginTime
          // beginTime: '',
          /* 使用时间 结束时间*/
          this.form.endTime = res_data.endTime
          // endTime: '',
          /* 是否为自定义背景图 0:不是 1:是 */
          this.form.isBackImg = res_data.isBackImg
          // isBackImg: 0,
          // 背景图片Id
          this.form.backImgId = res_data.backImgId
          // backImgId: 1,
          // 自定义背景图片
          this.form.backImgUrl = res_data.backImg !== '' ? this.Host + '/res/' + res_data.backImg : ''
          // backImg: '',
          // backImgUrl: '',
          /* 是否显示头像 0:不显示 1:显示 */
          this.form.isShowHead = res_data.isShowHead
          // isShowHead: 1,
          // 奖励比例
          this.form.rewardRatio = res_data.rewardRatio
          // rewardRatio: null,
          /* 是否可获取海报 0:均可以 1:购买后可以 */
          this.form.isGetPoster = res_data.isGetPoster
          // isGetPoster: 0,
          /* 是否引导 0:不引导 1:引导 */
          this.form.isGuideAttention = res_data.isGuideAttention
          // isGuideAttention: 1,
          this.form.guideContent = res_data.guideContent
          // guideContent: '',
          this.form.qrCodeUrl = res_data.qrCode !== '' ? this.Host + '/res/' + res_data.qrCode : ''
          // qrCode: '',
          // qrCodeUrl: ''
        } else {
          this.$message({ type: 'error', message: res.message })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 返回上一页
    goBack() {
      this.$router.back()
    },
    submit() {
      // alert('ok')
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          const res = await upFission(this.form)
          // console.log(res)
          if (res.success) {
            this.$message({ type: 'success', message: '修改成功！' })
            this.goBack()
          } else {
            this.$message({ type: 'error', message: res.message })
          }
        }
      })
    },
    // 通过时间组件获取开始时间和结束时间
    getTime() {
      if (this.form.time !== null) {
        this.form.beginTime = this.form.time[0]
        this.form.endTime = this.form.time[1]
      }
    },
    // 选择商品
    onGoods() {
      // console.log(this.form.includeGoods)
      this.$refs['leeDialogGoods'].onDialog(this.form.goodsId)
    },
    // leeDialogGoods选中的商品
    getGoods(data) {
      // console.log(data)
      this.goodsData = data
      this.form.goodsId = data.id
      // // 处理写入数据给form
      // this.changeGoods()
    },
    // 更新商品
    editGoods() {
      console.log(this.goodsData)
    },
    // 上传
    changeFile(file) {
      this.form.qrCode = file.raw
      this.form.qrCodeUrl = URL.createObjectURL(file.raw)
    },
    // 上传海报背景
    backImgChangeFile(file) {
      // console.log(file)
      this.form.backImg = file.raw
      this.form.backImgUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      console.log(111)
      return false
    }
  }
}
</script>
