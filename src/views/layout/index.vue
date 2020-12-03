<template>
  <div class="app-wrapper"
    :class="classObj"
    v-loading="appLoading">
    <div v-if="device==='mobile' && sidebar.opened" 
      class="drawer-bg"
      @click="handleClickOutside" />
    <div class="sidebar-container">
      <div class="title">
        <div class="brand">
          <custom-image
            class="logo"
            :width="70"
            :height="70"
            alt=""
            :empty-border="false"
            :src="brandLogo" />
          <div class="name">
            {{ brandName }}
          </div>
        </div>
      </div>
      <sidebar />
    </div>
    <div class="main-container">
      <navbar class="navbar" />
      <!-- <tags-view /> -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, /*TagsView */} from './components'
import CustomImage from '@/components/common/image'
import ResizeMixin from './mixin/resizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    CustomImage,
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'appLoading',
      'brandName',
      'brandLogo',
      'sidebar',
      'device'
    ]),
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    // device() {
    //   return this.$store.state.app.device
    // },
    classObj() {
      return {
        'is-sidebar-hide': !this.sidebar.opened,
        'is-sidebar-open': this.sidebar.opened,
        'is-mobile': this.device === 'mobile',
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.is-mobile {
    &.is-sidebar-open{
      position: fixed;
      top: 0;
    }
  }
}
  
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
