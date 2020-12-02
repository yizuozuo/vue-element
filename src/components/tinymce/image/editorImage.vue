<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload"
      size="mini" 
      @click="dialogVisible=true" 
      type="primary">
      上传图片
    </el-button>
    <el-dialog 
      :visible.sync="dialogVisible"
      style="margin-bottom:10px;"
      center>
      <div class="avatar-upload">
        <div class="profile">
          <custom-image :src="imageUrl"
            :width="200"
            :height="200"
            class="pic" />
          <el-button 
            class="btn-clear" 
            type="danger" 
            icon="el-icon-delete" 
            circle 
            @click="handleClear" />
        </div>
      </div>
      <el-upload
        :action="uploadAction"
        :headers="httpHeader"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        :on-success="handleUploadSucc"
        :show-file-list="false">
        <el-button
          class="uploadBtn"
          icon="el-icon-plus"
          plain
          :loading="isUploading">
          上传图片
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary"
        @click.stop="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getUploadHttpHeader } from '@/utils/request'
import { UPLOAD_FOR_IMG } from '@/utils/const'
import CustomImage from '@/components/common/image'

export default {
  name: 'editor-slide-upload',
  components: {
    CustomImage
  },
  data() {
    return {
      httpHeader: getUploadHttpHeader(),
      dialogVisible: false,
      isUploading: false,
      imageUrl: '',
      uploadAction: UPLOAD_FOR_IMG,
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传的图片只能是 JPG 格式!')
        return false
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 2MB!')
        return false
      }
      this.isUploading = true
      return true
    },

    handleUploadError() {
      this.isUploading = false
      this.$message.error('上传图片失败！')
    },

    handleUploadSucc(res, file) {
      this.isUploading = true
      if (res.success) {
        this.isUploading = false
        if (res && res.entity) {
          this.imageUrl = res.entity.fileId
        } else {
          this.$message.error('上传图片失败')
        }
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    
    handleClear() {
      this.imageUrl = null
    },

    handleSubmit() {
      const arr = []
      arr.push(this.imageUrl)
      // debugger
      this.$emit('success', arr)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
  .upload-container{
    .el-dialog__body, .el-dialog--center .el-dialog__body {
        padding: 0 25px 10px 60px;
    }
  }
</style>

<style lang="scss" scoped>
@import '../../../assets/sass/img.scss';
.avatar-upload {
  width: 200px;
  height: 200px;
  .profile {
    .custom-image {
      width: 200px;
      height: 200px;
    }
  }
}
.pic{
  width:200px;
  height: 200px;
}
</style>
