<template>
  <span v-if="textonly">{{ textOnlyText }}</span>
  <div v-else
    class="ht-city-select">
    <el-select v-model="cv2.pId"
      placeholder="请选择"
      :disabled="isL1Loading"
      @change="handleProvChange">
      <el-option
        v-for="(item, i) in list1"
        :key="i"
        :label="item.name"
        :value="item.id" />
    </el-select>

    <el-select v-show="level > 1"
      v-model="cv2.cId"
      placeholder="请选择"
      :disabled="isL2Disabled"
      @change="handleCityChange">
      <el-option
        v-for="(item, i) in list2"
        :key="i"
        :label="item.name"
        :value="item.id" />
    </el-select>

    <el-select v-show="level > 2"
      v-model="cv2.dId"
      placeholder="请选择"
      :disabled="isL3Disabled"
      @change="handleAreaChange">
      <el-option
        v-for="(item, i) in list3"
        :key="i"
        :label="item.name"
        :value="item.id" />
    </el-select>
  </div>
</template>

<script>
import { getProvinceList, getCityList, getDistrictList} from '@/api/common'
import { isEmpty, isString, isNotEmpty, isArray } from '@/utils'
const parseStr2Int = (val) => {
  let v = parseInt(val)
  return isNaN(v) ? null : v
}

export default {
  name: 'ht-city-select',
  props: {
    level: {
      type: Number,
      default: 3,
      validator: function(v) {
        return v > 0 && v < 4
      }
    },
    value: {
      type: [Object, String],
      default: null
    },
    textonly: {
      type: Boolean,
      default: false
    },
    stringed: {
      type: Boolean,
      default: false
    },
    valueSplitor: {
      type: String,
      default: ','
    }
  },
  data() {
    let stringed = this.stringed
    let valueSplitor = this.valueSplitor
    let level = this.level
    let value = this.value
    let cv2 = {
      pId: null,
      cId: null,
      dId: null
    }

    if (stringed) {
      if (isString(value)) {
        value = value.split(valueSplitor)
        cv2.pId = value.length > 0 ? parseStr2Int(value[0]) : null
        cv2.cId = value.length > 1 ? parseStr2Int(value[1]) : null
        cv2.dId = value.length > 2 ? parseStr2Int(value[2]) : null
      }
    } else {
      cv2.pId = value.pId
      cv2.cId = value.cId
      cv2.dId = value.dId
    }

    return {
      cv: this.value,
      cv2,
      isL1Loading: true,
      isL2Loading: true,
      isL3Loading: true,
      list1: [],
      list2: [],
      list3: []
    }
  },
  computed: {
    isL2Disabled() {
      return this.isL2Loading  || isEmpty(this.cv2.pId)
    },
    isL3Disabled() {
      return this.isL3Loading  || isEmpty(this.cv2.cId)
    },
    textOnlyText() {
      let id1 = this.cv2.pId
      let id2 = this.cv2.cId
      let id3 = this.cv2.dId
      let arr = this.list1.filter(x => x.id === id1).map(x => x.name)
      let brr = this.list2.filter(x => x.id === id2).map(x => x.name)
      let crr = this.list3.filter(x => x.id === id3).map(x => x.name)
      let drr = []
      if (arr.length > 0) {
        drr.push(arr[0])
      }
      if (brr.length > 0) {
        drr.push(brr[0])
      }
      if (crr.length > 0) {
        drr.push(crr[0])
      }
      return drr.join('-')
    }
  },
  methods: {
    handleProvChange(v) {
      this.cv2.cId = null
      this.cv2.dId = null
      this.list2 = []
      this.list3 = []
      this.updateValue1()
      this.loadCityList(v)
    },
    handleCityChange(v) {
      this.cv2.dId = null
      this.list3 = []
      this.updateValue1()
      this.loadAreaList(v)
    },
    handleAreaChange(v) {
      this.updateValue1()
    },
    loadProvList() {
      this.isL1Loading = true
      getProvinceList()
        .then(res => {
          if (res.success && isArray(res.entity)) {
            this.list1 = res.entity
          }
        })
        .finally(() => {
          this.isL1Loading = false
        })
    },
    loadCityList(id) {
      if (isNotEmpty(id)) {
        this.isL2Loading = true
        getCityList(id)
          .then(res => {
            if (res.success && isArray(res.entity)) {
              this.list2 = res.entity
            }
          })
          .finally(() => {
            this.isL2Loading = false
          })
      }
    },
    loadAreaList(id) {
      if (isNotEmpty(id)) {
        this.isL3Loading = true
        getDistrictList(id)
          .then(res => {
            if (res.success && isArray(res.entity)) {
              this.list3 = res.entity
            }
          })
          .finally(() => {
            this.isL3Loading = false
          })
      }
    },

    updateValue1() {
      const cv2 = this.cv2
      const stringed = this.stringed
      const splitor = this.valueSplitor
      const level = this.level
      const pId = cv2.pId
      const cId = cv2.cId
      const dId = cv2.dId

      if (stringed) {
        let arr = []
        arr.push(pId || '')
        if (level > 1) {
          arr.push(cId || '')
        }

        if (level > 2) {
          arr.push(dId || '')
        }
        this.cv = arr.join(splitor)
      } else {
        this.cv = cv2
      }

      const brr = []
      let crr = []
      if (isNotEmpty(pId)) {
        crr = this.list1.filter(x => x.id === pId)
        if (crr.length > 0) {
          brr.push(crr[0].name)
        }
      }

      if (isNotEmpty(cId) && level > 1) {
        crr = this.list2.filter(x => x.id === cId)
        if (crr.length > 0) {
          brr.push(crr[0].name)
        }
      }

      if (isNotEmpty(dId) && level > 2) {
        crr = this.list3.filter(x => x.id === dId)
        if (crr.length > 0) {
          brr.push(crr[0].name)
        }
      }

      this.$emit('change', this.cv, brr.join(''))
    },

    updateValue2(value = {}) {
      let stringed = this.stringed
      let valueSplitor = this.valueSplitor
      let cv2 = {
        pId: null,
        cId: null,
        dId: null
      }

      if (stringed) {
        if (isString(value)) {
          value = value.split(valueSplitor)
          cv2.pId = value.length > 0 ? parseStr2Int(value[0]) : null
          cv2.cId = value.length > 1 ? parseStr2Int(value[1]) : null
          cv2.dId = value.length > 2 ? parseStr2Int(value[2]) : null
        }
      } else {
        cv2.pId = parseStr2Int(value.pId)
        cv2.cId = parseStr2Int(value.cId)
        cv2.dId = parseStr2Int(value.dId)
      }

      this.cv2 = cv2

      if (isNotEmpty(cv2.cId) && this.list2.every(x => x.id !== cv2.cId)) {
        this.loadCityList(cv2.pId)
      }

      if (isNotEmpty(cv2.dId) && this.list3.every(x => x.id !== cv2.dId)) {
        this.loadAreaList(cv2.cId)
      }
    }
  },
  created() {
    this.loadProvList()
  },
  watch: {
    value(val) {
      this.cv = val
      this.updateValue2(val)
    },
    cv(val) {
      this.$emit('input', val)
    },
    level(v) {
      if (v === 1) {
        this.cv2.cId = null
        this.cv2.dId = null
      }

      if (v === 2) {
        this.cv2.dId = null
      }
    }
  }
}
</script>

<style lang="scss">
.ht-city-select {
  display: flex;
  .el-select {
    flex: 1;

    & ~ .el-select {
      margin-left: 15px;
    }
  }
}
</style>

