<template>
  <div class="ht-dashboard-statics-item">
    <div class="left"
      :style="iconBgStyle">
      <i class="icon"
        :class="clazz" />
    </div>
    <div class="right">
      <div class="wrapper">
        <div class="value">
          <count-to
            :start-val="0"
            :end-val="value"
            :duration="3000" />
        </div>
        <div class="name">
          {{ name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNotEmpty } from '@/utils'
import CountTo from 'vue-count-to'
export default {
  name: 'ht-dashboard-statics-item',
  components: {
    CountTo
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#32B4C8'
    }
  },
  computed: {
    clazz() {
      let icon = this.icon || ''
      let obj = {}
      if (isNotEmpty(icon)) {
        obj[icon] = true
      }
      return obj
    },
    iconBgStyle() {
      let color = this.color
      return {
        'background-color': color
      }
    }
  }
}
</script>

<style lang="scss">
.ht-dashboard-statics-item {
  height: 100px;
  width: 325px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.10);

  .left {
    width: 100px;
    line-height: 100px;
    display: flex;
    .icon {
      margin: auto;
      color:  #fff;
      font-size: 40px;
    }
  }
  .right {
    width: 225px;
    display: flex;
    .wrapper {
      padding-left: 20px;
      margin-top: auto;
      margin-bottom: auto;
    }
    .value {
      font-size: 30px;
      color: #333333;
      letter-spacing: 0;
    }
    .name {
      font-size: 14px;
      color: #666666;
      padding-top: 10px;
    }
  }
}
</style>
