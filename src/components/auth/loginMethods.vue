<template>
  <div class="ht-other-login-methods">
    <div class="title">
      <div class="line is-l" />
      <div class="value">
        其他方式登陆
      </div>
      <div class="line is-r" />
    </div>

    <div class="methods" />
  </div>
</template>

<script>
export default {
  name: 'other-login-methods'
}
</script>

<style lang="scss">
.ht-other-login-methods-item {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;

  .title {
    .line {
      width: 50px;
      height: 2px;
      background-color: #ececec;
    }
  }
}
</style>
