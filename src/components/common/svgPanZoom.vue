<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { isEmpty } from '@/utils'
import svg_pan_zoom from 'svg-pan-zoom'

export default {
  props: {
    zoomEnabled: {
      type: Boolean, 
      default: true 
    },
    controlIconsEnabled: {
      type: Boolean,
      default: false
    },
    fit: {
      type: Boolean,
      default: true
    },
    panEnabled: {
      type: Boolean,
      default: true
    },
    dblClickZoomEnabled: {
      type: Boolean,
      default: true
    },
    mouseWheelZoomEnabled: {
      type: Boolean,
      default: true
    },
    preventMouseEventsDefault: {
      type: Boolean,
      default: true
    },
    contain: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    },
    viewportSelector: {
      type: String,
      default: '.svg-pan-zoom_viewport'
    },
    zoomScaleSensitivity: {
      type: Number,
      default: 0.2
    },
    minZoom: {
      type: Number,
      default: 0.5
    }, 
    maxZoom: { 
      type: Number,
      default: 10
    }, 
    refreshRate: {
      type: String,
      default: 'auto'
    },
    customEventsHandler: {
      type: Object,
      default: null
    },
    eventsListenerElement: {
      type: Object,
      default: null
    }
  },

  mounted() {
    let options = {
      beforeZoom: (oldScale, newScale) => {
        this.$emit('before-zoom', oldScale, newScale)
      },
      onZoom: (scale) => {
        this.$emit('zoom', scale)
      },
      beforePan: (oldPoint, newPoint) => {
        this.$emit('before-pan', oldPoint, newPoint)
        return true
      },
      onPan: (point) => {
        this.$emit('pan', point)
      },
      onUpdatedCTM: (ctm) => {
        this.$emit('updated-ctm', ctm)
      }
    }

    let props = this.$props
    Object.keys(props).filter(k => !isEmpty(this[k])).forEach(k => options[k] = this[k])
    let svgpanzoom = svg_pan_zoom(this.$slots.default[0].elm , options)
    this.$emit('svgpanzoom', svgpanzoom)
  }
}
</script>
