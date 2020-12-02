<template>
  <iframe :src="url"
    :style="iframeStyle" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapGetters([
      'winHeight'
    ]),

    iframeStyle() {
      const h = this.winHeight
      return {
        width: '100%',
        height: `${h-55}px`,
        border: 'none'
      }
    }
  }
}
</script>