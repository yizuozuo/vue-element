<template>
  <div class="page-container store-list">
    <div class="top-container box">
      <el-input
        v-model="fullName"
        prefix-icon="el-icon-search"
        placeholder="请输入网点名称"
        clearable />

      <el-button
        class="seaBtn"
        @click="onSubmit">
        <span class="txt">
          查找
        </span>
      </el-button>

      <router-link :to="{name: 'storeAdd'}"
        v-permission="['store-add']">
        <el-button
          type="text"
          class="cbtn"
          plain
          icon="ht-icon-create">
          创建网点
        </el-button>
      </router-link>
    </div>

    <div class="table-container box">
      <el-table
        :data="stores"
        v-loading="loading"
        ref="table"
        row-key="id"
        class="is-store-table"
        :header-row-style="{color: '#333', 'backgroud-color': '#eee'}"
        :header-cell-style="{'border-bottom': '1px solid #ccc', 'text-align':'center','background-color': '#F4F7FA',}"
        @expand-change="handleRowExpandChange">
        <el-table-column
          type="expand">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <div class="more-operation ta-r">
              <el-button
                title="禁用"
                v-show=" scope.row.status !== 2 "
                icon="ht-icon-forbid"
                plain
                :loading="toggleIndex === scope.$index"
                v-permission="['store-disable']"
                @click.prevent="handleToggleStore(scope.$index, scope.row, scope.row.status)">
                禁用
              </el-button>

              <el-button
                v-show=" scope.row.status !== 1 "
                title="启用"
                icon="ht-icon-circle"
                plain
                :loading="toggleIndex === scope.$index"
                v-permission="['store-enable']"
                @click.prevent="handleToggleStore(scope.$index, scope.row, scope.row.status)">
                启用
              </el-button>

              <router-link :to="{name: 'storeEdit', params: {id: scope.row.id}}">
                <el-button
                  title="编辑"
                  v-permission="['store-edit']"
                  icon="el-icon-edit"
                  plain>
                  编辑
                </el-button>
              </router-link>

              <router-link :to="{name: 'storeDetail', params: {id: scope.row.id}}">
                <el-button
                  title="详情"
                  v-permission="['store-detail']"
                  icon="ht-icon-file"
                  plain>
                  详情
                </el-button>
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="网点编号"
          align="center" />
        <el-table-column
          prop="address"
          label="网点地址"
          align="center" />
        <el-table-column
          prop="fullName"
          label="网点名称"
          align="center" />
        <el-table-column
          prop="linkedPhone"
          label="网点电话"
          align="center"
          width="130" />
        <!-- <el-table-column
          prop="form"
          label="网点业态"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.form | formatNetwork }}
          </template>
        </el-table-column> -->
        <el-table-column
          prop="businessPropertyType"
          label="经营性质"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.businessPropertyType | formatBusinessPropertyType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="isVisual"
          label="是否可见"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.isVisual | formatIsVisual }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="adminLinkedPhone"
          label="管理员手机"
          align="center"
          width="120" /> -->
        <el-table-column
          prop="status"
          label="网点状态"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.status | formatStatus }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px"
          align="center">
          <template slot-scope="scope">
            <el-button
              @click="expandRow(scope.row)"
              round>
              操作
              <i :class="expandRowId === scope.row.id ? 'el-icon-arrow-up':'el-icon-arrow-down'" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :current-page="pageNo"
      :total="totalNum"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { searchStore, stopStore, activeStore} from '@/api/store'
import { isArray } from '@/utils'
import { SUCCESS_STATUS_CODE } from '@/utils/const'

export default {
  name: 'store-list',
  data() {
    return {
      fullName: '',
      pageSize: 10,
      pageNo: 1,
      totalNum: null,
      stores: [],
      loading: true,
      deleteRowIndex: -1,
      toggleIndex: -1,
      order: 'DESC',
      orderBy: 'createdTime, id',
      expandRowId: -1
    }
  },

  created() {
    this.getStores()
  },

  methods: {
    doStopStore(id){
      stopStore(id)
        .then(res=>{
          if (res.status === SUCCESS_STATUS_CODE && res.entity) {
            this.$message({type: 'success', message: '禁用成功!'})
            this.doToggleStore()
          } else {
            this.$message.error(res.message || '禁用失败!')
          }
          this.toggleIndex = -1
        })
        .catch(err=> {
          this.toggleIndex = -1
          this.$message.error(err.message || '禁用失败!')
        })
    },

    doActiveStore(id) {
      activeStore(id)
        .then(res=> {
          if (res.status === SUCCESS_STATUS_CODE && res.entity) {
            this.$message({type: 'success', message: '启用成功!'})
            this.doToggleStore()
          } else {
            this.$message.error(res.message || '启用失败!')
          }
          this.toggleIndex = -1
        })
        .catch(err=> {
          this.toggleIndex = -1
          this.$message.error(err.message || '启用失败!')
        })
    },

    doToggleStore() {
      if (this.toggleIndex >= 0) {
        const item = this.stores[this.toggleIndex]
        item.status = item.status === 1 ? 2 : 1
      }
    },

    handleToggleStore(index, row, status) {
      if (this.toggleIndex > 0 ) {
        return this.$message({type: 'warning', message: '请稍后操作!' })
      }
      this.toggleIndex = index
      row.status = status
      if (row.status === 1 ) {
        this.doStopStore(row.id)
      } else {
        this.doActiveStore(row.id)
      }
    },

    handleStop(index, row){
      this.stopRowIndex=index
      this.doStopStore(row.id)
    },

    onSubmit() {
      this.pageNo = 1
      this.getStores()
    },

    getStores() {
      this.loading = true
      const p = {
        fullName: this.fullName,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        order: this.order,
        orderBy: this.orderBy
      }
      searchStore(p).then(res => {
        this.loading = false
        if (res.status === SUCCESS_STATUS_CODE && res.page) {
          this.totalNum = res.page.totalNum || 0
          this.stores = res.page.result || []
        }
      })
    },
    expandRow(row) {
      this.expandRowId = row.id
      this.$refs.table.toggleRowExpansion(row)
    },

    handleRowExpandChange(row, expandedRows) {
      let oldId = this.expandRowId
      let rowId = row.id
      let isExpand = expandedRows.some(x => x.id === row.id)

      if (isExpand) {
        this.expandRowId = rowId
        for (let item of expandedRows) {
          if (item.id !== row.id) {
            this.$refs.table.toggleRowExpansion(item, false)
          }
        }
      }else{
        this.expandRowId = -1
      }
    },

    handlePageSizeChange(val) {
      this.pageNo = 1
      this.pageSize = val
      this.getStores()
    },

    handleCurrentChange(val) {
      this.pageNo = val
      this.getStores()
    }
  }
}
</script>

<style lang="scss">
.store-list{
  .el-button.is-plain:hover, .el-button.is-plain:focus {
    background: none;
    color: seagreen;
    border: 1px solid seagreen;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #F9FAFA !important;
  }
  // .common-btn:hover {
  //   background: #FF9A3C !important;
  //   border: 1px solid #FF9A3C;
  // }

  .el-table__expanded-cell[class*=cell] {
    padding: 0px;
  }

  .el-table.is-store-table {
    .more-operation,
    .el-table__row.expanded {
      background-color: #f0f9eb;
    }

    .more-operation {
      padding: 10px;
      margin-bottom: 10px;
      .el-button + a,
      a + a,
      a + .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.top-container {
  .label {
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    font-weight: 400;
  }

  .seaBtn{
    background: seagreen;
      .txt{
        color: #fff;
      }
  }

  .cbtn {
    font-size: 14px;
    color: seagreen;
    float: right;
    border: 1px solid seagreen;
    border-radius: 14px;
    padding: 4px 14px;
    margin-top: 10px;
  }

  // .bicon {
  //   background: seagreen;
  //   color: #fff
  // }

  .btn{
    font-size: 16px;
    color: seagreen;
    float: right;
  }

  .el-input {
    width: 300px;
  }

  .el-input + .el-button {
    margin-left: 29px;
  }
}
</style>
