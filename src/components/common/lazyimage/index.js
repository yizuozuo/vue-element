import { onePixelImg } from '@/utils/const'
const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window

export default {
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
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: onePixelImg
    },
    srcset: {
      type: String
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({ 
    observer: null, 
    intersected: false, 
    loaded: false 
  }),

  computed: {
    srcImage() {
      if (hasIntersectionObserver) {
        return this.intersected ? this.src : this.srcPlaceholder
      } else {
        return this.src || this.srcPlaceholder
      }
    },
    srcsetImage() {
      return this.intersected && this.srcset ? this.srcset : false
    }
  },

  render(h) {
    return h("img", {
      attrs: { 
        src: this.srcImage,
        srcset: this.srcsetImage,
        alt: this.alt,
        style: `max-width: ${this.width}px; max-height: ${this.height}px`
      },
      class: {
        "ht-lazy-image": true,
        "ht-lazy-image-loaded": this.loaded
      }
    })
  },

  mounted() {
    this.$el.addEventListener("load", ev => {
      if (this.$el.getAttribute('src') !== this.srcPlaceholder) {
        this.loaded = true
        this.$emit("load")
      }
    })

    this.$el.addEventListener("error", ev => {
      this.loaded = false
      this.$emit("error")
    })

    if(hasIntersectionObserver) {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0]
        // console.log(image)
        if (image.isIntersecting) {
          this.intersected = true
          this.observer.disconnect()
          this.$emit("intersect")
        }
      }, this.intersectionOptions)
  
      this.observer.observe(this.$el)
    }
  },

  destroyed() {
    if(hasIntersectionObserver) {
      this.observer.disconnect()
    }
  }
}
