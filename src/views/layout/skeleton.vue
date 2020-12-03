<template>
  <div class="app-wapper" :class="classObj">
    <div class="section is-header">
      <div class="header">
        <img class="logo" src="@/assets/img/head.jpg" />
        <span class="desc">
          智能-后台管理系统
        </span>
      </div>
    </div>
    <div class="section is-main">
      <router-view />
    </div>
    <div class="section is-footer">
      <span> Copyright © 2018 - {{ currentYear }} 智能 </span>
    </div>
  </div>
</template>

<script> 
 import ResizeMixin from './mixin/resizeHandler'
export default {
  name: 'skeleton-layout',
  mixins: [ResizeMixin],
  data()  {
    const y = new Date( ) . getFullYear()
    return {
      currentYear: y
    }
  },
  computed: {
    classObj()  {
      return {
        'is-mobile': this.$store.state.app.device === 'mobile'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wapper {
  width: 1000px;
  margin: auto;

  &.is-mobile {
    width: auto;
    .section.is-header {
      .header {
        margin: auto;
      }
    }
  }

  .section {
    &.is-header {
      display: flex;
      font-size: 18px;
      color: #333333;
      padding-top: 50px;
      padding-bottom: 20px;

      .header {
        display: flex;
        height: 68px;
        .logo {
          height: 68px;
        }

        .desc {
          font-weight: 700;
          line-height: 68px;
          padding-left: 25px;
        }
      }
    }

    &.is-footer {
      color: #666666;
      font-size: 12px;
      text-align: center;
      padding-top: 119px;
      padding-bottom: 30px;
    }
  }
}
</style>