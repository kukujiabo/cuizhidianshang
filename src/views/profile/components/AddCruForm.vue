<template>
  <div class="new">
    <el-card title>
      <div class="inner-form-wrapper">
        <el-form ref="form" required :model="form" label-width="120px">
          <el-form-item prop="code" label="账号：">
            <el-input v-model="form.code" show-word-limit placeholder="请输入账号" />
          </el-form-item>
          <el-form-item required prop="name" label="姓名：">
            <el-input v-model="form.name" show-word-limit placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item class="upload-touxiang" prop="name" label="头像：">
            <el-upload
              ref="fileUploader"
              name="icon"
              class="avatar-uploader"
              :action="Host + '/api/auth/addPerson'"
              accept="image/*"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :data="newCru"
              :on-change="imageSelectChange"
              :headers="{
                Authorization: uploadToken,
                appid: appid
              }"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img v-else src="@/assets/shangchuantouxiang.png" class="avatar" alt="上传头像">
              <div slot="tip" class="el-upload__tip">建议尺寸160*160，JPG/PNG格式，要求图片小于5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="phone" label="手机号：">
            <el-input v-model="form.phone" show-word-limit placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="describe" label="员工描述：" style="height:110px;">
            <el-input
              v-model="form.describe"
              type="textarea"
              show-word-limit
              placeholder="用一句话描述角色的职责和作用，方便您的查看！"
              :maxlength="50"
              :rows="4"
            />
          </el-form-item>
          <el-form-item prop="state" label="状态：">
            <el-radio-group v-model="form.state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="height:30px" />
      <div class="inner-form-wrapper" style="border-bottom:0">
        <el-form ref="form2" required :model="form2" label-width="120px">
          <el-form-item prop="role" label="角色：">
            <el-checkbox-group v-model="form2.role">
              <el-checkbox
                v-for="role in roleList"
                :key="role.roleCode"
                :label="role.roleCode"
              >{{ role.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="operation">
        <el-button type="primary" plain @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.new {
  .operation {
    padding: 40px 135px;
    .el-button {
      width: 112px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius: 50px;
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50px;
    display: block;
  }
  .section-title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    width: 500px;
    padding: 15px 10px;
    border-bottom: 1px solid #efefef;
    .upload-touxiang {
      .el-form-item__label {
        margin-top: 22px;
      }
    }
    .el-form-item {
      min-height: 50px;
      .config {
        height: 40px;
        width: 310px;
        box-sizing: border-box;
        background-color: $lightBackground;
        border-radius: 5px;
        padding: 0 15px;
        font-weight: 800;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #666;
        .func {
          font-size: 16px;
        }
      }
      .el-input--medium {
        width: 310px;
        height: 40px;
        background-color: $lightBackground;
        border-radius: 5px;
        .el-input__inner {
          border: 0;
          height: 40px;
          line-height: 20px;
          background: transparent;
        }
        .el-input__count-inner {
          background: transparent !important;
        }
      }
      .el-textarea {
        height: 94px;
        .el-textarea__inner {
          background-color: $lightBackground;
          border: 0;
        }
        .el-input__count-inner {
          background: transparent !important;
        }
        .el-input__count {
          background: transparent !important;
        }
      }
      .cover-image {
        width: 190px;
        height: 100px;
        background-color: $lightBackground;
        margin-bottom: 10px;
        border: 0 !important;
        @include radius(5px);
      }
      .radio-item {
        width: 500px;
        p {
          font-size: 13px !important;
          color: #a1a1a1 !important;
          height: 50px !important;
          line-height: 30px !important;
          margin: 0 !important;
        }
      }
    }
  }
}
</style>

<script>
import Cookies from 'js-cookie'
import { getRoleList } from '@/api/roles'
import { Host } from '@/config'
import { getToken, getTokenType } from '@/utils/auth'
export default {
  data() {
    const token = getTokenType() + ' ' + getToken()
    return {
      Host: Host,
      cruId: '',
      appid: Cookies.get('appid'),
      uploadToken: token,
      roleList: [],
      content: '',
      fileList: [],
      imageUrl: '',
      form: {
        name: '',
        code: '',
        phone: '',
        describe: '',
        state: 1
      },
      form2: {
        role: []
      },
      newCru: {
        name: '',
        code: '',
        phone: '',
        describe: '',
        roles: []
      },
      selectedImage: null
    }
  },
  created() {
    this.getRoleList({ start: 1, limit: 100 })
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    async confirm() {
      const form = this.form
      const form2 = this.form2
      if (!form.name) {
        this.$message({ type: 'error', message: '姓名必须填写！' })
        return
      }
      if (form.phone && form.phone.length !== 11) {
        this.$message({ type: 'error', message: '手机号格式错误！' })
        return
      }
      const newCru = {
        name: form.name,
        code: form.code,
        describe: form.describe,
        phone: form.phone,
        state: form.state
      }
      if (!this.cruId) {
        form2.role.forEach((r, index) => newCru[`roles[${index}]`] = r)
        this.newCru = newCru
        setTimeout((_) => this.$refs.fileUploader.submit(), 10)
      } else {
        const api = Host + '/api/auth/editPerson'
        const xhr = new XMLHttpRequest()
        xhr.withCredentials = false
        xhr.open('POST', api)
        xhr.setRequestHeader(
          'Authorization',
          getTokenType() + ' ' + getToken()
        )
        xhr.setRequestHeader('appid', Cookies.get('appid'))
        xhr.onload = () => {
          this.loading = false
          if (xhr.status !== 200) {
            return
          }
          const { success, message } = JSON.parse(xhr.responseText)
          if (success) {
            this.$message({ type: 'success', message: '编辑成功！' })
          } else {
            this.$message({ type: 'error', message: message })
          }
        }
        const personForm = new FormData()
        personForm.append('id', this.cruId)
        for (const key in newCru) {
          personForm.append(key, newCru[key])
        }
        if (this.selectedImage) {
          personForm.append('icon', this.selectedImage.raw)
        }
        form2.role.forEach((r, index) => personForm.append(`roles[${index}]`, r))
        this.loading = true
        xhr.send(personForm)
      }
    },
    async getRoleList(query) {
      try {
        const {
          data: { list }
        } = await getRoleList(query)
        this.roleList = list
        console.log(list, 'list')
      } catch (error) {}
    },
    async handleAvatarSuccess({ success, message }) {
      if (success) {
        this.$message({ type: 'success', message: '添加成功！' })
        setTimeout((_) => {
          this.$router.back()
        }, 1500)
      } else {
        this.$message({ type: 'error', message })
      }
    },
    handleAvatarError(err) {
      console.log(err)
    },
    imageSelectChange(evt) {
      this.selectedImage = evt
      this.imageUrl = URL.createObjectURL(evt.raw)
    },
    setData({ person, permission }) {
      this.cruId = person.id
      this.form.phone = person.phone
      this.form.name = person.userName
      this.form.code = person.userCode
      this.form2.role = person.roles.map((role) => role.roleCode)
      console.log(this.form2.role, 'roles')
      this.imageUrl = Host + '/res/' + person.icon
    }
  }
}
</script>
