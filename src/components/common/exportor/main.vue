<template>
  <iframe ref="iframe"
    :style="{display: 'none'}" />
</template>

<script>
import { isNotEmpty } from '@/utils'
import { CHANNEL_CODE } from '@/utils/const'
import { getToken } from '@/utils/cache/auth'
import donwload from '@/utils/download'

export default {
  props: {
    url: {
      type: String,
      default: null
    },
    method: {
      type: String,
      default: 'GET'
    }
  },
  methods: {
    startDownload() {
      const self = this

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            if (window.navigator.msSaveOrOpenBlob){
              let blob = new Blob([this.response], {type: 'application/octet-stream'})
              window.navigator.msSaveOrOpenBlob(blob)
            } else {
              self.$refs['iframe'].src = URL.createObjectURL(this.response)
            }
          } else {
            console.error('donwload fail :(');
          }
        }
      }

      const url = this.url
      const xhr = new XMLHttpRequest()
      const method = this.method
      xhr.open(this.method, url)
      xhr.onreadystatechange = handler
      xhr.responseType = 'blob'
      xhr.setRequestHeader('token', getToken())
      xhr.setRequestHeader('source', CHANNEL_CODE)
      xhr.send()
    }
  },
  watch: {
    url(v) {
      if(isNotEmpty(v)) {
        this.startDownload()
      }
    }
  }
}
</script>
