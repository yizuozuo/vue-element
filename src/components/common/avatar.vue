<template>
  <div class="hx-avatar"
    :style="{width: `${width}px`, height: `${height}px`}">
    <div v-if="isSrcNull || isError"
      class="empty-img">
      <span>
        <i class="el-icon-picture" />
      </span>
    </div>
    <img v-else
      :src="src"
      :alt="alt"
      :width="width"
      @error="isError = true">
  </div>
</template>

<script>
import { isEmpty } from '@/utils'
import { onePixelImg } from '@/utils/const'

export default {
  name: 'avatar',
  props: {
    alt: {
      type: String,
      default: '暂无图片'
    },
    width:{
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    src: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      isError: false,
      defaultImg: onePixelImg
    }
  },

  computed: {
    isSrcNull() {
      return isEmpty(this.src)
    }
  }
}
</script>

<style lang="scss">
.hx-avatar {
  position: relative;
  overflow: hidden;
  .empty-img {
    height: 100%; 
    width: 100%; 
    display: flex; 
    border:1px dashed #666;

    & > span {
      margin: auto; 
      font-size: 50px; 
      color: #666;
    }
  }

  img {
    position: absolute;
    transform: translate(-50%,-50%);
    margin-left: 50%;
    margin-top: 50%;
  }
}
</style>

