<template>
  <div class="app-main">
    <transition name="fade-transform"
      mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-main',
  computed: {
    ...mapGetters([
      'cachedViews'
    ]),
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*86 = navbar + tags-view + 2 = 50 + 34 + 2*/
  position: relative;
}
</style>

