<template>
  <div class="page-container page-store-add">
    <div class="container-box">
      <el-form 
        ref="form" 
        :model="form"
        label-position="right"
        :rules="storeRules"
        v-loading="isLoading"
        label-width="96px">
        <el-form-item prop="fullName"
          label="网点名称"> 
          <el-input placeholder="请输入不超过30字的网点名称"
            clearable
            v-model="form.fullName" />
        </el-form-item>

        <el-form-item label="所在区域"
          prop="cityselect">
          <city-select v-model="pcdModel"
            @change="handleCitySelectChange" />
        </el-form-item>

        <el-form-item prop="address"
          label="网点地址">
          <el-input placeholder="请输入网点地址"
            clearable
            v-model="form.address" />
        </el-form-item>

        <el-form-item prop="longitude"
          label="地理坐标">
          <el-col :span="11"
            v-if="isLocationEditable">
            <el-input placeholder="请输入经度"
              v-model="form.longitude"
              style="width: 100%;">
              <template slot="prepend">
                经度
              </template>
              <el-button slot="append"
                icon="el-icon-check"
                @click="isLocationEditable = false" />
            </el-input>
          </el-col>
          <el-col class="ta-c"
            :span="2"
            v-if="isLocationEditable">
            -
          </el-col>
          <el-col :span="11"
            v-if="isLocationEditable">
            <el-input placeholder="请输入纬度"
              v-model="form.latitude"
              style="width: 100%;">
              <template slot="prepend">
                纬度
              </template>
              <el-button slot="append"
                icon="el-icon-check"
                @click="isLocationEditable = false" />
            </el-input>
          </el-col>
          <el-col :span="24"
            v-if="!isLocationEditable">
            <el-input placeholder="请点击下面地图获取地理位置"
              readonly
              disabled
              v-model="location">
              <i slot="prefix"
                class="el-input__icon el-icon-location-outline" />
              <el-button slot="append"
                icon="el-icon-edit"
                @click="handleLocationEdit" />
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <span class="upload-tip">点击下面地图获取地理位置</span>
          <baidu-map :center-name="mapCenterName"
            @input="handleMapClick" />
        </el-form-item> 

        <el-form-item prop="isVisual"
          label="是否可见">
          <el-switch
            v-model="form.isVisual"
            :active-value="1"
            :inactive-value="0" />
          <span class="pl-5"
            v-show="form.isVisual === 0">在小程序端将不会有门店切换</span>
        </el-form-item>

        <el-form-item prop="businessPropertyType"
          label="经营性质">
          <el-select v-model="form.businessPropertyType"
            clearable>
            <el-option 
              v-for="item in typeData"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item prop="linkedPhone"
          label="网点电话"> 
          <el-input placeholder="请输入网点电话"
            clearable
            v-model="form.linkedPhone" />
        </el-form-item>
        <el-form-item prop="linkedName"
          label="联系人姓名"> 
          <el-input placeholder="请输入联系人姓名"
            clearable
            v-model="form.linkedName" />
        </el-form-item>
        <el-form-item prop="phone"
          label="联系人手机"> 
          <el-input placeholder="请输入联系人手机"
            clearable
            v-model="form.phone" />
        </el-form-item>

        <el-form-item label="网点LoGo"
          prop="logo">
          <div style="height: 216px;">
            <el-upload
              class="icon-uploader"
              :class="{'is-uploading': isUploading1}"
              with-credentials
              :action="uploadUrl"
              :headers="uploadHeader"
              :show-file-list="false"
              :on-success="handleUploadSuccess1"
              :before-upload="handleBeforeUpload1">
              <custom-image
                v-if="!!form.logo"
                :src="form.logo"
                :empty-border="false"
                :width="152"
                :height="152"
                class="icon-image" />
              <i v-else
                class="upload-icon el-icon-plus" />
              <i class="el-icon-loading" />
              <div class="el-upload__tip"
                slot="tip">
                建议比例1:1，尺寸100*100，只能上传jpg/png文件，且不超过2M。
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item prop="serverTypeNoList"
          label="服务类型"
          v-if="serviceList.length > 0">
          <el-checkbox-group v-model="form.serverTypeNoList">
            <el-checkbox v-for="(item, i) in serviceList"
              :label="item.serverTypeNo"
              :key="i">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item prop="businessTime"
          label="营业时间"> 
          <el-input placeholder="请输入营业时间"
            clearable
            v-model="form.businessTime" />
        </el-form-item>

        <el-form-item prop="qualification"
          label="网点资质">
          <el-radio-group v-model="form.qualification">
            <el-radio :label="1">
              采用品牌资质
            </el-radio>
            <el-radio :label="2">
              创建门店资质
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="营业执照"
          v-if="form.qualification === 2"
          prop="businessLicense">
          <div style="height: 216px;">
            <el-upload
              class="icon-uploader"
              :class="{'is-uploading': isUploading2}"
              with-credentials
              :action="uploadUrl"
              :headers="uploadHeader"
              :show-file-list="false"
              :on-success="handleUploadSuccess2"
              :before-upload="handleBeforeUpload2">
              <custom-image
                v-if="!!form.businessLicense"
                :src="form.businessLicense"
                :empty-border="false"
                :width="152"
                :height="152"
                class="icon-image" />
              <i v-else
                class="upload-icon el-icon-plus" />
              <i class="el-icon-loading" />
              <div class="el-upload__tip"
                slot="tip">
                三证合一营业执照的复印件，只能上传jpg/jpeg/png文件，且不超过2M。
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item prop="summary"
          label="网点简介">
          <tinymce
            :height="300"
            width="100%"
            v-model="form.summary" />
        </el-form-item>
      </el-form>
      <div class="ta-c">
        <el-button type="primary"
          @click.stop="handleConfirm"
          class="pl-20 pr-20"
          :loading="isSubmiting">
          提 交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty, isNotEmpty, isArray, isAllNotEmpty } from '@/utils'
import { isPhone, isChineseName} from '@/utils/validate'
import { getUploadHttpHeader } from '@/utils/request'
import { addStore, getBrandServices} from '@/api/store'
import { BUSINESS_TYPE, UPLOAD_FOR_IMG, UPLOAD_FOR_BUSINESS } from '@/utils/const'
import BaiduMap from '@/components/map'
import CustomImage from '@/components/common/image'
import CitySelect from '@/components/common/city-select'
import Tinymce from '@/components/tinymce/index'

export default {
  name: 'store-add',
  components: {
    BaiduMap,
    CustomImage,
    CitySelect,
    Tinymce
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('网点名称不能为空'))
      } else {
        callback()
      }
    }

    const validateAddress = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('网点地址不能为空'))
      } else {
        callback()
      }
    }

    const validateCoordinate = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('地理坐标不能为空'))
      } else {
        callback()
      }
    }

    const validateAdminRealName = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }

    const validateAdminLinkedPhone = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('手机号码不能为空'))
      } else if (!isPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }

    const validateBusinessLicense = (rule, value, callback) => {
      if (isEmpty(this.form.businessLicense)) {
        callback(new Error('营业执照不能为空'))
      } else {
        callback()
      }
    }

    const citySelectValidator = (r, v, callback) => {
      v = this.pcdModel
      if (isEmpty(v.pId)) {
        callback(new Error('请选择省'))
      } else if (isEmpty(v.cId)) {
        callback(new Error('请选择市'))
      } else if (isEmpty(v.dId)) {
        callback(new Error('请选择区/县'))
      } else {
        callback()
      }
    }

    const linkedPhoneValidator = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入联系人手机'))
      } else {
        if (isPhone(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }
    }

    const linkedNameValidator = (rule, value, callback) => {
      value = this.form.linkedName
      if (isEmpty(value)) {
        callback(new Error('请输入联系人姓名'))
      } else {
        if (isChineseName(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的姓名'))
        }
      }
    }

    const serviceListValidator = (rule, value, callback) => {
      let list = this.serviceList || []
      if (list.length > 0) {
        if (isArray(value) && value.length > 0) {
          callback()
        } else {
          callback(new Error('请选择服务类型'))
        }
      } else {
        callback()
      }
    }

    return {
      pcdModel: {
        pId: null,
        cId: null,
        dId: null
      },
      citySelectfullName: null,
      form: {
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
      isSubmiting: false,
      isUploading1: false,
      isUploading2: false,
      typeData: BUSINESS_TYPE,
      storeRules: {
        fullName: [
          { required:true, trigger:'blur', validator: validateName },
          { min: 1, max: 30, message: '请输入长度在1到30个字符', trigger: 'blur'}
        ],
        address: [
          {required:true, trigger:'blur', validator: validateAddress},
          { min: 1, max: 100, message: '请输入长度在1到100个字符', trigger: 'blur'}
        ],
        cityselect: [{required: true, trigger: ['blur', 'change'], validator: citySelectValidator }],
        longitude: [{required:true, trigger:'blur', validator: validateCoordinate}],
        businessPropertyType: [{required:true, trigger:['blur','change'], message: '请选择经营性质'}],
        qualification: [{required:true, trigger:['blur','change'], message: '请选择网点资质'}],
        businessLicense: [{required:true, trigger:['blur','change'], validator: validateBusinessLicense}],
        isVisual: [{required:true, trigger:['blur','change'], message: '请选择是否可见'}],
        linkedPhone:[{required:true, trigger:['blur','change'], message: '请输入网点电话'}],
        phone:[{required:true, trigger:['blur','change'], validator: linkedPhoneValidator}],
        linkedName: [{required:true, trigger:['blur','change'], validator: linkedNameValidator}],
        serverTypeNoList: [{required:true, trigger:['blur','change'], validator: serviceListValidator}]
      },
      uploadHeader: getUploadHttpHeader(),
      uploadUrl: UPLOAD_FOR_IMG,
      isLocationEditable: false
    }
  },

  methods:{
    loadBrandServices() {
      this.isLoading = true
      getBrandServices()
        .then(res => {
          if (res.success && isArray(res.entity)) {
            this.serviceList = res.entity
          } 
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleMapClick (cv) {
      this.form.longitude = cv.lng
      this.form.latitude = cv.lat
      this.$refs.form.clearValidate('longitude')
    },
    
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传的图片只能是 JPG 格式!')
        return false
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 2MB!')
        return false
      }
      return true
    },

    handleBeforeUpload1(file) {
      const res = this.beforeUpload(file)
      if (res) {
        this.isUploading1 = true
        return true
      } else {
        return false
      }
    },

    handleBeforeUpload2(file) {
      const res = this.beforeUpload(file)
      if (res) {
        this.isUploading2 = true
        return true
      } else {
        return false
      }
    },

    handleUploadSuccess1(res, file) {
      this.isUploading1 = false
      if (res.success && res.entity) {
        this.form.logo = res.entity.fileId
        this.$refs.form.clearValidate(['logo'])
      } else {
        this.$message.error('上传图片失败！')
      }
    },

    handleUploadSuccess2(res, file) {
      this.isUploading2 = false
      if (res.success && res.entity) {
        this.form.businessLicense = res.entity.fileId
        this.$refs.form.clearValidate(['businessLicense'])
      } else {
        this.$message.error('上传图片失败！')
      }
    },

    doAddStore() {
      this.isSubmiting = true
      addStore(this.form)
        .then(res => {
          this.isSubmiting = false
          if (res.success && res.entity) {
            this.$message.success('创建网点成功')
            this.$router.push({
              name: 'storeList'
            })
          } else {
            this.$message.error(res.message || '创建网点失败')
          }
        })
        .catch(err => {
          this.isSubmiting = false
          this.$message.error( err.message || '创建网点失败！')
        })
    },

    handleLocationEdit() {
      this.isLocationEditable = true
    },

    handleCitySelectChange(v, citySelectfullName) {
      this.form.province = v.pId
      this.form.city = v.cId
      this.form.area = v.dId
      this.citySelectfullName = citySelectfullName
      this.$nextTick(() => {
        this.$refs.form.clearValidate(['cityselect'])
      })
    },

    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.doAddStore()
        }
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
    }
  },

  created() {
    this.loadBrandServices()
  }
}
</script>

<style lang="scss">
.page-store-add {
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
      border-color: seagreen
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
