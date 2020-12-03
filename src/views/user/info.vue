<template>
  <div class="page-container">
    <div class="container-box">
      <el-form 
        class="label"
        label-position="right"
        label-width="80px"
        v-loading="isLoading">
        <el-row :gutter="20">
          <el-form-item label="用户名:"> 
            <span>{{ userName }}</span>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item label="手机:"> 
            <span>{{ linkedPhone }}</span>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item label="邮箱:"> 
            <span>{{ linkedMail }}</span>
          </el-form-item>
        </el-row>

        <el-row>
          <el-button
            type="text"
            class="ibtn el-icon-edit"
            @click.stop.prevent="handleEdit()">
            <span style="padding-left: 10px;">
              修改个人信息
            </span>
          </el-button>
        </el-row>
      </el-form>
    </div>

    <info-edit
      :visible="editorVisible"
      @close="editorVisible = false" 
      @success="handleEditSuccess" />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/sys'
import { SUCCESS_STATUS_CODE } from '@/utils/const'
import InfoEdit from '@/components/auth/editInfo'

export default {
  name: 'user-info',
  components:{
    InfoEdit
  },
  data(){
    return{
      id: null,
      userName: null,
      linkedMail: null,
      linkedPhone: null,
      isLoading: false,
      editorVisible: false,
    }
  },
  created(){
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo(){
      this.isLoading = true
      getUserInfo().then(res=>{
        this.isLoading = false
        if (res.status === SUCCESS_STATUS_CODE) {
          const v = res.entity
          this.id = v.id
          this.userName = v.userName
          this.linkedMail = v.linkedMail
          this.linkedPhone = v.linkedPhone
        }
      }).catch(err => {
        this.$message.error('个人信息加载失败')
      })
    },

    handleEdit() {
      this.editorVisible = true
    },

    handleEditSuccess() {
      this.editorVisible = false
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.ibtn{
  font-size: 16px;
  color: #32B5CB;
  padding-left: 12px;
  padding-top: 20px;
}
</style>


