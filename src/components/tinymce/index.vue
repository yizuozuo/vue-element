<template>
  <div class="ht-tinymce"
    :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea"
      :id="tinymceId" />
    <div class="editor-custom-btn-container"
      v-show="!readonly">
      <el-upload
        :action="uploadAction"
        :headers="httpHeader"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        :on-success="handleUploadSucc"
        :show-file-list="false"
        :disabled="disabled">
        <el-button icon="el-icon-upload"
          size="mini"  
          type="primary"
          :disabled="disabled"
          :loading="isUploading">
          上传图片
        </el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>

import plugins from './plugins'
import toolbar from './toolbar'
import { formatImgUrl } from '@/utils'
import { getUploadHttpHeader } from '@/utils/request'
import { UPLOAD_FOR_IMG } from '@/utils/const'

export default {
  name: 'tinymce',
  props: {
    id: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default: () => []
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      httpHeader: getUploadHttpHeader(),
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || `vue-tinymce-${Date.now()}` ,
      fullscreen: false,
      isUploading: false,
      uploadAction: UPLOAD_FOR_IMG,
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        readonly: this.readonly,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },

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
          let imageUrl = res.entity.fileId
          const url = formatImgUrl(imageUrl)
          const _this = this
          window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${url}" >`)
        } else {
          this.$message.error('上传图片失败')
        }
      } else {
        this.isUploading = false
        this.$message.error('上传图片失败！')
      }
    },

    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style>
.ht-tinymce {
  position: relative;
}

.ht-tinymce >>> .mce-fullscreen {
  z-index: 10000;
}
.ht-tinymce .tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.ht-tinymce .editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: -5px;
}
.ht-tinymce.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.ht-tinymce .editor-upload-btn {
  display: inline-block;
}
.ht-tinymce .el-upload {
  border: none !important;
  padding: 6px;
}
.ht-tinymce .mce-branding {
  display: none !important;
}
</style>
