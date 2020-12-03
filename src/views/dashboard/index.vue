<template>
  <div class="page-container page-dashboard">
    <div class="section is-header">
      <el-form :inline="true"
        :model="form">
        <el-form-item
          label="当前网点"
          v-if="isBrand">
          <el-select v-model="form.storeId"
            :disabled="unLoadCount > 0"
            clearable
            filterable
            style="width:200px">
            <el-option
              v-for="item in stores"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="所在网点"
          v-else>
          <div>{{ storeName }}</div>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
            align="right" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            :loading="unLoadCount > 0"
            @click.stop="handleSearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div
      class="section is-checklist"
      v-loading="isLoading">
      <div class="section-tip">
        为了使您能够更好地正常使用本平台，请您先花点时间完成一下几项基本设置:
      </div>
      <div class="check-list">
        <div class="check-item"
          v-for="(item, i) in checks"
          :key="i">
          <div class="lefter">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="tip">
              {{ item.tip }}
            </div>
          </div>
          <!-- <div class="righter">
            <i v-if="item.finished"
              class="finished-icon el-icon-success" />
            <router-link class="todo-link"
              v-else
              :to="{name: item.route}">
              <el-button type="primary"
                plain>
                去完成
              </el-button>
            </router-link>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { ROLE_BRAND, ROLE_STORE, ONE_DAY_TIME } from '@/utils/const'
import { isNumber, isArray, isNotEmpty, isAllNotEmpty, parseTime, getTodayEndTime } from '@/utils'
import StatisticItem from '@/components/dashboard/statistic-item'
import { getCheck, searchStoreById, searchBrandStore } from '@/api/store'

export default {
  name: 'dashboard',
  components: {
    StatisticItem
  },
  data() {
    const disableDateFun = (time) => {
      const t1 = new Date(time).getTime()
      const t2 = getTodayEndTime()
      return t1 > t2
    }

    let t1 = getTodayEndTime()
    let d1 = parseTime(t1 - 31 * ONE_DAY_TIME + 1000)
    let d2 = parseTime(t1)

    return {
      form: {
        storeId: null,
        dateRange: [d1, d2]
      },
      pickerOptions: {
        disabledDate: disableDateFun,
        shortcuts: [{
          text: '最近7天',
          onClick(picker) {
            let t2 = getTodayEndTime()
            let t1 = t2 - ONE_DAY_TIME * 8 + 1000
            let d1 = new Date(t1)
            let d2 = new Date(t2)
            picker.$emit('pick', [d1, d2])
          }
        }, {
          text: '最近15天',
          onClick(picker) {
            let t2 = getTodayEndTime()
            let t1 = t2 - ONE_DAY_TIME * 16 + 1000
            let d1 = new Date(t1)
            let d2 = new Date(t2)
            picker.$emit('pick', [d1, d2])
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            let t2 = getTodayEndTime()
            let t1 = t2 - ONE_DAY_TIME * 31 + 1000
            let d1 = new Date(t1)
            let d2 = new Date(t2)
            picker.$emit('pick', [d1, d2])
          }
        }]
      },
      stores: [],
      storeName: '',
      isLoading: false,
      unLoadCount: 6,
      statistics: [{
        name: '会员总数', icon: 'ht-icon-crowd', value: 0, color: '#FFC13C', loading: true
      }, {
        name: '交易总额（元）', icon: 'ht-icon-wallet', value: 0, loading: true
      }, {
        name: '剩余积分数', icon: 'ht-icon-coins', value: 0, color: '#FF4A3C', loading: true
      }, {
        name: '新增会员数', icon: 'ht-icon-man', value: 0, color: '#107482', loading: true
      }, {
        name: '订单数', icon: 'ht-icon-indent', value: 0, color: '#FF9A3C', loading: true
      }, {
        name: '近期消耗积分数', icon: 'ht-icon-coin', value: 0, color: '#4367D1', loading: true
      }],
      checks:[ {
        name: '页面设置',
        tip: '请将您品牌的小程序做个人化设置。',
        route: 'fitmentMpPage',
        finished: null,
        loading: true
      }, {
        name: '积分规则',
        tip: '请先设置您品牌对会员赠送积分和抵扣积分的规则。',
        route: 'integralRuleDetail',
        finished: null,
        loading: true
      }, {
        name: '会员卡设置',
        tip: '请先设置您品牌的会员卡的基本信息。',
        route: 'couponSetUp',
        finished: null,
        loading: true
      }]
    }
  },
  methods: {
    loadStore(){
      const sid = this.userStoreId
      searchStoreById(sid)
        .then(res => {
          let list = res.entity
          if(res.success && isArray(list) && list.length > 0) {
            this.storeName = list[0].name
          }
        })
        .catch(err=>{
          this.$message.error('加载所在网点信息失败！')
        })
    },

    loadAllStore(){
      searchBrandStore()
        .then(res => {
          if(res.success){
            this.stores = res.entity.map(x => {
              let m = x.id
              let n = x.name
              return {
                label: n,
                value: Number(m)
              }
            })
          }
        })
        .catch(err =>{
          this.$message.error('加载网点信息失败！')
        })
    },

    handleSearch() {
      this.loadStatisticData()
    },

    updateStatisticValue(i = 0, value = 0) {
      this.statistics[i].value = value
      this.statistics[i].loading = false
    },

    updateStatisticLoading(i = 0, loading = false) {
      this.statistics[i].loading = loading
    },

    loadStasicCheck() {
      this.isLoading = true
      getCheck().then(res => {
        this.isLoading = false
        if(res.success) {
          const v = res.entity
          this.checks[0].finished = v.pageSetting,
          this.checks[1].finished = v.integralRule,
          this.checks[2].finished = v.vipCardSetting
        }
      })
        .catch(err=>{
          this.isLoading = false
          this.$message.error('信息加载失败！')
        })
    }
  },
  computed: {
    ...mapGetters([
      'userRole',
      'fitStep',
      'userStoreId'
    ]),
    isBrand(){
      return this.userRole === ROLE_BRAND
    }
  },

  created() {
    if (this.isBrand) {
      this.loadAllStore()
    } else {
      this.loadStore()
    }
    // this.loadStatisticData()
    this.loadStasicCheck()
  }

}
</script>

<style lang="scss">
.page-dashboard {
  .el-date-editor .el-range-separator {
    width: 8%;
  }
  .section {
    &.is-header {
      padding-top: 15px;
    }

    &.is-statistics {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .ht-dashboard-statics-item {
        margin-bottom: 20px;
        min-width: 325px;
        width: calc(33% - 30px);
      }
    }

    .section-tip {
      font-size: 15px;
      color: #333333;
      padding-top: 20px;
    }

    &.is-checklist {
      margin-top: 30px;
      border-top: 1px solid #ddd;

      .check-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .check-item {
          min-width: 325px;
          width: calc(50% - 30px);
          display: flex;
          padding-top: 30px;
          padding-bottom: 20px;
          border-bottom: 1px dashed #ddd;

          .lefter {
            width: 100%;
            padding

            .name {
              color: #333333;
              font-size: 18px;
            }

            .tip {
              font-size: 14px;
              color: #666666;
              padding-top: 15px;
            }
          }

          .righter {
            width: 150px;
            display: flex;
            align-items: center;
            flex-flow: row-reverse;
            .finished-icon, .todo-link {
              margin: auto;
            }

            .finished-icon {
              color: #32b4c8;
              font-size: 20px;
              background-color: transparent;
            }
          }
        }
      }
    }
  }
}
</style>
