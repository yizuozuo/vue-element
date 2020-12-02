<template>
  <el-menu
    class="ht-navbar"
    mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click">
        <div class="avatar-wrapper">
          <img
            alt="暂无图片"
            class="user-avatar"
            src="@/assets/img/avatar.png">
          <span
            class="username"
            v-text="nickname" />
          <span>
            <i class="el-icon-caret-bottom" />
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="{name: 'userInfo'}">
            <el-dropdown-item>
              {{ $t('route.userInfo') }}
            </el-dropdown-item>
          </router-link>
          <router-link :to="{name: 'userPass'}">
            <el-dropdown-item>
              {{ $t('route.userPass') }}
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="splitor">
        |
      </span>
      <div class="sign-out"
        @click.stop.prevent="logout">
        <i class="ht-icon-close" />
        <span>{{ $t('navbar.logOut') }}</span>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/common/breadcrumb'
import Hamburger from '@/components/common/hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userName',
      'nickname',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        const { href } = this.$router.resolve({
          name: 'signin',
          query: {
            _: new Date().getTime()
          }
        })
        window.location.replace(href)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ht-navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px 0 40px;
  }
  .breadcrumb-container{
    float: left;
  }
  .right-menu {
    float: right;
    height: 50px;
    display: flex;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 10px;
      .avatar-wrapper {
        line-height: 50px;
        display: flex;
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          margin: auto;
        }
        .username {
          padding-left: 15px;
        }
      }
    }
    .splitor {
      font-size: 13px;
      color: #eeeeee;
    }
    .sign-out {
      display: flex;
      cursor: pointer;
      font-size: 13px;
      color: #555555;
      padding-left: 10px;
      padding-right: 40px;
      i {
        color: #32B4C8;
        font-size: 15px;
        line-height: 50px;
        padding-right: 5px;
      }
    }
  }
}
</style>
