<template>
  <div class="ht-baidu-map">
    <div :id="id"
      class="map-core" />
  </div>
</template>

<script>
import { s4 } from '@/utils/guid'
import { isNotEmpty, isAllNotEmpty } from '@/utils'

export default {
  name: 'ht-baidu-map',
  props: {
    value: {
      type: Object,
      default: () => {
        return { 
          lng: '113.572379',
          lat: '34.832019' 
        }
      }
    },
    centerName: {
      type: String,
      default: null
    },
    zoom: {
      type: Number, // 3 ~ 18
      default: 10
    }
  },

  data () {
    return {
      cv: this.value,
      id: `ht-baidu-map-${s4()}`,
      map: {},
      ac: {}
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const id = this.id
      this.map = new BMap.Map(id)
      const lng = this.cv.lng
      const lat = this.cv.lat

      if(isAllNotEmpty(lng, lat)){
        this.map.centerAndZoom(new BMap.Point(lng, lat), 16)
      } else if (isNotEmpty(this.centerName)) {
        this.map.centerAndZoom(this.centerName)
      }

      this.map.addControl(new BMap.NavigationControl())   
      this.map.addControl(new BMap.ScaleControl()) 
      this.map.addControl(new BMap.OverviewMapControl())   
      this.map.addControl(new BMap.MapTypeControl()) 
      this.map.enableScrollWheelZoom(true)

      // 点击获取经纬度
      this.map.addEventListener('click', (e) => {
        this.cv.lng = parseFloat(e.point.lng)
        this.cv.lat = parseFloat(e.point.lat)
        this.$emit('input', this.cv)
      })
    },

    // 根据经纬度绘制地图中的坐标点
    drawLocation () {
      const lng = this.cv.lng
      const lat = this.cv.lat

      if(isAllNotEmpty(lng, lat)){
        this.map.clearOverlays()
        const p = new BMap.Point(lng, lat)
        const marker = new BMap.Marker(p)
        this.map.addOverlay(marker)
        this.map.panTo(p) 
      }
    }
  },

  watch: {
    value(v) {
      this.cv = v
    },
    cv(v) {
      this.drawLocation()
      this.$emit('input', v)
    },
    centerName(val) {
      if (isNotEmpty(val)) {
        console.log(`center name = ${val}`)

        const myGeo = new BMap.Geocoder()
        myGeo.getPoint(val, (point) => {
          if (point) {
            this.map.centerAndZoom(point, 16);
            this.map.addOverlay(new BMap.Marker(point))
          }else{
            this.map.centerAndZoom(val)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.ht-baidu-map {
  width: 100%;
  .map-core {
    width: 100%;
    height: 100%;
    min-height: 390px;
  }
  .search {
    display: flex;
    margin-top: 10px;
    height: 40px;
    .lng-lat {
      display: flex;
      .item {
        display: flex;
        padding-left: 10px;
        height: 20px;
        line-height: 20px;
        p {
          height: 20px;
          padding-right: 10px;
        }
        input {
          width: 100px;
          height: 20px;
        }
        button {
          color: #fff;
          height: 28px;
          width: 60px;
          background: #40B0FF;
          border: 1px solid #40B0FF;
          border-radius: 2px;
          &:hover {
            background: #10B0FF;
            border: 1px solid #10B0FF;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>