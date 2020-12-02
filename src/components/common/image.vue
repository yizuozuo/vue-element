<template>
  <div class="ht-image"
    :style="style0">
    <div v-if="isSrcNull || isError"
      :style="style2"
      class="empty-img">
      <div class="img">
        <span class="icon"
          :style="iconStyle">
          <i class="el-icon-picture" />
        </span>
        <span class="alt"
          v-if="perferAlt">
          {{ alt }}
        </span>
      </div>
    </div>
    <div 
      v-else
      class="img-wrapper"
      :style="style1">
      <img
        :src="imgSrc"
        :alt="alt"
        :style="{'max-width': width + 'px'}"
        @error="handleError">
    </div>
    <div class="download"
      v-if="isCanDownload"
      title="下载"
      @click.stop.prevent="handleDownload">
      <i class="el-icon-download" />
    </div>
  </div>
</template>

<script>
import { isEmpty, formatImgUrl } from '@/utils'
import download from '@/utils/download'

export default {
  name: 'ht-image',
  props: {
    alt: {
      type: String,
      default: '暂无图片'
    },
    perferAlt: {
      type: Boolean,
      default: true
    },
    width:{
      type: Number,
      default: 100
    },
    emptyBorder: {
      type:Boolean,
      default: true
    },
    iconSize: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 100
    },
    src: {
      type: [String, Object],
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    canDownload: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isError: false,
      defaultImg: 'yourimgurliswrong'
    }
  },

  methods: {
    handleError() {
      this.isError = true
      this.$emit('error')
    },

    handleDownload() {
      const name = this.name || Date.now()
      let image = new Image()
      image.crossOrigin = "anonymous"
      image.src = this.imgSrc

      image.onload = function() {  
        let canvas = document.createElement("canvas");  
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let dataURL = canvas.toDataURL('image/png')
        download(dataURL, name, 'image/png')
      } 
    }
  },

  computed: {
    isSrcNull() {
      return isEmpty(this.src)
    },

    imgSrc() {
      let src = this.src
      if (!isEmpty(src)) {
        src = formatImgUrl(src)
      }
      return src
    },

    iconStyle() {
      return {
        'font-size': `${this.iconSize}px`
      }
    },

    isCanDownload() {
      return this.canDownload && !this.isError
    },

    style0() {
      if(this.center) {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`,
          margin: 'auto'
        }
      }else{
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      }
    },

    style1() {
      return {
        width: `${this.width}px`,
        'max-height': `${this.height}px`,
      }
    },

    style2() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        border: this.emptyBorder ? '1px dashed #999' : 'none'
      }
    }
  },

  watch: {
    src(v) {
      if (!isEmpty(v)) {
        this.isError = false
      }
    }
  }
}
</script>

<style lang="scss">
.ht-image {
  overflow: hidden;
  position: relative;

  .empty-img {
    height: 100%; 
    width: 100%; 
    display: flex;
    flex-direction: column; 
    text-align: center;

    .img {
      margin: auto;
      display: flex;
      flex-direction: column;
    }

    .icon {
      color: #999;
      font-size: 50px; 
    }

    .alt {
      color: #999;
      font-size: 14px;
      padding-bottom: 5px;
    }
  }

  .img-wrapper {
    display: flex;
    overflow: hidden;
    img {
      margin: auto;
    }
  }

  .download {
    display: none;
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    color: #fff;
    background-color: #5bc3d3;
    border: 1px solid #5bc3d3;

    & > i {
      margin: auto;
    }
  }

  &:hover .download {
    display: flex;
  }
}
</style>
