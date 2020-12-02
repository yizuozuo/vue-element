<template>
  <div class="page-container page-store-detail">
    <div class="container-box">
      <el-form
        ref="form"
        label-position="right"
        v-loading="isLoading || isIniting"
        disabled
        label-width="96px">
        <el-form-item prop="fullName"
          label="网点名称"> 
          <span>{{ form.fullName }}</span>
        </el-form-item>

        <el-form-item label="所在区域"
          prop="cityselect">
          <city-select v-model="pcdModel"
            textonly
            @change="handleCitySelectChange" />
        </el-form-item>

        <el-form-item prop="address"
          label="网点地址">
          <span>{{ form.address }}</span>
        </el-form-item>

        <el-form-item prop="longitude"
          label="地理坐标">
          <span>{{ location }}</span>
        </el-form-item>

        <el-form-item>
          <baidu-map :center-name="mapCenterName" />
        </el-form-item> 

        <el-form-item prop="isVisual"
          label="是否可见">
          <span>{{ form.isVisual === 0 ? '不可见(在小程序端将不会有门店切换)' : '可见' }}</span>
        </el-form-item>

        <el-form-item label="经营性质">
          <span>{{ businessPropertyType }}</span>
        </el-form-item>

        <el-form-item label="网点电话"> 
          <span>{{ form.linkedPhone }}</span>
        </el-form-item>

        <el-form-item label="联系人姓名">
          <span>{{ form.linkedName }}</span>
        </el-form-item>

        <el-form-item label="联系人手机">
          <span>{{ form.phone }}</span>
        </el-form-item>

        <el-form-item label="网点LoGo">
          <custom-image
            :src="form.logo"
            :empty-border="false"
            :width="152"
            :height="152"
            class="icon-image" />
        </el-form-item>

        <el-form-item label="服务类型"
          v-if="serviceList.length > 0">
          <span>{{ services }}</span>
        </el-form-item>

        <el-form-item prop="businessTime"
          label="营业时间">
          <span>{{ form.businessTime }}</span>
        </el-form-item>

        <el-form-item prop="qualification"
          label="网点资质">
          <span> {{ form.qualification === 1 ? '采用品牌资质' : '创建网点资质' }} </span>
        </el-form-item>

        <el-form-item label="营业执照"
          v-if="form.qualification === 2"
          prop="businessLicense">
          <custom-image
            :src="form.businessLicense"
            :empty-border="false"
            :width="152"
            :height="152"
            class="icon-image" />
        </el-form-item>
        <el-form-item prop="summary"
          label="网点简介">
          <tinymce
            :height="300"
            width="100%"
            disabled
            readonly
            v-model="form.summary" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isEmpty, isNotEmpty, isArray, isAllNotEmpty } from '@/utils'
import { getStoreById, getBrandServices} from '@/api/store'
import { BUSINESS_TYPE } from '@/utils/const'
import BaiduMap from '@/components/map'
import CustomImage from '@/components/common/image'
import CitySelect from '@/components/common/city-select'
import Tinymce from '@/components/tinymce/index'
const parseStr2Int = (val) => {
  let v = parseInt(val)
  return isNaN(v) ? null : v
}

export default {
  name: 'page-store-detail',
  props: {
    id: {
      type: [String, Number],
      default: -1
    }
  },
  components: {
    BaiduMap,
    CustomImage,
    CitySelect,
    Tinymce
  },
  data() {
    return {
      pcdModel: {
        pId: null,
        cId: null,
        dId: null
      },
      citySelectfullName: null,
      form: {
        id: this.id,
        address: null,
        fullName: null,
        province: null,
        city: null,
        area: null,
        longitude: null,
        latitude: null,
        isVisual: 0,
        businessLicense: null,
        businessPropertyType: null,
        businessTime: '周一~周五 9:00~18:00 中午12:00~13:00休息',
        qualification: 1,
        logo: null,
        linkedPhone: null,
        linkedName: null,
        phone: null,
        serverTypeNoList: [],
        summary: null
      },
      serviceList: [],
      isLoading: false,
      isIniting: false,
      typeData: BUSINESS_TYPE
    }
  },

  methods:{
    loadBrandServices() {
      this.isIniting = true
      getBrandServices()
        .then(res => {
          if (res.success && isArray(res.entity)) {
            this.serviceList = res.entity
          }
        })
        .finally(() => {
          this.isIniting = false
        })
    },
    loadDetail() {
      const id = this.id
      this.isLoading = true
      getStoreById(id)
        .then(res => {
          if (res.success && res.entity) {
            const v = res.entity
            this.form.address = v.address
            this.form.fullName = v.fullName
            this.form.province = v.province
            this.form.city = v.city
            this.form.area = v.area
            this.form.longitude = v.longitude
            this.form.latitude = v.latitude
            this.form.isVisual = v.isVisual
            this.form.businessLicense = v.businessLicense
            this.form.businessPropertyType = v.businessPropertyType
            this.form.businessTime = v.businessTime
            this.form.qualification = v.qualification
            this.form.logo = v.logo
            this.form.linkedPhone = v.linkedPhone
            this.form.linkedName = v.linkedName
            this.form.phone = v.phone
            if (isArray(v.serverTypeNoList)) {
              this.form.serverTypeNoList = v.serverTypeNoList
            } else {
              this.form.serverTypeNoList = []
            }
            this.form.summary = v.summary

            this.pcdModel = {
              pId: parseStr2Int(v.province),
              cId: parseStr2Int(v.city),
              dId: parseStr2Int(v.area)
            }
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  computed: {
    location() {
      if(isAllNotEmpty(this.form.longitude, this.form.latitude)){
        return `经度: ${this.form.longitude}, 纬度: ${this.form.latitude}`
      } else {
        return null
      }
    },

    mapCenterName() {
      let m = this.pcdModel
      let a = this.citySelectfullName || ''
      let b = this.form.address || ''
      if (isAllNotEmpty(m.pId, m.cId)) {
        return a + b
      } else {
        return a
      }
    },

    businessPropertyType() {
      let v = this.form.businessPropertyType
      let list = this.typeData || []
      return list.filter(x => x.value === v).map(x => x.label).join(', ')
    },

    services() {
      let vals = this.form.serverTypeNoList || []
      let list = this.serviceList || []
      if (isArray(vals) && vals.length > 0) {
        return list.filter(x => vals.indexOf(x.serverTypeNo) !== -1).map(x => x.name).join(', ')
      } else {
        return ''
      }
    }
  },

  created() {
    this.loadBrandServices()
    this.loadDetail()
  }
}
</script>

<style lang="scss">
.page-store-detail {
  .el-select {
    width: 100%;
  }
  .upload-tip {
    font-size: 14px;
    color: #949798;
  }

  .icon-uploader {
    .el-icon-loading {
      display: none;
    }

    &.is-uploading {
      .icon-image, .el-icon-plus {
        display: none;
      }
      .el-icon-loading {
        display: block;
        font-size: 28px;
        line-height: 152px;
        width: 169px;
      }
    }

    .el-icon-plus {
      width: 169px;
      font-size: 28px;
      color: #8c939d;
      line-height: 152px;
      text-align: center;
    }
  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }
  }

  .el-form-item {
    &.is-success .el-upload{
      border-color: #32b4c8
    }
  }
}
</style>

<style lang="scss" scoped>
@import '../../assets/sass/img.scss';
  .tip {
    font-size: 14px;
    color: #FF6E33;
  }
</style>
