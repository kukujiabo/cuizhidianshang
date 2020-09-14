<template>
	<div class="atterbody">
		<div class="attercont">
			<div class="hendeatte">
				<img class="headerimg" src="@/assets/img/logo-yanyu.png" />
				<span class="heng"></span>
				<span class="headerdprz">店铺认证</span>
			</div>
			<div class="headerright">
				<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
					<div class="avatar-wrapper">
						<img src="@/assets/useradmin.png" class="user-avatar">
						<i class="el-icon-caret-bottom" />
					</div>
					<el-dropdown-menu slot="dropdown">
						<router-link to="/profile/index">
							<el-dropdown-item>账号设置</el-dropdown-item>
						</router-link>
						<el-dropdown-item divided @click.native="logout">
							<span style="display:block;">退出登录</span>
						</el-dropdown-item>
						<el-dropdown-item divided @click="gotoback">
							<span style="display:block;" @click="gotoback">返回上一页</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="atterviewbody">
			<div class="atterbodyhead">
				<img class="bodyimg" src="@/assets/img/bg.png" />
			</div>
			<div class="attredbody">
				<div class="atterview">
					<div>
						<span>店铺名称:{{shopname}}</span>
						<span class="atterrzlx">认证类型</span>
						<div class="atterbut">
							<button class="atterbutgr" :class="{current: status === 1}" @click="tabClick(1)">个人认证</button>
							<button class="atterbutgr" :class="{current: status === 2}" @click="tabClick(2)">企业认证</button>
							<button class="atterbutgr" :class="{current: status === 3}" @click="tabClick(3)">其他机构认证</button>
						</div>
						<span class="atterztxx">主体信息</span>
					</div>
					<!-- 个人认证 -->
					<el-form ref="form" :model="form" v-show="status===1" class="grrz">
						<div class="grrz-xm">
							<span>姓名</span>
							<input type="text" class="grrz-xm-sr" v-model="form.name" />
						</div>
						<div class="grrz-zjlx">
							<span>证件类型</span>
							<el-input placeholder="中国大陆居民身份证" class="grrz-zjlx-srl" v-model="form.zjlx" :disabled="true">
							</el-input>
						</div>
						<div class="grrz-sfzhm">
							<span>身份证号码</span>
							<input type="text" class="grrz-sfzhm-srl" v-model="form.sfz" />
						</div>
						<div class="grrz-fzrsfzhm">
							<span>身份证照片</span>
							<div class="grrz-zhengm">
								<el-upload class="upload-demo" action="http://eccs.com.cn/services/" :show-file-list="false" :limit="1" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
								 :file-list="fileList" :on-change="changeFilezm">
									<div class="grrz-fzrsfzhm-zm">
										<img v-if="form.cover" class="grrz-fzrsfzhm-zmzp1" :src="form.cover">
										<img v-else class="grrz-fzrsfzhm-zmzp" src="@/assets/img/zhengm.png">
										<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证正面照片</span>
									</div>
								</el-upload>
							</div>
							<div class="grrz-fzrsfzfm" style="margin-top: -34px;">
								<el-upload class="upload-demo" style="margin-top: -28x;" action="http://eccs.com.cn/services/" :show-file-list="false"
								 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF" :limit="1" :file-list="fileList1"
								 :on-change="changeFilefm">
									<div class="grrz-fzrsfzhm-fm">
										<img v-if="form.coverfm" class="grrz-fzrsfzhm-zmfm1" :src="form.coverfm">
										<img v-else class="grrz-fzrsfzhm-zmfm" src="@/assets/img/fanm.png">
										<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证反面照片</span>
									</div>
								</el-upload>
							</div>
						</div>
						<div class="grrz-scsfzhm">
							<span>手持证件照</span>
							<el-upload class="upload-demo" action="http://eccs.com.cn/services/" :show-file-list="false" :limit="1"
							 :file-list="fileList2" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF" :on-change="changeFilesc">
								<div class="grrz-scsfzhm-zm">
									<img v-if="form.coversc" class="grrz-scsfzhm-zmzp1" :src="form.coversc">
									<img v-else class="grrz-scsfzhm-zmzp" src="@/assets/img/zhengm.png" />
									<span style="display: block;font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传手持证件照</span>
								</div>
							</el-upload>
							<div class="grrz-scsfzhm-fm">
								<div class="grrz-scsfzhm-sm">
									1、请确保“身份证”相关信息全部清晰
									2、请确保漏出您的手臂
								</div>
							</div>
						</div>
						<div class="yzgly">
							<span class="yzgly-sf">验证管理员身份</span>
							<div class="yzgly-sjh">验证码将发送到管理员手机号：<div class="yzgly-sjh2">{{this.getUserPhone}}</div>
								<div style="margin-left: 250px; margin-top:-11px;">请注意查收</div>
							</div>
						</div>
						<div class="grrz-huoquyzm">
							<span>短信验证码:</span>
							<input type="text" class="grrz-huoquyzmk" v-model="form.yzm" />
							<el-button type="text" @click="dxyzm" v-if="!isDisabled">{{content}}</el-button>
							<el-button type="text" v-if="isDisabled">{{content}}</el-button>
						</div>
						<el-button class="grrz-tijiao-btn" @click="submit(status)">提交认证信息</el-button>
					</el-form>
					<!-- 企业认证 -->
					<el-form ref="form2" :model="form2" v-show="status===2" class="qyrz">
						<div class="qyrz-xm">
							<span>企业名称</span>
							<input type="text" class="qyrz-xm-sr" v-model="form2.qymc" />
						</div>
						<div class="qyrz-zjlx">
							<span>法人</span>
							<input type="text" class="qyrz-zjlx-srl" v-model="form2.fr" />
						</div>
						<div class="qyrz-sfzhm">
							<span>法人身份证号</span>
							<input type="text" class="qyrz-sfzhm-srl" v-model="form2.frsfz" />
						</div>
						<div class="qyrz-fzrsfzhm">
							<span>法人身份证照片</span>
							<el-upload class="upload-demo" action="http://eccs.com.cn/services/" :show-file-list="false" :limit="1" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
							 :file-list="formfileList1" :on-change="changeFileqyzm">
								<div class="qyrz-fzrsfzhm-zm">
									<img v-if="form2.coverqyzm" class="qyrz-fzrsfzhm-zmzp1" :src="form2.coverqyzm">
									<img v-else class="qyrz-fzrsfzhm-zmzp" src="@/assets/img/zhengm.png">
									<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证正面照片</span>
								</div>
							</el-upload>

							<div class="qyrz-fzrsfzfm" style="margin-top: -34px;">
								<el-upload class="upload-demo" style="margin-top: -28x;" action="http://eccs.com.cn/services/" :show-file-list="false"
								 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF" :limit="1" :file-list="formfileList2"
								 :on-change="changeFileqyfm">
									<div class="qyrz-fzrsfzhm-fm">
										<img v-if="form2.coverqyfm" class="qyrz-fzrsfzhm-zmfm1" :src="form2.coverqyfm">
										<img v-else class="qyrz-fzrsfzhm-zmfm" src="@/assets/img/fanm.png">
										<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证反面照片</span>
									</div>
								</el-upload>
							</div>
						</div>
						<div class="qyrz-shdm">
							<span>统一社会信用代码</span>
							<input type="text" class="qyrz-shdm-sr" v-model="form2.shxydm" />
						</div>
						<div class="qyrz-jgzj">
							<div style="width: 128px; height: 40px;">营业执照</div>
							<el-upload class="upload-demo" ref="upload" action="http://eccs.com.cn/services/" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
							 :on-remove="handleRemove" :on-change="changeFileqyyyzz" :file-list="formfileList3" :auto-upload="false">
								<el-button slot="trigger" size="small" type="primary" class="qyrz-jgzj-xqwj">选取文件</el-button>
							</el-upload>
						</div>
						<div class="qyrz-jgzj-zhichi">仅支持在有效期内的中国大陆工商局或市场监督管理局颁发的工商营业执照。格式要求：原件照片、扫描件或者复印件加盖企业公章后的扫描件，
							支持jpg.jpeg.bpm.gif.png格式照片，大小不超过5M。</div>
						<div class="qyrz-gly">
							<span class="qyrz-sf">验证管理员身份</span>
							<div class="qyrz-sjh">验证码将发送到管理员手机号：<div class="qyrz-sjh2">{{this.getUserPhone}}</div>
								<div style="margin-left: 250px; margin-top:-11px;">请注意查收</div>
							</div>
						</div>
						<div class="qyrz-huoquyzm">
							<span>短信验证码:</span>
							<input type="text" class="qyrz-huoquyzmk" v-model="form2.yzm" />
							<el-button type="text" @click="dxyzm" v-if="!isDisabled">{{content}}</el-button>
							<el-button type="text" v-if="isDisabled">{{content}}</el-button>
						</div>
						<el-button class="qyrz-btn" @click="submit(status)">提交认证信息</el-button>
					</el-form>
					<!-- 其他机构认证 -->
					<el-form ref="form3" :model="form3" v-show="status===3" class="attr-xx">
						<div class="atterrzxx">
							<span>机构名称</span>
							<input type="text" class="atterjigouname" v-model="form3.organizationName " />
						</div>
						<div class="attr-fzr">
							<span>负责人</span>
							<input type="text" class="atterfzr1" v-model="form3.userName " />
						</div>
						<div class="attr-fzrsfz">
							<span>负责人身份证号码</span>
							<input type="text" class="atterfzrsfz1" v-model="form3.idCard " />
						</div>
						<div class="attr-fzrsfzzp">
							<span>负责人身份证照片</span>
							<el-upload class="upload-demo" action="http://eccs.com.cn/services/" :show-file-list="false" :limit="1" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
							 :file-list="form3fileList1" :on-change="changeFileqtjgzm">
								<div class="attr-sfzzp-zm">
									<img v-if="form3.coverqtjgzm" class="attr-sfzzp-zmzp1" :src="form3.coverqtjgzm">
									<img v-else class="attr-sfzzp-zmzp" src="@/assets/img/zhengm.png">
									<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证正面照片</span>
								</div>
							</el-upload>
							<div style="margin-top: -34px;">
								<el-upload class="upload-demo" action="http://eccs.com.cn/services/" :show-file-list="false" :limit="1" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
								 :file-list="form3fileList2" :on-change="changeFileqtjgfm">
									<div class="attr-sfzzp-fm">
										<img v-if="form3.coverqtjgfm" class="attr-sfzzp-zmfm1" :src="form3.coverqtjgfm">
										<img v-else class="attr-sfzzp-zmfm" src="@/assets/img/zhengm.png">
										<span style="display: block; font-size: 11px; color: #999999;margin-left: 5px;margin-top: 10px;">点击上传身份证反面照片</span>
									</div>
								</el-upload>
							</div>
						</div>
						<div class="attr-jgzj">
							<div style="width: 128px; height: 40px;">营业执照</div>
							<el-upload class="upload-demo" ref="upload" action="http://eccs.com.cn/services/" accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
							 :on-remove="handleRemove" :on-change="changeFileqtjgyyzz" :file-list="form3fileList3" :auto-upload="false">
								<el-button slot="trigger" size="small" type="primary" class="attr-jgzj-xqwj">选取文件</el-button>
							</el-upload>
						</div>
						<div class="attr-jgzj-zhichi">仅支持在有效期内的中国大陆工商局或市场监督管理局颁发的工商营业执照。格式要求：原件照片、扫描件或者复印件加盖企业公章后的扫描件，
							支持jpg.jpeg.bpm.gif.png格式照片，大小不超过5M。</div>
						<div class="yanzhen-gly">
							<span class="yanzhen-sf">验证管理员身份</span>
							<div class="yanzhen-sjh">验证码将发送到管理员手机号：<div class="yanzhen-sjh2">{{this.getUserPhone}}</div>
								<div style="margin-left: 250px; margin-top:-11px;">请注意查收</div>
							</div>
						</div>
						<div class="huoquyzm">
							<span>短信验证码:</span>
							<input type="text" class="huoquyzmk" v-model="form3.verifyCode" />
							<el-button type="text" @click="dxyzm" v-if="!isDisabled">{{content}}</el-button>
							<el-button type="text" v-if="isDisabled">{{content}}</el-button>
						</div>
						<el-button class="tijiao-btn" @click="submit(status)">提交认证信息</el-button>
					</el-form>
				</div>
			</div>
		</div>
	</div>

	</div>
</template>
<script>
	import {
		alterstore,
		dxyzm,
		getCertify
	} from '../../api/shop.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		created(val) {
			this.form.shopId = this.$route.query.id;
			this.shopname = this.$route.query.name;
			this.getCertify1()
			console.log(this.getCurrentShop, '测试')
		},
		computed: {
			...mapGetters(['getUserPhone', 'getCurrentShop'])
		},
		data() {
			return {
				src: "",
				shopname: '',
				status: 1,
				count: '',
				isDisabled: false, //控制按钮是否可以点击（false:可以点击，true:不可点击）
				content: '获取短信验证码',
				fileList: [],
				fileList1: [],
				fileList2: [],
				shopList: [],
				form: {
					shopId: "",
					certifyType: 1,
					name: '',
					zjlx: '',
					zjlx1: 1,
					sfz: '',
					cover: '',
					coverfm: '',
					coversc: '',
					yzm: '',
					coverFile: null,
					coverFilefm: null,
					coverFilesc: null
				},
				formfileList1: [],
				formfileList2: [],
				formfileList3: [],
				form2: {
					qymc: '', //企业名称
					certifyType: 2, //认证类型
					fr: '', //法人
					frsfz: '', //法人身份证
					coverqyzm: '', //证件照正面图片路径
					coverqyfm: '', //证件照反面图片路径
					shxydm: '',
					yzm: '',
					coverFileqyzm: null, // file | 证件照片正面 ||
					coverFileqyfm: null, //| file | 证件照片背面 ||
					coverFileqyyyzz: null, // file | 营业执照 
				},
				form3fileList1: [],
				form3fileList2: [],
				form3fileList3: [],
				form3: {
					certifyType: 3, //认证类别
					organizationName: '', //机构名称
					userName: '', //负责人
					idCard: '', //负责人身份证号码
					coverqtjgzm: '', //证件照正面图片路径
					coverqtjgfm: '', //证件照反面图片路径nx
					frontIDCardPhoto: null, //证件照正面
					backIDCardPhoto: null, //证件照背面
					certifyFile1: null, //机构证件
					verifyCode: '' //验证码
				}
			}
		},
		methods: {
			//个人认证图片
			handleRemove(index) {
				console.log(index)
			},
			gotoback(){
				this.$router.go(-1);//返回上一层
			},
			changeFilezm(file) {
				this.form.coverFile = file.raw
				this.form.cover = URL.createObjectURL(file.raw)
			},
			changeFilefm(file) {
				this.form.coverFilefm = file.raw
				this.form.coverfm = URL.createObjectURL(file.raw)
			},
			changeFilesc(file) {
				this.form.coverFilesc = file.raw
				this.form.coversc = URL.createObjectURL(file.raw)
				console.log(file)
			},
			//企业认证图片
			changeFileqyzm(file) {
				this.form2.coverFileqyzm = file.raw
				this.form2.coverqyzm = URL.createObjectURL(file.raw)
			},
			changeFileqyfm(file) {
				this.form2.coverFileqyfm = file.raw
				this.form2.coverqyfm = URL.createObjectURL(file.raw)
			},
			changeFileqyyyzz(file) {
				this.form2.coverFileqyyyzz = file.raw
				this.form2.coverqyyyzz = URL.createObjectURL(file.raw)
			},
			//其他机构认证图片
			changeFileqtjgzm(file) {
				this.form3.frontIDCardPhoto = file.raw
				this.form3.coverqtjgzm = URL.createObjectURL(file.raw)
				console.log(this.form2.coverqtjgzm, 123312)
			},
			changeFileqtjgfm(file) {
				this.form3.backIDCardPhoto = file.raw
				this.form3.coverqtjgfm = URL.createObjectURL(file.raw)
			},
			changeFileqtjgyyzz(file) {
				this.form3.certifyFile1 = file.raw
				this.form3.coverqtjgyyzz = URL.createObjectURL(file.raw)
			},
			tabClick(index) {
				this.status = index
			},
			async submit(status) {
				//个人信息提交

				// this.$confirm('是否确认认证, 是否继续?', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning'
				// }).then(() => {
				// 	this.$message({
				// 		type: 'success',
				// 		message: '认证成功!'
				// 	});
				// }).catch(() => {
				// 	this.$message({
				// 		type: 'info',
				// 		message: '取消认证'
				// 	});
				// 	return ;
				// });
				if (status == 1) {

					if (!this.form.name) {
						this.$message('请输入姓名');
						return
					}
					if (!this.form.zjlx1) {
						this.$message('请输入证件类型');
						return
					}
					if (!this.form.sfz) {
						this.$message('请输入身份证号码');
						return
					}
					// if (!this.form.coverFile) {
					// 	this.$message('请上传证件照片正面');
					// 	return
					// }
					// if (!this.form.coverFilefm) {
					// 	this.$message('请上传证件照片背面');
					// 	return
					// }
					// if (!this.form.coverFilesc) {
					// 	this.$message('请上传手持证件照片');
					// 	return
					// }
					else {
						let data = new FormData();
						data.append("shopId", this.form.shopId); //店铺id
						data.append("certifyType", this.form.certifyType); //认证类型
						data.append("userName", this.form.name); //姓名
						data.append("idType", this.form.zjlx); //证件类型
						data.append("idCard", this.form.sfz); //身份证号码
						data.append("frontIDCardPhoto", this.form.coverFile); //证件照片正面
						data.append("backIDCardPhoto", this.form.coverFilefm); //证件照片背面
						data.append("handIDCardPhoto", this.form.coverFilesc); //手持证件照片
						data.append("verifyCode", this.form.yzm); //验证码
						let res = await alterstore(data);
						console.log(this.form)
						console.log(res,'提交成功');
						if(res.success==true){
							this.$message('提交认证成功');
						}

					}
				}
				//企业认证
				if (status == 2) {

					if (!this.form2.qymc) {
						this.$message('请输入企业名称');
						return
					}
					if (!this.form2.fr) {
						this.$message('请输入法人');
						return
					}
					if (!this.form2.frsfz) {
						this.$message('请输入法人身份证号');
						return
					}
					// if (!this.form.coverFile) {
					// 	this.$message('请上传证件照片正面');
					// 	return
					// }
					// if (!this.form.coverFilefm) {
					// 	this.$message('请上传证件照片背面');
					// 	return
					// }
					// if (!this.form.coverFilesc) {
					// 	this.$message('请上传手持证件照片');
					// 	return
					// }
					else {
						let data = new FormData();
						data.append("shopId", this.form.shopId); //店铺id
						data.append("certifyType", this.form2.certifyType); //认证类型
						data.append("organizationName", this.form2.qymc); //企业名称
						data.append("userName", this.form2.fr); //法人
						data.append("idCard", this.form2.frsfz); //身份证号码
						data.append("unifiedSocialCreditCode", this.form2.shxydm); //统一社会信用代码
						data.append("frontIDCardPhoto", this.form2.coverFileqyzm); //证件照片正面
						data.append("backIDCardPhoto", this.form2.coverFileqyfm); //证件照片背面
						data.append("handIDCardPhoto", this.form2.coverFileqyyyzz); //营业执照
						data.append("verifyCode", this.form2.yzm); //验证码
						let res = await alterstore(data);
						console.log(this.form2)
						console.log(res);
						if(res.success==true){
							this.$message('提交认证成功');
						}

					}
				}
				//其他机构认证
				if (status == 3) {
					if (!this.form3.organizationName) {
						this.$message('请输入企业名称');
						return
					}
					if (!this.form3.userName) {
						this.$message('请输入法人');
						return
					}
					if (!this.form3.idCard) {
						this.$message('请输入法人身份证号');
						return
					} else {
						let data = new FormData();
						data.append("shopId", this.form.shopId); //店铺id
						data.append("certifyType", this.form3.certifyType); //认证类别
						data.append("organizationName", this.form3.organizationName); //机构名称
						data.append("userName", this.form3.userName); //负责人
						data.append("idCard", this.form3.idCard); //负责人身份证号码
						data.append("unifiedSocialCreditCode", this.form3.shxydm); //统一社会信用代码
						data.append("frontIDCardPhoto", this.form3.frontIDCardPhoto); //证件照片正面
						data.append("backIDCardPhoto", this.form3.backIDCardPhoto); //证件照片背面
						data.append("certifyFile1", this.form3.certifyFile1); //机构证件
						data.append("verifyCode", this.form3.verifyCode); //验证码
						let res = await alterstore(data);
						console.log(this.form3)
						console.log(res);
						if(res.success==true){
							this.$message('提交认证成功');
						}

					}
				}
			},
			async dxyzm() {
				const TIME_COUNT = 60
				this.count = TIME_COUNT
				let yzm = await dxyzm();
				this.yzm = yzm.message
				this.timer = window.setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						// 倒计时时不可点击
						this.isDisabled = true
						// 计时秒数
						this.count--
						// 更新按钮的文字内容
						this.content = this.count + 's后重新获取'
					} else {
						// 倒计时完，可点击
						this.isDisabled = false
						// 更新按钮文字内容
						this.content = '获取短信验证码'
						// 清空定时器!!!
						clearInterval(this.timer)
						this.timer = null
					}
				}, 1000)
			},
			async getCertify1() {
				let data = await getCertify(this.form.shopId);
				if (data.data.success = true) {
					if (data.data.certifyType === 1) {
						console.log(data.data)
						this.form.name = data.data.userName
						this.form.sfz = data.data.idCard
						this.form.cover = "http://eccs.com.cn/services/res/" + data.data.frontIDCardPhoto
						this.form.coverfm = "http://eccs.com.cn/services/res/" + data.data.backIDCardPhoto
						this.form.coversc = "http://eccs.com.cn/services/res/" + data.data.handIDCardPhoto
					}
					if (data.data.certifyType === 2) {
						this.form2.qymc = data.data.organizationName
						this.form2.fr = data.data.userName
						this.form2.frsfz = data.data.idCard
						this.form2.shxydm = data.data.unifiedSocialCreditCode
						this.form2.coverqyzm = "http://eccs.com.cn/services/res/" + data.data.frontIDCardPhoto
						this.form2.coverqyfm = "http://eccs.com.cn/services/res/" + data.data.backIDCardPhoto
					}
					if (data.data.certifyType === 3) {
						console.log(data.data)
						this.form3.organizationName = data.data.organizationName
						this.form3.userName = data.data.userName
						this.form3.idCard = data.data.idCard
						this.form3.coverqtjgzm = "http://eccs.com.cn/services/res/" + data.data.frontIDCardPhoto
						this.form3.coverqtjgfm = "http://eccs.com.cn/services/res/" + data.data.backIDCardPhoto
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.atterbody {
		background: #f6f7fa;
		height: 1500px;
		word-break: break-all !important;
		word-wrap: break-word !important;

		.attercont {
			display: flex;
			justify-content: space-between;
			align-content: center;
			border-bottom: 1px solid #DFE0E6;
			background-color: #ffffff;

			.hendeatte {
				display: flex;
				margin-left: 92px;
				width: 1257px;

				.headerimg {
					margin-top: 10px;
					margin-bottom: 10px;
					width: 50px;
					height: 50px;
				}

				.heng {
					margin-top: 26px;
					margin-left: 15px;
					height: 18px;
					background-color: #333333;
					width: 2px;
				}

				.headerdprz {
					font-size: 18px;
					margin-top: 26px;
					margin-bottom: 22px;
					margin-left: 6px;
				}

			}

			.headerright {
				margin-top: 23px;
				margin-bottom: 23px;
				margin-right: 92px;

				.avatar-container {
					margin-right: 40px;

					.avatar-wrapper {
						margin-top: 5px;
						position: relative;

						.user-avatar {
							cursor: pointer;
							width: 24px;
							height: 24px;
						}

						.el-icon-caret-bottom {
							cursor: pointer;
							position: absolute;
							right: -20px;
							top: 8px;
							font-size: 12px;
						}
					}
				}
			}
		}

		.atterviewbody {
			margin: 21px auto;
			width: 1257px;
			height: 1340px;
			background-color: #FFFFFF;

			.atterbodyhead {
				.bodyimg {
					height: 91px;
					width: 1257px;
				}
			}

			.attredbody {
				background-color: #FFFFFF;
				width: 1257px;
				display: flex;

				.atterview {
					display: flex;
					margin-left: 30px;
					padding-top: 30px;

					.atterrzlx {
						display: block;
						line-height: 16px;
						margin-top: 60px;
						margin-left: 6px;
						text-indent: 10px;
						height: 16px;
						font-size: 18px;
						border-left: 3px solid #1f71ff;
					}

					.atterbut {
						margin-top: 30px;
						margin-left: 6px;

						.atterbutgr {
							width: 100px;
							height: 34px;
							font-size: 14px;
							background-color: #FFFFFF;
							border: 1px solid #F2F2F2;

							&.current {
								color: #FFFFFF;
								background-color: #3974F6;

								&:after {
									content: '';
									position: absolute;
									left: 50%;
									bottom: 0;
									transform: translateX(-50%);
									background-color: #3974F6;
									height: 0;
								}
							}
						}
					}

					.atterztxx {
						display: block;
						margin-top: 60px;
						margin-left: 6px;
						text-indent: 10px;
						line-height: 16px;
						height: 16px;
						font-size: 18px;
						border-left: 3px solid #1f71ff;
					}

					.grrz {
						display: block;
						margin-top: 307px;
						margin-left: -300px;

						.grrz-xm {
							.grrz-xm-sr {

								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;

								margin-left: 76px;
								width: 433px;
								height: 40px;
							}
						}

						.grrz-zjlx {
							margin-top: 40px;

							.grrz-zjlx-srl {
								border-radius: 4px;

								margin-left: 45px;
								width: 433px;
								height: 40px;
							}
						}

						.grrz-sfzhm {
							margin-top: 40px;

							.grrz-sfzhm-srl {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;

								margin-left: 30px;
								width: 433px;
								height: 40px;
							}
						}

						.grrz-fzrsfzhm {
							margin-top: 50px;

							.grrz-fzrsfzhm-zm {
								margin-top: -30px;
								margin-left: 110px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.grrz-fzrsfzhm-zmzp {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.grrz-fzrsfzhm-zmzp1 {
									width: 200px;
									height: 120px;
								}
							}

							.grrz-fzrsfzhm-fm {
								margin-top: -112px;
								margin-left: 340px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.grrz-fzrsfzhm-zmfm {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}
							}

							.grrz-fzrsfzhm-zmfm1 {
								// margin-top: -28px;
								width: 200px;
								height: 120px;
							}
						}

						.grrz-scsfzhm {
							margin-top: 50px;

							.grrz-scsfzhm-zm {

								margin-top: -30px;
								margin-left: 110px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.grrz-scsfzhm-zmzp {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.grrz-scsfzhm-zmzp1 {
									width: 200px;
									height: 120px;

								}
							}

							.grrz-scsfzhm-fm {
								margin-top: -120px;
								margin-left: 340px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.grrz-scsfzhm-sm {
									padding-top: 80px;
									margin-left: 13px;
									margin-right: 22px;
									font-size: 10px;
									width: 170px;
									height: 28px;
									color: #666666;
								}
							}
						}

						.yzgly {
							margin-top: 80px;
							display: block;
							line-height: 10px;
							text-indent: 10px;
							height: 16px;
							font-size: 12px;
							border-left: 3px solid #1f71ff;

							.yzgly-sf {
								font-size: 18px;
							}

							.yzgly-sjh {
								margin-top: 20px;
								color: #999999;

								.yzgly-sjh2 {
									display: flex;
									display: bo;
									margin-top: -10px;
									margin-left: 165px;
									color: #0079FF;
								}
							}

						}

						.grrz-huoquyzm {
							margin-top: 60px;

							.grrz-huoquyzmk {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 22px;
								margin-right: 20px;
								width: 200px;
								height: 40px;

							}
						}

						.grrz-tijiao-btn {
							height: 44px;
							width: 140px;
							border: none;
							border-radius: 4px;
							margin-left: 130px;
							margin-top: 50px;
							background-color: #0479FF;
							color: #FFFFFF;
						}
					}

					.qyrz {
						display: block;
						margin-top: 307px;
						margin-left: -300px;

						.qyrz-xm {
							.qyrz-xm-sr {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;

								margin-left: 76px;
								width: 433px;
								height: 40px;
							}
						}

						.qyrz-zjlx {
							margin-top: 40px;

							.qyrz-zjlx-srl {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;

								margin-left: 108px;
								width: 433px;
								height: 40px;
							}
						}

						.qyrz-sfzhm {
							margin-top: 40px;

							.qyrz-sfzhm-srl {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;

								margin-left: 43px;
								width: 433px;
								height: 40px;
							}
						}

						.qyrz-fzrsfzhm {
							margin-top: 50px;

							.qyrz-fzrsfzhm-zm {
								margin-top: -30px;
								margin-left: 140px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.qyrz-fzrsfzhm-zmzp {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.qyrz-fzrsfzhm-zmzp1 {
									width: 200px;
									height: 120px;
								}
							}

							.qyrz-fzrsfzhm-fm {
								margin-top: -113px;
								margin-left: 380px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.qyrz-fzrsfzhm-zmfm {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.qyrz-fzrsfzhm-zmfm1 {

									width: 200px;
									height: 120px;
								}
							}
						}

						.qyrz-shdm {
							margin-top: 30px;

							.qyrz-shdm-sr {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 10px;
								width: 433px;
								height: 40px;
							}
						}

						.qyrz-jgzj {
							margin-top: 50px;
							display: flex;

							.qyrz-jgzj-xqwj {
								background-color: #FAFBFC;
								border: none;
								color: #999999;
								border-radius: 4px;
								margin-left: 11px;
								width: 100px;
								height: 34px;
							}

						}

						.qyrz-jgzj-zhichi {
							margin-top: 40px;
							margin-left: 100px;
							width: 768px;
							height: 34px;
							font-size: 12px;
							color: #999999;
						}

						.qyrz-gly {
							margin-top: 80px;
							display: block;
							line-height: 10px;
							text-indent: 10px;
							height: 16px;
							font-size: 12px;
							border-left: 3px solid #1f71ff;

							.qyrz-sf {
								font-size: 18px;
							}

							.qyrz-sjh {
								margin-top: 10px;
								color: #999999;

								.qyrz-sjh2 {
									display: flex;
									display: bo;
									margin-top: -10px;
									margin-left: 165px;
									color: #0079FF;
								}
							}
						}

						.qyrz-huoquyzm {
							margin-top: 60px;

							.qyrz-huoquyzmk {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 22px;
								margin-right: 20px;
								width: 200px;
								height: 40px;

							}
						}

						.qyrz-btn {
							height: 44px;
							width: 140px;
							border: none;
							border-radius: 4px;
							margin-left: 130px;
							margin-top: 50px;
							background-color: #0479FF;
							color: #FFFFFF;
						}
					}

					.attr-xx {
						display: block;
						margin-top: 307px;
						margin-left: -300px;

						.atterrzxx {

							.atterjigouname {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 80px;
								width: 433px;
								height: 40px;

							}
						}

						.attr-fzr {
							margin-top: 50px;

							.atterfzr1 {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 97px;
								width: 433px;
								height: 40px;

							}
						}

						.attr-fzrsfz {
							margin-top: 50px;

							.atterfzrsfz1 {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 17px;
								width: 433px;
								height: 40px;

							}
						}

						.attr-fzrsfzzp {
							margin-top: 50px;

							.attr-sfzzp-zm {
								margin-top: -30px;
								margin-left: 140px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.attr-sfzzp-zmzp {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.attr-sfzzp-zmzp1 {
									width: 200px;
									height: 120px;
								}
							}

							.attr-sfzzp-fm {
								margin-top: -113px;
								margin-left: 380px;
								width: 200px;
								height: 120px;
								background-color: #F2F2F2;
								border-radius: 2px;

								.attr-sfzzp-zmfm {
									width: 98px;
									height: 58px;
									margin-top: 18px;
									margin-right: 51px;
									margin-left: 51px;
								}

								.attr-sfzzp-zmfm1 {

									width: 200px;
									height: 120px;
								}
							}
						}

						.attr-jgzj {
							margin-top: 50px;
							display: flex;

							.attr-jgzj-xqwj {
								background-color: #FAFBFC;
								border: none;
								color: #999999;
								border-radius: 4px;
								margin-left: 11px;
								width: 100px;
								height: 34px;
							}

						}

						.attr-jgzj-zhichi {
							margin-top: 40px;
							margin-left: 100px;
							width: 768px;
							height: 34px;
							font-size: 12px;
							color: #999999;
						}

						.yanzhen-gly {
							margin-top: 80px;
							display: block;
							line-height: 10px;
							text-indent: 10px;
							height: 16px;
							font-size: 12px;
							border-left: 3px solid #1f71ff;

							.yanzhen-sf {
								font-size: 18px;
							}

							.yanzhen-sjh {
								margin-top: 10px;
								color: #999999;

								.yanzhen-sjh2 {
									display: flex;
									display: bo;
									margin-top: -10px;
									margin-left: 165px;
									color: #0079FF;
								}
							}
						}

						.huoquyzm {
							margin-top: 60px;

							.huoquyzmk {
								text-indent: 10px;
								border-radius: 4px;
								border: 1px solid #dfe0e6;
								margin-left: 22px;
								margin-right: 20px;
								width: 200px;
								height: 40px;

							}
						}

						.tijiao-btn {
							height: 44px;
							width: 140px;
							border: none;
							border-radius: 4px;
							margin-left: 130px;
							margin-top: 50px;
							background-color: #0479FF;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
